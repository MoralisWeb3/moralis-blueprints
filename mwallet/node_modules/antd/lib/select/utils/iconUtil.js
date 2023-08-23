"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getIcons;
var _CheckOutlined = _interopRequireDefault(require("@ant-design/icons/CheckOutlined"));
var _CloseCircleFilled = _interopRequireDefault(require("@ant-design/icons/CloseCircleFilled"));
var _CloseOutlined = _interopRequireDefault(require("@ant-design/icons/CloseOutlined"));
var _DownOutlined = _interopRequireDefault(require("@ant-design/icons/DownOutlined"));
var _LoadingOutlined = _interopRequireDefault(require("@ant-design/icons/LoadingOutlined"));
var _SearchOutlined = _interopRequireDefault(require("@ant-design/icons/SearchOutlined"));
var React = _interopRequireWildcard(require("react"));
var _warning = _interopRequireDefault(require("../../_util/warning"));
function getIcons(_ref) {
  let {
    suffixIcon,
    clearIcon,
    menuItemSelectedIcon,
    removeIcon,
    loading,
    multiple,
    hasFeedback,
    prefixCls,
    showSuffixIcon,
    feedbackIcon,
    showArrow,
    componentName
  } = _ref;
  if (process.env.NODE_ENV !== 'production') {
    process.env.NODE_ENV !== "production" ? (0, _warning.default)(!clearIcon, componentName, '`clearIcon` is deprecated, please use `allowClear={{ clearIcon: React.ReactNode }}` instead.') : void 0;
  }
  // Clear Icon
  const mergedClearIcon = clearIcon !== null && clearIcon !== void 0 ? clearIcon : /*#__PURE__*/React.createElement(_CloseCircleFilled.default, null);
  // Validation Feedback Icon
  const getSuffixIconNode = arrowIcon => {
    if (suffixIcon === null && !hasFeedback && !showArrow) {
      return null;
    }
    return /*#__PURE__*/React.createElement(React.Fragment, null, showSuffixIcon !== false && arrowIcon, hasFeedback && feedbackIcon);
  };
  // Arrow item icon
  let mergedSuffixIcon = null;
  if (suffixIcon !== undefined) {
    mergedSuffixIcon = getSuffixIconNode(suffixIcon);
  } else if (loading) {
    mergedSuffixIcon = getSuffixIconNode( /*#__PURE__*/React.createElement(_LoadingOutlined.default, {
      spin: true
    }));
  } else {
    const iconCls = `${prefixCls}-suffix`;
    mergedSuffixIcon = _ref2 => {
      let {
        open,
        showSearch
      } = _ref2;
      if (open && showSearch) {
        return getSuffixIconNode( /*#__PURE__*/React.createElement(_SearchOutlined.default, {
          className: iconCls
        }));
      }
      return getSuffixIconNode( /*#__PURE__*/React.createElement(_DownOutlined.default, {
        className: iconCls
      }));
    };
  }
  // Checked item icon
  let mergedItemIcon = null;
  if (menuItemSelectedIcon !== undefined) {
    mergedItemIcon = menuItemSelectedIcon;
  } else if (multiple) {
    mergedItemIcon = /*#__PURE__*/React.createElement(_CheckOutlined.default, null);
  } else {
    mergedItemIcon = null;
  }
  let mergedRemoveIcon = null;
  if (removeIcon !== undefined) {
    mergedRemoveIcon = removeIcon;
  } else {
    mergedRemoveIcon = /*#__PURE__*/React.createElement(_CloseOutlined.default, null);
  }
  return {
    clearIcon: mergedClearIcon,
    suffixIcon: mergedSuffixIcon,
    itemIcon: mergedItemIcon,
    removeIcon: mergedRemoveIcon
  };
}