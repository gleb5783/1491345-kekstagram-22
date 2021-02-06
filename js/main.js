const checkMaxLength = (randomString, maxSimbols) => randomString.length <= maxSimbols;

checkMaxLength('zxc', 13);

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
]

const NUMBER_REQUIRED_OBJECTS = 25;

const getRandomArrayElement = (element) => {
  return element [window._.random(0, element.length - 1)];
};

const COMMENTS = () => {

  return {
    id: window._.random(0, 300),
    avatar: 'img/avatar-' + window._.random(1, 6) + '.svg',
    message: getRandomArrayElement(MESSAGE),
    name: getRandomArrayElement(NAMES),
  };
};

const getDescriptionUsers = () => {
  return {
    id: window._.random(1, 25),
    url: 'photos/' + window._.random(1, 25) + '.jpg',
    description: getRandomArrayElement(DESCRIPTION),
    likes: window._.random(15, 200),
    comments: COMMENTS(),
  };
};

const createUsersCard = new Array(NUMBER_REQUIRED_OBJECTS).fill().map(() => getDescriptionUsers());

createUsersCard;
