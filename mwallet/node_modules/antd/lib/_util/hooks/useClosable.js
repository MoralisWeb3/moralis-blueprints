"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useClosable;
var _CloseOutlined = _interopRequireDefault(require("@ant-design/icons/CloseOutlined"));
var _react = _interopRequireDefault(require("react"));
function useInnerClosable(closable, closeIcon, defaultClosable) {
  if (typeof closable === 'boolean') {
    return closable;
  }
  if (closeIcon === undefined) {
    return !!defaultClosable;
  }
  return closeIcon !== false && closeIcon !== null;
}
function useClosable(closable, closeIcon, customCloseIconRender) {
  let defaultCloseIcon = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : /*#__PURE__*/_react.default.createElement(_CloseOutlined.default, null);
  let defaultClosable = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  const mergedClosable = useInnerClosable(closable, closeIcon, defaultClosable);
  if (!mergedClosable) {
    return [false, null];
  }
  const mergedCloseIcon = typeof closeIcon === 'boolean' || closeIcon === undefined || closeIcon === null ? defaultCloseIcon : closeIcon;
  return [true, customCloseIconRender ? customCloseIconRender(mergedCloseIcon) : mergedCloseIcon];
}