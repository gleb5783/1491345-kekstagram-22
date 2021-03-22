import {isEscEvent} from './utils.js';
import {changeFilterSetings} from './effects.js';
import {onSubmitImageForm} from './server.js';
import {onHashTagsInput} from './validity-form.js';

const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const imgForm = document.querySelector('#upload-select-image');
const effectNone = document.querySelector('#effect-none');
const filterSlider = document.querySelector('.img-upload__effect-level');
const imgOverlay = document.querySelector('.img-upload__overlay');
const imgOverlayClose = document.querySelector('#upload-cancel');
const imgUpload = document.querySelector('#upload-file');
const scaleValue = document.querySelector('.scale__control--value');
const previewImage = document.querySelector('.img-upload__preview img');
const smallerScale = document.querySelector('.scale__control--smaller');
const inputHashTags = document.querySelector('.text__hashtags');
const inputComment = document.querySelector('.text__description');
const biggerScale = document.querySelector('.scale__control--bigger');


const onPopUpEscPress = (evt) => {
  if (isEscEvent(evt) && document.activeElement !== inputHashTags && document.activeElement !== inputComment) {
    closeForm();
  }
}

const onImgOverlayClose = () => {
  closeForm();
}

const addScaleValue = (value)  => {
  scaleValue.value = `${parseInt(scaleValue.value) + value}%`;
  previewImage.style.transform = `scale(${parseInt(scaleValue.value) / MAX_SCALE_VALUE})`;
}

const onBiggerScaleButton = () => {
  addScaleValue(MIN_SCALE_VALUE);
  smallerScale.disabled = false;
  if (scaleValue.value === '100%') {
    biggerScale.disabled = true;
  }
}

const onSmallerScaleButton = () => {
  addScaleValue(-MIN_SCALE_VALUE);
  biggerScale.disabled = false;
  if (scaleValue.value === '25%') {
    smallerScale.disabled = true;
  }
}

imgUpload.addEventListener('change', () => {
  smallerScale.disabled = false;
  biggerScale.disabled = true;
  imgForm.addEventListener('submit', onSubmitImageForm);
  inputHashTags.addEventListener('input', onHashTagsInput);
  changeFilterSetings();
  imgOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  smallerScale.addEventListener('click', onSmallerScaleButton);
  biggerScale.addEventListener('click', onBiggerScaleButton);
  imgOverlayClose.addEventListener('click', onImgOverlayClose);
  document.addEventListener('keydown', onPopUpEscPress);
});

const closeForm = () => {
  inputHashTags.removeEventListener('input', onHashTagsInput);
  imgForm.removeEventListener('submit', onSubmitImageForm);
  effectNone.checked = true;
  filterSlider.classList.add('hidden');
  imgOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  imgUpload.value = '';
  previewImage.style.filter = 'none';
  smallerScale.removeEventListener('click', onSmallerScaleButton);
  biggerScale.removeEventListener('click', onBiggerScaleButton);
  previewImage.style.transform = 'scale(1)';
  scaleValue.value = '100%';
  document.removeEventListener('keydown', onPopUpEscPress);
  imgOverlayClose.removeEventListener('click', onImgOverlayClose);
  inputHashTags.value = '';
  inputComment.value = '';
}

export {closeForm};
