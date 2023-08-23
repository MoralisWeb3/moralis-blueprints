"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Footer = void 0;
exports.renderCloseIcon = renderCloseIcon;
var _CloseOutlined = _interopRequireDefault(require("@ant-design/icons/CloseOutlined"));
var _react = _interopRequireDefault(require("react"));
var _button = _interopRequireDefault(require("../button"));
var _button2 = require("../button/button");
var _DisabledContext = require("../config-provider/DisabledContext");
var _locale = require("../locale");
var _locale2 = require("./locale");
function renderCloseIcon(prefixCls, closeIcon) {
  return /*#__PURE__*/_react.default.createElement("span", {
    className: `${prefixCls}-close-x`
  }, closeIcon || /*#__PURE__*/_react.default.createElement(_CloseOutlined.default, {
    className: `${prefixCls}-close-icon`
  }));
}
const Footer = props => {
  const {
    okText,
    okType = 'primary',
    cancelText,
    confirmLoading,
    onOk,
    onCancel,
    okButtonProps,
    cancelButtonProps
  } = props;
  const [locale] = (0, _locale.useLocale)('Modal', (0, _locale2.getConfirmLocale)());
  return /*#__PURE__*/_react.default.createElement(_DisabledContext.DisabledContextProvider, {
    disabled: false
  }, /*#__PURE__*/_react.default.createElement(_button.default, Object.assign({
    onClick: onCancel
  }, cancelButtonProps), cancelText || (locale === null || locale === void 0 ? void 0 : locale.cancelText)), /*#__PURE__*/_react.default.createElement(_button.default, Object.assign({}, (0, _button2.convertLegacyProps)(okType), {
    loading: confirmLoading,
    onClick: onOk
  }, okButtonProps), okText || (locale === null || locale === void 0 ? void 0 : locale.okText)));
};
exports.Footer = Footer;