import {isEscEvent} from './utils.js';

const MIN_COMENT_COUNT = 0;
const MAX_COMENT_COUNT = 5;
const pictures = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const documentBody = document.querySelector('body');
const bigPictureComments = document.querySelector('.social__comments');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureLikesCount = bigPicture.querySelector('.likes-count');
const bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
const bigPictureCancel = bigPicture.querySelector('#picture-cancel');

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const picturesFragment = document.createDocumentFragment();

const onNewPictureClose = (evt) => {
  if (isEscEvent(evt)) {
    bigPicture.classList.add('hidden');
  }
}

const createCommentsFragment = (comments) => {
  const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
  const commentFragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    const newComment = commentTemplate.cloneNode(true);

    newComment.querySelector('img').src = comment.avatar;
    newComment.querySelector('img').alt = comment.name;
    newComment.querySelector('.social__text').textContent = comment.message;

    commentFragment.appendChild(newComment);
  });

  return commentFragment;
}

const anyUsersCard = (imgArray) => {
  imgArray.forEach((picture) => {
    const newPicture = pictureTemplate.cloneNode(true);

    newPicture.querySelector('.picture__img').src = picture.url;
    newPicture.querySelector('.picture__comments').textContent = picture.comments.length;
    newPicture.querySelector('.picture__likes').textContent = picture.likes;

    newPicture.addEventListener('click', () => {
      bigPicture.classList.remove('hidden');
      document.addEventListener('keydown', onNewPictureClose);
      documentBody.classList.add('modal-open');
      bigPictureImg.src = picture.url;
      bigPictureLikesCount.textContent = picture.likes;
      bigPictureCommentsCount.textContent = picture.comments.length;
      bigPictureComments.innerHTML = '';

      bigPictureComments.appendChild(createCommentsFragment(picture.comments.slice(MIN_COMENT_COUNT, MAX_COMENT_COUNT)));
    });

    picturesFragment.appendChild(newPicture);
  });
  pictures.appendChild(picturesFragment);
}
export {anyUsersCard};

bigPictureCancel.addEventListener('click', () => {
  bigPicture.classList.add('hidden');
  documentBody.classList.remove('modal-open');

  document.removeEventListener('keydown', onNewPictureClose);
});
