/**
 * Sum - returns sum of arguments if they can be converted to a number
 * @param {number | string} n value
 * @returns {number | function}
 */
export function sum (n) {
  function innerSum (value) {
    if (isFinite(value)) {
      innerSum.accum += value;
    }

    return innerSum;
  }

  innerSum.accum = 0;

  innerSum[Symbol.toPrimitive] = () => {
    return innerSum.accum;
  };

  return innerSum(n);
}

export function sumRecursively(...args) {
  function recSum(num) {
    return sumRecursively(...args, num);
  }

  recSum.toString = () => {
    return args.reduce((acc, n) => {
      if (isFinite(n)) {
        acc += parseInt(n, 10)
      }
      return acc;
    }, 0);
  };

  return recSum;
}




