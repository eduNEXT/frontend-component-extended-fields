import PropTypes from 'prop-types';
import ExtendedProfileFieldsProvider from './ExtendedProfileProvider';
import ProfileFields from './profile-fields';

const ExtendedProfileFields = (props) => {
  const {
    fetchProfile, patchProfile, extendedProfileValues, SwitchContent, EmptyContent, EditableItemHeader,
  } = props;

  console.log(props)


  return (
    <ExtendedProfileFieldsProvider
      patchProfile={patchProfile}
      components={{ SwitchContent, EmptyContent, EditableItemHeader }}
    >
      <ProfileFields
        fetchProfile={fetchProfile}
        patchProfile={patchProfile}
        extendedProfileValues={extendedProfileValues}
      />
    </ExtendedProfileFieldsProvider>
  );
};

ExtendedProfileFields.propTypes = {
  fetchProfile: PropTypes.func,
  patchProfile: PropTypes.func,
  extendedProfileValues: PropTypes.arrayOf(PropTypes.shape({
    fieldNabel: PropTypes.string,
    fieldValue: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  })),
  SwitchContent: PropTypes.node,
  EmptyContent: PropTypes.node,
  EditableItemHeader: PropTypes.node,
};

export default ExtendedProfileFields;
