'use strict';

(function () {
  var MIN_PIN_POSITION = 0;
  var imageUploadFormElement = document.querySelector('.img-upload__form');
  var imgUploadPreview = imageUploadFormElement.querySelector('.img-upload__preview');
  var effectLevelLine = imageUploadFormElement.querySelector('.effect-level__line');
  var imgUploadPreviewContainer = imageUploadFormElement.querySelector('.img-upload__preview-container');
  var effectLevelPin = effectLevelLine.querySelector('.effect-level__pin');
  var effectLevelDepth = effectLevelLine.querySelector('.effect-level__depth');
  var previewImage = imgUploadPreview.querySelector('img');

  var getCurrentEffect = function (index) {
    if (imgUploadPreviewContainer.querySelector('.effects__preview--chrome')) {
      return 'grayscale(' + index + ')';
    }
    if (imgUploadPreviewContainer.querySelector('.effects__preview--sepia')) {
      return 'sepia(' + index + ')';
    }
    if (imgUploadPreviewContainer.querySelector('.effects__preview--marvin')) {
      return 'invert(' + (index * 100) + '%)';
    }
    if (imgUploadPreviewContainer.querySelector('.effects__preview--phobos')) {
      return 'blur(' + (index * 3) + 'px)';
    }
    if (imgUploadPreviewContainer.querySelector('.effects__preview--heat')) {
      return 'brightness(' + (index * 3) + ')';
    }
    return 'unset';
  };

  var onDialogMousedownDrag = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };

      var pinElementPosition = (effectLevelPin.offsetLeft - shift.x);
      var lineElementWidth = effectLevelLine.getBoundingClientRect().width;

      var PinPercentPosition = Math.floor(window.util.getMinMaxValue(pinElementPosition, lineElementWidth, MIN_PIN_POSITION) / (lineElementWidth / 100)) / 100;

      previewImage.style.filter = getCurrentEffect(PinPercentPosition);
      effectLevelPin.style.left = window.util.getMinMaxValue(pinElementPosition, lineElementWidth, MIN_PIN_POSITION) + 'px';
      effectLevelDepth.style.width = window.util.getMinMaxValue(pinElementPosition, lineElementWidth, MIN_PIN_POSITION) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  window.slider = {
    onDialogMousedownDrag: onDialogMousedownDrag
  };
})();
