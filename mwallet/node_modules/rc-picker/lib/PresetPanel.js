"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PresetPanel;
var React = _interopRequireWildcard(require("react"));
var _miscUtil = require("./utils/miscUtil");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function PresetPanel(props) {
  var prefixCls = props.prefixCls,
    presets = props.presets,
    _onClick = props.onClick,
    onHover = props.onHover;
  if (!presets.length) {
    return null;
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-presets")
  }, /*#__PURE__*/React.createElement("ul", null, presets.map(function (_ref, index) {
    var label = _ref.label,
      value = _ref.value;
    return /*#__PURE__*/React.createElement("li", {
      key: index,
      onClick: function onClick() {
        return _onClick === null || _onClick === void 0 ? void 0 : _onClick((0, _miscUtil.executeValue)(value));
      },
      onMouseEnter: function onMouseEnter() {
        return onHover === null || onHover === void 0 ? void 0 : onHover((0, _miscUtil.executeValue)(value));
      },
      onMouseLeave: function onMouseLeave() {
        return onHover === null || onHover === void 0 ? void 0 : onHover(null);
      }
    }, label);
  })));
}