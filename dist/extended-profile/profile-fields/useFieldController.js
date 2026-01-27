"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _i18n = require("@edx/frontend-platform/i18n");
var _constants = require("../constants");
var _messages = _interopRequireDefault(require("../messages"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const useFieldController = _ref => {
  let {
    name: fieldName,
    value: fieldValue,
    errorMessages,
    formEditMode,
    activeFieldName,
    fieldRestrictions,
    savingErrors
  } = _ref;
  const {
    formatMessage
  } = (0, _i18n.useIntl)();
  const [draftValue, setDraftValue] = (0, _react.useState)(fieldValue);
  const [fieldError, setFieldError] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    if (draftValue === '') {
      setFieldError(errorMessages.required);
    } else if (fieldRestrictions?.min_length && draftValue?.length < fieldRestrictions.min_length) {
      setFieldError(errorMessages?.min_length ?? formatMessage(_messages.default['profile.formcontrols.error.min_length'], {
        minLength: fieldRestrictions.min_length
      }));
    } else if (fieldRestrictions?.max_length && draftValue?.length > fieldRestrictions.max_length) {
      setFieldError(errorMessages?.max_length ?? formatMessage(_messages.default['profile.formcontrols.error.max_length'], {
        maxLength: fieldRestrictions.min_length
      }));
    } else {
      setFieldError(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draftValue?.length]);
  (0, _react.useEffect)(() => {
    setFieldError(savingErrors[fieldName]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Object.keys(savingErrors).length]);
  const isFieldBeingEdited = formEditMode === _constants.FORM_MODE.EDITING && activeFieldName === fieldName;
  const isFieldEmpty = draftValue === '' || !draftValue;
  const getFieldDisplayMode = () => {
    if (isFieldBeingEdited) {
      return _constants.FORM_MODE.EDITING;
    }
    if (isFieldEmpty) {
      return _constants.FORM_MODE.EMPTY;
    }
    return _constants.FORM_MODE.EDITABLE;
  };
  return {
    draftValue,
    setDraftValue,
    fieldError,
    getFieldDisplayMode
  };
};
var _default = exports.default = useFieldController;
//# sourceMappingURL=useFieldController.js.map