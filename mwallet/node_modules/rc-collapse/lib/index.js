'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');
Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = exports.Panel = void 0;
var _Collapse = _interopRequireDefault(require('./Collapse'));
var _default = _Collapse.default;
/**
 * @deprecated use `items` instead, will be removed in `v4.0.0`
 */
exports.default = _default;
var Panel = _Collapse.default.Panel;
exports.Panel = Panel;
