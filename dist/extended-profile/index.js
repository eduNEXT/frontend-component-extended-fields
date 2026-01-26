"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _ExtendedProfileProvider = _interopRequireDefault(require("./ExtendedProfileProvider"));
var _profileFields = _interopRequireDefault(require("./profile-fields"));
var _accountFields = _interopRequireDefault(require("./account-fields"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const ExtendedProfileFields = props => {
  const {
    id,
    refreshUserProfile,
    updateUserProfile,
    profileFieldValues,
    formComponents,
    profileFieldErrors
  } = props;
  const isFromAccountMFE = id.includes('account');
  console.log("EXTENDED FIELDS PROPS", props);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ExtendedProfileProvider.default, {
    patchProfile: updateUserProfile,
    profileFieldErrors: profileFieldErrors ?? {},
    components: formComponents,
    children: isFromAccountMFE ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_accountFields.default, {
      extendedProfileValues: profileFieldValues
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_profileFields.default, {
      fetchProfile: refreshUserProfile,
      extendedProfileValues: profileFieldValues
    })
  });
};
ExtendedProfileFields.propTypes = {
  id: _propTypes.default.string,
  refreshUserProfile: _propTypes.default.func,
  updateUserProfile: _propTypes.default.func,
  profileFieldValues: _propTypes.default.arrayOf(_propTypes.default.shape({
    fieldLabel: _propTypes.default.string,
    fieldValue: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.bool])
  })),
  formComponents: _propTypes.default.shape({
    SwitchContent: _propTypes.default.node,
    EmptyContent: _propTypes.default.node,
    EditableItemHeader: _propTypes.default.node
  }),
  profileFieldErrors: _propTypes.default.arrayOf(_propTypes.default.objectOf(_propTypes.default.string))
};
var _default = exports.default = ExtendedProfileFields;
//# sourceMappingURL=index.js.map