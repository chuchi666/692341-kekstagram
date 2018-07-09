'use strict';

(function () {

  var uploadImg = window.uploadImg;

  var FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif'];

  var effectsPreview = uploadImg.uploadOverlay.querySelectorAll('.effects__preview');

  uploadImg.uploadFile.addEventListener('change', function () {
    open();
    var file = uploadImg.uploadFile.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        uploadImg.preview.src = reader.result;
        for (var i = 0; i < effectsPreview.length; i++) {
          effectsPreview[i].style.backgroundImage = 'url(' + uploadImg.preview.src + ')';
        }
      });
      reader.readAsDataURL(file);
    }
  });

})();
