// Создаем новый пункт контекстного меню
chrome.contextMenus.create({
    id: "myContextMenu",
    title: "Проверить текст", // Название пункта
    contexts:["selection"] // Только для выделенного текста
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === "myContextMenu") {
      console.log("Выделенный текст: " + info.selectionText);
      const domain = info.selectionText;
  
      const apiKey2 = 'e0a8f7cd2232d4c72afbcd214febcd02bc5ecf5ee4d37014e874e1a216f1170e';
  
      const encodedParams = new URLSearchParams();
      encodedParams.set('url', domain);
  
      const headers = {
        'accept': 'application/json',
        'x-apikey': apiKey2,
        'content-type': 'application/x-www-form-urlencoded'
      };
  
      const options = {
        method: 'POST',
        headers,
        body: encodedParams,
      };
  
      fetch('https://www.virustotal.com/api/v3/urls', options)
        .then(response => {
          if (!response.ok) {
            throw new Error(response.status);
          }
          return response.json();
        })
        .then(data => {
          console.log(data);
          chrome.runtime.sendMessage({message: "SAFE"});
                  
        })
        .catch(error => {
          console.error(error);
          chrome.runtime.sendMessage({message: `Error: ${error}`});
          
        });
    }
  });
  




