import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ExtendedProfileFieldsContext from './ExtendedProfileContext';
import { getExtendedProfileFieldsV2 } from './data/service';

import { moveCheckboxFieldsToEnd } from './utils';

import { FORM_MODE } from './constants';

const ExtendedProfileFieldsProvider = ({
  patchProfile, profileFieldErrors, components, children,
}) => {
  const [extendedProfileFields, setExtendedProfileFields] = React.useState();
  const [editMode, setEditMode] = React.useState(FORM_MODE.EDITABLE);
  const [editingInput, setEditingInput] = React.useState(null);
  const [saveState, setSaveState] = React.useState('default');

  React.useEffect(() => {
    (async () => {
      const resv2 = await getExtendedProfileFieldsV2();
      setExtendedProfileFields(resv2.fields.sort(moveCheckboxFieldsToEnd));
    })();
  }, []);

  useEffect(() => {
    if (Object.keys(profileFieldErrors).length) {
      setSaveState('error');
      setEditMode(FORM_MODE.EDITING);
      setEditingInput(Object.keys(profileFieldErrors)[0]);
    } else {
      setSaveState('default');
      setEditMode(FORM_MODE.EDITABLE);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Object.keys(profileFieldErrors).length]);

  const handleChangeFormMode = (mode, fieldName = null) => {
    setEditMode(mode);
    setEditingInput(fieldName);
  };

  const handleSaveExtendedProfile = async ({ username, params }) => {
    if (username) { return patchProfile(username, params); }
    return patchProfile(params);
  };

  const handleResetFormEdition = () => {
    if (!Object.keys(profileFieldErrors).length) {
      setEditMode(FORM_MODE.EDITABLE);
      setEditingInput(null);
      setSaveState('default');
    }
  };

  const handleChangeSaveState = (state) => {
    setSaveState(state);
  };

  const value = React.useMemo(
    () => ({
      editMode,
      extendedProfileFields,
      editingInput,
      saveState,
      profileFieldErrors,
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
  components: PropTypes.shape({
    SwitchContent: PropTypes.node,
    EmptyContent: PropTypes.node,
    EditableItemHeader: PropTypes.node,
  }),
};

export default ExtendedProfileFieldsProvider;
