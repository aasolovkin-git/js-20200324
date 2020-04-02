import { sortStrings } from './sort-strings';

describe('sort-strings', () => {
  it('should return sorted by "asc" array of strings', () => {
    expect(sortStrings(['b', 'c', 'a'])).toEqual(['a', 'b', 'c']);
  });

  it('should return sorted by "desc" array of strings', () => {
    expect(sortStrings(['b', 'c', 'a'], 'desc')).toEqual(['c', 'b', 'a']);
  });

  it('should correct sort specific to a language chars', () => {
    expect(sortStrings(['абрикос', 'яблоко', 'ёжик'])).toEqual(['абрикос', 'ёжик', 'яблоко']);
  });

  it('should correct sort strings started from uppercase', () => {
    expect(sortStrings(['абрикос', 'Абрикос', 'яблоко', 'Яблоко', 'ёжик', 'Ёжик'])).toEqual(['Абрикос', 'абрикос', 'Ёжик', 'ёжик', 'Яблоко', 'яблоко']);
  });
});
