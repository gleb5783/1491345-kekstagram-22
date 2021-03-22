const ESC_BUTTON = 'Esc';
const ESCAPE_BUTTON = 'Escape';

const isEscEvent = (evt) => {
  return evt.key === ESCAPE_BUTTON || evt.key === ESC_BUTTON;
};

function findDuplicates(array) {
  return array.filter((item, index) => array.indexOf(item) !== index);
}

function hasDuplicates(array) {
  return array.length > 1 && findDuplicates(array).length > 0;
}

export {isEscEvent, hasDuplicates};
