'use strict';

// 2.4. Комментарии

(function () {
  var utils = window.utils;

  var HASHTAG_LENGTH = 20;
  var COMMENT_LENGTH = 140;
  var MAX_HASHTAGS = 5;
  var HASHTAG_THRESHOLD = 2;
  var ERROR_STYLE = 'border: 3px solid red;';

  var textDescription = document.querySelector('.text__description');
  var textHashtags = document.querySelector('.text__hashtags');

  var validateHashtag = function () {
    var hashtags = textHashtags.value.split(' ');
    var validationMessage = '';
    if (textHashtags.value) {
      for (var i = 0; i < hashtags.length; i++) {
        if (!hashtags[i].startsWith('#')) {
          validationMessage = 'Хэш-тег должен начинаться с символа #';
          // если после первого сплита хештег можно разделить по знаку #
          // значит кто-то пропустил пробел
        } else if (hashtags[i].split('#').length > HASHTAG_THRESHOLD) {
          validationMessage = 'Хэш-теги должны быть разделены пробелами';
        } else if (hashtags[i] === '#') {
          validationMessage = 'Хеш-тег не может состоять только из одной решётки';
        } else if (hashtags[i].length > HASHTAG_LENGTH) {
          validationMessage = 'Длина хэш-тега не должна превышать 20 символов, включая решётку';
        } else {
          for (var j = i + 1; j < hashtags.length; j++) {
            if (hashtags[i].toLowerCase() === hashtags[j].toLowerCase()) {
              validationMessage = 'Два одинаковых хэш-тега не допустимо';
            }
          }
        }
      }
    }
    if (hashtags.length > MAX_HASHTAGS) {
      validationMessage = 'Количество хэш-тегов не должно превышать 5 единиц';
    }
    textHashtags.setCustomValidity(validationMessage);
  };

  var clearInputHashtagsHandler = function () {
    textHashtags.setCustomValidity('');
    textHashtags.style = '';
  };

  var clearInputDescriptionHandler = function () {
    textDescription.setCustomValidity('');
    textDescription.style = '';
  };

  var openComments = function () {
    textHashtags.addEventListener('input', clearInputHashtagsHandler);
    textDescription.addEventListener('input', clearInputDescriptionHandler);
  };

  var closeComments = function () {
    textHashtags.removeEventListener('input', clearInputHashtagsHandler);
    textDescription.removeEventListener('input', clearInputDescriptionHandler);
  };


  var validateComment = function () {
    textDescription.setCustomValidity(textDescription.value.length > COMMENT_LENGTH ? 'Длина комментария не должна превышать 140 символов' : '');
  };

  var uploadTextEscPressHandler = function (evt) {
    if (utils.isEscEvent(evt)) {
      evt.stopPropagation();
    }
  };

  var clearFields = function () {
    textHashtags.value = '';
    textDescription.value = '';
    textHashtags.style.border = '';
    textDescription.style.border = '';
  };

  var preventPressingEsc = function () {
    textDescription.addEventListener('keydown', uploadTextEscPressHandler);
    textHashtags.addEventListener('keydown', uploadTextEscPressHandler);
  };

  var listenPressingEsc = function () {
    textDescription.removeEventListener('keydown', uploadTextEscPressHandler);
    textHashtags.removeEventListener('keydown', uploadTextEscPressHandler);
  };


  var renderErrorBorder = function (field) {
    if (field === 'comments') {
      textDescription.setAttribute('style', ERROR_STYLE);
      //      textDescription.style.borderStyle = ERROR_STYLE;
      return;
    }
    if (field === 'hashtags') {
      textHashtags.setAttribute('style', ERROR_STYLE);
    }
  };

  window.commentsHashtags = {
    openComments: openComments,
    closeComments: closeComments,
    preventPressingEsc: preventPressingEsc,
    listenPressingEsc: listenPressingEsc,
    renderErrorBorder: renderErrorBorder,
    validateHashtag: validateHashtag,
    validateComment: validateComment,
    clearFields: clearFields
  };

})();
