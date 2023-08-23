"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCellRender = useCellRender;
var _react = _interopRequireDefault(require("react"));
function useCellRender(_ref) {
  var cellRender = _ref.cellRender,
    monthCellRender = _ref.monthCellRender,
    dateRender = _ref.dateRender;
  var mergedCellRender = _react.default.useMemo(function () {
    if (cellRender) return cellRender;
    if (!monthCellRender && !dateRender) return undefined;
    return function (current, info) {
      var date = current;
      if (dateRender && info.type === 'date') {
        return dateRender(date, info.today);
      }
      if (monthCellRender && info.type === 'month') {
        return monthCellRender(date, info.locale);
      }
      return info.originNode;
    };
  }, [cellRender, monthCellRender, dateRender]);
  return mergedCellRender;
}