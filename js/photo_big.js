'use strict';

// Создание больших фоток

(function () {
  var utils = window.utils;

  var MIN_AVATAR_NUMBER = 1;
  var MAX_AVATAR_NUMBER = 6;
  var MAX_COMMENTS = 5;

  var photoBig = document.querySelector('.big-picture');
  var bodyElement = document.body;

  window.renderPhotoBig = function (photo) {
    bodyElement.classList.add('modal-open');
    photoBig.querySelector('.big-picture__img img').src = photo.url;
    photoBig.querySelector('.likes-count').textContent = photo.likes;
    photoBig.querySelector('.comments-count').textContent = photo.comments.length;
    var socialComment = photoBig.querySelector('.social__comment');

    photoBig.querySelector('.social__comments').innerHTML = '';
    var fragment = document.createDocumentFragment();
    var commentsAmount = photo.comments.length > MAX_COMMENTS ? MAX_COMMENTS : photo.comments.length;
    for (var m = 0; m < commentsAmount; m++) {
      var comment = socialComment.cloneNode(true);
      comment.querySelector('.social__picture').src = 'img/avatar-' + utils.getRandNumber(MAX_AVATAR_NUMBER, MIN_AVATAR_NUMBER) + '.svg';
      comment.querySelector('.social__text').textContent = photo.comments[m];
      fragment.appendChild(comment);
    }
    photoBig.querySelector('.social__comments').appendChild(fragment, socialComment);
    photoBig.querySelector('.social__caption').textContent = photo.description;

    return photoBig;
  };

  // закрытие большого фото
  var photoСlose = document.querySelector('#picture-cancel');

  var closePhoto = function () {
    photoBig.classList.add('hidden');
    bodyElement.classList.add('modal-open');
  };

  photoСlose.addEventListener('click', function () {
    closePhoto();
  });

  document.addEventListener('keydown', function (evt) {
    if (utils.isEscEvent(evt)) {
      closePhoto();
    }
  });

  var socialCommentCount = document.querySelector('.social__comment-count');
  socialCommentCount.classList.add('visually-hidden');
  var socialCommentLoad = document.querySelector('.social__loadmore');
  socialCommentLoad.classList.add('visually-hidden');

})();
