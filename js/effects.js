'use strict';

(function () {
// слайдер глубины
  var DEFAULT_SCALE_EFFECT_VALUE = 1;
  var DEFAULT_FILTER = 'effects__preview--none';
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
  scale.classList.add('hidden');

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

  var setDefaultFilter = function () {
    currentFilter = DEFAULT_FILTER;
    setFilterValue();
  };

  var inputEffects = document.querySelectorAll('.effects__radio');

  inputEffects.forEach(function (element) {
    element.checked = '';
  });

  var changeInputEffectHandler = function (evt) {
    var effectId = evt.target.id.split('-')[1];
    var filterName = 'effects__preview--' + effectId;
    currentFilter = filterName;
    setFilterValue(DEFAULT_SCALE_EFFECT_VALUE);
    scale.classList.toggle('hidden', effectId === 'none');
    //  Согласно п.2.2 ТЗ "При выборе эффекта «Оригинал» слайдер скрывается", поэтому на первом фото (Оригинал) слайдер отсутствует__замечание Б1
    setDefaultScale();
  };

  var hideScaleEffect = function () {
    scale.classList.add('hidden');
  };

  var setDefaultScale = function () {
    lineWidth = scaleLine.offsetWidth;
    scalePin.style.left = lineWidth + 'px';
    scaleLevel.style.width = lineWidth + 'px';
  };

  inputEffects.forEach(function (element) {
    element.addEventListener('click', changeInputEffectHandler);
  });

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

  var openEffects = function () {
    scalePin.addEventListener('mousedown', downMouseHandler);
  };

  var closeEffects = function () {
    scalePin.removeEventListener('mousedown', downMouseHandler);
  };

  window.effects = {
    setDefaultScale: setDefaultScale,
    setDefaultFilter: setDefaultFilter,
    hideScaleEffect: hideScaleEffect,
    openEffects: openEffects,
    closeEffects: closeEffects
  };

})();
