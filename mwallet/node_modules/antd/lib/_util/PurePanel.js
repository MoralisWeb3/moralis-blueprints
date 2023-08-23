"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = genPurePanel;
exports.withPureRenderTheme = withPureRenderTheme;
var _useMergedState = _interopRequireDefault(require("rc-util/lib/hooks/useMergedState"));
var React = _interopRequireWildcard(require("react"));
var _configProvider = _interopRequireWildcard(require("../config-provider"));
function withPureRenderTheme(Component) {
  return function PureRenderThemeComponent(props) {
    return /*#__PURE__*/React.createElement(_configProvider.default, {
      theme: {
        token: {
          motion: false,
          zIndexPopupBase: 0
        }
      }
    }, /*#__PURE__*/React.createElement(Component, Object.assign({}, props)));
  };
}
/* istanbul ignore next */
function genPurePanel(Component, defaultPrefixCls, getDropdownCls, postProps) {
  function PurePanel(props) {
    const {
      prefixCls: customizePrefixCls,
      style
    } = props;
    const holderRef = React.useRef(null);
    const [popupHeight, setPopupHeight] = React.useState(0);
    const [popupWidth, setPopupWidth] = React.useState(0);
    const [open, setOpen] = (0, _useMergedState.default)(false, {
      value: props.open
    });
    const {
      getPrefixCls
    } = React.useContext(_configProvider.ConfigContext);
    const prefixCls = getPrefixCls(defaultPrefixCls || 'select', customizePrefixCls);
    React.useEffect(() => {
      // We do not care about ssr
      setOpen(true);
      if (typeof ResizeObserver !== 'undefined') {
        const resizeObserver = new ResizeObserver(entries => {
          const element = entries[0].target;
          setPopupHeight(element.offsetHeight + 8);
          setPopupWidth(element.offsetWidth);
        });
        const interval = setInterval(() => {
          var _a;
          const dropdownCls = getDropdownCls ? `.${getDropdownCls(prefixCls)}` : `.${prefixCls}-dropdown`;
          const popup = (_a = holderRef.current) === null || _a === void 0 ? void 0 : _a.querySelector(dropdownCls);
          if (popup) {
            clearInterval(interval);
            resizeObserver.observe(popup);
          }
        }, 10);
        return () => {
          clearInterval(interval);
          resizeObserver.disconnect();
        };
      }
    }, []);
    let mergedProps = Object.assign(Object.assign({}, props), {
      style: Object.assign(Object.assign({}, style), {
        margin: 0
      }),
      open,
      visible: open,
      getPopupContainer: () => holderRef.current
    });
    if (postProps) {
      mergedProps = postProps(mergedProps);
    }
    return /*#__PURE__*/React.createElement("div", {
      ref: holderRef,
      style: {
        paddingBottom: popupHeight,
        position: 'relative',
        minWidth: popupWidth
      }
    }, /*#__PURE__*/React.createElement(Component, Object.assign({}, mergedProps)));
  }
  return withPureRenderTheme(PurePanel);
}