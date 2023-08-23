"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpaceContextProvider = exports.SpaceContext = void 0;
var _react = _interopRequireDefault(require("react"));
const SpaceContext = /*#__PURE__*/_react.default.createContext({
  latestIndex: 0,
  horizontalSize: 0,
  verticalSize: 0,
  supportFlexGap: false
});
exports.SpaceContext = SpaceContext;
const SpaceContextProvider = SpaceContext.Provider;
exports.SpaceContextProvider = SpaceContextProvider;