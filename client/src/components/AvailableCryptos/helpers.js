export const tryRequire = name => {
  try {
    return require(`../../../node_modules/cryptocurrency-icons/svg/color/${name
      .toString()
      .toLowerCase()}.svg`);
  } catch (err) {
    return require(`../../../node_modules/cryptocurrency-icons/svg/color/generic.svg`);
  }
};

export const userOwnsCoin = (coinName, userCryptos) => {
  let coin = userCryptos.filter(c => c.name === coinName);
  if (coin.length === 0) {
    return false;
  }
  return true;
};

export const sortByName = (arr = []) => {
  arr.sort((a, b) => {
    return a.name > b.name ? 1 : -1;
  });
};
export const sortByPrice = arr => {
  arr.sort((a, b) => {
    return b.close - a.close;
  });
};
export const sortByChange = arr => {
  arr.sort((a, b) => {
    return b.close / b.open - a.close / a.open;
  });
};

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

export const isInArray = (array, name) => {
  let isTrue;
  array.forEach(i => {
    if (i.name === name) {
      isTrue = true;
    }
  });
  return isTrue;
};

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
