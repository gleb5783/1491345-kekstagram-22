import {simularOtherUsersPictures, getComment} from './data.js';

const pictures = document.querySelector('.pictures');
const picture = document.querySelector('#picture').content.querySelector('.picture');
const showBigPicture = document.querySelector('.big-picture');

const simularListPicture = document.createDocumentFragment();

simularOtherUsersPictures.forEach((simularOtherUsersPictures) => {
  const otherPicture = picture.cloneNode(true);

  otherPicture.querySelector('.picture__img').src = simularOtherUsersPictures.url;
  otherPicture.querySelector('.picture__comments').textContent = simularOtherUsersPictures.comments.length;
  otherPicture.querySelector('.picture__likes').textContent = simularOtherUsersPictures.likes;
  otherPicture.addEventListener('click', () => {
    showBigPicture.classList.remove('hidden');
    const closeBigPic = showBigPicture.querySelector('#picture-cancel');
    closeBigPic.addEventListener('click', () => {
      showBigPicture.classList.add('hidden');
    });
    const showBigPicImg = showBigPicture.querySelector('.big-picture__img img');
    showBigPicImg.src = simularOtherUsersPictures.url;
    const showLike = showBigPicture.querySelector('.likes-count');
    showLike.textContent = simularOtherUsersPictures.likes;
    const showCommentNumber = showBigPicture.querySelector('.comments-count');
    showCommentNumber.textContent = simularOtherUsersPictures.comments.length;
    const commentsPic = showBigPicture.querySelector('.social__comment .social__picture');
    commentsPic.src = simularOtherUsersPictures.avatar;
  });
  simularListPicture.appendChild(otherPicture);
});

pictures.appendChild(simularListPicture);
