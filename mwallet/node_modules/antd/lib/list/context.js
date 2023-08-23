"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListContext = exports.ListConsumer = void 0;
var _react = _interopRequireDefault(require("react"));
const ListContext = /*#__PURE__*/_react.default.createContext({});
exports.ListContext = ListContext;
const ListConsumer = ListContext.Consumer;
exports.ListConsumer = ListConsumer;