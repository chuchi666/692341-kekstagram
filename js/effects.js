'use strict';

(function () {
// слайдер глубины
  var DEFAULT_SCALE_EFFECT_VALUE = 1;
  var DEFAULT_FILTER = 'effects__preview--marvin';
  var FILTER_NONE = 'effects__preview--none';
  var SATURATION_FACTOR_MARVIN = 100;
  var SATURATION_FACTOR_PHOBOS = 3;
  var SATURATION_FACTOR_HEAT_MULTIPLICATION = 2;
  var SATURATION_FACTOR_HEAT_ROUND = 1;

  var scale = document.querySelector('.scale');
  var scalePin = scale.querySelector('.scale__pin');
  var scaleLine = document.querySelector('.scale__line');
  var scaleLevel = document.querySelector('.scale__level');
  var uploadPreviewImg = document.querySelector('.img-upload__preview');

  var lineWidth;
  scale.classList.remove('hidden');

  var currentFilter = DEFAULT_FILTER;

  var setFilterValue = function (saturation) {
    uploadPreviewImg.classList.forEach(function (e) {
      if (e.startsWith('effects__preview--')) {
        uploadPreviewImg.classList.remove(e);
      }
    });
    uploadPreviewImg.classList.add(currentFilter);
    switch (currentFilter) {
      case 'effects__preview--chrome':
        uploadPreviewImg.style.filter = 'grayscale(' + saturation + ')';
        break;
      case 'effects__preview--sepia':
        uploadPreviewImg.style.filter = 'sepia(' + saturation + ')';
        break;
      case 'effects__preview--marvin':
        saturation *= SATURATION_FACTOR_MARVIN;
        uploadPreviewImg.style.filter = 'invert(' + saturation + '%)';
        break;
      case 'effects__preview--phobos':
        saturation *= SATURATION_FACTOR_PHOBOS;
        uploadPreviewImg.style.filter = 'blur(' + saturation + 'px)';
        break;
      case 'effects__preview--heat':
        saturation = saturation * SATURATION_FACTOR_HEAT_MULTIPLICATION + SATURATION_FACTOR_HEAT_ROUND;
        uploadPreviewImg.style.filter = 'brightness(' + saturation + ')';
        break;
      case 'effects__preview--none':
        uploadPreviewImg.style.filter = '';
        break;
    }
  };

  var inputEffects = document.querySelectorAll('.effects__radio');

  var uncheckInputEffects = function () {
    inputEffects.forEach(function (element) {
      element.checked = '';
    });
  };

  var setDefaultFilter = function () {
    uncheckInputEffects();
    var defaultSuffix = DEFAULT_FILTER.split('--')[1];
    inputEffects.forEach(function (e) {
      if (e.id === 'effect-' + defaultSuffix) {
        e.checked = 'true';
      }
    });
    setFilter(DEFAULT_FILTER);
    setDefaultScale();
  };

  var changeInputEffectHandler = function (evt) {
    var effectId = evt.target.id.split('-')[1];
    var filterName = 'effects__preview--' + effectId;
    setFilter(filterName);
    setDefaultScale();
  };

  var setFilter = function (filterName) {
    currentFilter = filterName;
    setFilterValue(DEFAULT_SCALE_EFFECT_VALUE);
    scale.style.display = filterName === FILTER_NONE ? 'none' : '';
  };

  var setDefaultScale = function () {
    lineWidth = scaleLine.offsetWidth;
    scalePin.style.left = lineWidth + 'px';
    scaleLevel.style.width = lineWidth + 'px';
  };


  var openEffects = function () {
    inputEffects.forEach(function (element) {
      element.addEventListener('click', changeInputEffectHandler);
    });
  };

  var closeEffects = function () {
    inputEffects.forEach(function (element) {
      element.removeEventListener('click', changeInputEffectHandler);
    });
  };

  // Движение ползунка слайдера

  var downMouseHandler = function (evt) {

    var startCoords = evt.clientX;

    var moveMouseHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = startCoords - moveEvt.clientX;
      var movePin = scalePin.offsetLeft - shift;

      if (movePin > 0 && movePin < lineWidth) {
        startCoords = moveEvt.clientX;
        scalePin.style.left = (scalePin.offsetLeft - shift) + 'px';
        scaleLevel.style.width = movePin + 'px';
        setFilterValue(movePin / lineWidth);
      }
    };

    var upMouseHandler = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', moveMouseHandler);
      document.removeEventListener('mouseup', upMouseHandler);
    };

    document.addEventListener('mousemove', moveMouseHandler);
    document.addEventListener('mouseup', upMouseHandler);
  };

  var openPinEffects = function () {
    scalePin.addEventListener('mousedown', downMouseHandler);
  };

  var closePinEffects = function () {
    scalePin.removeEventListener('mousedown', downMouseHandler);
  };

  window.effects = {
    setDefaultScale: setDefaultScale,
    setDefaultFilter: setDefaultFilter,
    openEffects: openEffects,
    openPinEffects: openPinEffects,
    closePinEffects: closePinEffects,
    closeEffects: closeEffects
  };

})();
