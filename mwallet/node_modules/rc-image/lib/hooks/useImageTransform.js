"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useImageTransform;
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _css = require("rc-util/lib/Dom/css");
var _isEqual = _interopRequireDefault(require("rc-util/lib/isEqual"));
var _raf = _interopRequireDefault(require("rc-util/lib/raf"));
var _react = require("react");
var initialTransform = {
  x: 0,
  y: 0,
  rotate: 0,
  scale: 1,
  flipX: false,
  flipY: false
};
function useImageTransform(imgRef, minScale, maxScale, onTransform) {
  var frame = (0, _react.useRef)(null);
  var queue = (0, _react.useRef)([]);
  var _useState = (0, _react.useState)(initialTransform),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    transform = _useState2[0],
    setTransform = _useState2[1];
  var resetTransform = function resetTransform(action) {
    setTransform(initialTransform);
    if (onTransform && !(0, _isEqual.default)(initialTransform, transform)) {
      onTransform({
        transform: initialTransform,
        action: action
      });
    }
  };

  /** Direct update transform */
  var updateTransform = function updateTransform(newTransform, action) {
    if (frame.current === null) {
      queue.current = [];
      frame.current = (0, _raf.default)(function () {
        setTransform(function (preState) {
          var memoState = preState;
          queue.current.forEach(function (queueState) {
            memoState = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, memoState), queueState);
          });
          frame.current = null;
          onTransform === null || onTransform === void 0 ? void 0 : onTransform({
            transform: memoState,
            action: action
          });
          return memoState;
        });
      });
    }
    queue.current.push((0, _objectSpread2.default)((0, _objectSpread2.default)({}, transform), newTransform));
  };

  /** Scale according to the position of clientX and clientY */
  var dispatchZoomChange = function dispatchZoomChange(ratio, action, clientX, clientY) {
    var _imgRef$current = imgRef.current,
      width = _imgRef$current.width,
      height = _imgRef$current.height,
      offsetWidth = _imgRef$current.offsetWidth,
      offsetHeight = _imgRef$current.offsetHeight,
      offsetLeft = _imgRef$current.offsetLeft,
      offsetTop = _imgRef$current.offsetTop;
    var newRatio = ratio;
    var newScale = transform.scale * ratio;
    if (newScale > maxScale) {
      newRatio = maxScale / transform.scale;
      newScale = maxScale;
    } else if (newScale < minScale) {
      newRatio = minScale / transform.scale;
      newScale = minScale;
    }

    /** Default center point scaling */
    var mergedClientX = clientX !== null && clientX !== void 0 ? clientX : innerWidth / 2;
    var mergedClientY = clientY !== null && clientY !== void 0 ? clientY : innerHeight / 2;
    var diffRatio = newRatio - 1;
    /** Deviation calculated from image size */
    var diffImgX = diffRatio * width * 0.5;
    var diffImgY = diffRatio * height * 0.5;
    /** The difference between the click position and the edge of the document */
    var diffOffsetLeft = diffRatio * (mergedClientX - transform.x - offsetLeft);
    var diffOffsetTop = diffRatio * (mergedClientY - transform.y - offsetTop);
    /** Final positioning */
    var newX = transform.x - (diffOffsetLeft - diffImgX);
    var newY = transform.y - (diffOffsetTop - diffImgY);

    /**
     * When zooming the image
     * When the image size is smaller than the width and height of the window, the position is initialized
     */
    if (ratio < 1 && newScale === 1) {
      var mergedWidth = offsetWidth * newScale;
      var mergedHeight = offsetHeight * newScale;
      var _getClientSize = (0, _css.getClientSize)(),
        clientWidth = _getClientSize.width,
        clientHeight = _getClientSize.height;
      if (mergedWidth <= clientWidth && mergedHeight <= clientHeight) {
        newX = 0;
        newY = 0;
      }
    }
    updateTransform({
      x: newX,
      y: newY,
      scale: newScale
    }, action);
  };
  return {
    transform: transform,
    resetTransform: resetTransform,
    updateTransform: updateTransform,
    dispatchZoomChange: dispatchZoomChange
  };
}