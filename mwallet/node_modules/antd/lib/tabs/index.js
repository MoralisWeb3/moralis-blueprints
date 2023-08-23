"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CloseOutlined = _interopRequireDefault(require("@ant-design/icons/CloseOutlined"));
var _EllipsisOutlined = _interopRequireDefault(require("@ant-design/icons/EllipsisOutlined"));
var _PlusOutlined = _interopRequireDefault(require("@ant-design/icons/PlusOutlined"));
var _classnames = _interopRequireDefault(require("classnames"));
var _rcTabs = _interopRequireDefault(require("rc-tabs"));
var React = _interopRequireWildcard(require("react"));
var _warning = _interopRequireDefault(require("../_util/warning"));
var _configProvider = require("../config-provider");
var _useSize = _interopRequireDefault(require("../config-provider/hooks/useSize"));
var _TabPane = _interopRequireDefault(require("./TabPane"));
var _useAnimateConfig = _interopRequireDefault(require("./hooks/useAnimateConfig"));
var _useLegacyItems = _interopRequireDefault(require("./hooks/useLegacyItems"));
var _style = _interopRequireDefault(require("./style"));
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const Tabs = props => {
  const {
      type,
      className,
      rootClassName,
      size: customSize,
      onEdit,
      hideAdd,
      centered,
      addIcon,
      popupClassName,
      children,
      items,
      animated,
      style
    } = props,
    otherProps = __rest(props, ["type", "className", "rootClassName", "size", "onEdit", "hideAdd", "centered", "addIcon", "popupClassName", "children", "items", "animated", "style"]);
  const {
    prefixCls: customizePrefixCls,
    moreIcon = /*#__PURE__*/React.createElement(_EllipsisOutlined.default, null)
  } = otherProps;
  const {
    direction,
    tabs,
    getPrefixCls,
    getPopupContainer
  } = React.useContext(_configProvider.ConfigContext);
  const prefixCls = getPrefixCls('tabs', customizePrefixCls);
  const [wrapSSR, hashId] = (0, _style.default)(prefixCls);
  let editable;
  if (type === 'editable-card') {
    editable = {
      onEdit: (editType, _ref) => {
        let {
          key,
          event
        } = _ref;
        onEdit === null || onEdit === void 0 ? void 0 : onEdit(editType === 'add' ? event : key, editType);
      },
      removeIcon: /*#__PURE__*/React.createElement(_CloseOutlined.default, null),
      addIcon: addIcon || /*#__PURE__*/React.createElement(_PlusOutlined.default, null),
      showAdd: hideAdd !== true
    };
  }
  const rootPrefixCls = getPrefixCls();
  process.env.NODE_ENV !== "production" ? (0, _warning.default)(!('onPrevClick' in props) && !('onNextClick' in props), 'Tabs', '`onPrevClick` and `onNextClick` has been removed. Please use `onTabScroll` instead.') : void 0;
  const mergedItems = (0, _useLegacyItems.default)(items, children);
  const mergedAnimated = (0, _useAnimateConfig.default)(prefixCls, animated);
  const size = (0, _useSize.default)(customSize);
  const mergedStyle = Object.assign(Object.assign({}, tabs === null || tabs === void 0 ? void 0 : tabs.style), style);
  return wrapSSR( /*#__PURE__*/React.createElement(_rcTabs.default, Object.assign({
    direction: direction,
    getPopupContainer: getPopupContainer,
    moreTransitionName: `${rootPrefixCls}-slide-up`
  }, otherProps, {
    items: mergedItems,
    className: (0, _classnames.default)({
      [`${prefixCls}-${size}`]: size,
      [`${prefixCls}-card`]: ['card', 'editable-card'].includes(type),
      [`${prefixCls}-editable-card`]: type === 'editable-card',
      [`${prefixCls}-centered`]: centered
    }, tabs === null || tabs === void 0 ? void 0 : tabs.className, className, rootClassName, hashId),
    popupClassName: (0, _classnames.default)(popupClassName, hashId),
    style: mergedStyle,
    editable: editable,
    moreIcon: moreIcon,
    prefixCls: prefixCls,
    animated: mergedAnimated
  })));
};
Tabs.TabPane = _TabPane.default;
if (process.env.NODE_ENV !== 'production') {
  Tabs.displayName = 'Tabs';
}
var _default = Tabs;
exports.default = _default;