/**
 * Sort fields so that checkbox fields are at the end of the list.
 * @param {object} a the first field to compare
 * @param {object} b the second field to compare
 * @returns a negative integer if a should come before b, a positive integer
 * if a should come after b, or 0 if a and b have the same order
 */
export const moveCheckboxFieldsToEnd = (a, b) => {
  if (a?.type === 'checkbox' && b?.type !== 'checkbox') {
    return 1;
  }
  if (a?.type !== 'checkbox' && b?.type === 'checkbox') {
    return -1;
  }
  return 0;
};

function adaptField(field, { exposed = true, required = true } = {}) {
  return {
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
    loginIssueSupportLink: '',
    ...(field.options && {
      options: Array.isArray(field.options)
        ? field.options.map(([value, name]) => ({
          value,
          name,
          default: false,
        }))
        : undefined,
    }),
  };
}

export function adaptFields({ registrationFields, optionalFields }) {
  // Merge all field keys from both sources
  const allFieldNames = [...Object.keys(registrationFields.fields), ...Object.keys(optionalFields.fields)];
  // Deduplicate
  const uniqueFieldNames = [...new Set(allFieldNames)];

  return uniqueFieldNames.map((fieldName) => {
    // Prefer registrationFields, fallback to optionalFields
    const field = registrationFields.fields[fieldName] || optionalFields.fields[fieldName];

    // Determine if field is exposed (in optionalFields.extended_profile)
    const exposed = optionalFields.extended_profile && optionalFields.extended_profile.includes(fieldName);

    // Required: if error_message.required exists and is non-empty
    const required = !!(
      field.error_message
   && (typeof field.error_message === 'string' ? field.error_message : field.error_message.required)
    );

    return adaptField(field, { exposed, required });
  });
}
