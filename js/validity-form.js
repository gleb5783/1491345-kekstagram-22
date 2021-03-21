import{hasDuplicates} from './utils.js';

const MAX_LENGTH_ALL_HASH_TAGS = 5;
const MAX_LENGTH_HASH_TAGS = 20;
const MIN_LENGTH_HASH_TAGS = 1;
const inputHashTags = document.querySelector('.text__hashtags');
const regExp = /^#[a-z0-9]+$/i;


const onHashTagsInput = () => {
  const hashTagsValue = inputHashTags.value.toLowerCase().split(' ');
  let a = true;

  for (let item of hashTagsValue) {
    if (item[0] !== '#') {
      inputHashTags.setCustomValidity('Начни с #');
      a = false;
    }

    else if (item.length > MAX_LENGTH_HASH_TAGS) {
      inputHashTags.setCustomValidity('Максимальная длинна 20 символов');
      a = false;
    }

    else if (item.length <= MIN_LENGTH_HASH_TAGS) {
      inputHashTags.setCustomValidity('ХешТег не может состоять из одной #');
      a = false;
    }

    else if (!regExp.test(item)) {
      inputHashTags.setCustomValidity('Нельзя использовать специальные символы');
      a = false;
    }
  }

  if (hashTagsValue.length > MAX_LENGTH_ALL_HASH_TAGS) {
    inputHashTags.setCustomValidity('Максимум 5 ХешТегов');
    a = false;
  }

  else if (hasDuplicates(hashTagsValue)) {
    inputHashTags.setCustomValidity('Нельзя использовать одинаковые ХешТеги');
    a = false;
  }

  if (a === true) {
    inputHashTags.setCustomValidity('');
  }

  inputHashTags.reportValidity();
}

export{onHashTagsInput};
