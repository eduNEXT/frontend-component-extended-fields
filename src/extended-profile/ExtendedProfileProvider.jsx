import React from 'react';
import PropTypes from 'prop-types';
import ExtendedProfileFieldsContext from './ExtendedProfileContext';
import { getExtendedProfileFields } from './data/service';

import { FORM_MODE } from './constants';

const ExtendedProfileFieldsProvider = ({ patchProfile, components, children }) => {
	const [extendedProfileFields, setExtendedProfileFields] = React.useState();
	const [editMode, setEditMode] = React.useState(FORM_MODE.EDITABLE);
	const [editingInput, setEditingInput] = React.useState(null);
	const [saveState, setSaveState] = React.useState('default');

	React.useEffect(() => {
		(async () => {
			const res = await getExtendedProfileFields();
			setExtendedProfileFields(res.fields);
		})();
	}, []);

	const handleChangeFormMode = (mode, fieldName = null) => {
		setEditMode(mode);
		setEditingInput(fieldName);
	};

	const handleSaveExtendedProfile = async (username, params) => {
		await patchProfile(username, params);
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
		[editMode, editingInput, extendedProfileFields, saveState],
	);

	return <ExtendedProfileFieldsContext.Provider value={value}>{children}</ExtendedProfileFieldsContext.Provider>;
};

ExtendedProfileFieldsProvider.propTypes = {
	children: PropTypes.node || PropTypes.arrayOf(PropTypes.node),
};

export default ExtendedProfileFieldsProvider;
