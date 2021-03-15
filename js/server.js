import {anyUsersCard} from './popup.js';
import {closeForm} from './download-new-picture.js';
import {isEscEvent} from './utils.js';

const imgForm = document.querySelector('#upload-select-image');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const main = document.querySelector('main');
const closeSuccessButton = successTemplate.querySelector('.success__button');

const onEscClose = (evt) => {
  if(isEscEvent(evt)) {
    successTemplate.remove();
  }
}

const onClickRemove = () => {
  successTemplate.remove();
}

const onSuccessTemplate = () => {
  successTemplate.remove();
  document.removeEventListener('keydown', onEscClose);
  document.removeEventListener('click', onClickRemove);
}



fetch('https://22.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((imgArray) => {
    anyUsersCard(imgArray);
  })
  .catch(() => {
    document.body.innerHTML = '<div class=`error`><h1>Error</h1><span>Пожалуйста перезагрузите страницу</span></div>';
  });


imgForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);

  fetch(
    'https://22.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body: formData,
    },
  )
    .then(() => {
      closeForm();
      document.addEventListener('keydown', onEscClose);
      document.addEventListener('click', onClickRemove);
    })
    .then(() => {
      closeSuccessButton.addEventListener('click', onSuccessTemplate);
      main.appendChild(successTemplate);
    })
    .then(() => {
      closeSuccessButton.removeEventListener('click', onSuccessTemplate);
    })
    .catch(() => {
      main.appendChild(errorTemplate);
    });
});
