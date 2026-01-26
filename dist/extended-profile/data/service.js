"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getExtendedProfileFields = getExtendedProfileFields;
exports.getExtendedProfileFieldsV2 = getExtendedProfileFieldsV2;
var _frontendPlatform = require("@edx/frontend-platform");
var _auth = require("@edx/frontend-platform/auth");
var _utils = require("../utils");
async function getExtendedProfileFields() {
  const url = `${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/user_api/v1/account/registration/`;
  const {
    data
  } = await (0, _auth.getAuthenticatedHttpClient)().get(url).catch(e => {
    throw e;
  });
  return {
    fields: data.fields
  };
}
async function getExtendedProfileFieldsV2() {
  const url = `${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/api/mfe_context?is_register_page=true`;
  const {
    data
  } = await (0, _auth.getAuthenticatedHttpClient)().get(url).catch(e => {
    throw e;
  });
  const optionalFields = Object.entries(data.optionalFields.fields).filter(_ref => {
    let [key] = _ref;
    return data.optionalFields.extended_profile.includes(key);
  });
  const adapted = (0, _utils.adaptFields)({
    registrationFields: data.registrationFields,
    optionalFields: {
      fields: Object.fromEntries(optionalFields)
    }
  });
  return {
    fields: adapted
  };
}
//# sourceMappingURL=service.js.map