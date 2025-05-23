/* eslint-disable react/no-danger */
import { Form } from '@openedx/paragon';
import DOMPurify from 'dompurify';

import BaseField from './BaseField';

const CheckboxField = (props) => (
  <BaseField
    {...props}
    renderEditingField={({
      fieldName, fieldLabel, fieldError, draftValue, setDraftValue,
    }) => (
      <>
        <Form.Checkbox
          data-hj-suppress
          name={fieldName}
          id={fieldName}
          checked={draftValue}
          onChange={(event) => setDraftValue(event.target.checked)}
        >
          <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(fieldLabel) }} />
        </Form.Checkbox>
        {fieldError != null && <Form.Control.Feedback>{fieldError}</Form.Control.Feedback>}
      </>
    )}
    renderEditableField={({
      fieldLabel, fieldName, draftValue,
    }) => (
      <Form.Checkbox id={fieldName} name={fieldName} checked={draftValue}>
        {/* eslint-disable-next-line react/no-danger */}
        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(fieldLabel) }} />
      </Form.Checkbox>
    )}
  />
);

CheckboxField.propTypes = {
  ...BaseField.propTypes,
};

export default CheckboxField;
