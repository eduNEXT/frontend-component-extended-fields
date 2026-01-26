"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _paragon = require("@openedx/paragon");
var _ExtendedProfileContext = _interopRequireDefault(require("../../ExtendedProfileContext"));
var _BaseField = _interopRequireDefault(require("./BaseField"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const TextField = props => {
  const {
    components: {
      EditableItemHeader
    }
  } = (0, _react.useContext)(_ExtendedProfileContext.default);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_BaseField.default, _objectSpread(_objectSpread({}, props), {}, {
    renderEditingField: _ref => {
      let {
        fieldName,
        fieldLabel,
        fieldError,
        draftValue,
        setDraftValue,
        fieldRestrictions
      } = _ref;
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
          className: "edit-section-header",
          htmlFor: fieldName,
          children: fieldLabel
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          className: "form-control",
          id: fieldName,
          name: fieldName,
          value: draftValue,
          onChange: e => setDraftValue(e.target.value),
          minLength: fieldRestrictions?.min_length,
          maxLength: fieldRestrictions?.max_length
        }), fieldError !== null && /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Form.Control.Feedback, {
          hasIcon: false,
          children: fieldError
        })]
      });
    },
    renderEditableField: _ref2 => {
      let {
        fieldLabel,
        handleStartEditing,
        draftValue
      } = _ref2;
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(EditableItemHeader, {
          content: fieldLabel,
          showEditButton: true,
          onClickEdit: handleStartEditing,
          showVisibility: false,
          visibility: "private"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          "data-hj-suppress": true,
          className: "h5",
          children: draftValue
        })]
      });
    }
  }));
};
TextField.propTypes = _objectSpread({}, _BaseField.default.propTypes);
var _default = exports.default = TextField;
//# sourceMappingURL=TextField.js.map