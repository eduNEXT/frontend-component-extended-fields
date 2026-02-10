import { useContext } from 'react';
import { Button, Form, StatefulButton } from '@openedx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';
import PropTypes from 'prop-types';

import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import messages from '../../messages';
import { FORM_MODE } from '../../constants';

import useFieldController from '../useFieldController';
import ExtendedProfileFieldsContext from '../../ExtendedProfileContext';

const BaseField = ({
  name: fieldName,
  value: fieldValue,
  label: fieldLabel,
  required: isRequired,
  restrictions: fieldRestrictions,
  instructions: fieldInstructions,
  errorMessages,
  formEditMode,
  activeFieldName,
  setFormMode,
  handleFormSubmit,
  saveState,
  options: fieldOptions,
  renderEditingField,
  renderEditableField,
  savingErrors,
}) => {
  const { formatMessage } = useIntl();

  const {
    draftValue, setDraftValue, fieldError, getFieldDisplayMode,
  } = useFieldController({
    name: fieldName,
    value: fieldValue,
    errorMessages,
    formEditMode,
    activeFieldName,
    fieldRestrictions,
    savingErrors,
  });

  const {
    components: { SwitchContent },
  } = useContext(ExtendedProfileFieldsContext);

  const handleStartEditing = () => {
    setFormMode(FORM_MODE.EDITING, fieldName);
  };

  const handleCancelEditing = () => {
    setFormMode(FORM_MODE.DEFAULT);
    setDraftValue(fieldValue);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    handleFormSubmit(fieldName, draftValue);
  };

  const renderEmptyLabel = () => (
    <Button variant="link" onClick={() => handleStartEditing()} className="p-0">
      {formatMessage(messages['account.settings.editable.field.action.add'], { fieldLabel })}
    </Button>
  );

  const renderValue = (rawValue) => {
    if (!rawValue) {
      if (renderEditableField) { return null; }
      return renderEmptyLabel();
    }

	// If it is a select field, we want to display the option label instead of the value
	const fieldOption = fieldOptions?.find((option) => option.value === rawValue);
    return fieldOption ? fieldOption.name : rawValue;
  };

  return (
    <SwitchContent
      expression={getFieldDisplayMode()}
      cases={{
        editing: (
          <div role="dialog" aria-labelledby={`${fieldName}-label`}>
            <form data-testid="field-form" onSubmit={onSubmit}>
              <Form.Group controlId={fieldName} isInvalid={fieldError}>
                {renderEditingField({
                  fieldName,
                  fieldLabel,
                  fieldError,
                  draftValue,
                  setDraftValue,
                  fieldRestrictions,
                  isRequired,
                  fieldOptions,
                })}
                {!!fieldInstructions && <Form.Text>{fieldInstructions}</Form.Text>}
              </Form.Group>

              <div className="form-group flex-shrink-0 flex-grow-1">
                <StatefulButton
                  type="submit"
                  className="mr-2"
                  state={saveState}
                  labels={{
                    default: formatMessage(messages['profile.formcontrols.button.save']),
                    pending: formatMessage(messages['profile.formcontrols.button.saving']),
                    complete: formatMessage(messages['profile.formcontrols.button.saved']),
                  }}
                  onClick={(e) => {
                    if (saveState === 'pending') {
                      e.preventDefault();
                    }
                  }}
                  disabled={!!fieldError}
                />
                <Button variant="outline-primary" onClick={handleCancelEditing}>
                  {formatMessage(messages['profile.formcontrols.button.cancel'])}
                </Button>
              </div>
            </form>
          </div>
        ),
        default: (
          <div className="form-group">
            <div className="d-flex align-items-start">
              {renderEditableField?.({
                fieldLabel, fieldName, handleStartEditing, draftValue,
              }) || <h6 aria-level="3">{fieldLabel}</h6>}
              <Button variant="link" onClick={handleStartEditing} className="ml-3">
                <FontAwesomeIcon className="mr-1" icon={faPencilAlt} />{formatMessage(messages['account.settings.editable.field.action.edit'])}
              </Button>
            </div>
            <p data-hj-suppress>{renderValue(draftValue)}</p>
          </div>
        ),
      }}
    />
  );
};

BaseField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  restrictions: PropTypes.shape({
    max_length: PropTypes.number,
    min_length: PropTypes.number,
  }),
  errorMessages: PropTypes.shape({
    required: PropTypes.string,
    max_length: PropTypes.string,
    min_length: PropTypes.string,
  }),
  instructions: PropTypes.string,
  formEditMode: PropTypes.string,
  activeFieldName: PropTypes.string,
  setFormMode: PropTypes.func,
  handleFormSubmit: PropTypes.func,
  saveState: PropTypes.oneOf(['default', 'error', 'pending', 'complete']),
  renderEditingField: PropTypes.func.isRequired,
  renderEditableField: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ),
};

BaseField.defaultProps = {
  value: '',
  label: '',
  restrictions: {},
  errorMessages: {},
  formEditMode: FORM_MODE.STATIC,
  activeFieldName: '',
  setFormMode: () => {},
  handleFormSubmit: () => {},
  saveState: 'default',
};

export default BaseField;
