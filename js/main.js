const getRandomNum = (min, max) => {
  if (min >= max || min < 0 || max < 0) {
    return false
  }

  return Math.ceil(Math.random() * (max - min + 1) + min);
};

getRandomNum();

const checkMaxLength = (randomString, maxSimbols) => randomString.length <= maxSimbols;

checkMaxLength();
