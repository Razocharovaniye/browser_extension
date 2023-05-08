"use strict";

var _checkip = _interopRequireDefault(require("./checkip"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

chrome.contextMenus.create({
  id: "myContextMenu",
  title: "Проверить текст!!!!!",
  // Название пункта
  contexts: ["selection"],
  // Только для выделенного текста
  onclick: function onclick(info, tab) {
    // Функция обработки клика на пункте
    var selectedText = info.selectionText; // Получаем выделенный текст
    // Делаем что-то с выделенным текстом, например отправляем его на проверку

    console.log(selectedText);
    (0, _checkip["default"])(selectedText, inputPKM);
  }
});