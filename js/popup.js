import {createUsersCard} from './data.js';

const pictures = document.querySelector('.pictures');
const picture = document.querySelector('#picture').content.querySelector('.picture');

const simularOtherUsersPictures = createUsersCard;
const simularListPicture = document.createDocumentFragment();

simularOtherUsersPictures.forEach((createUsersCard) => {
  const createPicture = picture.cloneNode(true);

  createPicture.querySelector('.picture__img').setAttribute('src', createUsersCard.url);
  createPicture.querySelector('.picture__comments').textContent = createUsersCard.comments;
  createPicture.querySelector('.picture__likes').textContent = createUsersCard.likes;

  simularListPicture.appendChild(createPicture);
});

pictures.appendChild(simularListPicture);
