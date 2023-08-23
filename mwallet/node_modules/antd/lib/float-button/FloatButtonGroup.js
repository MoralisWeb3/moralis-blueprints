"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CloseOutlined = _interopRequireDefault(require("@ant-design/icons/CloseOutlined"));
var _FileTextOutlined = _interopRequireDefault(require("@ant-design/icons/FileTextOutlined"));
var _classnames = _interopRequireDefault(require("classnames"));
var _rcMotion = _interopRequireDefault(require("rc-motion"));
var _useMergedState = _interopRequireDefault(require("rc-util/lib/hooks/useMergedState"));
var _react = _interopRequireWildcard(require("react"));
var _warning = _interopRequireDefault(require("../_util/warning"));
var _configProvider = require("../config-provider");
var _FloatButton = _interopRequireWildcard(require("./FloatButton"));
var _context = require("./context");
var _style = _interopRequireDefault(require("./style"));
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const FloatButtonGroup = props => {
  const {
      prefixCls: customizePrefixCls,
      className,
      style,
      shape = 'circle',
      type = 'default',
      icon = /*#__PURE__*/_react.default.createElement(_FileTextOutlined.default, null),
      closeIcon = /*#__PURE__*/_react.default.createElement(_CloseOutlined.default, null),
      description,
      trigger,
      children,
      onOpenChange,
      open: customOpen
    } = props,
    floatButtonProps = __rest(props, ["prefixCls", "className", "style", "shape", "type", "icon", "closeIcon", "description", "trigger", "children", "onOpenChange", "open"]);
  const {
    direction,
    getPrefixCls
  } = (0, _react.useContext)(_configProvider.ConfigContext);
  const prefixCls = getPrefixCls(_FloatButton.floatButtonPrefixCls, customizePrefixCls);
  const [wrapSSR, hashId] = (0, _style.default)(prefixCls);
  const groupPrefixCls = `${prefixCls}-group`;
  const groupCls = (0, _classnames.default)(groupPrefixCls, hashId, className, {
    [`${groupPrefixCls}-rtl`]: direction === 'rtl',
    [`${groupPrefixCls}-${shape}`]: shape,
    [`${groupPrefixCls}-${shape}-shadow`]: !trigger
  });
  const wrapperCls = (0, _classnames.default)(hashId, `${groupPrefixCls}-wrap`);
  const [open, setOpen] = (0, _useMergedState.default)(false, {
    value: customOpen
  });
  const floatButtonGroupRef = (0, _react.useRef)(null);
  const floatButtonRef = (0, _react.useRef)(null);
  const hoverAction = (0, _react.useMemo)(() => {
    const hoverTypeAction = {
      onMouseEnter() {
        setOpen(true);
        onOpenChange === null || onOpenChange === void 0 ? void 0 : onOpenChange(true);
      },
      onMouseLeave() {
        setOpen(false);
        onOpenChange === null || onOpenChange === void 0 ? void 0 : onOpenChange(false);
      }
    };
    return trigger === 'hover' ? hoverTypeAction : {};
  }, [trigger]);
  const handleOpenChange = () => {
    setOpen(prevState => {
      onOpenChange === null || onOpenChange === void 0 ? void 0 : onOpenChange(!prevState);
      return !prevState;
    });
  };
  const onClick = (0, _react.useCallback)(e => {
    var _a, _b;
    if ((_a = floatButtonGroupRef.current) === null || _a === void 0 ? void 0 : _a.contains(e.target)) {
      if ((_b = floatButtonRef.current) === null || _b === void 0 ? void 0 : _b.contains(e.target)) {
        handleOpenChange();
      }
      return;
    }
    setOpen(false);
    onOpenChange === null || onOpenChange === void 0 ? void 0 : onOpenChange(false);
  }, [trigger]);
  (0, _react.useEffect)(() => {
    if (trigger === 'click') {
      document.addEventListener('click', onClick);
      return () => {
        document.removeEventListener('click', onClick);
      };
    }
  }, [trigger]);
  // =================== Warning =====================
  if (process.env.NODE_ENV !== 'production') {
    process.env.NODE_ENV !== "production" ? (0, _warning.default)(!('open' in props) || !!trigger, 'FloatButton.Group', '`open` need to be used together with `trigger`') : void 0;
  }
  return wrapSSR( /*#__PURE__*/_react.default.createElement(_context.FloatButtonGroupProvider, {
    value: shape
  }, /*#__PURE__*/_react.default.createElement("div", Object.assign({
    ref: floatButtonGroupRef,
    className: groupCls,
    style: style
  }, hoverAction), trigger && ['click', 'hover'].includes(trigger) ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_rcMotion.default, {
    visible: open,
    motionName: `${groupPrefixCls}-wrap`
  }, _ref => {
    let {
      className: motionClassName
    } = _ref;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: (0, _classnames.default)(motionClassName, wrapperCls)
    }, children);
  }), /*#__PURE__*/_react.default.createElement(_FloatButton.default, Object.assign({
    ref: floatButtonRef,
    type: type,
    shape: shape,
    icon: open ? closeIcon : icon,
    description: description,
    "aria-label": props['aria-label']
  }, floatButtonProps))) : children)));
};
var _default = /*#__PURE__*/(0, _react.memo)(FloatButtonGroup);
exports.default = _default;