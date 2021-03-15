const ESC_BUTTON = 'Esc';
const ESCAPE_BUTTON = 'Escape';
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
biggerScale.disabled = true;

const onPopUpEscPress = (evt) => {
  if ([ESC_BUTTON, ESCAPE_BUTTON].includes(evt.key) && document.activeElement !== inputHashTags && document.activeElement !== inputComment) {
    closeForm();
  }
}

const onImgOverlayClose = () => {
  closeForm();
}

const onBiggerScaleButton = () => {
  scaleValue.value = parseInt(scaleValue.value) + 25 +'%';
  previewImage.style.transform = `scale(${parseInt(scaleValue.value) / 100})`;
  biggerScale.disabled = scaleValue.value === '100%';
  smallerScale.disabled = false;
}

const onSmallerScaleButton = () => {
  scaleValue.value = parseInt(scaleValue.value) - 25 + '%';
  previewImage.style.transform = `scale(${parseInt(scaleValue.value) / 100})`;
  smallerScale.disabled = scaleValue.value === '25%';
  biggerScale.disabled = false;
}
imgUpload.addEventListener('change', () => {
  imgOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  smallerScale.addEventListener('click', onSmallerScaleButton);
  biggerScale.addEventListener('click', onBiggerScaleButton);
  imgOverlayClose.addEventListener('click', onImgOverlayClose);
  document.addEventListener('keydown', onPopUpEscPress);
});

const closeForm = () => {
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




