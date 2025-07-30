import React from 'react';
import PropTypes from 'prop-types';
import ExtendedProfileFieldsContext from './ExtendedProfileContext';
import { getExtendedProfileFields, getExtendedProfileFields_V2 } from './data/service';

import { moveCheckboxFieldsToEnd } from './utils';

import { FORM_MODE } from './constants';

const ExtendedProfileFieldsProvider = ({ patchProfile, components, children }) => {
  const [extendedProfileFields, setExtendedProfileFields] = React.useState();
  const [editMode, setEditMode] = React.useState(FORM_MODE.EDITABLE);
  const [editingInput, setEditingInput] = React.useState(null);
  const [saveState, setSaveState] = React.useState('default');

  React.useEffect(() => {
    (async () => {
      const res_v2 = await getExtendedProfileFields_V2();
      setExtendedProfileFields(res_v2.fields.sort(moveCheckboxFieldsToEnd));
    })();
  }, []);

  const handleChangeFormMode = (mode, fieldName = null) => {
    setEditMode(mode);
    setEditingInput(fieldName);
  };

  const handleSaveExtendedProfile = async ({ username, params }) => {
    if (username) await patchProfile(username, params);
    else await patchProfile(params);
  };

  const handleResetFormEdition = () => {
    setEditMode(FORM_MODE.EDITABLE);
    setEditingInput(null);
    setSaveState('default');
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
      handleChangeFormMode,
      handleResetFormEdition,
      handleSaveExtendedProfile,
      handleChangeSaveState,
      components,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [editMode, editingInput, extendedProfileFields, saveState],
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
