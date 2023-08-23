"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _useColorDrag3 = _interopRequireDefault(require("../hooks/useColorDrag"));
var _util = require("../util");
var _Handler = _interopRequireDefault(require("./Handler"));
var _Palette = _interopRequireDefault(require("./Palette"));
var _Transform = _interopRequireDefault(require("./Transform"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var Picker = function Picker(_ref) {
  var color = _ref.color,
    onChange = _ref.onChange,
    prefixCls = _ref.prefixCls,
    onChangeComplete = _ref.onChangeComplete,
    disabled = _ref.disabled;
  var pickerRef = (0, _react.useRef)();
  var transformRef = (0, _react.useRef)();
  var colorRef = (0, _react.useRef)(color);
  var _useColorDrag = (0, _useColorDrag3.default)({
      color: color,
      containerRef: pickerRef,
      targetRef: transformRef,
      calculate: function calculate(containerRef) {
        return (0, _util.calculateOffset)(containerRef, transformRef, color);
      },
      onDragChange: function onDragChange(offsetValue) {
        var calcColor = (0, _util.calculateColor)({
          offset: offsetValue,
          targetRef: transformRef,
          containerRef: pickerRef,
          color: color
        });
        colorRef.current = calcColor;
        onChange(calcColor);
      },
      onDragChangeComplete: function onDragChangeComplete() {
        return onChangeComplete === null || onChangeComplete === void 0 ? void 0 : onChangeComplete(colorRef.current);
      },
      disabledDrag: disabled
    }),
    _useColorDrag2 = (0, _slicedToArray2.default)(_useColorDrag, 2),
    offset = _useColorDrag2[0],
    dragStartHandle = _useColorDrag2[1];
  return /*#__PURE__*/_react.default.createElement("div", {
    ref: pickerRef,
    className: "".concat(prefixCls, "-select"),
    onMouseDown: dragStartHandle,
    onTouchStart: dragStartHandle
  }, /*#__PURE__*/_react.default.createElement(_Palette.default, {
    prefixCls: prefixCls
  }, /*#__PURE__*/_react.default.createElement(_Transform.default, {
    offset: offset,
    ref: transformRef
  }, /*#__PURE__*/_react.default.createElement(_Handler.default, {
    color: color.toRgbString(),
    prefixCls: prefixCls
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(prefixCls, "-saturation"),
    style: {
      backgroundColor: "hsl(".concat(color.toHsb().h, ",100%, 50%)"),
      backgroundImage: 'linear-gradient(0deg, #000, transparent),linear-gradient(90deg, #fff, hsla(0, 0%, 100%, 0))'
    }
  })));
};
var _default = Picker;
exports.default = _default;