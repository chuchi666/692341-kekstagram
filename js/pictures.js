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

var ESC_KEYCODE = 27;

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

// Создание больших фоток
var photoBig = document.querySelector('.big-picture');

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

var photos = getPhotos(PHOTOS_AMOUNT);
var fragment = document.createDocumentFragment();
photos.forEach(function (e) {
  fragment.appendChild(renderPhoto(e));
});
photoList.appendChild(fragment);

var socialCommentCount = document.querySelector('.social__comment-count');
socialCommentCount.classList.add('visually-hidden');
var socialCommentLoad = document.querySelector('.social__loadmore');
socialCommentLoad.classList.add('visually-hidden');

// module4-task1

var uploadFile = document.querySelector('#upload-file');
var uploadOverlay = document.querySelector('.img-upload__overlay');
var cancelUploadOverlay = uploadOverlay.querySelector('#upload-cancel');

var onUploadOverlayEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeUploadOverlay();
  }
};

var openUploadOverlay = function () {
  uploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onUploadOverlayEscPress);
};

var closeUploadOverlay = function () {
  uploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onUploadOverlayEscPress);
};

uploadFile.addEventListener('change', function () {
  openUploadOverlay();
});

cancelUploadOverlay.addEventListener('click', function () {
  closeUploadOverlay();
});

// 2.1. Масштаб
var imageScale = document.querySelector('.resize__control--value');
var imageScalePlus = document.querySelector('.resize__control--plus');
var imageScaleMinus = document.querySelector('.resize__control--minus');
var uploadPreview = document.querySelector('.img-upload__preview');

var SCALE_STEP = 25;
var SCALE_MAX = 100;
var SCALE_MIN = 25;
var DEFAULT_SCALE_VALUE = 100;

imageScale.value = DEFAULT_SCALE_VALUE + '%';

var getCurrentScale = function () {
  return Number(imageScale.value.split('%')[0]);
};

var scaleUploadPreview = function () {
  uploadPreview.style.transform = 'scale(' + getCurrentScale() / 100 + ')';
};

var increaseImageScaleHandler = function () {
  imageScale.value = getCurrentScale() >= SCALE_MAX ? imageScale.value : getCurrentScale() + SCALE_STEP + '%';
  scaleUploadPreview();
};

var decreaseImageScaleHandler = function () {
  imageScale.value = getCurrentScale() <= SCALE_MIN ? imageScale.value : getCurrentScale() - SCALE_STEP + '%';
  scaleUploadPreview();
};

imageScalePlus.addEventListener('click', increaseImageScaleHandler);
imageScaleMinus.addEventListener('click', decreaseImageScaleHandler);

// 2.2. Наложение эффекта на изображение
// слайдер глубины
var scale = document.querySelector('.scale');
var scalePin = scale.querySelector('.scale__pin');
var scaleLine = document.querySelector('.scale__line');
var scaleLevel = document.querySelector('.scale__level');
var lineWidth;
scale.classList.add('hidden');

var DEFAULT_SCALE_EFFECT_VALUE = 1;

var setFilterValue = function (filterName, saturation) {
  switch (filterName) {
    case 'effects__preview--chrome':
      uploadPreview.style.filter = 'grayscale(' + saturation + ')';
      break;
    case 'effects__preview--sepia':
      uploadPreview.style.filter = 'sepia(' + saturation + ')';
      break;
    case 'effects__preview--marvin':
      saturation *= 100;
      uploadPreview.style.filter = 'invert(' + saturation + '%)';
      break;
    case 'effects__preview--phobos':
      saturation *= 3;
      uploadPreview.style.filter = 'blur(' + saturation + 'px)';
      break;
    case 'effects__preview--heat':
      saturation = saturation * 2 + 1;
      uploadPreview.style.filter = 'brightness(' + saturation + ')';
      break;
    case 'effects__preview--none':
      uploadPreview.removeAttribute('style');
      break;
  }
};

var inputEffects = document.querySelectorAll('.effects__radio');

var changeInputEffectHandler = function (evt) {
  var effectId = evt.target.id.split('-')[1];
  var filterName = 'effects__preview--' + effectId;
  uploadPreview.setAttribute('class', filterName);
  setFilterValue(filterName, DEFAULT_SCALE_EFFECT_VALUE);
  scale.classList.toggle('hidden', effectId === 'none');
  lineWidth = scaleLine.offsetWidth;
  scalePin.style.left = lineWidth + 'px';
  scaleLevel.style.width = lineWidth + 'px';
};

inputEffects.forEach(function (element) {
  element.addEventListener('click', changeInputEffectHandler);
});


// Движение ползунка слайдера
scalePin.addEventListener('mousedown', function (evt) {

  var startCoords = evt.clientX;

  var moveMouseHandler = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = startCoords - moveEvt.clientX;

    var movePin = scalePin.offsetLeft - shift;

    if (movePin > 0 && movePin < lineWidth) {
      startCoords = moveEvt.clientX;
      scalePin.style.left = (scalePin.offsetLeft - shift) + 'px';
      scaleLevel.style.width = movePin + 'px';
      setFilterValue(
          uploadPreview.getAttribute('class'),
          Number(movePin / lineWidth)
      );
    }
  };

  var upMouseHandler = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', moveMouseHandler);
    document.removeEventListener('mouseup', upMouseHandler);
  };

  document.addEventListener('mousemove', moveMouseHandler);
  document.addEventListener('mouseup', upMouseHandler);
});

// закрытие большого фото
var photoСlose = document.querySelector('#picture-cancel');

var closePhoto = function () {
  photoBig.classList.add('hidden');
};

photoСlose.addEventListener('click', function () {
  closePhoto();
});

photoСlose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePhoto();
  }
});
