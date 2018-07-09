'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var isEscEvent = function (evt) {
    return evt.keyCode === ESC_KEYCODE;
  };

  var isEnterEvent = function (evt) {
    return evt.keyCode === ENTER_KEYCODE;
  };

  var generateNumber = function (min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
  };


  window.utils = {
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    generateNumber: generateNumber
  };

})();
