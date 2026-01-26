"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _paragon = require("@openedx/paragon");
var _i18n = require("@edx/frontend-platform/i18n");
var _propTypes = _interopRequireDefault(require("prop-types"));
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
    placeholder: fieldPlaceholder,
    instructions: fieldInstructions,
    label: fieldLabel,
    required: isRequired,
    restrictions: fieldRestrictions,
    errorMessages,
    formEditMode,
    activeFieldName,
    setFormMode,
    handleFormSubmit,
    saveState,
    options: fieldOptions,
    renderEditingField,
    renderEditableField,
    renderEmptyField,
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
      SwitchContent,
      EmptyContent,
      EditableItemHeader
    }
  } = (0, _react.useContext)(_ExtendedProfileContext.default);
  const handleStartEditing = () => {
    setFormMode(_constants.FORM_MODE.EDITING, fieldName);
  };
  const handleCancelEditing = () => {
    setFormMode(_constants.FORM_MODE.EDITABLE);
    setDraftValue(fieldValue);
  };
  const onSubmit = async event => {
    event.preventDefault();
    handleFormSubmit(fieldName, draftValue);
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
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Form.Group, {
            controlId: fieldName,
            isInvalid: fieldError,
            children: renderEditingField({
              fieldName,
              fieldLabel,
              fieldError,
              draftValue,
              setDraftValue,
              fieldRestrictions,
              isRequired,
              fieldOptions
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            className: "form-group flex-shrink-0 flex-grow-1",
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.StatefulButton, {
              type: "submit",
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
              variant: "link",
              onClick: handleCancelEditing,
              children: formatMessage(_messages.default['profile.formcontrols.button.cancel'])
            })]
          })]
        })
      }),
      editable: renderEditableField({
        fieldLabel,
        fieldName,
        draftValue,
        handleStartEditing
      }),
      empty: renderEmptyField?.({
        fieldName,
        fieldLabel,
        draftValue,
        fieldInstructions,
        fieldPlaceholder,
        handleStartEditing
      }) || /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(EditableItemHeader, {
          content: fieldLabel
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(EmptyContent, {
          onClick: handleStartEditing,
          children: fieldInstructions
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("small", {
          className: "form-text text-muted",
          children: fieldPlaceholder
        })]
      }),
      static: draftValue && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(EditableItemHeader, {
          content: fieldLabel
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          "data-hj-suppress": true,
          className: "h5",
          children: draftValue
        })]
      })
    }
  });
};
BaseField.propTypes = {
  name: _propTypes.default.string.isRequired,
  value: _propTypes.default.string,
  placeholder: _propTypes.default.string,
  instructions: _propTypes.default.string,
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
  formEditMode: _propTypes.default.string,
  activeFieldName: _propTypes.default.string,
  setFormMode: _propTypes.default.func,
  handleFormSubmit: _propTypes.default.func,
  saveState: _propTypes.default.oneOf(['default', 'error', 'pending', 'complete']),
  renderEditingField: _propTypes.default.func.isRequired,
  renderEditableField: _propTypes.default.func.isRequired,
  renderEmptyField: _propTypes.default.func,
  options: _propTypes.default.arrayOf(_propTypes.default.shape({
    value: _propTypes.default.string.isRequired,
    label: _propTypes.default.string.isRequired
  }))
};
BaseField.defaultProps = {
  value: '',
  placeholder: '',
  instructions: '',
  label: '',
  restrictions: {},
  errorMessages: {},
  formEditMode: _constants.FORM_MODE.STATIC,
  activeFieldName: '',
  setFormMode: () => {},
  handleFormSubmit: () => {},
  saveState: 'default',
  renderEmptyField: null
};
var _default = exports.default = BaseField;
//# sourceMappingURL=BaseField.js.map