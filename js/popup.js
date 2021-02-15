import {simularOtherUsersPictures} from './data.js';

const pictures = document.querySelector('.pictures');
const picture = document.querySelector('#picture').content.querySelector('.picture');


const simularListPicture = document.createDocumentFragment();

simularOtherUsersPictures.forEach((simularOtherUsersPictures) => {
  const otherPicture = picture.cloneNode(true);

  otherPicture.querySelector('.picture__img').src = simularOtherUsersPictures.url;
  otherPicture.querySelector('.picture__comments').textContent = simularOtherUsersPictures.comments.length;
  otherPicture.querySelector('.picture__likes').textContent = simularOtherUsersPictures.likes;

  simularListPicture.appendChild(otherPicture);
});

pictures.appendChild(simularListPicture);
