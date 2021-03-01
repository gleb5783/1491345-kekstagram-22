import {simularOtherUsersPictures, getComment} from './data.js';

const pictures = document.querySelector('.pictures');
const picture = document.querySelector('#picture').content.querySelector('.picture');
const showBigPicture = document.querySelector('.big-picture');
const socialComments = document.querySelector('.social__comments');
const simularListPicture = document.createDocumentFragment();

simularOtherUsersPictures.forEach((simularOtherUsersPictures) => {
  const otherPicture = picture.cloneNode(true);

  otherPicture.querySelector('.picture__img').src = simularOtherUsersPictures.url;
  otherPicture.querySelector('.picture__comments').textContent = simularOtherUsersPictures.comments.length;
  otherPicture.querySelector('.picture__likes').textContent = simularOtherUsersPictures.likes;
  showBigPicture.querySelector('.social__caption').textContent = simularOtherUsersPictures.description;
  otherPicture.addEventListener('click', () => {
    document.querySelector('body').classList.add('modal-open');
    showBigPicture.classList.remove('hidden');
    const closeBigPic = showBigPicture.querySelector('#picture-cancel');
    const hiddenComments = showBigPicture.querySelector('.social__comment-count');
    const hiddenUsersComments = showBigPicture.querySelector('.social__comments');
    const hiddenBtnComments = showBigPicture.querySelector('.comments-loader');
    hiddenBtnComments.classList.add('hidden');
    hiddenUsersComments.classList.add('hidden');
    hiddenComments.classList.add('hidden');
    closeBigPic.addEventListener('click', () => {
      showBigPicture.classList.add('hidden');
      hiddenComments.classList.remove('hidden');
      hiddenUsersComments.classList.remove('hidden');
      hiddenBtnComments.classList.remove('hidden');
      document.querySelector('body').classList.remove('modal-open');
    });
    const showBigPicImg = showBigPicture.querySelector('.big-picture__img img');
    showBigPicImg.src = simularOtherUsersPictures.url;
    const showLike = showBigPicture.querySelector('.likes-count');
    showLike.textContent = simularOtherUsersPictures.likes;
    const showCommentNumber = showBigPicture.querySelector('.comments-count');
    showCommentNumber.textContent = simularOtherUsersPictures.comments.length;
    const commentsPic = showBigPicture.querySelector('.social__comment .social__picture');
    const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
    const commentFragment = document.createDocumentFragment();
    simularOtherUsersPictures.comments.forEach(comment => {
      const newComment = commentTemplate.cloneNode(true);
      newComment.querySelector('img').src = comment.avatar;
      newComment.querySelector('img').alt = comment.name;
      newComment.querySelector('.social__text').textContent = comment.message;
      commentFragment.appendChild(newComment);
    });
    socialComments.innerHTML = '';
    socialComments.appendChild(commentFragment);
  });

  simularListPicture.appendChild(otherPicture);
});


pictures.appendChild(simularListPicture);

