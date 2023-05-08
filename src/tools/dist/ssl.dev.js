"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var checkSSL = function checkSSL(inputRef, inputSSL) {
  var tabs, domain, options;
  return regeneratorRuntime.async(function checkSSL$(_context) {
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
          domain = new URL(tabs[0].url).hostname;
          options = {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key': '7ff658fcd0mshdcd9839e1a9e498p188ff5jsnb046c64d6067',
              'X-RapidAPI-Host': 'ssl-certificate-checker2.p.rapidapi.com'
            }
          };
          fetch("https://ssl-certificate-checker2.p.rapidapi.com/ssl-certificate-checker/check?host=".concat(domain), options).then(function (response) {
            return response.json();
          }).then(function (response) {
            console.log(response);
            console.log(response.cipher.standardName, response.validFrom, response.validTo, response.expiresInDays, response.standardName);
            inputSSL.current.value = "Protocol: ".concat(response.cipher.standardName, " \nwill expire in ").concat(response.expiresInDays, " days");
          })["catch"](function (error) {
            console.error(error);
            inputSSL.current.value = err;
          });

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
};

var _default = checkSSL;
exports["default"] = _default;