'use strict';

// Загрузка изображения и показ формы редактирования

(function () {
  var uploadFile = document.querySelector('#upload-file');
  var uploadOverlay = document.querySelector('.img-upload__overlay');
  var cancelUploadOverlay = uploadOverlay.querySelector('#upload-cancel');

  var escPressUploadOverlayHandler = function () {
    if (window.utils.isEscEvent) {
      closeUploadOverlay();
    }
  };

  var openUploadOverlay = function () {
    uploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', escPressUploadOverlayHandler);
  };

  var closeUploadOverlay = function () {
    uploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', escPressUploadOverlayHandler);
  };

  uploadFile.addEventListener('change', function () {
    openUploadOverlay();
  });

  cancelUploadOverlay.addEventListener('click', function () {
    closeUploadOverlay();
  });
})();
