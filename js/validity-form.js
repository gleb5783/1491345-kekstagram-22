const inputHashTags = document.querySelector('.text__hashtags');
const MAX_LENGHT_ALL_HASH_TAGS = 5;
const MAX_LENGHT_HASH_TAGS = 20;
const MIN_LENGHT_HASH_TAGS = 1;
const regExp = /^#[a-z0-9]+$/i;

function findDuplicates(arr) {
  return arr.filter((item, index) => arr.indexOf(item) !== index);
}

function hasDuplicates(arr) {
  return arr.length > 1 && findDuplicates(arr).length > 0;
}

inputHashTags.addEventListener('input', () => {
  const hashTagsValue = inputHashTags.value.split(' ');

  for (let item of hashTagsValue) {
    if (item[0] !== '#') {
      inputHashTags.setCustomValidity('Начни с #');
    }

    else if (item.length > MAX_LENGHT_HASH_TAGS) {
      inputHashTags.setCustomValidity('Максимальная длинна 20 символов');
    }

    else if (hashTagsValue.length > MAX_LENGHT_ALL_HASH_TAGS) {
      inputHashTags.setCustomValidity('Максимум 5 ХешТегов');
    }

    else if (item.length <= MIN_LENGHT_HASH_TAGS) {
      inputHashTags.setCustomValidity('ХешТег не может состоять из одной #');
    }

    else if (hasDuplicates(hashTagsValue)) {
      inputHashTags.setCustomValidity('Нельзя использовать одинаковые ХешТеги');
    }

    else if (!regExp.test(item)) {
      inputHashTags.setCustomValidity('Нельзя использовать специальные символы');
    }

    else {
      inputHashTags.setCustomValidity('');
    }
    inputHashTags.reportValidity();
  }
});
