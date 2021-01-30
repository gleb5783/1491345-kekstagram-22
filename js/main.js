const checkRandomNum = function (min, max) {
  if (min >= max || min < 0 || max < 0) {
    return false
  }

  return Math.ceil(Math.random() * (max - min + 1) + min);
};

checkRandomNum();

const checkMaxLenght = function (randomString, maxSimbols) {
  if (randomString.length > maxSimbols) {
    return false
  }

  return true
};

checkMaxLenght();

