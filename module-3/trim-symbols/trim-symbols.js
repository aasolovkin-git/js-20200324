/**
 * trimSymbols
 * @param {string} string
 * @param {number} size
 * @returns {string}
 */
export function trimSymbols (string, size) {
  const firstSlice = string.slice(0, size);
  const rest = [...string.slice(size)];

  return rest.reduce((accum, item) => {
    if (!accum.endsWith(item.repeat(size))) {
      accum += item;
    }

    return accum;
  }, firstSlice);
}
