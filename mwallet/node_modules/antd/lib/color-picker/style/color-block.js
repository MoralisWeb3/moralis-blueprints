"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTransBg = exports.default = void 0;
/**
 * @private Internal usage only
 */
const getTransBg = (size, colorFill) => ({
  backgroundImage: `conic-gradient(${colorFill} 0 25%, transparent 0 50%, ${colorFill} 0 75%, transparent 0)`,
  backgroundSize: `${size} ${size}`
});
exports.getTransBg = getTransBg;
const genColorBlockStyle = (token, size) => {
  const {
    componentCls,
    borderRadiusSM,
    colorPickerInsetShadow,
    lineWidth,
    colorFillSecondary
  } = token;
  return {
    [`${componentCls}-color-block`]: Object.assign(Object.assign({
      position: 'relative',
      borderRadius: borderRadiusSM,
      width: size,
      height: size,
      boxShadow: colorPickerInsetShadow
    }, getTransBg('50%', token.colorFillSecondary)), {
      [`${componentCls}-color-block-inner`]: {
        width: '100%',
        height: '100%',
        border: `${lineWidth}px solid ${colorFillSecondary}`,
        borderRadius: 'inherit'
      }
    })
  };
};
var _default = genColorBlockStyle;
exports.default = _default;