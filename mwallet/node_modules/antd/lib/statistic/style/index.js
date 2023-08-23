"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _style = require("../../style");
var _internal = require("../../theme/internal");
const genStatisticStyle = token => {
  const {
    componentCls,
    marginXXS,
    padding,
    colorTextDescription,
    titleFontSize,
    colorTextHeading,
    contentFontSize,
    fontFamily
  } = token;
  return {
    [`${componentCls}`]: Object.assign(Object.assign({}, (0, _style.resetComponent)(token)), {
      [`${componentCls}-title`]: {
        marginBottom: marginXXS,
        color: colorTextDescription,
        fontSize: titleFontSize
      },
      [`${componentCls}-skeleton`]: {
        paddingTop: padding
      },
      [`${componentCls}-content`]: {
        color: colorTextHeading,
        fontSize: contentFontSize,
        fontFamily,
        [`${componentCls}-content-value`]: {
          display: 'inline-block',
          direction: 'ltr'
        },
        [`${componentCls}-content-prefix, ${componentCls}-content-suffix`]: {
          display: 'inline-block'
        },
        [`${componentCls}-content-prefix`]: {
          marginInlineEnd: marginXXS
        },
        [`${componentCls}-content-suffix`]: {
          marginInlineStart: marginXXS
        }
      }
    })
  };
};
// ============================== Export ==============================
var _default = (0, _internal.genComponentStyleHook)('Statistic', token => {
  const statisticToken = (0, _internal.mergeToken)(token, {});
  return [genStatisticStyle(statisticToken)];
}, token => {
  const {
    fontSizeHeading3,
    fontSize
  } = token;
  return {
    titleFontSize: fontSize,
    contentFontSize: fontSizeHeading3
  };
});
exports.default = _default;