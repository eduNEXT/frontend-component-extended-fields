import React, { useContext } from 'react';
import { getAuthenticatedUser } from '@edx/frontend-platform/auth';
import PropTypes from 'prop-types';

import ExtendedProfileFieldsContext from '../ExtendedProfileContext';

import TextField from './elements/TextField';
import CheckboxField from './elements/CheckboxField';
import SelectField from './elements/SelectField';

const ProfileFields = ({ fetchProfile, extendedProfileValues }) => {
  const {
    extendedProfileFields,
    editMode: formEditMode,
    editingInput: activeFieldName,
    handleChangeFormMode: setFormMode,
    handleSaveExtendedProfile: saveProfile,
    handleResetFormEdition,
    handleChangeSaveState,
    saveState,
    components: { SwitchContent },
  } = useContext(ExtendedProfileFieldsContext);

  const [savingErrors, setSavingErrors] = React.useState({});

  const handleFormSubmit = async (fieldName, fieldValue) => {
    handleChangeSaveState('pending');
    const user = getAuthenticatedUser();
    const newFields = extendedProfileValues.map((field) => {
      if (field.fieldName === fieldName) {
        return { ...field, fieldValue };
      }
      return field;
    });

    try {
      await saveProfile({ username: user.username, params: { extendedProfile: newFields } });
      fetchProfile(user.username);
      handleResetFormEdition();
    } catch (error) {
      setSavingErrors(
        Object.fromEntries(
          Object.entries(error.processedData.fieldErrors)
            .map(([key, value]) => [key, value.userMessage]),
        ),
      );
      handleChangeSaveState('error');
    }
  };
  return (
    <div>
      {extendedProfileFields?.map((field) => {
        // extendedProfileValues comes from the user profile values
        // here we are looking for the field value of each extended profile field
        const value = extendedProfileValues?.find((el) => el.fieldName === field.name)?.fieldValue;

        const commonProps = {
          ...field,
          value,
          formEditMode,
          activeFieldName,
          setFormMode,
          handleFormSubmit,
          saveState,
          savingErrors,
        };

        return (
          <SwitchContent
            className="mb-5"
            expression={field.type}
            cases={{
              checkbox: <CheckboxField {...commonProps} />,
              text: <TextField {...commonProps} />,
              select: <SelectField {...commonProps} />,
            }}
          />
        );
      })}
    </div>
  );
};

ProfileFields.propTypes = {
  fetchProfile: PropTypes.func.isRequired,
  extendedProfileValues: PropTypes.arrayOf(
    PropTypes.shape({
      fieldName: PropTypes.string.isRequired,
      fieldValue: PropTypes.string,
    }),
  ).isRequired,
};

export default ProfileFields;
