"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adaptFields = adaptFields;
exports.moveCheckboxFieldsToEnd = void 0;
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Sort fields so that checkbox fields are at the end of the list.
 * @param {object} a the first field to compare
 * @param {object} b the second field to compare
 * @returns a negative integer if a should come before b, a positive integer
 * if a should come after b, or 0 if a and b have the same order
 */
const moveCheckboxFieldsToEnd = (a, b) => {
  if (a?.type === 'checkbox' && b?.type !== 'checkbox') {
    return 1;
  }
  if (a?.type !== 'checkbox' && b?.type === 'checkbox') {
    return -1;
  }
  return 0;
};
exports.moveCheckboxFieldsToEnd = moveCheckboxFieldsToEnd;
function adaptField(field) {
  let {
    exposed = true,
    required = true
  } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _objectSpread({
    name: field.name,
    label: field.label,
    type: field.type,
    defaultValue: field.default ?? null,
    placeholder: field.placeholder ?? null,
    instructions: field.instructions ?? '',
    exposed,
    required,
    restrictions: field.restrictions ?? {},
    errorMessages: field.error_message ?? {},
    supplementalLink: '',
    supplementalText: '',
    loginIssueSupportLink: ''
  }, field.options && {
    options: Array.isArray(field.options) ? field.options.map(_ref => {
      let [value, name] = _ref;
      return {
        value,
        name,
        default: false
      };
    }) : undefined
  });
}
function adaptFields(_ref2) {
  let {
    registrationFields,
    optionalFields
  } = _ref2;
  // Merge all field keys from both sources
  const allFieldNames = [...Object.keys(registrationFields.fields), ...Object.keys(optionalFields.fields)];
  // Deduplicate
  const uniqueFieldNames = [...new Set(allFieldNames)];
  return uniqueFieldNames.map(fieldName => {
    // Prefer registrationFields, fallback to optionalFields
    const field = registrationFields.fields[fieldName] || optionalFields.fields[fieldName];

    // Determine if field is exposed (in optionalFields.extended_profile)
    const exposed = optionalFields.extended_profile && optionalFields.extended_profile.includes(fieldName);

    // Required: if error_message.required exists and is non-empty
    const required = !!(field.error_message && (typeof field.error_message === 'string' ? field.error_message : field.error_message.required));
    return adaptField(field, {
      exposed,
      required
    });
  });
}
//# sourceMappingURL=utils.js.map