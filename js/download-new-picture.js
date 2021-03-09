const imgOverlay = document.querySelector('.img-upload__overlay');
const imgOverlayClose = document.querySelector('#upload-cancel');
const imgUpload = document.querySelector('#upload-file');
const scaleValue = document.querySelector('.scale__control--value');
const previewImage = document.querySelector('.img-upload__preview img');
const smallerScale = document.querySelector('.scale__control--smaller');
const inputHashTags = document.querySelector('.text__hashtags');
const inputComment = document.querySelector('.text__description');
const biggerScale = document.querySelector('.scale__control--bigger');
const closeForm = () => {
  imgOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  imgUpload.value = '';
  previewImage.style.filter = 'none';
}

biggerScale.disabled = true;

imgUpload.addEventListener('change', () => {
  imgOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  imgOverlayClose.addEventListener('click', () => {
    closeForm();
  });
  document.addEventListener('keydown', (evt) => {
    if (inputHashTags === document.activeElement) {
      evt.preventDefault();
      evt.stopPropagation();
    }
    else if (inputComment === document.activeElement) {
      evt.preventDefault();
      evt.stopPropagation();
    }
    else {
      evt.preventDefault();
      closeForm();
    }
  });
});

smallerScale.addEventListener('click', () => {
  scaleValue.value = parseInt(scaleValue.value) - 25 + '%';
  previewImage.style.transform = `scale(${parseInt(scaleValue.value) / 100})`;
  smallerScale.disabled = scaleValue.value === '25%';
  biggerScale.disabled = false;
});

biggerScale.addEventListener('click', () => {
  scaleValue.value = parseInt(scaleValue.value) + 25 +'%';
  previewImage.style.transform = `scale(${parseInt(scaleValue.value) / 100})`;
  biggerScale.disabled = scaleValue.value === '100%';
  smallerScale.disabled = false;
});
