"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _checkip = _interopRequireDefault(require("./checkip"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var checkUrl = function checkUrl(inputRef, inputHTTPS, inputVT) {
  var tabs, protocol, domain, response, data, ip;
  return regeneratorRuntime.async(function checkUrl$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(chrome.tabs.query({
            currentWindow: true,
            active: true
          }));

        case 2:
          tabs = _context.sent;
          inputRef.current.value = tabs[0].url;
          protocol = tabs[0].url.split(':')[0];
          domain = new URL(tabs[0].url).hostname;
          _context.prev = 6;
          _context.next = 9;
          return regeneratorRuntime.awrap(fetch("https://dns.google/resolve?name=".concat(domain)));

        case 9:
          response = _context.sent;
          _context.next = 12;
          return regeneratorRuntime.awrap(response.json());

        case 12:
          data = _context.sent;
          ip = data.Answer[0].data;
          console.log("IP address after CheckURL: ".concat(ip));
          console.log("Hostname after CheckURL: ".concat(domain));
          (0, _checkip["default"])(domain, inputVT);

          if (protocol === 'https') {
            console.log('This page is using HTTPS');
            inputHTTPS.current.value = 'HTTPS';
          } else {
            console.log('This page is using an unencrypted protocol!');
            inputHTTPS.current.value = "Unencrypted protocol! ".concat(protocol);
          }

          _context.next = 23;
          break;

        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](6);
          console.error(_context.t0);

        case 23:
          ;

        case 24:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[6, 20]]);
};

var _default = checkUrl;
exports["default"] = _default;