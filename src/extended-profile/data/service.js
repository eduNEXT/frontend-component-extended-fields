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

export async function getExtendedProfileFields_V2() {
	const url = `${getConfig().LMS_BASE_URL}/api/mfe_context?is_register_page=true`;

	const { data } = await getAuthenticatedHttpClient()
		.get(url)
		.catch((e) => {
			throw e;
		});

	const adapted = adaptFields({
		registrationFields: data.registrationFields,
		optionalFields: data.optionalFields,
	});

	return { fields: adapted };
}
