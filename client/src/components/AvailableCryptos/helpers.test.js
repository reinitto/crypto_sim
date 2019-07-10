import {
  tryRequire,
  userOwnsCoin,
  sortByName,
  sortByPrice,
  sortByChange,
  colorPicker
} from './helpers';

describe('tryRequire', () => {
  test('returns icon', () => {
    const name = 'party';
    const icon = tryRequire(name);
    expect(icon.default).toBe('generic.svg');
  });
  test('returns generic icon if icon name is not found', () => {
    const name = 'btc';
    const icon = tryRequire(name);
    expect(icon.default).toBe(`${name}.svg`);
  });
});

describe('userOwnsCoin', () => {
  //props:name, userCryptos
  test('returns false if user doesnt own the coin', () => {
    const name = 'fakeCoin';
    const userCryptos = [{ name: 'btc' }, { name: 'etc' }, { name: 'gold' }];
    let result = userOwnsCoin(name, userCryptos);
    expect(result).toBe(false);
  });
  test('returns true if user own the coin', () => {
    const name = 'btc';
    const userCryptos = [{ name: 'btc' }, { name: 'etc' }, { name: 'gold' }];
    let result = userOwnsCoin(name, userCryptos);
    expect(result).toBe(true);
  });
});
describe('sortByName', () => {
  //props:name, userCryptos
  test('sorts array in place by item.name', () => {
    const array = [{ name: 'btc' }, { name: 'gold' }, { name: 'etc' }];
    sortByName(array);
    expect(array[0].name).toBe('btc');
    expect(array[2].name).toBe('gold');
  });
});
describe('sortByPrice', () => {
  //props:name, userCryptos
  test('sorts array by item.close in place cheapest first', () => {
    const array = [
      { name: 'gold', close: 111 },
      { name: 'btc', close: 11 },
      { name: 'etc', close: 1111 }
    ];
    sortByPrice(array);
    expect(array[0]).toStrictEqual({ name: 'btc', close: 11 });
    expect(array[2]).toStrictEqual({ name: 'etc', close: 1111 });
  });
});
describe('sortByChange', () => {
  //props:name, userCryptos
  test('sorts array by change in price base on close/open', () => {
    const array = [
      { name: 'btc', open: 10, close: 20 },
      { name: 'gold', open: 10, close: 50 },
      { name: 'etc', open: 10, close: 5 }
    ];
    sortByChange(array);
    expect(array[0]).toStrictEqual({ name: 'gold', open: 10, close: 50 });
    expect(array[1]).toStrictEqual({ name: 'btc', open: 10, close: 20 });
  });
});
describe('colorPicker', () => {
  //props:name, userCryptos
  test('given integer, returns hex color code', () => {
    const percent = 40;
    const color = colorPicker(percent);
    expect(color.length).toBe(7);
    expect(color[0]).toBe('#');
  });
});
