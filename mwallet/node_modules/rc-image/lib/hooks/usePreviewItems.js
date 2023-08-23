"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = usePreviewItems;
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var React = _interopRequireWildcard(require("react"));
var _common = require("../common");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Merge props provided `items` or context collected images
 */
function usePreviewItems(items) {
  // Context collection image data
  var _React$useState = React.useState({}),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    images = _React$useState2[0],
    setImages = _React$useState2[1];
  var registerImage = React.useCallback(function (id, data) {
    setImages(function (imgs) {
      return (0, _objectSpread3.default)((0, _objectSpread3.default)({}, imgs), {}, (0, _defineProperty2.default)({}, id, data));
    });
    return function () {
      setImages(function (imgs) {
        var cloneImgs = (0, _objectSpread3.default)({}, imgs);
        delete cloneImgs[id];
        return cloneImgs;
      });
    };
  }, []);

  // items
  var mergedItems = React.useMemo(function () {
    if (items) {
      return items.map(function (item) {
        if (typeof item === 'string') {
          return {
            data: {
              src: item
            }
          };
        }
        var data = {};
        Object.keys(item).forEach(function (key) {
          if (['src'].concat((0, _toConsumableArray2.default)(_common.COMMON_PROPS)).includes(key)) {
            data[key] = item[key];
          }
        });
        return {
          data: data
        };
      });
    }
    return Object.keys(images).reduce(function (total, id) {
      var _images$id = images[id],
        canPreview = _images$id.canPreview,
        data = _images$id.data;
      if (canPreview) {
        total.push({
          data: data,
          id: id
        });
      }
      return total;
    }, []);
  }, [items, images]);
  return [mergedItems, registerImage];
}