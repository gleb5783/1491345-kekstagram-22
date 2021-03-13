import {anyUsersCard} from './popup.js';
import {closeForm} from './download-new-picture.js';

const ESC_BUTTON = 'Esc';
const ESCAPE_BUTTON = 'Escape';
const imgForm = document.querySelector('#upload-select-image');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const main = document.querySelector('main');
const closeSuccessButton = successTemplate.querySelector('.success__button');


fetch('https://22.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((imgArray) => {
    anyUsersCard(imgArray);
  })
  .catch(() => {
    document.body.innerHTML = "<div class='error'><h1>Error</h1><span>Пожалуйста перезагрузите страницу</span></div>";
  });


imgForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);

  fetch(
    'https://22.javascript.pages.academy/kkekstagram',
    {
      method: 'POST',
      body: formData,
    },
  )
  .then(() => {
    closeForm();
  })
  .then(() => {
    closeSuccessButton.addEventListener('click', () => {
      successTemplate.remove();
    });
    document.addEventListener('keydown', (evt) => {
      if(evt.key === ESCAPE_BUTTON || evt.key === ESC_BUTTON) {
        successTemplate.remove();
      }
    });
    document.addEventListener('click', () => {
      successTemplate.remove();
    });
    main.appendChild(successTemplate);
  })
  .then(() => {
    closeSuccessButton.removeEventListener('click', () => {
      successTemplate.remove();
    });
    document.removeEventListener('keydown', (evt) => {
      if(evt.key === ESCAPE_BUTTON || evt.key === ESC_BUTTON) {
        successTemplate.remove();
      }
    });
    document.removeEventListener('click', () => {
      successTemplate.remove();
    });
  })
  .catch(() => {
    main.appendChild(errorTemplate);
  });
});
