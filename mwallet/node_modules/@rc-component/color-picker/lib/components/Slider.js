"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _classnames = _interopRequireDefault(require("classnames"));
var _react = _interopRequireWildcard(require("react"));
var _useColorDrag3 = _interopRequireDefault(require("../hooks/useColorDrag"));
var _util = require("../util");
var _Palette = _interopRequireDefault(require("./Palette"));
var _Gradient = _interopRequireDefault(require("./Gradient"));
var _Handler = _interopRequireDefault(require("./Handler"));
var _Transform = _interopRequireDefault(require("./Transform"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var Slider = function Slider(_ref) {
  var gradientColors = _ref.gradientColors,
    direction = _ref.direction,
    _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'hue' : _ref$type,
    color = _ref.color,
    value = _ref.value,
    onChange = _ref.onChange,
    onChangeComplete = _ref.onChangeComplete,
    disabled = _ref.disabled,
    prefixCls = _ref.prefixCls;
  var sliderRef = (0, _react.useRef)();
  var transformRef = (0, _react.useRef)();
  var colorRef = (0, _react.useRef)(color);
  var _useColorDrag = (0, _useColorDrag3.default)({
      color: color,
      targetRef: transformRef,
      containerRef: sliderRef,
      calculate: function calculate(containerRef) {
        return (0, _util.calculateOffset)(containerRef, transformRef, color, type);
      },
      onDragChange: function onDragChange(offsetValue) {
        var calcColor = (0, _util.calculateColor)({
          offset: offsetValue,
          targetRef: transformRef,
          containerRef: sliderRef,
          color: color,
          type: type
        });
        colorRef.current = calcColor;
        onChange(calcColor);
      },
      onDragChangeComplete: function onDragChangeComplete() {
        onChangeComplete === null || onChangeComplete === void 0 ? void 0 : onChangeComplete(colorRef.current, type);
      },
      direction: 'x',
      disabledDrag: disabled
    }),
    _useColorDrag2 = (0, _slicedToArray2.default)(_useColorDrag, 2),
    offset = _useColorDrag2[0],
    dragStartHandle = _useColorDrag2[1];
  return /*#__PURE__*/_react.default.createElement("div", {
    ref: sliderRef,
    className: (0, _classnames.default)("".concat(prefixCls, "-slider"), "".concat(prefixCls, "-slider-").concat(type)),
    onMouseDown: dragStartHandle,
    onTouchStart: dragStartHandle
  }, /*#__PURE__*/_react.default.createElement(_Palette.default, {
    prefixCls: prefixCls
  }, /*#__PURE__*/_react.default.createElement(_Transform.default, {
    offset: offset,
    ref: transformRef
  }, /*#__PURE__*/_react.default.createElement(_Handler.default, {
    size: "small",
    color: value,
    prefixCls: prefixCls
  })), /*#__PURE__*/_react.default.createElement(_Gradient.default, {
    colors: gradientColors,
    direction: direction,
    type: type,
    prefixCls: prefixCls
  })));
};
var _default = Slider;
exports.default = _default;