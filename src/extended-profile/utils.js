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
