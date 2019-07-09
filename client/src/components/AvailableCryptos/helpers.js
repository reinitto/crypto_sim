export const sortByName = (arr = []) => {
  arr.sort((a, b) => {
    return a.name > b.name ? 1 : -1;
  });
};
export const sortByPrice = arr => {
  arr.sort((a, b) => {
    return a.close - b.close;
  });
};
export const sortByChange = arr => {
  arr.sort((a, b) => {
    return b.close / b.open - a.close / a.open;
  });
};

export function colorPicker(perc, min = -150, max = 150) {
  let base = max - min;

  if (base == 0) {
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
