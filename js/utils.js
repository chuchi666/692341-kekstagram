'use strict';

(function () {

  var ESC_KEYCODE = 27;

  var isEscEvent = function (evt) {
    return evt.keyCode === ESC_KEYCODE;
  };

  var getRandNumber = function (min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
  };

  window.utils = {
    isEscEvent: isEscEvent,
    getRandNumber: getRandNumber,
  };

})();
