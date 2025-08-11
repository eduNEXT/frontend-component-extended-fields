import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { adaptFields } from '../utils';

export async function getExtendedProfileFields() {
  const url = `${getConfig().LMS_BASE_URL}/user_api/v1/account/registration/`;

  const { data } = await getAuthenticatedHttpClient()
    .get(url)
    .catch((e) => {
      throw e;
    });

  return { fields: data.fields };
}

export async function getExtendedProfileFieldsV2() {
  const url = `${getConfig().LMS_BASE_URL}/api/mfe_context?is_register_page=true`;

  const { data } = await getAuthenticatedHttpClient()
    .get(url)
    .catch((e) => {
      throw e;
    });

  const optionalFields = Object.entries(data.optionalFields.fields)
    .filter(([key]) => data.optionalFields.extended_profile.includes(key));

  const adapted = adaptFields({
    registrationFields: data.registrationFields,
    optionalFields: { fields: Object.fromEntries(optionalFields) },
  });

  return { fields: adapted };
}
