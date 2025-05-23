import { Form } from '@openedx/paragon';

import BaseField from './BaseField';

const SelectField = (props) => (
  <BaseField
    {...props}
    renderEditingField={({
      fieldName,
      fieldLabel,
      fieldError,
      draftValue,
      setDraftValue,
      isRequired,
      fieldOptions,
    }) => (
      <>
        <label className="edit-section-header" htmlFor={fieldName}>
          {fieldLabel}
        </label>
        <select
          data-hj-suppress
          className="form-control"
          type="select"
          id={fieldName}
          name={fieldName}
          value={draftValue}
          onChange={(event) => setDraftValue(event.target.value)}
        >
          {!isRequired && <option value="">&nbsp;</option>}
          {fieldOptions?.map(({ name, value: optionValue }) => (
            <option key={optionValue} value={optionValue}>
              {name}
            </option>
          ))}
        </select>
        {fieldError !== null && <Form.Control.Feedback hasIcon={false}>{fieldError}</Form.Control.Feedback>}
      </>
    )}
  />
);

SelectField.propTypes = {
  ...BaseField.propTypes,
};

export default SelectField;
