import {renderUsersCard, addDefaultUsersCard, addRandomUsersCard, addFilterComments} from './users-card-filter.js';
import {closeForm} from './download-new-picture.js';
import {isEscEvent} from './utils.js';

const imgForm = document.querySelector('#upload-select-image');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const errorTemplateButton = document.querySelector('#error').content.querySelector('.error__button');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const mainBlock = document.querySelector('main');
const closeSuccessButton = successTemplate.querySelector('.success__button');
const filter = document.querySelector('.img-filters');

const onEscClose = (evt) => {
  if(isEscEvent(evt)) {
    successTemplate.remove();
    imgForm.removeEventListener('submit', submitImageForm);
  }
}

const onEscErrorClose = (evt) => {
  if(isEscEvent(evt)) {
    errorTemplate.remove();
    imgForm.removeEventListener('submit', submitImageForm);
  }
}

const submitImageForm = (evt) => {
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
}

const onClickRemove = () => {
  successTemplate.remove();
  imgForm.removeEventListener('submit', submitImageForm);
}

const onClickErrorRemove = () => {
  errorTemplate.remove();
  imgForm.removeEventListener('submit', submitImageForm);
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
  mainBlock.appendChild(successTemplate);
}

const showErrorModal = () => {
  closeForm();
  document.addEventListener('click', onClickErrorRemove);
  document.addEventListener('keydown', onEscErrorClose);
  errorTemplateButton.addEventListener('click', onTemplateErrorClose);
  mainBlock.appendChild(errorTemplate);
}

fetch('https://22.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((images) => {
    renderUsersCard(images);
    addDefaultUsersCard(images);
    addRandomUsersCard(images);
    addFilterComments(images);
  })
  .then(() => {
    filter.classList.remove('img-filters--inactive');
  })
  .catch(() => {
    document.body.innerHTML = '<div class=`error`><h1>Error</h1><span>Пожалуйста перезагрузите страницу</span></div>';
  });

export {submitImageForm};



