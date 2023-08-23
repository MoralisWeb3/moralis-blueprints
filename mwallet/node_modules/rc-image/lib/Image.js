"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof3 = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _classnames = _interopRequireDefault(require("classnames"));
var _css = require("rc-util/lib/Dom/css");
var _useMergedState3 = _interopRequireDefault(require("rc-util/lib/hooks/useMergedState"));
var React = _interopRequireWildcard(require("react"));
var _common = require("./common");
var _context = require("./context");
var _useRegisterImage = _interopRequireDefault(require("./hooks/useRegisterImage"));
var _useStatus3 = _interopRequireDefault(require("./hooks/useStatus"));
var _Preview = _interopRequireDefault(require("./Preview"));
var _PreviewGroup = _interopRequireDefault(require("./PreviewGroup"));
var _excluded = ["src", "alt", "onPreviewClose", "prefixCls", "previewPrefixCls", "placeholder", "fallback", "width", "height", "style", "preview", "className", "onClick", "onError", "wrapperClassName", "wrapperStyle", "rootClassName"],
  _excluded2 = ["src", "visible", "onVisibleChange", "getContainer", "mask", "maskClassName", "movable", "icons", "scaleStep", "minScale", "maxScale", "imageRender", "toolbarRender"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof3(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var ImageInternal = function ImageInternal(props) {
  var imgSrc = props.src,
    alt = props.alt,
    onInitialPreviewClose = props.onPreviewClose,
    _props$prefixCls = props.prefixCls,
    prefixCls = _props$prefixCls === void 0 ? 'rc-image' : _props$prefixCls,
    _props$previewPrefixC = props.previewPrefixCls,
    previewPrefixCls = _props$previewPrefixC === void 0 ? "".concat(prefixCls, "-preview") : _props$previewPrefixC,
    placeholder = props.placeholder,
    fallback = props.fallback,
    width = props.width,
    height = props.height,
    style = props.style,
    _props$preview = props.preview,
    preview = _props$preview === void 0 ? true : _props$preview,
    className = props.className,
    onClick = props.onClick,
    onError = props.onError,
    wrapperClassName = props.wrapperClassName,
    wrapperStyle = props.wrapperStyle,
    rootClassName = props.rootClassName,
    otherProps = (0, _objectWithoutProperties2.default)(props, _excluded);
  var isCustomPlaceholder = placeholder && placeholder !== true;
  var _ref = (0, _typeof2.default)(preview) === 'object' ? preview : {},
    previewSrc = _ref.src,
    _ref$visible = _ref.visible,
    previewVisible = _ref$visible === void 0 ? undefined : _ref$visible,
    _ref$onVisibleChange = _ref.onVisibleChange,
    onPreviewVisibleChange = _ref$onVisibleChange === void 0 ? onInitialPreviewClose : _ref$onVisibleChange,
    _ref$getContainer = _ref.getContainer,
    getPreviewContainer = _ref$getContainer === void 0 ? undefined : _ref$getContainer,
    previewMask = _ref.mask,
    maskClassName = _ref.maskClassName,
    movable = _ref.movable,
    icons = _ref.icons,
    scaleStep = _ref.scaleStep,
    minScale = _ref.minScale,
    maxScale = _ref.maxScale,
    imageRender = _ref.imageRender,
    toolbarRender = _ref.toolbarRender,
    dialogProps = (0, _objectWithoutProperties2.default)(_ref, _excluded2);
  var src = previewSrc !== null && previewSrc !== void 0 ? previewSrc : imgSrc;
  var _useMergedState = (0, _useMergedState3.default)(!!previewVisible, {
      value: previewVisible,
      onChange: onPreviewVisibleChange
    }),
    _useMergedState2 = (0, _slicedToArray2.default)(_useMergedState, 2),
    isShowPreview = _useMergedState2[0],
    setShowPreview = _useMergedState2[1];
  var _useStatus = (0, _useStatus3.default)({
      src: imgSrc,
      isCustomPlaceholder: isCustomPlaceholder,
      fallback: fallback
    }),
    _useStatus2 = (0, _slicedToArray2.default)(_useStatus, 3),
    getImgRef = _useStatus2[0],
    srcAndOnload = _useStatus2[1],
    status = _useStatus2[2];
  var _useState = (0, React.useState)(null),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    mousePosition = _useState2[0],
    setMousePosition = _useState2[1];
  var groupContext = (0, React.useContext)(_context.PreviewGroupContext);
  var canPreview = !!preview;
  var onPreviewClose = function onPreviewClose() {
    setShowPreview(false);
    setMousePosition(null);
  };
  var wrapperClass = (0, _classnames.default)(prefixCls, wrapperClassName, rootClassName, (0, _defineProperty2.default)({}, "".concat(prefixCls, "-error"), status === 'error'));

  // ========================= ImageProps =========================
  var imgCommonProps = (0, React.useMemo)(function () {
    var obj = {};
    _common.COMMON_PROPS.forEach(function (prop) {
      if (props[prop] !== undefined) {
        obj[prop] = props[prop];
      }
    });
    return obj;
  }, _common.COMMON_PROPS.map(function (prop) {
    return props[prop];
  }));

  // ========================== Register ==========================
  var registerData = (0, React.useMemo)(function () {
    return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, imgCommonProps), {}, {
      src: src
    });
  }, [src, imgCommonProps]);
  var imageId = (0, _useRegisterImage.default)(canPreview, registerData);

  // ========================== Preview ===========================
  var onPreview = function onPreview(e) {
    var _getOffset = (0, _css.getOffset)(e.target),
      left = _getOffset.left,
      top = _getOffset.top;
    if (groupContext) {
      groupContext.onPreview(imageId, left, top);
    } else {
      setMousePosition({
        x: left,
        y: top
      });
      setShowPreview(true);
    }
    onClick === null || onClick === void 0 ? void 0 : onClick(e);
  };

  // =========================== Render ===========================
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", (0, _extends2.default)({}, otherProps, {
    className: wrapperClass,
    onClick: canPreview ? onPreview : onClick,
    style: (0, _objectSpread2.default)({
      width: width,
      height: height
    }, wrapperStyle)
  }), /*#__PURE__*/React.createElement("img", (0, _extends2.default)({}, imgCommonProps, {
    className: (0, _classnames.default)("".concat(prefixCls, "-img"), (0, _defineProperty2.default)({}, "".concat(prefixCls, "-img-placeholder"), placeholder === true), className),
    style: (0, _objectSpread2.default)({
      height: height
    }, style),
    ref: getImgRef
  }, srcAndOnload, {
    width: width,
    height: height,
    onError: onError
  })), status === 'loading' && /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    className: "".concat(prefixCls, "-placeholder")
  }, placeholder), previewMask && canPreview && /*#__PURE__*/React.createElement("div", {
    className: (0, _classnames.default)("".concat(prefixCls, "-mask"), maskClassName),
    style: {
      display: (style === null || style === void 0 ? void 0 : style.display) === 'none' ? 'none' : undefined
    }
  }, previewMask)), !groupContext && canPreview && /*#__PURE__*/React.createElement(_Preview.default, (0, _extends2.default)({
    "aria-hidden": !isShowPreview,
    visible: isShowPreview,
    prefixCls: previewPrefixCls,
    onClose: onPreviewClose,
    mousePosition: mousePosition,
    src: src,
    alt: alt,
    fallback: fallback,
    getContainer: getPreviewContainer,
    icons: icons,
    movable: movable,
    scaleStep: scaleStep,
    minScale: minScale,
    maxScale: maxScale,
    rootClassName: rootClassName,
    imageRender: imageRender,
    imgCommonProps: imgCommonProps,
    toolbarRender: toolbarRender
  }, dialogProps)));
};
ImageInternal.PreviewGroup = _PreviewGroup.default;
ImageInternal.displayName = 'Image';
var _default = ImageInternal;
exports.default = _default;