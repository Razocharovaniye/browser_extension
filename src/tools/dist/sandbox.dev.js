"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var sendFileTOSBX = function sendFileTOSBX(inputSBX) {
  var API_KEY;
  return regeneratorRuntime.async(function sendFileTOSBX$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log("я тут");
          API_KEY = 'aCAQQr7SDohjQS8d-J2I8lhvXb-gX9SXI-pbTnbJX5qi0dnNPCeZf1F_g2Wl0skHlXnI7JepiumQX3UiZAYHpg';
          chrome.downloads.search({
            state: 'complete',
            limit: 1
          }, function (results) {
            if (results && results.length > 0) {
              console.log("а теперь тут"); // Получаем путь к скачанному файлу

              var filePath = results[0].filename;
              var fileName = filePath.substring(filePath.lastIndexOf('/') + 1); // Создаем объект FormData и добавляем скачанный файл в него

              var formData = new FormData();
              formData.append('file', new Blob([filePath], {
                type: 'application/octet-stream'
              }), fileName);
              console.log("я тут пытаюсь файл отправить"); // Отправляем запрос на получение file_uri

              fetch("https://10.11.6.97/api/v1/storage/uploadScanFile", {
                method: "POST",
                headers: {
                  'X-Api-Key': API_KEY
                },
                body: formData
              }).then(function (response) {
                return response.json();
              }).then(function (data) {
                var fileUri = data.data.file_uri;
                console.log(data);
                fetch('https://10.11.6.97/api/v1/analysis/createScanTask', {
                  method: 'POST',
                  headers: {
                    'X-Api-Key': API_KEY,
                    'Content-type': 'application/json'
                  },
                  body: JSON.stringify({
                    "file_uri": "".concat(fileUri),
                    "file_name": "".concat(fileName),
                    "options": {
                      "sandbox": {
                        "enabled": true,
                        "image_id": "win10-1803-x64",
                        "analysis_duration": 60
                      }
                    }
                  })
                }).then(function (response) {
                  return response.json();
                }).then(function (data) {
                  console.log(data);
                  console.log(data.data.result, data.data.result.verdict, data.data.scan_id);
                  inputSBX.current.value = data.data.result.verdict;
                })["catch"](function (error) {
                  console.error('Error:', error);
                  inputSBX.current.value = error;
                });
              });
            }

            ;
          });

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
};

var _default = sendFileTOSBX;
exports["default"] = _default;