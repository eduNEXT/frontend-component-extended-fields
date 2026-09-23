// The LMS profile completion panel links to the account page as
// `?missing=year_of_birth,nuts` (nau-openedx-extensions,
// filters/pipeline.py: profile_completion_context).
export const MISSING_FIELDS_PARAM = 'missing';

export const HIGHLIGHT_CLASSES = ['border', 'border-warning', 'rounded', 'p-3', 'mb-3'];

// Set on a highlighted field's container; the scroll targets the first one in the page.
export const MISSING_FIELD_ATTRIBUTE = 'data-missing-field';

export const parseMissingFields = (search) => {
  const value = new URLSearchParams(search).get(MISSING_FIELDS_PARAM);
  if (!value) { return []; }
  return value.split(',').map((name) => name.trim()).filter(Boolean);
};

export const isEmptyValue = (value) => (
  value === null || value === undefined || value === '' || (Array.isArray(value) && value.length === 0)
);

/** A field is highlighted while the LMS asked for it and it is still empty. */
export const isFieldMissing = (fieldName, value, search = window.location.search) => (
  parseMissingFields(search).includes(fieldName) && isEmptyValue(value)
);

let hasScrolled = false;

/**
 * Scrolls to the first highlighted field once per page load. Fields mount at
 * different times (native fields with the account settings, extended fields
 * after their own request), so every highlighted field asks, and the check
 * waits a frame for the page to settle and picks the first one in page order.
 */
export const scrollToFirstMissingField = () => {
  if (hasScrolled) { return; }
  window.requestAnimationFrame(() => {
    if (hasScrolled) { return; }
    const element = document.querySelector(`[${MISSING_FIELD_ATTRIBUTE}]`);
    if (!element) { return; }
    hasScrolled = true;
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    element.focus({ preventScroll: true });
  });
};

// Only for tests.
export const resetScroll = () => { hasScrolled = false; };
