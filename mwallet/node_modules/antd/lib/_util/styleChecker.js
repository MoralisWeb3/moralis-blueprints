"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.detectFlexGapSupported = exports.canUseDocElement = void 0;
Object.defineProperty(exports, "isStyleSupport", {
  enumerable: true,
  get: function () {
    return _styleChecker.isStyleSupport;
  }
});
var _canUseDom = _interopRequireDefault(require("rc-util/lib/Dom/canUseDom"));
var _styleChecker = require("rc-util/lib/Dom/styleChecker");
const canUseDocElement = () => (0, _canUseDom.default)() && window.document.documentElement;
exports.canUseDocElement = canUseDocElement;
let flexGapSupported;
const detectFlexGapSupported = () => {
  if (!canUseDocElement()) {
    return false;
  }
  if (flexGapSupported !== undefined) {
    return flexGapSupported;
  }
  // create flex container with row-gap set
  const flex = document.createElement('div');
  flex.style.display = 'flex';
  flex.style.flexDirection = 'column';
  flex.style.rowGap = '1px';
  // create two, elements inside it
  flex.appendChild(document.createElement('div'));
  flex.appendChild(document.createElement('div'));
  // some browser may not repaint when remove nodes, so we need create a new layer to detect.
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.zIndex = '-9999';
  container.appendChild(flex);
  // append to the DOM (needed to obtain scrollHeight)
  document.body.appendChild(container);
  flexGapSupported = flex.scrollHeight === 1; // flex container should be 1px high from the row-gap
  document.body.removeChild(container);
  return flexGapSupported;
};
exports.detectFlexGapSupported = detectFlexGapSupported;