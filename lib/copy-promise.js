'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * copy-promise
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * https://github.com/starandtina/copy-promise
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Copyright (c) 2016 Khalil Zhang
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Licensed under the MIT license.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */


exports.default = copy;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsPromise = require('fs-promise');

var _fsPromise2 = _interopRequireDefault(_fsPromise);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function copy(src, dest, options) {
  options = options || {};

  return Promise.all([_fsPromise2.default.stat(src), _fsPromise2.default.exists(dest).then(function (exists) {
    if (!exists) {
      return false;
    }

    return _fsPromise2.default.stat(dest);
  })]).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        srcStat = _ref2[0],
        destStat = _ref2[1];

    if (srcStat.isFile() && destStat && destStat.isDirectory()) {
      var filename = _path2.default.basename(src);
      dest = _path2.default.join(dest, filename);
    }

    return new Promise(function (resolve, reject) {
      _fsExtra2.default.copy(src, dest, options, function (err) {
        if (err) {
          reject(err);
        }

        resolve();
      });
    });
  });
}