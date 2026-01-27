"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _ExtendedProfileContext = _interopRequireDefault(require("./ExtendedProfileContext"));
var _service = require("./data/service");
var _utils = require("./utils");
var _constants = require("./constants");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const ExtendedProfileFieldsProvider = _ref => {
  let {
    patchProfile,
    profileFieldErrors,
    components,
    children
  } = _ref;
  const [extendedProfileFields, setExtendedProfileFields] = _react.default.useState();
  const [editMode, setEditMode] = _react.default.useState(_constants.FORM_MODE.EDITABLE);
  const [editingInput, setEditingInput] = _react.default.useState(null);
  const [saveState, setSaveState] = _react.default.useState('default');
  _react.default.useEffect(() => {
    (async () => {
      const resv2 = await (0, _service.getExtendedProfileFieldsV2)();
      setExtendedProfileFields(resv2.fields.sort(_utils.moveCheckboxFieldsToEnd));
    })();
  }, []);
  (0, _react.useEffect)(() => {
    if (Object.keys(profileFieldErrors).length) {
      setSaveState('error');
      setEditMode(_constants.FORM_MODE.EDITING);
      setEditingInput(Object.keys(profileFieldErrors)[0]);
    } else {
      setSaveState('default');
      setEditMode(_constants.FORM_MODE.EDITABLE);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Object.keys(profileFieldErrors).length]);
  const handleChangeFormMode = function (mode) {
    let fieldName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    setEditMode(mode);
    setEditingInput(fieldName);
  };
  const handleSaveExtendedProfile = async _ref2 => {
    let {
      username,
      params
    } = _ref2;
    if (username) {
      return patchProfile(username, params);
    }
    return patchProfile(params);
  };
  const handleResetFormEdition = () => {
    setEditMode(_constants.FORM_MODE.EDITABLE);
    setEditingInput(null);
    setSaveState('default');
  };
  const handleChangeSaveState = state => {
    setSaveState(state);
  };
  const value = _react.default.useMemo(() => ({
    editMode,
    extendedProfileFields,
    editingInput,
    saveState,
    profileFieldErrors,
    handleChangeFormMode,
    handleResetFormEdition,
    handleSaveExtendedProfile,
    handleChangeSaveState,
    components
  }),
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [editMode, editingInput, extendedProfileFields, saveState, Object.keys(profileFieldErrors)]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ExtendedProfileContext.default.Provider, {
    value: value,
    children: children
  });
};
ExtendedProfileFieldsProvider.propTypes = {
  children: _propTypes.default.node || _propTypes.default.arrayOf(_propTypes.default.node),
  patchProfile: _propTypes.default.func,
  profileFieldErrors: _propTypes.default.arrayOf(_propTypes.default.objectOf(_propTypes.default.string)),
  components: _propTypes.default.shape({
    SwitchContent: _propTypes.default.node,
    EmptyContent: _propTypes.default.node,
    EditableItemHeader: _propTypes.default.node
  })
};
var _default = exports.default = ExtendedProfileFieldsProvider;
//# sourceMappingURL=ExtendedProfileProvider.js.map