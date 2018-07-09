'use strict';

// Загрузка изображения и показ формы редактирования

(function () {
  var commentsHashtags = window.commentsHashtags;
  var backend = window.backend;
  var effects = window.effects;
  var utils = window.utils;
  var scale = window.scale;

  var uploadForm = document.querySelector('#upload-select-image');
  var uploadFile = document.querySelector('#upload-file');
  var uploadOverlay = document.querySelector('.img-upload__overlay');
  var cancelUploadOverlay = uploadOverlay.querySelector('#upload-cancel');
  var imgUploadPreview = uploadOverlay.querySelector('.img-upload__preview');
  var preview = imgUploadPreview.querySelector('img');
  var showUploadError = function () {
    var uploadError = document.querySelector('#picture') .content.querySelector('.img-upload__message--error');
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
      clearForm();
    }
  };

  var enterPressUploadOverlayHandler = function (evt) {
    if (utils.isEnterEvent(evt)) {
      clearForm();
    }
  };

  var cancelUploadOverlayHandler = function () {
    clearForm();
  };

  var submitUploadOverlayHandler = function (evt) {
    evt.preventDefault();
    commentsHashtags.validateHashtag();

    if (!evt.target.checkValidity()) {
      evt.preventDefault();
      uploadForm.reportValidity();
      commentsHashtags.renderErrorBorder('hashtags');
    } else {
      commentsHashtags.validateComment();
      if (!evt.target.checkValidity()) {
        evt.preventDefault();
        uploadForm.reportValidity();
        commentsHashtags.renderErrorBorder('comments');
      } else {
        backend.postData(new FormData(uploadForm), clearForm, showUploadError);
      }
    }
  };

  var openUploadOverlay = function () {

    preview.src = '';
    scale.setDefault();
    effects.hideScaleEffect();
    uploadOverlay.classList.remove('hidden');
    var effectButton = document.querySelector('.effects__radio');
    effectButton.checked = 'checked';
    document.addEventListener('keydown', escPressUploadOverlayHandler);
    cancelUploadOverlay.addEventListener('keydown', enterPressUploadOverlayHandler);
    cancelUploadOverlay.addEventListener('click', cancelUploadOverlayHandler);
    scale.openScale();
    commentsHashtags.openComments();

    commentsHashtags.preventPressingEsc();
    effects.openEffects();
    uploadForm.addEventListener('submit', submitUploadOverlayHandler);
  };

  var closeUploadOverlay = function () {

    uploadOverlay.classList.add('hidden');
    effects.setDefaultFilter();
    document.removeEventListener('keydown', escPressUploadOverlayHandler);
    cancelUploadOverlay.removeEventListener('keydown', enterPressUploadOverlayHandler);
    cancelUploadOverlay.removeEventListener('click', cancelUploadOverlayHandler);
    scale.closeScale();
    commentsHashtags.closeComments();
    commentsHashtags.listenPressingEsc();
    effects.closeEffects();
    uploadForm.removeEventListener('submit', submitUploadOverlayHandler);
  };

  uploadFile.addEventListener('change', function () {
    openUploadOverlay();
  });

  window.uploadImg = {
    uploadFile: uploadFile,
    uploadOverlay: uploadOverlay,
    imgUploadPreview: imgUploadPreview,
    preview: preview
  };
})();
