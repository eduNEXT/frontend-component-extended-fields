"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _auth = require("@edx/frontend-platform/auth");
var _ExtendedProfileContext = _interopRequireDefault(require("../ExtendedProfileContext"));
var _TextField = _interopRequireDefault(require("./elements/TextField"));
var _CheckboxField = _interopRequireDefault(require("./elements/CheckboxField"));
var _SelectField = _interopRequireDefault(require("./elements/SelectField"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const ProfileFields = _ref => {
  let {
    fetchProfile,
    extendedProfileValues
  } = _ref;
  const {
    extendedProfileFields,
    editMode: formEditMode,
    editingInput: activeFieldName,
    handleChangeFormMode: setFormMode,
    handleSaveExtendedProfile: saveProfile,
    handleResetFormEdition,
    handleChangeSaveState,
    saveState,
    components: {
      SwitchContent
    }
  } = (0, _react.useContext)(_ExtendedProfileContext.default);
  const [savingErrors, setSavingErrors] = _react.default.useState({});
  const handleFormSubmit = async (fieldName, fieldValue) => {
    handleChangeSaveState('pending');
    const user = (0, _auth.getAuthenticatedUser)();
    const newFields = extendedProfileValues.map(field => {
      if (field.fieldName === fieldName) {
        return _objectSpread(_objectSpread({}, field), {}, {
          fieldValue
        });
      }
      return field;
    });
    try {
      await saveProfile({
        username: user.username,
        params: {
          extendedProfile: newFields
        }
      });
      fetchProfile(user.username);
      handleResetFormEdition();
    } catch (error) {
      setSavingErrors(Object.fromEntries(Object.entries(error.processedData.fieldErrors).map(_ref2 => {
        let [key, value] = _ref2;
        return [key, value.userMessage];
      })));
      handleChangeSaveState('error');
    }
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    children: extendedProfileFields?.map(field => {
      // extendedProfileValues comes from the user profile values
      // here we are looking for the field value of each extended profile field
      const value = extendedProfileValues?.find(el => el.fieldName === field.name)?.fieldValue;
      const commonProps = _objectSpread(_objectSpread({}, field), {}, {
        value,
        formEditMode,
        activeFieldName,
        setFormMode,
        handleFormSubmit,
        saveState,
        savingErrors
      });
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(SwitchContent, {
        className: "mb-5",
        expression: field.type,
        cases: {
          checkbox: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CheckboxField.default, _objectSpread({}, commonProps)),
          text: /*#__PURE__*/(0, _jsxRuntime.jsx)(_TextField.default, _objectSpread({}, commonProps)),
          select: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SelectField.default, _objectSpread({}, commonProps))
        }
      });
    })
  });
};
var _default = exports.default = ProfileFields;
//# sourceMappingURL=index.js.map