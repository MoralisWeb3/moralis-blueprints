"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _colorPicker = require("@rc-component/color-picker");
var _classnames = _interopRequireDefault(require("classnames"));
var _useMergedState = _interopRequireDefault(require("rc-util/lib/hooks/useMergedState"));
var _react = _interopRequireWildcard(require("react"));
var _collapse = _interopRequireDefault(require("../../collapse"));
var _locale = require("../../locale");
var _theme = _interopRequireDefault(require("../../theme"));
var _util = require("../util");
const genPresetColor = list => list.map(value => {
  value.colors = value.colors.map(_util.generateColor);
  return value;
});
const isBright = (value, bgColorToken) => {
  const {
    r,
    g,
    b,
    a
  } = value.toRgb();
  const hsv = new _colorPicker.Color(value.toRgbString()).onBackground(bgColorToken).toHsv();
  if (a <= 0.5) {
    // Adapted to dark mode
    return hsv.v > 0.5;
  }
  return r * 0.299 + g * 0.587 + b * 0.114 > 192;
};
const ColorPresets = _ref => {
  let {
    prefixCls,
    presets,
    value: color,
    onChange
  } = _ref;
  const [locale] = (0, _locale.useLocale)('ColorPicker');
  const {
    token: {
      colorBgElevated
    }
  } = _theme.default.useToken();
  const [presetsValue] = (0, _useMergedState.default)(genPresetColor(presets), {
    value: genPresetColor(presets),
    postState: genPresetColor
  });
  const colorPresetsPrefixCls = `${prefixCls}-presets`;
  const activeKeys = (0, _react.useMemo)(() => presetsValue.map(preset => `panel-${preset.label}`), [presetsValue]);
  const handleClick = colorValue => {
    onChange === null || onChange === void 0 ? void 0 : onChange(colorValue);
  };
  const items = presetsValue.map(preset => {
    var _a;
    return {
      key: `panel-${preset.label}`,
      label: /*#__PURE__*/_react.default.createElement("div", {
        className: `${colorPresetsPrefixCls}-label`
      }, preset === null || preset === void 0 ? void 0 : preset.label),
      children: /*#__PURE__*/_react.default.createElement("div", {
        className: `${colorPresetsPrefixCls}-items`
      }, Array.isArray(preset === null || preset === void 0 ? void 0 : preset.colors) && ((_a = preset.colors) === null || _a === void 0 ? void 0 : _a.length) > 0 ? preset.colors.map(presetColor => /*#__PURE__*/_react.default.createElement(_colorPicker.ColorBlock, {
        key: `preset-${presetColor.toHexString()}`,
        color: (0, _util.generateColor)(presetColor).toRgbString(),
        prefixCls: prefixCls,
        className: (0, _classnames.default)(`${colorPresetsPrefixCls}-color`, {
          [`${colorPresetsPrefixCls}-color-checked`]: presetColor.toHexString() === (color === null || color === void 0 ? void 0 : color.toHexString()),
          [`${colorPresetsPrefixCls}-color-bright`]: isBright(presetColor, colorBgElevated)
        }),
        onClick: () => handleClick(presetColor)
      })) : /*#__PURE__*/_react.default.createElement("span", {
        className: `${colorPresetsPrefixCls}-empty`
      }, locale.presetEmpty))
    };
  });
  return /*#__PURE__*/_react.default.createElement("div", {
    className: colorPresetsPrefixCls
  }, /*#__PURE__*/_react.default.createElement(_collapse.default, {
    defaultActiveKey: activeKeys,
    ghost: true,
    items: items
  }));
};
var _default = ColorPresets;
exports.default = _default;