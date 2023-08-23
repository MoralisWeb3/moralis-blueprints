"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _classnames2 = _interopRequireDefault(require("classnames"));
var _rcDialog = _interopRequireDefault(require("rc-dialog"));
var _addEventListener = _interopRequireDefault(require("rc-util/lib/Dom/addEventListener"));
var _KeyCode = _interopRequireDefault(require("rc-util/lib/KeyCode"));
var _warning = require("rc-util/lib/warning");
var _react = _interopRequireWildcard(require("react"));
var _context = require("./context");
var _getFixScaleEleTransPosition = _interopRequireDefault(require("./getFixScaleEleTransPosition"));
var _useImageTransform2 = _interopRequireDefault(require("./hooks/useImageTransform"));
var _useStatus3 = _interopRequireDefault(require("./hooks/useStatus"));
var _Operations = _interopRequireDefault(require("./Operations"));
var _previewConfig = require("./previewConfig");
var _excluded = ["fallback", "src", "imgRef"],
  _excluded2 = ["prefixCls", "src", "alt", "fallback", "movable", "onClose", "visible", "icons", "rootClassName", "closeIcon", "getContainer", "current", "count", "countRender", "scaleStep", "minScale", "maxScale", "transitionName", "maskTransitionName", "imageRender", "imgCommonProps", "toolbarRender", "onTransform", "onChange"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var PreviewImage = function PreviewImage(_ref) {
  var fallback = _ref.fallback,
    src = _ref.src,
    imgRef = _ref.imgRef,
    props = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var _useStatus = (0, _useStatus3.default)({
      src: src,
      fallback: fallback
    }),
    _useStatus2 = (0, _slicedToArray2.default)(_useStatus, 2),
    getImgRef = _useStatus2[0],
    srcAndOnload = _useStatus2[1];
  return /*#__PURE__*/_react.default.createElement("img", (0, _extends2.default)({
    ref: function ref(_ref2) {
      imgRef.current = _ref2;
      getImgRef(_ref2);
    }
  }, props, srcAndOnload));
};
var Preview = function Preview(props) {
  var prefixCls = props.prefixCls,
    src = props.src,
    alt = props.alt,
    fallback = props.fallback,
    _props$movable = props.movable,
    movable = _props$movable === void 0 ? true : _props$movable,
    onClose = props.onClose,
    visible = props.visible,
    _props$icons = props.icons,
    icons = _props$icons === void 0 ? {} : _props$icons,
    rootClassName = props.rootClassName,
    closeIcon = props.closeIcon,
    getContainer = props.getContainer,
    _props$current = props.current,
    current = _props$current === void 0 ? 0 : _props$current,
    _props$count = props.count,
    count = _props$count === void 0 ? 1 : _props$count,
    countRender = props.countRender,
    _props$scaleStep = props.scaleStep,
    scaleStep = _props$scaleStep === void 0 ? 0.5 : _props$scaleStep,
    _props$minScale = props.minScale,
    minScale = _props$minScale === void 0 ? 1 : _props$minScale,
    _props$maxScale = props.maxScale,
    maxScale = _props$maxScale === void 0 ? 50 : _props$maxScale,
    _props$transitionName = props.transitionName,
    transitionName = _props$transitionName === void 0 ? 'zoom' : _props$transitionName,
    _props$maskTransition = props.maskTransitionName,
    maskTransitionName = _props$maskTransition === void 0 ? 'fade' : _props$maskTransition,
    imageRender = props.imageRender,
    imgCommonProps = props.imgCommonProps,
    toolbarRender = props.toolbarRender,
    onTransform = props.onTransform,
    onChange = props.onChange,
    restProps = (0, _objectWithoutProperties2.default)(props, _excluded2);
  var imgRef = (0, _react.useRef)();
  var downPositionRef = (0, _react.useRef)({
    deltaX: 0,
    deltaY: 0,
    transformX: 0,
    transformY: 0
  });
  var _useState = (0, _react.useState)(false),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    isMoving = _useState2[0],
    setMoving = _useState2[1];
  var groupContext = (0, _react.useContext)(_context.PreviewGroupContext);
  var showLeftOrRightSwitches = groupContext && count > 1;
  var showOperationsProgress = groupContext && count >= 1;
  var _useImageTransform = (0, _useImageTransform2.default)(imgRef, minScale, maxScale, onTransform),
    transform = _useImageTransform.transform,
    resetTransform = _useImageTransform.resetTransform,
    updateTransform = _useImageTransform.updateTransform,
    dispatchZoomChange = _useImageTransform.dispatchZoomChange;
  var _useState3 = (0, _react.useState)(true),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    enableTransition = _useState4[0],
    setEnableTransition = _useState4[1];
  var rotate = transform.rotate,
    scale = transform.scale,
    x = transform.x,
    y = transform.y;
  var wrapClassName = (0, _classnames2.default)((0, _defineProperty2.default)({}, "".concat(prefixCls, "-moving"), isMoving));
  (0, _react.useEffect)(function () {
    if (!enableTransition) {
      setEnableTransition(true);
    }
  }, [enableTransition]);
  var onAfterClose = function onAfterClose() {
    resetTransform('close');
  };
  var onZoomIn = function onZoomIn() {
    dispatchZoomChange(_previewConfig.BASE_SCALE_RATIO + scaleStep, 'zoomIn');
  };
  var onZoomOut = function onZoomOut() {
    dispatchZoomChange(_previewConfig.BASE_SCALE_RATIO / (_previewConfig.BASE_SCALE_RATIO + scaleStep), 'zoomOut');
  };
  var onRotateRight = function onRotateRight() {
    updateTransform({
      rotate: rotate + 90
    }, 'rotateRight');
  };
  var onRotateLeft = function onRotateLeft() {
    updateTransform({
      rotate: rotate - 90
    }, 'rotateLeft');
  };
  var onFlipX = function onFlipX() {
    updateTransform({
      flipX: !transform.flipX
    }, 'flipX');
  };
  var onFlipY = function onFlipY() {
    updateTransform({
      flipY: !transform.flipY
    }, 'flipY');
  };
  var onSwitchLeft = function onSwitchLeft(event) {
    event === null || event === void 0 ? void 0 : event.preventDefault();
    event === null || event === void 0 ? void 0 : event.stopPropagation();
    if (current > 0) {
      setEnableTransition(false);
      resetTransform('prev');
      onChange === null || onChange === void 0 ? void 0 : onChange(current - 1, current);
    }
  };
  var onSwitchRight = function onSwitchRight(event) {
    event === null || event === void 0 ? void 0 : event.preventDefault();
    event === null || event === void 0 ? void 0 : event.stopPropagation();
    if (current < count - 1) {
      setEnableTransition(false);
      resetTransform('next');
      onChange === null || onChange === void 0 ? void 0 : onChange(current + 1, current);
    }
  };
  var onMouseUp = function onMouseUp() {
    if (visible && isMoving) {
      setMoving(false);
      /** No need to restore the position when the picture is not moved, So as not to interfere with the click */
      var _downPositionRef$curr = downPositionRef.current,
        transformX = _downPositionRef$curr.transformX,
        transformY = _downPositionRef$curr.transformY;
      var hasChangedPosition = x !== transformX && y !== transformY;
      if (!hasChangedPosition) {
        return;
      }
      var width = imgRef.current.offsetWidth * scale;
      var height = imgRef.current.offsetHeight * scale;
      // eslint-disable-next-line @typescript-eslint/no-shadow
      var _imgRef$current$getBo = imgRef.current.getBoundingClientRect(),
        left = _imgRef$current$getBo.left,
        top = _imgRef$current$getBo.top;
      var isRotate = rotate % 180 !== 0;
      var fixState = (0, _getFixScaleEleTransPosition.default)(isRotate ? height : width, isRotate ? width : height, left, top);
      if (fixState) {
        updateTransform((0, _objectSpread2.default)({}, fixState), 'dragRebound');
      }
    }
  };
  var onMouseDown = function onMouseDown(event) {
    // Only allow main button
    if (!movable || event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    downPositionRef.current = {
      deltaX: event.pageX - transform.x,
      deltaY: event.pageY - transform.y,
      transformX: transform.x,
      transformY: transform.y
    };
    setMoving(true);
  };
  var onMouseMove = function onMouseMove(event) {
    if (visible && isMoving) {
      updateTransform({
        x: event.pageX - downPositionRef.current.deltaX,
        y: event.pageY - downPositionRef.current.deltaY
      }, 'move');
    }
  };
  var onWheel = function onWheel(event) {
    if (!visible || event.deltaY == 0) return;
    // Scale ratio depends on the deltaY size
    var scaleRatio = Math.abs(event.deltaY / 100);
    // Limit the maximum scale ratio
    var mergedScaleRatio = Math.min(scaleRatio, _previewConfig.WHEEL_MAX_SCALE_RATIO);
    // Scale the ratio each time
    var ratio = _previewConfig.BASE_SCALE_RATIO + mergedScaleRatio * scaleStep;
    if (event.deltaY > 0) {
      ratio = _previewConfig.BASE_SCALE_RATIO / ratio;
    }
    dispatchZoomChange(ratio, 'wheel', event.clientX, event.clientY);
  };
  var onKeyDown = function onKeyDown(event) {
    if (!visible || !showLeftOrRightSwitches) return;
    if (event.keyCode === _KeyCode.default.LEFT) {
      onSwitchLeft();
    } else if (event.keyCode === _KeyCode.default.RIGHT) {
      onSwitchRight();
    }
  };
  var onDoubleClick = function onDoubleClick(event) {
    if (visible) {
      if (scale !== 1) {
        updateTransform({
          x: 0,
          y: 0,
          scale: 1
        }, 'doubleClick');
      } else {
        dispatchZoomChange(_previewConfig.BASE_SCALE_RATIO + scaleStep, 'doubleClick', event.clientX, event.clientY);
      }
    }
  };
  (0, _react.useEffect)(function () {
    var onTopMouseUpListener;
    var onTopMouseMoveListener;
    var onMouseUpListener;
    var onMouseMoveListener;
    if (movable) {
      onMouseUpListener = (0, _addEventListener.default)(window, 'mouseup', onMouseUp, false);
      onMouseMoveListener = (0, _addEventListener.default)(window, 'mousemove', onMouseMove, false);
      try {
        // Resolve if in iframe lost event
        /* istanbul ignore next */
        if (window.top !== window.self) {
          onTopMouseUpListener = (0, _addEventListener.default)(window.top, 'mouseup', onMouseUp, false);
          onTopMouseMoveListener = (0, _addEventListener.default)(window.top, 'mousemove', onMouseMove, false);
        }
      } catch (error) {
        /* istanbul ignore next */
        (0, _warning.warning)(false, "[rc-image] ".concat(error));
      }
    }
    return function () {
      var _onMouseUpListener, _onMouseMoveListener, _onTopMouseUpListener, _onTopMouseMoveListen;
      (_onMouseUpListener = onMouseUpListener) === null || _onMouseUpListener === void 0 ? void 0 : _onMouseUpListener.remove();
      (_onMouseMoveListener = onMouseMoveListener) === null || _onMouseMoveListener === void 0 ? void 0 : _onMouseMoveListener.remove();
      /* istanbul ignore next */
      (_onTopMouseUpListener = onTopMouseUpListener) === null || _onTopMouseUpListener === void 0 ? void 0 : _onTopMouseUpListener.remove();
      /* istanbul ignore next */
      (_onTopMouseMoveListen = onTopMouseMoveListener) === null || _onTopMouseMoveListen === void 0 ? void 0 : _onTopMouseMoveListen.remove();
    };
  }, [visible, isMoving, x, y, rotate, movable]);
  (0, _react.useEffect)(function () {
    var onKeyDownListener = (0, _addEventListener.default)(window, 'keydown', onKeyDown, false);
    return function () {
      onKeyDownListener.remove();
    };
  }, [visible, showLeftOrRightSwitches, current]);
  var imgNode = /*#__PURE__*/_react.default.createElement(PreviewImage, (0, _extends2.default)({}, imgCommonProps, {
    width: props.width,
    height: props.height,
    imgRef: imgRef,
    className: "".concat(prefixCls, "-img"),
    alt: alt,
    style: {
      transform: "translate3d(".concat(transform.x, "px, ").concat(transform.y, "px, 0) scale3d(").concat(transform.flipX ? '-' : '').concat(scale, ", ").concat(transform.flipY ? '-' : '').concat(scale, ", 1) rotate(").concat(rotate, "deg)"),
      transitionDuration: !enableTransition && '0s'
    },
    fallback: fallback,
    src: src,
    onWheel: onWheel,
    onMouseDown: onMouseDown,
    onDoubleClick: onDoubleClick
  }));
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_rcDialog.default, (0, _extends2.default)({
    transitionName: transitionName,
    maskTransitionName: maskTransitionName,
    closable: false,
    keyboard: true,
    prefixCls: prefixCls,
    onClose: onClose,
    visible: visible,
    wrapClassName: wrapClassName,
    rootClassName: rootClassName,
    getContainer: getContainer
  }, restProps, {
    afterClose: onAfterClose
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(prefixCls, "-img-wrapper")
  }, imageRender ? imageRender(imgNode, (0, _objectSpread2.default)({
    transform: transform
  }, groupContext ? {
    current: current
  } : {})) : imgNode)), /*#__PURE__*/_react.default.createElement(_Operations.default, {
    visible: visible,
    transform: transform,
    maskTransitionName: maskTransitionName,
    closeIcon: closeIcon,
    getContainer: getContainer,
    prefixCls: prefixCls,
    rootClassName: rootClassName,
    icons: icons,
    countRender: countRender,
    showSwitch: showLeftOrRightSwitches,
    showProgress: showOperationsProgress,
    current: current,
    count: count,
    scale: scale,
    minScale: minScale,
    maxScale: maxScale,
    toolbarRender: toolbarRender,
    onSwitchLeft: onSwitchLeft,
    onSwitchRight: onSwitchRight,
    onZoomIn: onZoomIn,
    onZoomOut: onZoomOut,
    onRotateRight: onRotateRight,
    onRotateLeft: onRotateLeft,
    onFlipX: onFlipX,
    onFlipY: onFlipY,
    onClose: onClose
  }));
};
var _default = Preview;
exports.default = _default;