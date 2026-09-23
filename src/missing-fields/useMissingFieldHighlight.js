import { useEffect } from 'react';

import {
  HIGHLIGHT_CLASSES, MISSING_FIELD_ATTRIBUTE, scrollToFirstMissingField,
} from './utils';

/**
 * Highlights the element `getContainer` returns while `isMissing` is true, and
 * takes part in the one-off scroll to the first missing field.
 */
const useMissingFieldHighlight = (getContainer, isMissing) => {
  useEffect(() => {
    const container = isMissing ? getContainer() : null;
    if (!container) { return undefined; }

    container.classList.add(...HIGHLIGHT_CLASSES);
    container.setAttribute(MISSING_FIELD_ATTRIBUTE, '');
    // Lets the scroll move focus here, so keyboard and screen reader users land on the field.
    container.setAttribute('tabindex', '-1');
    scrollToFirstMissingField();

    return () => {
      container.classList.remove(...HIGHLIGHT_CLASSES);
      container.removeAttribute(MISSING_FIELD_ATTRIBUTE);
      container.removeAttribute('tabindex');
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMissing]);
};

export default useMissingFieldHighlight;
