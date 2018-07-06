'use strict';

// 2.1. Масштаб

(function () {
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
})();
