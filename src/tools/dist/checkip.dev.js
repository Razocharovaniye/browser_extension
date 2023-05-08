"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var checkIP = function checkIP(domain, inputVT) {
  var apiKey2, encodedParams, options;
  return regeneratorRuntime.async(function checkIP$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          apiKey2 = '015f184ab06fcff5018d8d332f864ec7a6e2aecbb2565b1950948deae214a32e';
          encodedParams = new URLSearchParams();
          encodedParams.set('url', domain);
          options = {
            method: 'POST',
            url: 'https://www.virustotal.com/api/v3/urls',
            headers: {
              accept: 'application/json',
              'x-apikey': apiKey2,
              'content-type': 'application/x-www-form-urlencoded'
            },
            data: encodedParams
          };

          _axios["default"].request(options).then(function (response) {
            console.log(response.data);
            inputVT.current.value = 'SAFE URL';
          })["catch"](function (error) {
            console.error(error);
            inputVT.current.value = error;
          });

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};

var _default = checkIP;
exports["default"] = _default;