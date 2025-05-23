import PropTypes from 'prop-types';
import ExtendedProfileFieldsProvider from './ExtendedProfileProvider';
import ProfileFields from './profile-fields';
import AccountFields from './account-fields';

const ExtendedProfileFields = (props) => {
  const {
    id, refreshUserProfile, updateUserProfile, profileFieldValues, formComponents,
  } = props;

  const isFromAccountMFE = id.includes('account');

  return (
    <ExtendedProfileFieldsProvider
      patchProfile={updateUserProfile}
      components={formComponents}
    >
      {isFromAccountMFE
        ? (
          <AccountFields
            fetchProfile={refreshUserProfile}
            patchProfile={updateUserProfile}
            extendedProfileValues={profileFieldValues}
          />
        )
        : (
          <ProfileFields
            fetchProfile={refreshUserProfile}
            patchProfile={updateUserProfile}
            extendedProfileValues={profileFieldValues}
          />
        )}
    </ExtendedProfileFieldsProvider>
  );
};

ExtendedProfileFields.propTypes = {
  id: PropTypes.string,
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
