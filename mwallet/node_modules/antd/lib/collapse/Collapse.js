"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _RightOutlined = _interopRequireDefault(require("@ant-design/icons/RightOutlined"));
var _classnames = _interopRequireDefault(require("classnames"));
var _rcCollapse = _interopRequireDefault(require("rc-collapse"));
var _toArray = _interopRequireDefault(require("rc-util/lib/Children/toArray"));
var _omit = _interopRequireDefault(require("rc-util/lib/omit"));
var React = _interopRequireWildcard(require("react"));
var _motion = _interopRequireDefault(require("../_util/motion"));
var _reactNode = require("../_util/reactNode");
var _warning = _interopRequireDefault(require("../_util/warning"));
var _configProvider = require("../config-provider");
var _useSize = _interopRequireDefault(require("../config-provider/hooks/useSize"));
var _CollapsePanel = _interopRequireDefault(require("./CollapsePanel"));
var _style = _interopRequireDefault(require("./style"));
const Collapse = /*#__PURE__*/React.forwardRef((props, ref) => {
  const {
    getPrefixCls,
    direction,
    collapse
  } = React.useContext(_configProvider.ConfigContext);
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    style,
    bordered = true,
    ghost,
    size: customizeSize,
    expandIconPosition = 'start',
    children,
    expandIcon
  } = props;
  const mergedSize = (0, _useSize.default)(ctx => {
    var _a;
    return (_a = customizeSize !== null && customizeSize !== void 0 ? customizeSize : ctx) !== null && _a !== void 0 ? _a : 'middle';
  });
  const prefixCls = getPrefixCls('collapse', customizePrefixCls);
  const rootPrefixCls = getPrefixCls();
  const [wrapSSR, hashId] = (0, _style.default)(prefixCls);
  // Warning if use legacy type `expandIconPosition`
  process.env.NODE_ENV !== "production" ? (0, _warning.default)(expandIconPosition !== 'left' && expandIconPosition !== 'right', 'Collapse', '`expandIconPosition` with `left` or `right` is deprecated. Please use `start` or `end` instead.') : void 0;
  // Align with logic position
  const mergedExpandIconPosition = React.useMemo(() => {
    if (expandIconPosition === 'left') {
      return 'start';
    }
    return expandIconPosition === 'right' ? 'end' : expandIconPosition;
  }, [expandIconPosition]);
  const renderExpandIcon = function () {
    let panelProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const icon = expandIcon ? expandIcon(panelProps) : /*#__PURE__*/React.createElement(_RightOutlined.default, {
      rotate: panelProps.isActive ? 90 : undefined
    });
    return (0, _reactNode.cloneElement)(icon, () => ({
      className: (0, _classnames.default)(icon.props.className, `${prefixCls}-arrow`)
    }));
  };
  const collapseClassName = (0, _classnames.default)(`${prefixCls}-icon-position-${mergedExpandIconPosition}`, {
    [`${prefixCls}-borderless`]: !bordered,
    [`${prefixCls}-rtl`]: direction === 'rtl',
    [`${prefixCls}-ghost`]: !!ghost,
    [`${prefixCls}-${mergedSize}`]: mergedSize !== 'middle'
  }, collapse === null || collapse === void 0 ? void 0 : collapse.className, className, rootClassName, hashId);
  const openMotion = Object.assign(Object.assign({}, (0, _motion.default)(rootPrefixCls)), {
    motionAppear: false,
    leavedClassName: `${prefixCls}-content-hidden`
  });
  const items = React.useMemo(() => children ? (0, _toArray.default)(children).map((child, index) => {
    var _a, _b;
    if ((_a = child.props) === null || _a === void 0 ? void 0 : _a.disabled) {
      const key = (_b = child.key) !== null && _b !== void 0 ? _b : String(index);
      const {
        disabled,
        collapsible
      } = child.props;
      const childProps = Object.assign(Object.assign({}, (0, _omit.default)(child.props, ['disabled'])), {
        key,
        collapsible: collapsible !== null && collapsible !== void 0 ? collapsible : disabled ? 'disabled' : undefined
      });
      return (0, _reactNode.cloneElement)(child, childProps);
    }
    return child;
  }) : null, [children]);
  return wrapSSR( /*#__PURE__*/React.createElement(_rcCollapse.default, Object.assign({
    ref: ref,
    openMotion: openMotion
  }, (0, _omit.default)(props, ['rootClassName']), {
    expandIcon: renderExpandIcon,
    prefixCls: prefixCls,
    className: collapseClassName,
    style: Object.assign(Object.assign({}, collapse === null || collapse === void 0 ? void 0 : collapse.style), style)
  }), items));
});
if (process.env.NODE_ENV !== 'production') {
  Collapse.displayName = 'Collapse';
}
var _default = Object.assign(Collapse, {
  Panel: _CollapsePanel.default
});
exports.default = _default;