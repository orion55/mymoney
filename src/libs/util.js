const moneyFormat = (n) => parseFloat(n)
  .toFixed(2)
  .replace(/(\d)(?=(\d{3})+\.)/g, '$1 ')
  .replace('.', ',');

// eslint-disable-next-line import/prefer-default-export
export { moneyFormat };
