"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof3 = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _classnames = _interopRequireDefault(require("classnames"));
var _react = _interopRequireWildcard(require("react"));
var _commonUtils = require("./utils/commonUtils");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof3(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var BaseInput = function BaseInput(props) {
  var _inputElement$props, _inputElement$props2;
  var inputElement = props.inputElement,
    prefixCls = props.prefixCls,
    prefix = props.prefix,
    suffix = props.suffix,
    addonBefore = props.addonBefore,
    addonAfter = props.addonAfter,
    className = props.className,
    style = props.style,
    disabled = props.disabled,
    readOnly = props.readOnly,
    focused = props.focused,
    triggerFocus = props.triggerFocus,
    allowClear = props.allowClear,
    value = props.value,
    handleReset = props.handleReset,
    hidden = props.hidden,
    classes = props.classes,
    classNames = props.classNames,
    dataAttrs = props.dataAttrs,
    styles = props.styles,
    components = props.components;
  var AffixWrapperComponent = (components === null || components === void 0 ? void 0 : components.affixWrapper) || 'span';
  var GroupWrapperComponent = (components === null || components === void 0 ? void 0 : components.groupWrapper) || 'span';
  var WrapperComponent = (components === null || components === void 0 ? void 0 : components.wrapper) || 'span';
  var GroupAddonComponent = (components === null || components === void 0 ? void 0 : components.groupAddon) || 'span';
  var containerRef = (0, _react.useRef)(null);
  var onInputClick = function onInputClick(e) {
    var _containerRef$current;
    if ((_containerRef$current = containerRef.current) !== null && _containerRef$current !== void 0 && _containerRef$current.contains(e.target)) {
      triggerFocus === null || triggerFocus === void 0 ? void 0 : triggerFocus();
    }
  };

  // ================== Clear Icon ================== //
  var getClearIcon = function getClearIcon() {
    var _clsx;
    if (!allowClear) {
      return null;
    }
    var needClear = !disabled && !readOnly && value;
    var clearIconCls = "".concat(prefixCls, "-clear-icon");
    var iconNode = (0, _typeof2.default)(allowClear) === 'object' && allowClear !== null && allowClear !== void 0 && allowClear.clearIcon ? allowClear.clearIcon : '✖';
    return /*#__PURE__*/_react.default.createElement("span", {
      onClick: handleReset
      // Do not trigger onBlur when clear input
      // https://github.com/ant-design/ant-design/issues/31200
      ,
      onMouseDown: function onMouseDown(e) {
        return e.preventDefault();
      },
      className: (0, _classnames.default)(clearIconCls, (_clsx = {}, (0, _defineProperty2.default)(_clsx, "".concat(clearIconCls, "-hidden"), !needClear), (0, _defineProperty2.default)(_clsx, "".concat(clearIconCls, "-has-suffix"), !!suffix), _clsx)),
      role: "button",
      tabIndex: -1
    }, iconNode);
  };
  var element = /*#__PURE__*/(0, _react.cloneElement)(inputElement, {
    value: value,
    hidden: hidden,
    className: (0, _classnames.default)((_inputElement$props = inputElement.props) === null || _inputElement$props === void 0 ? void 0 : _inputElement$props.className, !(0, _commonUtils.hasPrefixSuffix)(props) && !(0, _commonUtils.hasAddon)(props) && className) || null,
    style: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, (_inputElement$props2 = inputElement.props) === null || _inputElement$props2 === void 0 ? void 0 : _inputElement$props2.style), !(0, _commonUtils.hasPrefixSuffix)(props) && !(0, _commonUtils.hasAddon)(props) ? style : {})
  });

  // ================== Prefix & Suffix ================== //
  if ((0, _commonUtils.hasPrefixSuffix)(props)) {
    var _clsx2;
    var affixWrapperPrefixCls = "".concat(prefixCls, "-affix-wrapper");
    var affixWrapperCls = (0, _classnames.default)(affixWrapperPrefixCls, (_clsx2 = {}, (0, _defineProperty2.default)(_clsx2, "".concat(affixWrapperPrefixCls, "-disabled"), disabled), (0, _defineProperty2.default)(_clsx2, "".concat(affixWrapperPrefixCls, "-focused"), focused), (0, _defineProperty2.default)(_clsx2, "".concat(affixWrapperPrefixCls, "-readonly"), readOnly), (0, _defineProperty2.default)(_clsx2, "".concat(affixWrapperPrefixCls, "-input-with-clear-btn"), suffix && allowClear && value), _clsx2), !(0, _commonUtils.hasAddon)(props) && className, classes === null || classes === void 0 ? void 0 : classes.affixWrapper, classNames === null || classNames === void 0 ? void 0 : classNames.affixWrapper);
    var suffixNode = (suffix || allowClear) && /*#__PURE__*/_react.default.createElement("span", {
      className: (0, _classnames.default)("".concat(prefixCls, "-suffix"), classNames === null || classNames === void 0 ? void 0 : classNames.suffix),
      style: styles === null || styles === void 0 ? void 0 : styles.suffix
    }, getClearIcon(), suffix);
    element = /*#__PURE__*/_react.default.createElement(AffixWrapperComponent, (0, _extends2.default)({
      className: affixWrapperCls,
      style: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, !(0, _commonUtils.hasAddon)(props) ? style : undefined), styles === null || styles === void 0 ? void 0 : styles.affixWrapper),
      hidden: !(0, _commonUtils.hasAddon)(props) && hidden,
      onClick: onInputClick
    }, dataAttrs === null || dataAttrs === void 0 ? void 0 : dataAttrs.affixWrapper, {
      ref: containerRef
    }), prefix && /*#__PURE__*/_react.default.createElement("span", {
      className: (0, _classnames.default)("".concat(prefixCls, "-prefix"), classNames === null || classNames === void 0 ? void 0 : classNames.prefix),
      style: styles === null || styles === void 0 ? void 0 : styles.prefix
    }, prefix), /*#__PURE__*/(0, _react.cloneElement)(inputElement, {
      value: value,
      hidden: null
    }), suffixNode);
  }

  // ================== Addon ================== //
  if ((0, _commonUtils.hasAddon)(props)) {
    var wrapperCls = "".concat(prefixCls, "-group");
    var addonCls = "".concat(wrapperCls, "-addon");
    var mergedWrapperClassName = (0, _classnames.default)("".concat(prefixCls, "-wrapper"), wrapperCls, classes === null || classes === void 0 ? void 0 : classes.wrapper);
    var mergedGroupClassName = (0, _classnames.default)("".concat(prefixCls, "-group-wrapper"), className, classes === null || classes === void 0 ? void 0 : classes.group);

    // Need another wrapper for changing display:table to display:inline-block
    // and put style prop in wrapper
    return /*#__PURE__*/_react.default.createElement(GroupWrapperComponent, {
      className: mergedGroupClassName,
      style: style,
      hidden: hidden
    }, /*#__PURE__*/_react.default.createElement(WrapperComponent, {
      className: mergedWrapperClassName
    }, addonBefore && /*#__PURE__*/_react.default.createElement(GroupAddonComponent, {
      className: addonCls
    }, addonBefore), /*#__PURE__*/(0, _react.cloneElement)(element, {
      hidden: null
    }), addonAfter && /*#__PURE__*/_react.default.createElement(GroupAddonComponent, {
      className: addonCls
    }, addonAfter)));
  }
  return element;
};
var _default = BaseInput;
exports.default = _default;