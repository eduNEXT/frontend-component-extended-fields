"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _auth = require("@edx/frontend-platform/auth");
var _ExtendedProfileContext = _interopRequireDefault(require("./ExtendedProfileContext"));
var _service = require("./data/service");
var _utils = require("./utils");
var _constants = require("./constants");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const ExtendedProfileFieldsProvider = _ref => {
  let {
    patchProfile,
    profileFieldErrors,
    components,
    children
  } = _ref;
  const editingInputRef = _react.default.useRef(null);
  const [extendedProfileFields, setExtendedProfileFields] = _react.default.useState();
  const [editMode, setEditMode] = _react.default.useState(_constants.FORM_MODE.EDITABLE);
  const [editingInput, setEditingInput] = _react.default.useState(null);
  const [saveState, setSaveState] = _react.default.useState('default');
  const [localErrors, setLocalErrors] = _react.default.useState({});
  _react.default.useEffect(() => {
    (async () => {
      const resv2 = await (0, _service.getExtendedProfileFieldsV2)();
      setExtendedProfileFields(resv2.fields.sort(_utils.moveCheckboxFieldsToEnd));
    })();
  }, []);
  (0, _react.useEffect)(() => {
    const filteredKeys = Object.keys(profileFieldErrors).filter(key => key !== 'extended_profile');
    if (filteredKeys.length > 0 || Object.keys(localErrors).length) {
      setSaveState('error');
      setEditMode(_constants.FORM_MODE.EDITING);
      setEditingInput(filteredKeys?.[0] ?? localErrors ? editingInputRef.current : null);
    } else {
      setSaveState('default');
      setEditMode(_constants.FORM_MODE.EDITABLE);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Object.keys(profileFieldErrors).length, Object.keys(localErrors).length]);
  const handleChangeFormMode = function (mode) {
    let fieldName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    setEditMode(mode);
    setEditingInput(fieldName);
    setSaveState('default');
    editingInputRef.current = fieldName;
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
  (0, _react.useEffect)(() => {
    const httpClient = (0, _auth.getAuthenticatedHttpClient)?.();
    const interceptor = httpClient.interceptors.response.use(res => {
      if (res.config.url.includes('user/v1/accounts/')) {
        setLocalErrors(prevState => {
          const fieldName = editingInputRef.current;
          if (!fieldName) {
            return prevState;
          }
          const {
              [fieldName]: _
            } = prevState,
            rest = _objectWithoutProperties(prevState, [fieldName].map(_toPropertyKey));
          return rest;
        });
        editingInputRef.current = null;
        handleResetFormEdition();
      }
      return res;
    }, error => {
      if (error.response?.status === 400 && error.response.config.url.includes('user/v1/accounts/')) {
        const fieldErrors = error.response.data?.field_errors;
        if (fieldErrors) {
          setLocalErrors({
            [editingInputRef.current]: fieldErrors.extended_profile.user_message
          });
        }
      }
      return Promise.reject(error);
    });
    return () => {
      httpClient.interceptors.response.eject(interceptor);
    };
  }, []);
  const mergedErrors = _objectSpread(_objectSpread({}, profileFieldErrors), localErrors);
  const value = _react.default.useMemo(() => ({
    editMode,
    extendedProfileFields,
    editingInput,
    saveState,
    profileFieldErrors: mergedErrors,
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