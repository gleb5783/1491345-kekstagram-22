import {isEscEvent} from './utils.js';

const MIN_COMMENT_COUNT = 0;
const MAX_FIRST_COMMENTS = 5;
const MAX_RANDOM_USERS_CARD = 10;
const DEBOUNCE_DELAY = 500;
const loadMoreButton = document.querySelector('.social__comments-loader');
const filterDiscussed = document.querySelector('#filter-discussed');
const filterRandom = document.querySelector('#filter-random');
const filterDefault = document.querySelector('#filter-default');
const pictures = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const documentBody = document.querySelector('body');
const bigPictureComments = document.querySelector('.social__comments');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureLikesCount = bigPicture.querySelector('.likes-count');
const bigPictureStartCommentsCount = bigPicture.querySelector('.comment-start');
const bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
const bigPictureCancel = bigPicture.querySelector('#picture-cancel');

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const picturesFragment = document.createDocumentFragment();

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

const sortCommentsImgs = (img1, img2) => {
  return img1.comments.length > img2.comments.length ? -1 : 1;
}

const sortRandomImgs = () => {
  return 0.5 - Math.random();
}

const removeUsersCard = (evt) => {
  document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  evt.target.classList.toggle('img-filters__button--active');
  const allUsersPictures = document.querySelectorAll('.picture');

  for (let i = 1; i <= allUsersPictures.length; i++) {
    pictures.lastChild.remove();
  }
}

const closeCommentLoadButton = (picture, i) => {
  if(i >= picture.comments.length) {
    loadMoreButton.classList.add('hidden');
  }
  else {
    loadMoreButton.classList.remove('hidden');
  }
}

const renderUsersCard = (images) => {
  images.forEach((picture) => {
    const newPicture = pictureTemplate.cloneNode(true);
    newPicture.querySelector('.picture__img').src = picture.url;
    newPicture.querySelector('.picture__comments').textContent = picture.comments.length;
    newPicture.querySelector('.picture__likes').textContent = picture.likes;

    newPicture.addEventListener('click', () => {
      let i = 5;

      const onBigPictureClose = () => {
        bigPicture.classList.add('hidden');
        documentBody.classList.remove('modal-open');
        loadMoreButton.removeEventListener('click', onShowMoreComments);
        document.removeEventListener('keydown', onNewPictureClose);
        bigPictureCancel.removeEventListener('click', onBigPictureClose);
      }

      const onShowMoreComments = () => {
        bigPictureComments.innerHTML = '';
        i = i + MAX_FIRST_COMMENTS;
        bigPictureComments.appendChild(createCommentsFragment(picture.comments.slice(MIN_COMMENT_COUNT, i)));

        if (i > picture.comments.length) {
          bigPictureStartCommentsCount.textContent = picture.comments.length;
        }
        else {
          bigPictureStartCommentsCount.textContent = i;
        }
        closeCommentLoadButton(picture, i);
        return i
      }

      const onNewPictureClose = (evt) => {
        if (isEscEvent(evt)) {
          bigPicture.classList.add('hidden');
          documentBody.classList.remove('modal-open');
          loadMoreButton.removeEventListener('click', onShowMoreComments);
          bigPictureCancel.removeEventListener('click', onBigPictureClose);
        }
      }

      bigPictureCancel.addEventListener('click', onBigPictureClose);

      loadMoreButton.addEventListener('click', onShowMoreComments);
      document.addEventListener('keydown', onNewPictureClose);
      bigPicture.classList.remove('hidden');
      documentBody.classList.add('modal-open');
      bigPictureImg.src = picture.url;
      bigPictureStartCommentsCount.textContent = MAX_FIRST_COMMENTS;
      if(i >= picture.comments.length) {
        bigPictureStartCommentsCount.textContent = picture.comments.length;
      }
      bigPictureLikesCount.textContent = picture.likes;
      bigPictureCommentsCount.textContent = picture.comments.length;
      bigPictureComments.innerHTML = '';
      closeCommentLoadButton(picture, i);
      bigPictureComments.appendChild(createCommentsFragment(picture.comments.slice(MIN_COMMENT_COUNT, i)));
    });

    picturesFragment.appendChild(newPicture);
  });
  pictures.appendChild(picturesFragment);
}



const onFilterFunction = (evt, images) => {
  if(evt.target === filterRandom) {
    removeUsersCard(evt);
    const sortingRandomImages = images.slice().sort(sortRandomImgs).slice(MIN_COMMENT_COUNT, MAX_RANDOM_USERS_CARD);
    renderUsersCard(sortingRandomImages);
  }
  if(evt.target === filterDefault) {
    removeUsersCard(evt);
    renderUsersCard(images);
  }
  if(evt.target === filterDiscussed) {
    removeUsersCard(evt);
    const sortingImagesComment = images.slice().sort(sortCommentsImgs);
    renderUsersCard(sortingImagesComment);
  }
}
const onDebounceFilterImages = (evt, images) => {
  debounceFilter(evt, images);
}
const debounceFilter = window._.debounce(onFilterFunction, DEBOUNCE_DELAY);

const addRandomUsersCard = (images) => {
  filterRandom.addEventListener('click', (evt) => {
    onDebounceFilterImages(evt, images);
  });
}

const addDefaultUsersCard = (images) => {
  filterDefault.addEventListener('click', (evt) => {
    onDebounceFilterImages(evt, images);
  });
}

const addFilterComments = (images) => {
  filterDiscussed.addEventListener('click', (evt) => {
    onDebounceFilterImages(evt, images);
  });
}


export {renderUsersCard, addFilterComments, addRandomUsersCard, addDefaultUsersCard};


