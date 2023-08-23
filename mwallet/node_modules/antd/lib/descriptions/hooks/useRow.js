"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _toArray = _interopRequireDefault(require("rc-util/lib/Children/toArray"));
var _react = require("react");
var _warning = _interopRequireDefault(require("../../_util/warning"));
function getFilledItem(rowItem, rowRestCol, span) {
  let clone = rowItem;
  if (span === undefined || span > rowRestCol) {
    clone = Object.assign(Object.assign({}, rowItem), {
      span: rowRestCol
    });
    process.env.NODE_ENV !== "production" ? (0, _warning.default)(span === undefined, 'Descriptions', 'Sum of column `span` in a line not match `column` of Descriptions.') : void 0;
  }
  return clone;
}
// Convert children into items
const transChildren2Items = childNodes => (0, _toArray.default)(childNodes).map(node => Object.assign({}, node === null || node === void 0 ? void 0 : node.props));
// Calculate the sum of span in a row
function getCalcRows(rowItems, mergedColumn) {
  const rows = [];
  let tmpRow = [];
  let rowRestCol = mergedColumn;
  rowItems.filter(n => n).forEach((rowItem, index) => {
    const span = rowItem === null || rowItem === void 0 ? void 0 : rowItem.span;
    const mergedSpan = span || 1;
    // Additional handle last one
    if (index === rowItems.length - 1) {
      tmpRow.push(getFilledItem(rowItem, rowRestCol, span));
      rows.push(tmpRow);
      return;
    }
    if (mergedSpan < rowRestCol) {
      rowRestCol -= mergedSpan;
      tmpRow.push(rowItem);
    } else {
      tmpRow.push(getFilledItem(rowItem, rowRestCol, mergedSpan));
      rows.push(tmpRow);
      rowRestCol = mergedColumn;
      tmpRow = [];
    }
  });
  return rows;
}
const useRow = (mergedColumn, items, children) => {
  const rows = (0, _react.useMemo)(() => {
    if (Array.isArray(items)) {
      return getCalcRows(items, mergedColumn);
    }
    return getCalcRows(transChildren2Items(children), mergedColumn);
  }, [items, children, mergedColumn]);
  return rows;
};
var _default = useRow;
exports.default = _default;