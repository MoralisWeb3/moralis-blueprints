"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _qrCode = _interopRequireDefault(require("../qr-code"));
// Legacy path. Please use `qr-code` instead.
// Keep file here in case developer import directly from the old path.
var _default = _qrCode.default;
exports.default = _default;