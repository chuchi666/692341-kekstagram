'use strict';

// Создание больших фоток

(function () {
  var MIN_AVATAR_NUMBER = 1;
  var MAX_AVATAR_NUMBER = 6;

  var photoBig = document.querySelector('.big-picture');

  window.renderPhotoBig = function (photo) {
    photoBig.querySelector('.big-picture__img img').src = photo.url;
    photoBig.querySelector('.likes-count').textContent = photo.likes;
    photoBig.querySelector('.comments-count').textContent = photo.comments.length;

    var socialComment = photoBig.querySelectorAll('.social__comment');

    for (var m = 0; m < socialComment.length; m++) {
      if (photo.comments[m]) {
        socialComment[m].querySelector('.social__picture').src = 'img/avatar-' + window.utils.getRandNumber(MAX_AVATAR_NUMBER, MIN_AVATAR_NUMBER) + '.svg';
        socialComment[m].querySelector('.social__text').textContent = photo.comments[m];
      } else {
        socialComment[m].classList.add('visually-hidden');
      }
    }

    photoBig.querySelector('.social__caption').textContent = photo.description;

    return photoBig;
  };

  // закрытие большого фото
  var photoСlose = document.querySelector('#picture-cancel');

  var closePhoto = function () {
    photoBig.classList.add('hidden');
  };

  photoСlose.addEventListener('click', function () {
    closePhoto();
  });

  photoСlose.addEventListener('keydown', function () {
    if (window.utils.isEscEvent) {
      closePhoto();
    }
  });

  var socialCommentCount = document.querySelector('.social__comment-count');
  socialCommentCount.classList.add('visually-hidden');
  var socialCommentLoad = document.querySelector('.social__loadmore');
  socialCommentLoad.classList.add('visually-hidden');

})();
