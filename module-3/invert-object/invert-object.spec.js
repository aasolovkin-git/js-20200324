import { invertObj } from "./invert-object";

describe('invertObj', () => {
  it('should swap keys and values and return new object', () => {
    const obj = {
      key1: 'value1',
      key2: 'value2'
    };

    const expected = {
      value1: 'key1',
      value2: 'key2',
    };

    expect(invertObj(obj)).toEqual(expected);
  });

  it('should return empty object if was passed object without values', () => {
    expect(invertObj({})).toEqual({});
  });

  it('should return "undefined" if object wasn\'t passed', () => {
    expect(invertObj()).toBeUndefined();
  });
});
