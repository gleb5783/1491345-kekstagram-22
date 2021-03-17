import {anyUsersCard, addDefaultUsersCard, addRandomUsersCard, addFilterComments} from './popup.js';
import {closeForm} from './download-new-picture.js';
import {isEscEvent} from './utils.js';

const imgForm = document.querySelector('#upload-select-image');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const errorTemplateButton = document.querySelector('#error').content.querySelector('.error__button');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const main = document.querySelector('main');
const closeSuccessButton = successTemplate.querySelector('.success__button');

const onEscClose = (evt) => {
  if(isEscEvent(evt)) {
    successTemplate.remove();
  }
}

const onEscErrorClose = (evt) => {
  if(isEscEvent(evt)) {
    errorTemplate.remove();
  }
}

const onClickRemove = () => {
  successTemplate.remove();
}

const onClickErrorRemove = () => {
  errorTemplate.remove();
}

const onSuccessTemplate = () => {
  successTemplate.remove();
  document.removeEventListener('keydown', onEscClose);
  document.removeEventListener('click', onClickRemove);
  closeSuccessButton.removeEventListener('click', onSuccessTemplate);
}

const onTemplateErrorClose = () => {
  errorTemplate.remove();
  document.removeEventListener('click', onClickErrorRemove);
  document.removeEventListener('keydown', onEscErrorClose);
  errorTemplateButton.removeEventListener('click', onTemplateErrorClose);
}

const showSuccessModal = () => {
  closeForm();
  document.addEventListener('keydown', onEscClose);
  document.addEventListener('click', onClickRemove);
  closeSuccessButton.addEventListener('click', onSuccessTemplate);
  main.appendChild(successTemplate);
}

const showErrorModal = () => {
  closeForm();
  document.addEventListener('click', onClickErrorRemove);
  document.addEventListener('keydown', onEscErrorClose);
  errorTemplateButton.addEventListener('click', onTemplateErrorClose);
  main.appendChild(errorTemplate);
}

fetch('https://22.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((imgArray) => {
    anyUsersCard(imgArray);
    addDefaultUsersCard(imgArray);
    addRandomUsersCard(imgArray);
    addFilterComments(imgArray);
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
    .then((response) => {
      if(response.ok){
        showSuccessModal();
        return;
      }
      showErrorModal();
    })
    .catch(showErrorModal);
});

