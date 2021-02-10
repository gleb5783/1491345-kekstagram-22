import {getRandomArrayElement, idsInspect} from './utils.js';

const NAMES = ['Антон', 'Глеб', 'Дарья', 'Артем', 'Маша', 'Саша', 'Алефтина', 'Игорь', 'Марк'];

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTION = [
  'Лучшее мое фото',
  'Милые собачки',
  'Как вам такое?',
  'Дальше больше',
  'Котики - такие котики',
  'Черный квадрат, но не Малевича',
  'Это не те дройды',
  'Подписывайтесь, ставьте лайки',
  'Доброе утро',
];

const NUMBER_REQUIRED_OBJECTS = 25;
const MIN_NUMBER_FOR_AVATAR = 1;
const MAX_NUMBER_FOR_AVATAR = 6;
const MIN_NUMBER_FOR_ID = 1;
const MAX_NUMBER_FOR_ID = 25;
const COUNT = 25;
const MIN_COMENT_COUNT = 1;
const MAX_COMENT_COUNT = 25;
const MIN_LIKE = 1;
const MAX_LIKE = 200;
const ids = idsInspect(MIN_NUMBER_FOR_ID, MAX_NUMBER_FOR_ID, COUNT);

const getComment = (id) => {
  return {
    id: id,
    avatar: 'img/avatar-' + window._.random(MIN_NUMBER_FOR_AVATAR, MAX_NUMBER_FOR_AVATAR) + '.svg',
    message: getRandomArrayElement(MESSAGE),
    name: getRandomArrayElement(NAMES),
  };
};

const getDescriptionUsers = (id) => {
  const comentCount = window._.random(MIN_COMENT_COUNT, MAX_COMENT_COUNT);
  const comentIds = idsInspect(MIN_COMENT_COUNT, MAX_COMENT_COUNT, comentCount);
  return {
    id: id,
    url: 'photos/' + id + '.jpg',
    description: getRandomArrayElement(DESCRIPTION),
    likes: window._.random(MIN_LIKE, MAX_LIKE),
    comments: new Array(comentCount).fill().map((item, index) => getComment(comentIds[index])),
  };
};

const createUsersCard = new Array(NUMBER_REQUIRED_OBJECTS).fill().map((item, index) => getDescriptionUsers(ids[index]));

createUsersCard;

console.log(createUsersCard);
