"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _useMergedState = _interopRequireDefault(require("rc-util/lib/hooks/useMergedState"));
var _react = require("react");
/**
 * returns the merged type of a step or the default type.
 */
const useMergedType = _ref => {
  let {
    defaultType,
    steps = [],
    current,
    defaultCurrent
  } = _ref;
  var _a;
  const [innerCurrent, updateInnerCurrent] = (0, _useMergedState.default)(defaultCurrent, {
    value: current
  });
  (0, _react.useLayoutEffect)(() => {
    if (current === undefined) return;
    updateInnerCurrent(current);
  }, [current]);
  const innerType = typeof innerCurrent === 'number' ? (_a = steps[innerCurrent]) === null || _a === void 0 ? void 0 : _a.type : defaultType;
  const currentMergedType = innerType !== null && innerType !== void 0 ? innerType : defaultType;
  return {
    currentMergedType,
    updateInnerCurrent
  };
};
var _default = useMergedType;
exports.default = _default;