'use strict';

(function () {
  var backend = window.backend;
  var renderPhotoBig = window.renderPhotoBig;
  var utils = window.utils;

  var TIMEOUT_ERROR = 5000;
  var TIMEOUT_FILTER = 1000;
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

    photoElement.addEventListener('keydown', function (evt) {
      if (utils.isEnterEvent(evt)) {
        renderPhotoBig(photo).classList.remove('hidden');
      }
    });

    photoElement.querySelector('.picture__stat--comments').textContent = photo.comments.length;
    photoElement.querySelector('.picture__stat--likes').textContent = photo.likes;

    return photoElement;
  };

  var photoArray = document.querySelector('.pictures');

  var currentFilter = 'filter-popular';
  var previousFilter = currentFilter;

  var filterPhotosNew = function (photos) {
    var newPhotos = [];
    for (var i = 0; i < 10; i++) {
      var randomIndex = utils.getRandNumber(0, photos.length - 1);
      newPhotos = newPhotos.concat(photos.splice(randomIndex, 1));
    }
    return newPhotos;
  };

  var filterPhotosDiscussed = function (photos) {
    photos.sort(function (first, second) {
      if (first.comments.length > second.comments.length) {
        return -1;
      }
      if (first.comments.length < second.comments.length) {
        return 1;
      }
      return 0;
    });
    return photos;
  };

  var filter = {
    'filter-popular': function (a) {
      return a;
    },
    'filter-new': filterPhotosNew,
    'filter-discussed': filterPhotosDiscussed
  };

  var onLoadPhotos = function (photos) {
    showFilter();
    var newPhotos = filter[currentFilter](photos);
    var fragment = document.createDocumentFragment();
    newPhotos.forEach(function (e) {
      fragment.appendChild(renderPhoto(e));
    });

    photoArray.querySelectorAll('.picture__link').forEach(function (e) {
      e.parentNode.removeChild(e);
    });
    photoArray.appendChild(fragment);

  };

  function renderError(response) {
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
    }, TIMEOUT_ERROR);
  }

  // модуль фильтрации изображений
  var photoFilter = document.querySelector('.img-filters');
  var buttons = document.querySelectorAll('.img-filters__button');

  var showFilter = function () {
    photoFilter.classList.remove('img-filters--inactive');
  };

  buttons.forEach(function (b) {
    b.addEventListener('click', function (evt) {
      buttons.forEach(function (innerB) {
        innerB.classList.remove('img-filters__button--active');
      });
      evt.target.classList.add('img-filters__button--active');
      currentFilter = evt.target.id;
    });
  });

  var loadPhotos = function () {
    backend.getData(onLoadPhotos, renderError);
  };

  loadPhotos();

  setInterval(function () {
    if (currentFilter !== previousFilter) {
      loadPhotos();
      previousFilter = currentFilter;
    }
  }, TIMEOUT_FILTER);
})();
