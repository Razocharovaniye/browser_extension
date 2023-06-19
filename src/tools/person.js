const checkPerson = (inputRef, inputPerson) => {
  chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    
      inputRef.current.value = tabs[0].url;
      // Создаем XMLHttpRequest-запрос
      const xhr = new XMLHttpRequest();
      xhr.open('GET', tabs[0].url, true);


      // Обрабатываем ответ на запрос
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
          // Получаем содержимое страницы
          const pageContent = xhr.responseText;
          // Создаем объект DOMParser
          const parser = new DOMParser();
          // Парсим HTML-код страницы и получаем объект Document
          const doc = parser.parseFromString(pageContent, 'text/html');


          // Список слов и фраз, которые могут указывать на запросы на личную информацию.
          const regex = /(<input.*type=["']?(password|e-mail|email|tel|phone|number|date|passport|SSN|credit_card|CVV|CVC|login|hidden)["']?.*>)|(<textarea.*>)/ig;
          
                                    
          const inputs = doc.getElementsByTagName('input');
          const textareas = doc.getElementsByTagName('textarea');

          for (let i = 0; i < inputs.length; i++) {
            const input = inputs[i];
            if (regex.test(input.outerHTML)) {
              if(input.name == ""){
                console.log('noooo');
                inputPerson.current.value = 'noooo'; 
              } else {
                console.log('Personal information may be entered in input: ' + input.name);
                inputPerson.current.value = input.name;                  
                return;
              }
            }
          }
          
          for (let i = 0; i < textareas.length; i++) {
            const textarea = textareas[i];
            if (regex.test(textarea.outerHTML)) {
              if(textarea.name == ""){
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
      };

        // Отправляем запрос
        xhr.send();
    });

}
  
export default checkPerson;

