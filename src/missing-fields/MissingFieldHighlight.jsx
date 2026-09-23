import { useRef } from 'react';
import PropTypes from 'prop-types';

import MissingFieldNote from './MissingFieldNote';
import useMissingFieldHighlight from './useMissingFieldHighlight';
import { isFieldMissing } from './utils';

/**
 * Widget for the account MFE's `org.openedx.frontend.account.settings_field.v1`
 * slot. It is inserted next to each native field (year_of_birth, country, ...),
 * so it highlights the slot's container rather than wrapping the field.
 */
const MissingFieldHighlight = ({ fieldName, value }) => {
  const noteRef = useRef(null);
  const isMissing = isFieldMissing(fieldName, value);

  useMissingFieldHighlight(
    () => noteRef.current?.closest('[data-account-settings-field]'),
    isMissing,
  );

  return isMissing ? <MissingFieldNote ref={noteRef} fieldName={fieldName} /> : null;
};

MissingFieldHighlight.propTypes = {
  fieldName: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.arrayOf(PropTypes.shape({})),
  ]),
};

MissingFieldHighlight.defaultProps = {
  value: null,
};

export default MissingFieldHighlight;
