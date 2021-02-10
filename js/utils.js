const MIN_NUMBER_FOR_ID = 1;
const MAX_NUMBER_FOR_ID = 25;
const COUNT = 25;

const getRandomArrayElement = (element) => {
  return element [window._.random(0, element.length - 1)];
};

const idsInspect = (minNumber, maxNumber, count) => {
  const ids = [];
  while (ids.length < count) {
    const randNum = window._.random(minNumber, maxNumber);
    if (!ids.includes(randNum)) {
      ids.push(randNum);
    }
  }
  return ids;
}

const ids = idsInspect(MIN_NUMBER_FOR_ID, MAX_NUMBER_FOR_ID, COUNT);

export {getRandomArrayElement, idsInspect};
