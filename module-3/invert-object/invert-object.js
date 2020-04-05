/**
 * invertObj - should swap object keys and values
 * @param {object} obj
 * @returns {object | undefined}
 */
export function invertObj(obj) {
  if (obj) {
    return Object.entries(obj).reduce((accum, [key, value]) => {
      accum[value] = key;
      return accum;
    }, {});
  }
}

// Alternative solution
function invertObj1(obj) {
  return obj && Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [value, key])
  );
}
