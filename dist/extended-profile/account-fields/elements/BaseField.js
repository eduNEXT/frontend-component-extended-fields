"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _paragon = require("@openedx/paragon");
var _i18n = require("@edx/frontend-platform/i18n");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _faPencilAlt = require("@fortawesome/free-solid-svg-icons/faPencilAlt");
var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _messages = _interopRequireDefault(require("../../messages"));
var _constants = require("../../constants");
var _useFieldController = _interopRequireDefault(require("../useFieldController"));
var _ExtendedProfileContext = _interopRequireDefault(require("../../ExtendedProfileContext"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const BaseField = _ref => {
  let {
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
    savingErrors
  } = _ref;
  const {
    formatMessage
  } = (0, _i18n.useIntl)();
  const {
    draftValue,
    setDraftValue,
    fieldError,
    getFieldDisplayMode
  } = (0, _useFieldController.default)({
    name: fieldName,
    value: fieldValue,
    errorMessages,
    formEditMode,
    activeFieldName,
    fieldRestrictions,
    savingErrors
  });
  const {
    components: {
      SwitchContent
    }
  } = (0, _react.useContext)(_ExtendedProfileContext.default);
  const handleStartEditing = () => {
    setFormMode(_constants.FORM_MODE.EDITING, fieldName);
  };
  const handleCancelEditing = () => {
    setFormMode(_constants.FORM_MODE.DEFAULT);
    setDraftValue(fieldValue);
  };
  const onSubmit = async event => {
    event.preventDefault();
    handleFormSubmit(fieldName, draftValue);
  };
  const renderEmptyLabel = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
    variant: "link",
    onClick: () => handleStartEditing(),
    className: "p-0",
    children: formatMessage(_messages.default['account.settings.editable.field.action.add'], {
      fieldLabel
    })
  });
  const renderValue = rawValue => {
    if (!rawValue) {
      if (renderEditableField) {
        return null;
      }
      return renderEmptyLabel();
    }

    // If it is a select field, we want to display the option label instead of the value
    const fieldOption = fieldOptions?.find(option => option.value === rawValue);
    return fieldOption ? fieldOption.name : rawValue;
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(SwitchContent, {
    expression: getFieldDisplayMode(),
    cases: {
      editing: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        role: "dialog",
        "aria-labelledby": `${fieldName}-label`,
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("form", {
          "data-testid": "field-form",
          onSubmit: onSubmit,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Form.Group, {
            controlId: fieldName,
            isInvalid: fieldError,
            children: [renderEditingField({
              fieldName,
              fieldLabel,
              fieldError,
              draftValue,
              setDraftValue,
              fieldRestrictions,
              isRequired,
              fieldOptions
            }), !!fieldInstructions && /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Form.Text, {
              children: fieldInstructions
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            className: "form-group flex-shrink-0 flex-grow-1",
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.StatefulButton, {
              type: "submit",
              className: "mr-2",
              state: saveState,
              labels: {
                default: formatMessage(_messages.default['profile.formcontrols.button.save']),
                pending: formatMessage(_messages.default['profile.formcontrols.button.saving']),
                complete: formatMessage(_messages.default['profile.formcontrols.button.saved'])
              },
              onClick: e => {
                if (saveState === 'pending') {
                  e.preventDefault();
                }
              },
              disabled: !!fieldError
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
              variant: "outline-primary",
              onClick: handleCancelEditing,
              children: formatMessage(_messages.default['profile.formcontrols.button.cancel'])
            })]
          })]
        })
      }),
      default: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "form-group",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "d-flex align-items-start",
          children: [renderEditableField?.({
            fieldLabel,
            fieldName,
            handleStartEditing,
            draftValue
          }) || /*#__PURE__*/(0, _jsxRuntime.jsx)("h6", {
            "aria-level": "3",
            children: fieldLabel
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Button, {
            variant: "link",
            onClick: handleStartEditing,
            className: "ml-3",
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFontawesome.FontAwesomeIcon, {
              className: "mr-1",
              icon: _faPencilAlt.faPencilAlt
            }), formatMessage(_messages.default['account.settings.editable.field.action.edit'])]
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          "data-hj-suppress": true,
          children: renderValue(draftValue)
        })]
      })
    }
  });
};
BaseField.propTypes = {
  name: _propTypes.default.string.isRequired,
  value: _propTypes.default.string,
  label: _propTypes.default.string,
  required: _propTypes.default.bool,
  restrictions: _propTypes.default.shape({
    max_length: _propTypes.default.number,
    min_length: _propTypes.default.number
  }),
  errorMessages: _propTypes.default.shape({
    required: _propTypes.default.string,
    max_length: _propTypes.default.string,
    min_length: _propTypes.default.string
  }),
  instructions: _propTypes.default.string,
  formEditMode: _propTypes.default.string,
  activeFieldName: _propTypes.default.string,
  setFormMode: _propTypes.default.func,
  handleFormSubmit: _propTypes.default.func,
  saveState: _propTypes.default.oneOf(['default', 'error', 'pending', 'complete']),
  renderEditingField: _propTypes.default.func.isRequired,
  renderEditableField: _propTypes.default.func,
  options: _propTypes.default.arrayOf(_propTypes.default.shape({
    value: _propTypes.default.string.isRequired,
    label: _propTypes.default.string.isRequired
  }))
};
BaseField.defaultProps = {
  value: '',
  label: '',
  restrictions: {},
  errorMessages: {},
  formEditMode: _constants.FORM_MODE.STATIC,
  activeFieldName: '',
  setFormMode: () => {},
  handleFormSubmit: () => {},
  saveState: 'default'
};
var _default = exports.default = BaseField;
//# sourceMappingURL=BaseField.js.map