import PropTypes from 'prop-types';
import ExtendedProfileFieldsProvider from './ExtendedProfileProvider';
import ProfileFields from './profile-fields';

const ExtendedProfileFields = (props) => {
  const {
    refreshUserProfile, updateUserProfile, profileFieldValues, formComponents,
  } = props;

  return (
    <ExtendedProfileFieldsProvider
      patchProfile={updateUserProfile}
      components={formComponents}
    >
      <ProfileFields
        fetchProfile={refreshUserProfile}
        patchProfile={updateUserProfile}
        extendedProfileValues={profileFieldValues}
      />
    </ExtendedProfileFieldsProvider>
  );
};

ExtendedProfileFields.propTypes = {
  refreshUserProfile: PropTypes.func,
  updateUserProfile: PropTypes.func,
  profileFieldValues: PropTypes.arrayOf(PropTypes.shape({
    fieldLabel: PropTypes.string,
    fieldValue: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  })),
  formComponents: PropTypes.shape({
    SwitchContent: PropTypes.node,
    EmptyContent: PropTypes.node,
    EditableItemHeader: PropTypes.node,
  }),
};

export default ExtendedProfileFields;
