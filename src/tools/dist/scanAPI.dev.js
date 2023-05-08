"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var sendUrlsToVirusTotal = function sendUrlsToVirusTotal(urls, inputVT) {
  var hasErrors, requestsPerMinute, delayBetweenRequests, apiKey1, apiKey2, chunks, apiKeyIndex, _i, _chunks, chunk, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, url, axiosInstance, encodedParams, options, response;

  return regeneratorRuntime.async(function sendUrlsToVirusTotal$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(urls.length === 0)) {
            _context.next = 3;
            break;
          }

          console.log('Массив URL-адресов пуст.');
          return _context.abrupt("return");

        case 3:
          hasErrors = false; // Флаг наличия ошибок
          // Ограничение на количество запросов в минуту

          requestsPerMinute = 4;
          delayBetweenRequests = 60000 / requestsPerMinute; // API ключи

          apiKey1 = 'e0a8f7cd2232d4c72afbcd214febcd02bc5ecf5ee4d37014e874e1a216f1170e';
          apiKey2 = '015f184ab06fcff5018d8d332f864ec7a6e2aecbb2565b1950948deae214a32e'; // Разбиваем массив URL-адресов на чанки (пакеты)

          chunks = [];

          while (urls.length > 0) {
            chunks.push(urls.splice(0, requestsPerMinute));
          } // Отправляем запросы на VirusTotal API последовательно с использованием чанков


          apiKeyIndex = 0;
          _i = 0, _chunks = chunks;

        case 12:
          if (!(_i < _chunks.length)) {
            _context.next = 59;
            break;
          }

          chunk = _chunks[_i];
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 17;
          _iterator = chunk[Symbol.iterator]();

        case 19:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context.next = 42;
            break;
          }

          url = _step.value;
          // Выбираем axiosInstance для отправки запроса в зависимости от индекса ключа API
          axiosInstance = apiKeyIndex % 2 === 0 ? _axios["default"].create({
            headers: {
              'x-apikey': apiKey1
            }
          }) : _axios["default"].create({
            headers: {
              'x-apikey': apiKey2
            }
          }); // Отправляем POST-запрос на VirusTotal API для добавления URL-адреса

          encodedParams = new URLSearchParams();
          encodedParams.set('url', url);
          options = {
            method: 'POST',
            url: 'https://www.virustotal.com/api/v3/urls',
            headers: {
              accept: 'application/json'
            },
            data: encodedParams
          };
          _context.prev = 25;
          _context.next = 28;
          return regeneratorRuntime.awrap(axiosInstance.request(options));

        case 28:
          response = _context.sent;
          console.log("\u041E\u0442\u0432\u0435\u0442 \u0434\u043B\u044F URL-\u0430\u0434\u0440\u0435\u0441\u0430 ".concat(url, ":"), response.data); // console.log(response.data.type);
          // inputVT.current.value = response.data.type;

          _context.next = 36;
          break;

        case 32:
          _context.prev = 32;
          _context.t0 = _context["catch"](25);
          console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0435 \u0437\u0430\u043F\u0440\u043E\u0441\u0430 \u0434\u043B\u044F URL-\u0430\u0434\u0440\u0435\u0441\u0430 ".concat(url, ":"), _context.t0);
          hasErrors = true;

        case 36:
          // Увеличиваем индекс ключа API
          apiKeyIndex++;
          _context.next = 39;
          return regeneratorRuntime.awrap(new Promise(function (resolve) {
            return setTimeout(resolve, delayBetweenRequests);
          }));

        case 39:
          _iteratorNormalCompletion = true;
          _context.next = 19;
          break;

        case 42:
          _context.next = 48;
          break;

        case 44:
          _context.prev = 44;
          _context.t1 = _context["catch"](17);
          _didIteratorError = true;
          _iteratorError = _context.t1;

        case 48:
          _context.prev = 48;
          _context.prev = 49;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 51:
          _context.prev = 51;

          if (!_didIteratorError) {
            _context.next = 54;
            break;
          }

          throw _iteratorError;

        case 54:
          return _context.finish(51);

        case 55:
          return _context.finish(48);

        case 56:
          _i++;
          _context.next = 12;
          break;

        case 59:
          if (hasErrors) {
            // Выводим сообщение об ошибке в popup
            console.log('Возникла ошибка при отправке запросов на проверку URL-адресов.');
            inputVT.current.value = 'There are dangerous links on the page!!!';
          } else {
            console.log('SAFE');
            inputVT.current.value = 'SAFE';
          }

        case 60:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[17, 44, 48, 56], [25, 32], [49,, 51, 55]]);
};

var _default = sendUrlsToVirusTotal;
exports["default"] = _default;