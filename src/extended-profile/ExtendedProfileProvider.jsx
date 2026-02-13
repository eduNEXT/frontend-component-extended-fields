import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import ExtendedProfileFieldsContext from './ExtendedProfileContext';
import { getExtendedProfileFieldsV2 } from './data/service';

import { moveCheckboxFieldsToEnd } from './utils';

import { FORM_MODE } from './constants';

const ExtendedProfileFieldsProvider = ({
  patchProfile, profileFieldErrors, components, children,
}) => {
  const editingInputRef = React.useRef(null);
  const [extendedProfileFields, setExtendedProfileFields] = React.useState();
  const [editMode, setEditMode] = React.useState(FORM_MODE.EDITABLE);
  const [editingInput, setEditingInput] = React.useState(null);
  const [saveState, setSaveState] = React.useState('default');
  const [localErrors, setLocalErrors] = React.useState({});

  React.useEffect(() => {
    (async () => {
      const resv2 = await getExtendedProfileFieldsV2();
      setExtendedProfileFields(resv2.fields.sort(moveCheckboxFieldsToEnd));
    })();
  }, []);

  useEffect(() => {
    const filteredKeys = Object.keys(profileFieldErrors)
      .filter(key => key !== 'extended_profile');

    if (filteredKeys.length > 0 || Object.keys(localErrors).length) {
      setSaveState('error');
      setEditMode(FORM_MODE.EDITING);
      setEditingInput(filteredKeys?.[0] ?? localErrors ? editingInputRef.current : null);
    } else {
      setSaveState('default');
      setEditMode(FORM_MODE.EDITABLE);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Object.keys(profileFieldErrors).length, Object.keys(localErrors).length]);

  const handleChangeFormMode = (mode, fieldName = null) => {
    setEditMode(mode);
    setEditingInput(fieldName);
    setSaveState('default');
    editingInputRef.current = fieldName;
  };

  const handleSaveExtendedProfile = async ({ username, params }) => {
    if (username) { return patchProfile(username, params); }
    return patchProfile(params);
  };

  const handleResetFormEdition = () => {
    setEditMode(FORM_MODE.EDITABLE);
    setEditingInput(null);
    setSaveState('default');
  };

  const handleChangeSaveState = (state) => {
    setSaveState(state);
  };

  useEffect(() => {
    const httpClient = getAuthenticatedHttpClient?.();

    const interceptor = httpClient.interceptors.response.use(
      res => {
        if (res.config.url.includes('user/v1/accounts/')) {
          setLocalErrors((prevState) => {
            const fieldName = editingInputRef.current;

            if (!fieldName) { return prevState; }

            const { [fieldName]: _, ...rest } = prevState;
            return rest;
          });
          editingInputRef.current = null;
          handleResetFormEdition();
        }
        return res;
      },
      error => {
        if (
          error.response?.status === 400
          && error.response.config.url.includes('user/v1/accounts/')
        ) {
          const fieldErrors = error.response.data?.field_errors;

          if (fieldErrors) {
            setLocalErrors({ [editingInputRef.current]: fieldErrors.extended_profile.user_message });
          }
        }

        return Promise.reject(error);
      },
    );

    return () => {
      httpClient.interceptors.response.eject(interceptor);
    };
  }, []);

  const mergedErrors = {
    ...profileFieldErrors,
    ...localErrors,
  };

  const value = React.useMemo(
    () => ({
      editMode,
      extendedProfileFields,
      editingInput,
      saveState,
      profileFieldErrors: mergedErrors,
      handleChangeFormMode,
      handleResetFormEdition,
      handleSaveExtendedProfile,
      handleChangeSaveState,
      components,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [editMode, editingInput, extendedProfileFields, saveState, Object.keys(profileFieldErrors)],
  );

  return <ExtendedProfileFieldsContext.Provider value={value}>{children}</ExtendedProfileFieldsContext.Provider>;
};

ExtendedProfileFieldsProvider.propTypes = {
  children: PropTypes.node || PropTypes.arrayOf(PropTypes.node),
  patchProfile: PropTypes.func,
  profileFieldErrors: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.string),
  ),
  components: PropTypes.shape({
    SwitchContent: PropTypes.node,
    EmptyContent: PropTypes.node,
    EditableItemHeader: PropTypes.node,
  }),
};

export default ExtendedProfileFieldsProvider;
