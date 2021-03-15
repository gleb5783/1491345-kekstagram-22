const ESC_BUTTON = 'Esc';
const ESCAPE_BUTTON = 'Escape';

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

const isEscEvent = (evt) => {
  return evt.key === ESCAPE_BUTTON || evt.key === ESC_BUTTON;
};


export {getRandomArrayElement, idsInspect, isEscEvent};
