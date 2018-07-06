'use strict';

// 2.2. Наложение эффекта на изображение

(function () {
// слайдер глубины
  var scale = document.querySelector('.scale');
  var scalePin = scale.querySelector('.scale__pin');
  var scaleLine = document.querySelector('.scale__line');
  var scaleLevel = document.querySelector('.scale__level');
  var uploadPreview = document.querySelector('.img-upload__preview');
  // uploadPreview также имеется в scale.js

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
    setDefaultScale();
  };

  window.setDefaultScale = function () {
    lineWidth = scaleLine.offsetWidth;
    scalePin.style.left = lineWidth + 'px';
    scaleLevel.style.width = lineWidth + 'px';
  }

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

    window.effects = {
      setDefaultScale: setDefaultScale
    }
  });
})();
