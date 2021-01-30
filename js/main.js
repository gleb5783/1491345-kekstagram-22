const randomNum = function (min, max) {
  if (min >= max) {
    return alert('Error');
  }

  return Math.ceil(Math.random() * (max - min + 1) + min);
};

alert (randomNum(0, 100));

const maxLenght = function (randomString, maxSimbols) {
  if (randomString.length > maxSimbols) {
    return alert('Error');
  }

  return randomString.length + ' - такая длинна'
};

alert (maxLenght('Привет', 140)); //Пришлось поставить алерт, потому что линтер ругался на console.log и на то, что переменная не используется.
