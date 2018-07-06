'use strict';

// 2.4. Комментарии

(function () {

  var textDescription = document.querySelector('.text__description');
  var hashtags = document.querySelector('.text__hashtags');

  var validateHashtag = function () {
    var hashtagsArr = hashtags.value.split(' ');

    for (var i = 0; i < hashtagsArr.length; i++) {
      if (!hashtagsArr[i].startsWith('#')) {
        return 'Хэш-тег должен начинаться с символа #';
      } else if (hashtagsArr[i].split('#').length > 2) {
        return 'Хэш-теги должны быть разделены пробелами';
      } else if (hashtagsArr[i] === '#') {
        return 'Хеш-тег не может состоять только из одной решётки';
      } else if (hashtagsArr[i].length > 20) {
        return 'Длина хэш-тега не должна превышать 20 символов, включая решётку';
      } else {
        for (var j = i + 1; j < hashtagsArr.length; j++) {
          if (hashtagsArr[i].toLowerCase() === hashtagsArr[j].toLowerCase()) {
            return 'Два одинаковых хэш-тега не допустимо';
          }
        }
      }
    }
    if (hashtagsArr.length > 5) {
      return 'Количество хэш-тегов не должно превышать 5 единиц';
    }
    return '';
  };

  hashtags.addEventListener('input', function () {
    hashtags.setCustomValidity(validateHashtag());
  });

  textDescription.addEventListener('input', function (evt) {
    var target = evt.target;
    target.setCustomValidity(target.value.length > 140 ? 'Длина комментария не должна превышать 140 символов' : '');
  });

  var uploadTextEscPressHandler = function (evt) {
    if (window.utils.isEscEvent) {
      evt.stopPropagation();
    }
  };

  textDescription.addEventListener('keydown', uploadTextEscPressHandler);
  hashtags.addEventListener('keydown', uploadTextEscPressHandler);

})();
