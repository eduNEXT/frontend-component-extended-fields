import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';

import messages from './messages';

const MissingFieldNote = forwardRef(({ fieldName }, ref) => {
  const { formatMessage } = useIntl();
  return (
    <p ref={ref} id={`${fieldName}-missing`} className="small mb-0">
      {formatMessage(messages['account.settings.field.missing'])}
    </p>
  );
});

MissingFieldNote.propTypes = {
  fieldName: PropTypes.string.isRequired,
};

export default MissingFieldNote;
