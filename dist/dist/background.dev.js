"use strict";

// Создаем новый пункт контекстного меню
chrome.contextMenus.create({
  id: "myContextMenu",
  title: "Проверить текст",
  // Название пункта
  contexts: ["selection"] // Только для выделенного текста

});
chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId === "myContextMenu") {
    console.log("Выделенный текст: " + info.selectionText);
    var domain = info.selectionText;
    var apiKey2 = 'e0a8f7cd2232d4c72afbcd214febcd02bc5ecf5ee4d37014e874e1a216f1170e';
    var encodedParams = new URLSearchParams();
    encodedParams.set('url', domain);
    var headers = {
      'accept': 'application/json',
      'x-apikey': apiKey2,
      'content-type': 'application/x-www-form-urlencoded'
    };
    var options = {
      method: 'POST',
      headers: headers,
      body: encodedParams
    };
    fetch('https://www.virustotal.com/api/v3/urls', options).then(function (response) {
      if (!response.ok) {
        throw new Error(response.status);
      }

      return response.json();
    }).then(function (data) {
      console.log(data);
      chrome.runtime.sendMessage({
        message: "SAFE"
      });
    })["catch"](function (error) {
      console.error(error);
      chrome.runtime.sendMessage({
        message: "Error: ".concat(error)
      });
    });
  }
});