'use strict';

// Загрузка изображения и показ формы редактирования

(function () {
  var commentsHashtags = window.commentsHashtags;
  var backend = window.backend;
  var effects = window.effects;
  var utils = window.utils;

  var uploadForm = document.querySelector('#upload-select-image');
  var uploadFile = document.querySelector('#upload-file');
  var uploadOverlay = document.querySelector('.img-upload__overlay');
  var cancelUploadOverlay = uploadOverlay.querySelector('#upload-cancel');

  uploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    commentsHashtags.validateHashtag();

    if (!evt.target.checkValidity()) {
      evt.preventDefault();
      uploadForm.reportValidity();
      commentsHashtags.hashtags.setAttribute('style', 'border: 3px solid red;');

    } else {
      commentsHashtags.validateComment();
      if (!evt.target.checkValidity()) {
        evt.preventDefault();
        uploadForm.reportValidity();
        commentsHashtags.textDescription.setAttribute('style', 'border: 3px solid red;');
      } else {
        backend.postData(new FormData(uploadForm), clearForm, showUploadError);
      }
    }
  });

  var showUploadError = function () {
    var uploadError = document.querySelector('#picture')
      .content.querySelector('.img-upload__message--error');
    uploadError.classList.remove('hidden');
    uploadError.style = 'position: fixed; right: 300px; left:300px; bottom: 400px; top:200px; max-width: 500px; max-height: 500px; padding: 15px; font-size: 20px';
    var fragment = document.createDocumentFragment();
    fragment.appendChild(uploadError);
    uploadOverlay.appendChild(fragment);
  };

  var clearForm = function () {
    effects.setDefaultScale();
    commentsHashtags.clearFields();
    closeUploadOverlay();
    uploadFile.value = '';
  };

  var escPressUploadOverlayHandler = function (evt) {
    if (utils.isEscEvent(evt)) {
      closeUploadOverlay();
    }
  };

  var enterPressUploadOverlayHandler = function (evt) {
    if (utils.isEnterEvent(evt)) {
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

  cancelUploadOverlay.addEventListener('keydown', enterPressUploadOverlayHandler);

  uploadFile.addEventListener('change', function () {
    openUploadOverlay();
  });

  cancelUploadOverlay.addEventListener('click', function () {
    clearForm();
  });

})();
