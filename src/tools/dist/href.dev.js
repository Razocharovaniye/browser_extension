"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _scanAPI = _interopRequireDefault(require("./scanAPI"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var URLS = [];

var checkHref = function checkHref(inputRef, inputVT) {
  var count = 0;
  chrome.tabs.query({
    currentWindow: true,
    active: true
  }, function (tabs) {
    inputRef.current.value = tabs[0].url; // Создаем XMLHttpRequest-запрос

    var xhr = new XMLHttpRequest();
    xhr.open('GET', tabs[0].url, true); // Обрабатываем ответ на запрос

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        // Получаем содержимое страницы
        var pageContent = xhr.responseText; // Создаем объект DOMParser

        var parser = new DOMParser(); // Парсим HTML-код страницы и получаем объект Document

        var doc = parser.parseFromString(pageContent, 'text/html'); // Получаем все ссылки на странице

        var links = doc.getElementsByTagName("a");
        var iframes = doc.getElementsByTagName("iframe");
        var scripts = doc.getElementsByTagName("script");
        var imgs = doc.getElementsByTagName("img"); // Обходим все ссылки, фильтруя по протоколу и проверяя на уникальность

        for (var i = 0; i < links.length; i++) {
          var href = links[i].getAttribute("href");

          if (href) {
            var url = new URL(href, tabs[0].url);
            var urlString = url.href;

            if (/^(http|https):\/\//.test(urlString) && !URLS.includes(urlString)) {
              URLS.push(urlString);
              count++;
            }
          }
        } // Обходим все iframe, фильтруя по протоколу и проверяя на уникальность


        for (var _i = 0; _i < iframes.length; _i++) {
          var src = iframes[_i].getAttribute("src");

          if (src) {
            var _url = new URL(src, tabs[0].url);

            var _urlString = _url.href;

            if (/^(http|https):\/\//.test(_urlString) && !URLS.includes(_urlString)) {
              URLS.push(_urlString);
              count++;
            }
          }
        } // Обходим все скрипты, фильтруя по протоколу и проверяя на уникальность


        for (var _i2 = 0; _i2 < scripts.length; _i2++) {
          var _src = scripts[_i2].getAttribute("src");

          if (_src) {
            var _url2 = new URL(_src, tabs[0].url);

            var _urlString2 = _url2.href;

            if (/^(http|https):\/\//.test(_urlString2) && !URLS.includes(_urlString2)) {
              URLS.push(_urlString2);
              count++;
            }
          }
        } // Обходим все картинки, фильтруя по протоколу и проверяя на уникальность


        for (var _i3 = 0; _i3 < imgs.length; _i3++) {
          var _src2 = imgs[_i3].getAttribute("src");

          if (_src2) {
            var _url3 = new URL(_src2, tabs[0].url);

            var _urlString3 = _url3.href;

            if (/^(http|https):\/\//.test(_urlString3) && !URLS.includes(_urlString3)) {
              URLS.push(_urlString3);
              count++;
            }
          }
        }

        console.log(URLS);
        console.log(count);
        console.log("".concat(count, " url check pending"));
        inputVT.current.value = "".concat(count, " url check pending");
        (0, _scanAPI["default"])(URLS, inputVT);
      }
    }; // Отправляем запрос


    xhr.send();
  });
};

var _default = checkHref;
exports["default"] = _default;