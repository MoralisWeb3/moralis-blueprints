"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useFormWarning;
var _react = require("react");
var _warning = _interopRequireDefault(require("../../_util/warning"));
const names = {};
function useFormWarning(_ref) {
  let {
    name
  } = _ref;
  (0, _react.useEffect)(() => {
    if (name) {
      names[name] = (names[name] || 0) + 1;
      process.env.NODE_ENV !== "production" ? (0, _warning.default)(names[name] <= 1, 'Form', 'There exist multiple Form with same `name`.') : void 0;
      return () => {
        names[name] -= 1;
      };
    }
  }, [name]);
}