const imgOverlay = document.querySelector('.img-upload__overlay');
const imgOverlayClose = document.querySelector('#upload-cancel');
const imgUpload = document.querySelector('#upload-file');
const scaleValue = document.querySelector('.scale__control--value');
const previeImage = document.querySelector('.img-upload__preview img');
const smallerScale = document.querySelector('.scale__control--smaller');
const biggerScale = document.querySelector('.scale__control--bigger');
biggerScale.disabled = true;

imgUpload.addEventListener('change', () => {
  imgOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  imgOverlayClose.addEventListener('click', () => {
    imgOverlay.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    imgUpload.value = '';
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === ('Escape' || 'Esc')) {
      evt.preventDefault();
      imgOverlay.classList.add('hidden');
      document.querySelector('body').classList.remove('modal-open');
      imgUpload.value = '';
    }
  });
});

smallerScale.addEventListener('click', () => {
  scaleValue.value = parseInt(scaleValue.value) - 25 + '%';
  smallerScale.disabled = scaleValue.value === '25%';
  biggerScale.disabled = false;
  if (scaleValue.value === '100%') {
    previeImage.style.transform = 'scale(1)';
  }
  if (scaleValue.value === '75%') {
    previeImage.style.transform = 'scale(0.75)';
  }
  if (scaleValue.value === '50%') {
    previeImage.style.transform = 'scale(0.5)';
  }
  if (scaleValue.value === '25%') {
    previeImage.style.transform = 'scale(0.25)';
  }
});

biggerScale.addEventListener('click', () => {
  scaleValue.value = parseInt(scaleValue.value) + 25 +'%';
  biggerScale.disabled = scaleValue.value === '100%';
  smallerScale.disabled = false;
  if (scaleValue.value === '100%') {
    previeImage.style.transform = 'scale(1)';
  }
  if (scaleValue.value === '75%') {
    previeImage.style.transform = 'scale(0.75)';
  }
  if (scaleValue.value === '50%') {
    previeImage.style.transform = 'scale(0.5)';
  }
  if (scaleValue.value === '25%') {
    previeImage.style.transform = 'scale(0.25)';
  }
});




