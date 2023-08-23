"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanelPresetsProvider = exports.PanelPresetsContext = exports.PanelPickerProvider = exports.PanelPickerContext = void 0;
var _react = _interopRequireDefault(require("react"));
const PanelPickerContext = /*#__PURE__*/_react.default.createContext({});
exports.PanelPickerContext = PanelPickerContext;
const PanelPresetsContext = /*#__PURE__*/_react.default.createContext({});
exports.PanelPresetsContext = PanelPresetsContext;
const {
  Provider: PanelPickerProvider
} = PanelPickerContext;
exports.PanelPickerProvider = PanelPickerProvider;
const {
  Provider: PanelPresetsProvider
} = PanelPresetsContext;
exports.PanelPresetsProvider = PanelPresetsProvider;