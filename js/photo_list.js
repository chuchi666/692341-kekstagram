'use strict';

(function () {
  var COMMENT = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var DESCRIPTION = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ];

  var PHOTOS_AMOUNT = 25;
  var MIN_LIKES = 15;
  var MAX_LIKES = 200;

  var getRandElement = function (arr) {
    return arr[Math.round((arr.length - 1) * Math.random())];
  };

  var getRandComment = function () {
    var commentsAmount = window.utils.getRandNumber(1, 2);
    var commentsArray = [];
    for (var j = 0; j < commentsAmount; j++) {
      commentsArray[j] = getRandElement(COMMENT);
    }
    return commentsArray;
  };

  var generateRandomPhoto = function (middleName) {
    var photo = {
      url: 'photos/' + middleName + '.jpg',
      likes: window.utils.getRandNumber(MIN_LIKES, MAX_LIKES),
      comments: getRandComment(),
      description: getRandElement(DESCRIPTION)
    };
    return photo;
  };

  var getPhotos = function (amount) {
    var photos = [];
    for (var i = 0; i < amount; i++) {
      photos[i] = generateRandomPhoto(i + 1);
    }
    return photos;
  };

  // Создание фотоэлементов через клонирование ноды

  var photoTemplate = document.querySelector('#picture')
  .content.querySelector('.picture__link');

  var renderPhoto = function (photo) {
    var photoElement = photoTemplate.cloneNode(true);
    var photoImg = photoElement.querySelector('.picture__img');

    photoImg.src = photo.url;
    photoImg.addEventListener('click', function () {
      window.renderPhotoBig(photo).classList.remove('hidden');
    });
    photoElement.querySelector('.picture__stat--comments').textContent = photo.comments.length;
    photoElement.querySelector('.picture__stat--likes').textContent = photo.likes;

    return photoElement;
  };

  var photoList = document.querySelector('.pictures');
  var photos = getPhotos(PHOTOS_AMOUNT);
  var fragment = document.createDocumentFragment();
  photos.forEach(function (e) {
    fragment.appendChild(renderPhoto(e));
  });
  photoList.appendChild(fragment);
})();
