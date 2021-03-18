import {isEscEvent} from './utils.js';

const MIN_COMENT_COUNT = 0;
const MAX_COMENT_COUNT = 5;
const MAX_RANDOM_USERS_CARD = 10;
const loadMoreButtton = document.querySelector('.social__comments-loader');
const filterDiscuse = document.querySelector('#filter-discussed');
const filterRandom = document.querySelector('#filter-random');
const filterDefault = document.querySelector('#filter-default');
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

const anyUsersCard = (images) => {
  images.forEach((picture) => {
    const newPicture = pictureTemplate.cloneNode(true);
    newPicture.querySelector('.picture__img').src = picture.url;
    newPicture.querySelector('.picture__comments').textContent = picture.comments.length;
    newPicture.querySelector('.picture__likes').textContent = picture.likes;

    newPicture.addEventListener('click', () => {
      let i = 5;
      const showMoreComments = () => {
        bigPictureComments.innerHTML = '';
        i = i + 5;
        bigPictureComments.appendChild(createCommentsFragment(picture.comments.slice(MIN_COMENT_COUNT, i)));

        return i
      }

      const onNewPictureClose = (evt) => {
        if (isEscEvent(evt)) {
          bigPicture.classList.add('hidden');
          documentBody.classList.remove('modal-open');
          loadMoreButtton.removeEventListener('click', showMoreComments);
        }
      }
      bigPictureCancel.addEventListener('click', () => {
        bigPicture.classList.add('hidden');
        documentBody.classList.remove('modal-open');
        loadMoreButtton.removeEventListener('click', showMoreComments);
        document.removeEventListener('keydown', onNewPictureClose);
      });
      loadMoreButtton.addEventListener('click', showMoreComments);
      document.addEventListener('keydown', onNewPictureClose);
      bigPicture.classList.remove('hidden');
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



const onFilterFunction = (evt, images) => {
  if(evt.target === filterRandom) {
    removeUsersCard(evt);
    const sortingRandomImages = images.slice().sort(sortRandomImgs).slice(MIN_COMENT_COUNT, MAX_RANDOM_USERS_CARD);
    anyUsersCard(sortingRandomImages);
  }
  if(evt.target === filterDefault) {
    removeUsersCard(evt);
    anyUsersCard(images);
  }
  if(evt.target === filterDiscuse) {
    removeUsersCard(evt);
    const sortingImagesComment = images.slice().sort(sortCommentsImgs);
    anyUsersCard(sortingImagesComment);
  }
}

const debounceFilter = window._.debounce(onFilterFunction, 500);

const addRandomUsersCard = (images) => {
  filterRandom.addEventListener('click', (evt) => {
    debounceFilter(evt, images);
  });
}

const addDefaultUsersCard = (images) => {
  filterDefault.addEventListener('click', (evt) => {
    debounceFilter(evt, images);
  });
}

const addFilterComments = (images) => {
  filterDiscuse.addEventListener('click', (evt) => {
    debounceFilter(evt, images);
  });
}

export {anyUsersCard, addFilterComments, addRandomUsersCard, addDefaultUsersCard};


