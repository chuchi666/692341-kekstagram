'use strict';

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

var MIN_AVATAR_NUMBER = 1;
var MAX_AVATAR_NUMBER = 6;
var PHOTOS_AMOUNT = 25;
var MIN_LIKES = 15;
var MAX_LIKES = 200;

var getRandElement = function (arr) {
  return arr[Math.round((arr.length - 1) * Math.random())];
};

var getRandNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
};

var getRandComment = function () {
  var commentsAmount = getRandNumber(1, 2);
  var commentsArray = [];
  for (var j = 0; j < commentsAmount; j++) {
    commentsArray[j] = getRandElement(COMMENT);
  }
  return commentsArray;
};

var generateRandomPhoto = function (middleName) {
  var photo = {
    url: 'photos/' + middleName + '.jpg',
    likes: getRandNumber(MIN_LIKES, MAX_LIKES),
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

var photoTemplate = document.querySelector('#picture')
  .content.querySelector('.picture__link');

var photoList = document.querySelector('.pictures');

var renderPhoto = function (photo) {
  var photoElement = photoTemplate.cloneNode(true);
  var photoImg = photoElement.querySelector('.picture__img');

  photoImg.src = photo.url;
  photoElement.querySelector('.picture__stat--comments').textContent = photo.comments.length;
  photoElement.querySelector('.picture__stat--likes').textContent = photo.likes;

  return photoElement;
};

var photos = getPhotos(PHOTOS_AMOUNT);
var fragment = document.createDocumentFragment();
for (var k = 0; k < photos.length; k++) {
  fragment.appendChild(renderPhoto(photos[k]));
}

photoList.appendChild(fragment);

var photoBig = document.querySelector('.big-picture');
photoBig.classList.remove('hidden');

var renderPhotoBig = function (photo) {

  photoBig.querySelector('.big-picture__img img').src = photo.url;
  photoBig.querySelector('.likes-count').textContent = photo.likes;
  photoBig.querySelector('.comments-count').textContent = photo.comments.length;

  var socialComment = photoBig.querySelectorAll('.social__comment');

  for (var m = 0; m < socialComment.length; m++) {
    if (photo.comments[m]) {
      socialComment[m].querySelector('.social__picture').src = 'img/avatar-' + getRandNumber(MAX_AVATAR_NUMBER, MIN_AVATAR_NUMBER) + '.svg';
      socialComment[m].querySelector('.social__text').textContent = photo.comments[m];
    } else {
      socialComment[m].classList.add('visually-hidden');
    }
  }

  photoBig.querySelector('.social__caption').textContent = photo.description;

  return photoBig;
};

renderPhotoBig(photos[3]);

var socialCommentCount = document.querySelector('.social__comment-count');
socialCommentCount.classList.add('visually-hidden');
var socialCommentLoad = document.querySelector('.social__loadmore');
socialCommentLoad.classList.add('visually-hidden');
