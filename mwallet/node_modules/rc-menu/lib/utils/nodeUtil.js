"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof3 = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseItems = parseItems;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var React = _interopRequireWildcard(require("react"));
var _MenuItemGroup = _interopRequireDefault(require("../MenuItemGroup"));
var _SubMenu = _interopRequireDefault(require("../SubMenu"));
var _Divider = _interopRequireDefault(require("../Divider"));
var _MenuItem = _interopRequireDefault(require("../MenuItem"));
var _commonUtil = require("./commonUtil");
var _excluded = ["label", "children", "key", "type"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof3(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function convertItemsToNodes(list) {
  return (list || []).map(function (opt, index) {
    if (opt && (0, _typeof2.default)(opt) === 'object') {
      var _ref = opt,
        label = _ref.label,
        children = _ref.children,
        key = _ref.key,
        type = _ref.type,
        restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
      var mergedKey = key !== null && key !== void 0 ? key : "tmp-".concat(index);

      // MenuItemGroup & SubMenuItem
      if (children || type === 'group') {
        if (type === 'group') {
          // Group
          return /*#__PURE__*/React.createElement(_MenuItemGroup.default, (0, _extends2.default)({
            key: mergedKey
          }, restProps, {
            title: label
          }), convertItemsToNodes(children));
        }

        // Sub Menu
        return /*#__PURE__*/React.createElement(_SubMenu.default, (0, _extends2.default)({
          key: mergedKey
        }, restProps, {
          title: label
        }), convertItemsToNodes(children));
      }

      // MenuItem & Divider
      if (type === 'divider') {
        return /*#__PURE__*/React.createElement(_Divider.default, (0, _extends2.default)({
          key: mergedKey
        }, restProps));
      }
      return /*#__PURE__*/React.createElement(_MenuItem.default, (0, _extends2.default)({
        key: mergedKey
      }, restProps), label);
    }
    return null;
  }).filter(function (opt) {
    return opt;
  });
}
function parseItems(children, items, keyPath) {
  var childNodes = children;
  if (items) {
    childNodes = convertItemsToNodes(items);
  }
  return (0, _commonUtil.parseChildren)(childNodes, keyPath);
}