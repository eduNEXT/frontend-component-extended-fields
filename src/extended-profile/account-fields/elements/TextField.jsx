import { Form } from '@openedx/paragon';

import BaseField from './BaseField';

const TextField = (props) => (
  <BaseField
    {...props}
    renderEditingField={({
      fieldName, fieldLabel, fieldError, draftValue, setDraftValue, fieldRestrictions,
    }) => (
      <>
        <label className="edit-section-header" htmlFor={fieldName}>
          {fieldLabel}
        </label>
        <input
          className="form-control"
          id={fieldName}
          name={fieldName}
          value={draftValue}
          onChange={(e) => setDraftValue(e.target.value)}
          minLength={fieldRestrictions?.min_length}
          maxLength={fieldRestrictions?.max_length}
        />
        {fieldError !== null && <Form.Control.Feedback hasIcon={false}>{fieldError}</Form.Control.Feedback>}
      </>
    )}
  />
);

TextField.propTypes = {
  ...BaseField.propTypes,
};

export default TextField;
