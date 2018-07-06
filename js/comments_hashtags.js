'use strict';

// 2.4. Комментарии

(function () {
  var utils = window.utils;

  var textDescription = document.querySelector('.text__description');
  var hashtags = document.querySelector('.text__hashtags');

  var validateHashtag = function () {
    var hashtagsArr = hashtags.value.split(' ');
    var validationMessage = '';
    if (hashtags.value) {
      for (var i = 0; i < hashtagsArr.length; i++) {
        if (!hashtagsArr[i].startsWith('#')) {
          validationMessage = 'Хэш-тег должен начинаться с символа #';
        } else if (hashtagsArr[i].split('#').length > 2) {
          validationMessage = 'Хэш-теги должны быть разделены пробелами';
        } else if (hashtagsArr[i] === '#') {
          validationMessage = 'Хеш-тег не может состоять только из одной решётки';
        } else if (hashtagsArr[i].length > 20) {
          validationMessage = 'Длина хэш-тега не должна превышать 20 символов, включая решётку';
        } else {
          for (var j = i + 1; j < hashtagsArr.length; j++) {
            if (hashtagsArr[i].toLowerCase() === hashtagsArr[j].toLowerCase()) {
              validationMessage = 'Два одинаковых хэш-тега не допустимо';
            }
          }
        }
      }
    }
    if (hashtagsArr.length > 5) {
      validationMessage = 'Количество хэш-тегов не должно превышать 5 единиц';
    }
    hashtags.setCustomValidity(validationMessage);
  };

  hashtags.addEventListener('input', function () {
    hashtags.setCustomValidity('');
    hashtags.removeAttribute('style');
  });

  textDescription.addEventListener('input', function () {
    textDescription.setCustomValidity('');
    textDescription.removeAttribute('style');
  });

  var validateComment = function () {
    textDescription.setCustomValidity(textDescription.value.length > 140 ? 'Длина комментария не должна превышать 140 символов' : '');
  };

  var uploadTextEscPressHandler = function (evt) {
    if (utils.isEscEvent(evt)) {
      evt.stopPropagation();
    }
  };

  var clearFields = function () {
    hashtags.value = '';
    textDescription.value = '';
  };

  textDescription.addEventListener('keydown', uploadTextEscPressHandler);
  hashtags.addEventListener('keydown', uploadTextEscPressHandler);

  window.commentsHashtags = {
    textDescription: textDescription,
    hashtags: hashtags,
    validateHashtag: validateHashtag,
    validateComment: validateComment,
    clearFields: clearFields
  };

})();
