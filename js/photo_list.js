'use strict';

(function () {
  var backend = window.backend;
  var renderPhotoBig = window.renderPhotoBig;
  // Создание фотоэлементов через клонирование ноды

  var photoTemplate = document.querySelector('#picture')
  .content.querySelector('.picture__link');

  var renderPhoto = function (photo) {
    var photoElement = photoTemplate.cloneNode(true);
    var photoImg = photoElement.querySelector('.picture__img');

    photoImg.src = photo.url;
    photoImg.addEventListener('click', function () {
      renderPhotoBig(photo).classList.remove('hidden');
    });
    photoElement.querySelector('.picture__stat--comments').textContent = photo.comments.length;
    photoElement.querySelector('.picture__stat--likes').textContent = photo.likes;

    return photoElement;
  };

  var photoList = document.querySelector('.pictures');
  var onLoadPhotos = function (photos) {
    var fragment = document.createDocumentFragment();
    photos.forEach(function (e) {
      fragment.appendChild(renderPhoto(e));
    });
    photoList.appendChild(fragment);
  };

    function renderError(response) {
    var TIMEOUT = 5000;
    var defaultError = document.querySelector('.error');

    var error = document.createElement('div');
    error.classList = 'error';
    error.style = 'position: fixed; right: 400px; bottom: 30px; max-width: 400px; padding: 15px; font-size: 20px; text-transform: none; color: #000; background: #fff; z-index: 3;';
    error.textContent = response;

    if (defaultError) {
      defaultError.remove();
    }

    document.body.insertAdjacentElement('beforeend', error);

    setTimeout(function () {
      error.remove();
    }, TIMEOUT);
  };

  backend.getData(onLoadPhotos, renderError);
})();
