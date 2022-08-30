function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export { getKeyByValue, getRandomInt, delay };
