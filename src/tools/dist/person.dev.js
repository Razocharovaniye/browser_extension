"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var checkPerson = function checkPerson(inputRef, inputPerson) {
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

        var doc = parser.parseFromString(pageContent, 'text/html'); // Список слов и фраз, которые могут указывать на запросы на личную информацию.
        // Define a regular expression to match inputs or textareas that may contain personal information

        var regex = /(<input.*type=["']?(password|e-mail|email|tel|phone|number|date|passport|SSN|credit_card|CVV|CVC|login|hidden)["']?.*>)|(<textarea.*>)/ig; // Function to check if any input or textarea on the page matches the regex

        var inputs = doc.getElementsByTagName('input');
        var textareas = doc.getElementsByTagName('textarea');

        for (var i = 0; i < inputs.length; i++) {
          var input = inputs[i];

          if (regex.test(input.outerHTML)) {
            if (input.name == "") {
              console.log('noooo');
              inputPerson.current.value = 'noooo';
            } else {
              console.log('Personal information may be entered in input: ' + input.name);
              inputPerson.current.value = input.name;
              return;
            }
          }
        }

        for (var _i = 0; _i < textareas.length; _i++) {
          var textarea = textareas[_i];

          if (regex.test(textarea.outerHTML)) {
            if (textarea.name == "") {
              console.log('noooo');
              inputPerson.current.value = 'noooo';
            } else {
              console.log('Personal information may be entered in input: ' + textarea.name);
              inputPerson.current.value = textarea.name;
              return;
            }
          }
        }

        console.log('Entering personal information is not required.');
        inputPerson.current.value = 'No dangerous requests.';
      }
    }; // Отправляем запрос


    xhr.send();
  });
};

var _default = checkPerson;
exports["default"] = _default;