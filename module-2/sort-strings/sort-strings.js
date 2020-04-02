/**
 * sortStrings
 * @param {array} arr
 * @param {string} param
 * @returns {array}
 */
export function sortStrings(arr, param = 'lowerAsc') {
  switch (param) {
  case 'asc':
    return makeSorting(arr, 1);
  case 'desc':
    return makeSorting(arr, -1);
  default:
    return makeSorting(arr, 1);
  }

  function makeSorting(array, direction) {
    return array.sort((a, b) =>
      direction * a.localeCompare(b, 'default', {caseFirst: 'upper'}));
  }
}

