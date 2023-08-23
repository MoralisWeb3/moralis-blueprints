"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CheckCircleFilled = _interopRequireDefault(require("@ant-design/icons/CheckCircleFilled"));
var _CloseCircleFilled = _interopRequireDefault(require("@ant-design/icons/CloseCircleFilled"));
var _CloseOutlined = _interopRequireDefault(require("@ant-design/icons/CloseOutlined"));
var _ExclamationCircleFilled = _interopRequireDefault(require("@ant-design/icons/ExclamationCircleFilled"));
var _InfoCircleFilled = _interopRequireDefault(require("@ant-design/icons/InfoCircleFilled"));
var _classnames = _interopRequireDefault(require("classnames"));
var _rcMotion = _interopRequireDefault(require("rc-motion"));
var _pickAttrs = _interopRequireDefault(require("rc-util/lib/pickAttrs"));
var React = _interopRequireWildcard(require("react"));
var _reactNode = require("../_util/reactNode");
var _warning = _interopRequireDefault(require("../_util/warning"));
var _configProvider = require("../config-provider");
var _style = _interopRequireDefault(require("./style"));
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

// CSSINJS

const iconMapFilled = {
  success: _CheckCircleFilled.default,
  info: _InfoCircleFilled.default,
  error: _CloseCircleFilled.default,
  warning: _ExclamationCircleFilled.default
};
const IconNode = props => {
  const {
    icon,
    prefixCls,
    type
  } = props;
  const iconType = iconMapFilled[type] || null;
  if (icon) {
    return (0, _reactNode.replaceElement)(icon, /*#__PURE__*/React.createElement("span", {
      className: `${prefixCls}-icon`
    }, icon), () => ({
      className: (0, _classnames.default)(`${prefixCls}-icon`, {
        [icon.props.className]: icon.props.className
      })
    }));
  }
  return /*#__PURE__*/React.createElement(iconType, {
    className: `${prefixCls}-icon`
  });
};
const CloseIcon = props => {
  const {
    isClosable,
    prefixCls,
    closeIcon,
    handleClose
  } = props;
  const mergedCloseIcon = closeIcon === true || closeIcon === undefined ? /*#__PURE__*/React.createElement(_CloseOutlined.default, null) : closeIcon;
  return isClosable ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: handleClose,
    className: `${prefixCls}-close-icon`,
    tabIndex: 0
  }, mergedCloseIcon) : null;
};
const Alert = props => {
  const {
      description,
      prefixCls: customizePrefixCls,
      message,
      banner,
      className,
      rootClassName,
      style,
      onMouseEnter,
      onMouseLeave,
      onClick,
      afterClose,
      showIcon,
      closable,
      closeText,
      closeIcon,
      action
    } = props,
    otherProps = __rest(props, ["description", "prefixCls", "message", "banner", "className", "rootClassName", "style", "onMouseEnter", "onMouseLeave", "onClick", "afterClose", "showIcon", "closable", "closeText", "closeIcon", "action"]);
  const [closed, setClosed] = React.useState(false);
  if (process.env.NODE_ENV !== 'production') {
    process.env.NODE_ENV !== "production" ? (0, _warning.default)(!closeText, 'Alert', '`closeText` is deprecated. Please use `closeIcon` instead.') : void 0;
  }
  const ref = React.useRef(null);
  const {
    getPrefixCls,
    direction,
    alert
  } = React.useContext(_configProvider.ConfigContext);
  const prefixCls = getPrefixCls('alert', customizePrefixCls);
  const [wrapSSR, hashId] = (0, _style.default)(prefixCls);
  const handleClose = e => {
    var _a;
    setClosed(true);
    (_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props, e);
  };
  const type = React.useMemo(() => {
    if (props.type !== undefined) {
      return props.type;
    }
    // banner mode defaults to 'warning'
    return banner ? 'warning' : 'info';
  }, [props.type, banner]);
  // closeable when closeText or closeIcon is assigned
  const isClosable = React.useMemo(() => {
    if (closeText) {
      return true;
    }
    if (typeof closable === 'boolean') {
      return closable;
    }
    // should be true when closeIcon is 0 or ''
    return closeIcon !== false && closeIcon !== null && closeIcon !== undefined;
  }, [closeText, closeIcon, closable]);
  // banner mode defaults to Icon
  const isShowIcon = banner && showIcon === undefined ? true : showIcon;
  const alertCls = (0, _classnames.default)(prefixCls, `${prefixCls}-${type}`, {
    [`${prefixCls}-with-description`]: !!description,
    [`${prefixCls}-no-icon`]: !isShowIcon,
    [`${prefixCls}-banner`]: !!banner,
    [`${prefixCls}-rtl`]: direction === 'rtl'
  }, alert === null || alert === void 0 ? void 0 : alert.className, className, rootClassName, hashId);
  const restProps = (0, _pickAttrs.default)(otherProps, {
    aria: true,
    data: true
  });
  return wrapSSR( /*#__PURE__*/React.createElement(_rcMotion.default, {
    visible: !closed,
    motionName: `${prefixCls}-motion`,
    motionAppear: false,
    motionEnter: false,
    onLeaveStart: node => ({
      maxHeight: node.offsetHeight
    }),
    onLeaveEnd: afterClose
  }, _ref => {
    let {
      className: motionClassName,
      style: motionStyle
    } = _ref;
    return /*#__PURE__*/React.createElement("div", Object.assign({
      ref: ref,
      "data-show": !closed,
      className: (0, _classnames.default)(alertCls, motionClassName),
      style: Object.assign(Object.assign(Object.assign({}, alert === null || alert === void 0 ? void 0 : alert.style), style), motionStyle),
      onMouseEnter: onMouseEnter,
      onMouseLeave: onMouseLeave,
      onClick: onClick,
      role: "alert"
    }, restProps), isShowIcon ? /*#__PURE__*/React.createElement(IconNode, {
      description: description,
      icon: props.icon,
      prefixCls: prefixCls,
      type: type
    }) : null, /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-content`
    }, message ? /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-message`
    }, message) : null, description ? /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-description`
    }, description) : null), action ? /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-action`
    }, action) : null, /*#__PURE__*/React.createElement(CloseIcon, {
      isClosable: isClosable,
      prefixCls: prefixCls,
      closeIcon: closeText || closeIcon,
      handleClose: handleClose
    }));
  }));
};
if (process.env.NODE_ENV !== 'production') {
  Alert.displayName = 'Alert';
}
var _default = Alert;
exports.default = _default;