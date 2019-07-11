/**
 * Function that returns matching letters
 * @function tryRequire
 * @param {string} name cryptocurrency name
 * @returns {svg}  - cryptocurrency svg
 */
export const tryRequire = name => {
  try {
    return require(`../../../node_modules/cryptocurrency-icons/svg/color/${name
      .toString()
      .toLowerCase()}.svg`);
  } catch (err) {
    return require(`../../../node_modules/cryptocurrency-icons/svg/color/generic.svg`);
  }
};
/**
 * Function that checks if user owns certain coin
 * @function userOwnsCoin
 * @param {string} coinName
 * @param {array} userCryptos
 * @returns {boolean}
 */
export const userOwnsCoin = (coinName, userCryptos) => {
  let coin = userCryptos.filter(c => c.name === coinName);
  if (coin.length === 0) {
    return false;
  }
  return true;
};
/**
 * Function that returns sorted array based on its items name property
 * @function sortByName
 * @param {array} arr array to sort
 * @returns {Array} alphabeticly sorted array
 */
export const sortByName = (arr = []) => {
  arr.sort((a, b) => {
    return a.name > b.name ? 1 : -1;
  });
};
/**
 * Function that returns sorted array based on its items close property
 * @function sortByPrice
 * @param {array} arr array to sort
 * @returns {Array}  sorted array by close
 */
export const sortByPrice = arr => {
  arr.sort((a, b) => {
    return b.close - a.close;
  });
};
/**
 * Function that returns sorted array based on its items change in value from open to close
 * @function sortByChange
 * @param {array} arr array to sort
 * @returns {Array} Sorted array by rate of change
 */
export const sortByChange = arr => {
  arr.sort((a, b) => {
    return b.close / b.open - a.close / a.open;
  });
};
/**
 * Function that returns a hex color code based on percentage input
 * @function colorPicker
 * @param {*} perc % change in price
 * @param {*} min default
 * @param {*} max default
 * @returns {string} hex color code
 */
export function colorPicker(perc, min = -150, max = 150) {
  let base = max - min;

  if (base === 0) {
    perc = 100;
  } else {
    perc = ((perc - min) / base) * 100;
  }
  let r,
    g,
    b = 100;
  if (perc < 50) {
    //rgb(243,224,224)
    r = 243;
    g = Math.round(5.1 * perc);
  } else {
    //rgb(231,239,228)
    g = 239;
    r = Math.round(510 - 5.1 * perc);
  }
  let h = r * 0x10000 + g * 0x100 + b * 0x1;
  return '#' + ('000000' + h.toString(16)).slice(-6);
}
/**
 * Function that checks if an item with given name property is present in the array
 * @function isInArray
 * @param {array} array
 * @param {string} name
 * @returns {bool} true if item with that name is in array, false if not
 */
export const isInArray = (array, name) => {
  let isTrue;
  array.forEach(i => {
    if (i.name === name) {
      isTrue = true;
    }
  });
  return isTrue;
};
/**
 * Funtion that returns sorted array based on params provided
 * @function sortCryptos
 * @param {string} sortBy - what to sort by (name,price, change), name by default
 * @param {array} cryptoArray array to sort
 * @param {bool} reverse - reverse order or not, false by default
 * @returns {array} sorted array
 */
export function sortCryptos(
  sortBy = 'name',
  cryptoArray = [],
  reverse = false
) {
  if (cryptoArray.length === 0) {
    return [];
  }
  let sortedCryptos = [];
  cryptoArray.forEach(c => {
    if (!isInArray(sortedCryptos, c.name)) {
      sortedCryptos.push(c);
    } else {
      console.log(`${c.name} is already in array`);
    }
  });

  if (sortBy === 'name') {
    sortByName(sortedCryptos);
  } else if (sortBy === 'change') {
    sortByChange(sortedCryptos);
  } else if (sortBy === 'price') {
    sortByPrice(sortedCryptos);
  }
  if (reverse) {
    return sortedCryptos.reverse();
  } else {
    return sortedCryptos;
  }
}
