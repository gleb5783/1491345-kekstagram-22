import {hasDuplicates} from './utils.js';

const MAX_LENGTH_ALL_HASH_TAGS = 5;
const MAX_LENGTH_HASH_TAGS = 20;
const MIN_LENGTH_HASH_TAGS = 1;
const inputHashTags = document.querySelector('.text__hashtags');
const regExp = /^#[a-z0-9]+$/i;


const onHashTagsInput = () => {
  const hashTagsValue = inputHashTags.value.toLowerCase().split(' ');
  let isValid = true;

  for (let item of hashTagsValue) {
    if (item[0] !== '#') {
      inputHashTags.setCustomValidity('Начни с #');
      isValid = false;
    }

    else if (item.length > MAX_LENGTH_HASH_TAGS) {
      inputHashTags.setCustomValidity('Максимальная длинна 20 символов');
      isValid = false;
    }

    else if (item.length <= MIN_LENGTH_HASH_TAGS) {
      inputHashTags.setCustomValidity('ХешТег не может состоять из одной #');
      isValid = false;
    }

    else if (!regExp.test(item)) {
      inputHashTags.setCustomValidity('Нельзя использовать специальные символы');
      isValid = false;
    }
  }

  if (hashTagsValue.length > MAX_LENGTH_ALL_HASH_TAGS) {
    inputHashTags.setCustomValidity('Максимум 5 ХешТегов');
    isValid = false;
  }

  else if (hasDuplicates(hashTagsValue)) {
    inputHashTags.setCustomValidity('Нельзя использовать одинаковые ХешТеги');
    isValid = false;
  }

  if (isValid === true) {
    inputHashTags.setCustomValidity('');
  }

  inputHashTags.reportValidity();
}

export{onHashTagsInput};
