"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ReloadOutlined = _interopRequireDefault(require("@ant-design/icons/ReloadOutlined"));
var _classnames = _interopRequireDefault(require("classnames"));
var _qrcode = require("qrcode.react");
var _react = _interopRequireWildcard(require("react"));
var _warning = _interopRequireDefault(require("../_util/warning"));
var _button = _interopRequireDefault(require("../button"));
var _configProvider = require("../config-provider");
var _locale = require("../locale");
var _spin = _interopRequireDefault(require("../spin"));
var _theme = _interopRequireDefault(require("../theme"));
var _index = _interopRequireDefault(require("./style/index"));
const {
  useToken
} = _theme.default;
const QRCode = props => {
  const {
    token
  } = useToken();
  const {
    value,
    type = 'canvas',
    icon = '',
    size = 160,
    iconSize = 40,
    color = token.colorText,
    errorLevel = 'M',
    status = 'active',
    bordered = true,
    onRefresh,
    style,
    className,
    rootClassName,
    prefixCls: customizePrefixCls,
    bgColor = 'transparent'
  } = props;
  const {
    getPrefixCls
  } = (0, _react.useContext)(_configProvider.ConfigContext);
  const prefixCls = getPrefixCls('qrcode', customizePrefixCls);
  const [wrapSSR, hashId] = (0, _index.default)(prefixCls);
  const imageSettings = {
    src: icon,
    x: undefined,
    y: undefined,
    height: iconSize,
    width: iconSize,
    excavate: true
  };
  const qrCodeProps = {
    value,
    size: size - (token.paddingSM + token.lineWidth) * 2,
    level: errorLevel,
    bgColor,
    fgColor: color,
    imageSettings: icon ? imageSettings : undefined
  };
  const [locale] = (0, _locale.useLocale)('QRCode');
  if (!value) {
    if (process.env.NODE_ENV !== 'production') {
      process.env.NODE_ENV !== "production" ? (0, _warning.default)(false, 'QRCode', 'need to receive `value` props') : void 0;
    }
    return null;
  }
  if (process.env.NODE_ENV !== 'production') {
    process.env.NODE_ENV !== "production" ? (0, _warning.default)(!(icon && errorLevel === 'L'), 'QRCode', 'ErrorLevel `L` is not recommended to be used with `icon`, for scanning result would be affected by low level.') : void 0;
  }
  const cls = (0, _classnames.default)(prefixCls, className, rootClassName, hashId, {
    [`${prefixCls}-borderless`]: !bordered
  });
  return wrapSSR( /*#__PURE__*/_react.default.createElement("div", {
    style: Object.assign(Object.assign({}, style), {
      width: size,
      height: size,
      backgroundColor: bgColor
    }),
    className: cls
  }, status !== 'active' && /*#__PURE__*/_react.default.createElement("div", {
    className: `${prefixCls}-mask`
  }, status === 'loading' && /*#__PURE__*/_react.default.createElement(_spin.default, null), status === 'expired' && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("p", {
    className: `${prefixCls}-expired`
  }, locale === null || locale === void 0 ? void 0 : locale.expired), onRefresh && /*#__PURE__*/_react.default.createElement(_button.default, {
    type: "link",
    icon: /*#__PURE__*/_react.default.createElement(_ReloadOutlined.default, null),
    onClick: onRefresh
  }, locale === null || locale === void 0 ? void 0 : locale.refresh))), type === 'canvas' ? /*#__PURE__*/_react.default.createElement(_qrcode.QRCodeCanvas, Object.assign({}, qrCodeProps)) : /*#__PURE__*/_react.default.createElement(_qrcode.QRCodeSVG, Object.assign({}, qrCodeProps))));
};
if (process.env.NODE_ENV !== 'production') {
  QRCode.displayName = 'QRCode';
}
var _default = QRCode;
exports.default = _default;