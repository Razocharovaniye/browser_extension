import axios from 'axios';

const sendUrlsToVirusTotal = async (urls, inputVT) => {
    // Проверяем, есть ли URL-адресы в массиве urls
    if (urls.length === 0) {
      console.log('Массив URL-адресов пуст.');
      return;
    }

  
    let hasErrors = false; // Флаг наличия ошибок
    // Ограничение на количество запросов в минуту
    const requestsPerMinute = 4;
    const delayBetweenRequests = 60000 / requestsPerMinute;

        // API ключи
    const apiKey1 = 'e0a8f7cd2232d4c72afbcd214febcd02bc5ecf5ee4d37014e874e1a216f1170e';
    const apiKey2 = '015f184ab06fcff5018d8d332f864ec7a6e2aecbb2565b1950948deae214a32e';
    
    // Разбиваем массив URL-адресов на чанки (пакеты)
    const chunks = [];
    while (urls.length > 0) {
      chunks.push(urls.splice(0, requestsPerMinute));
    }
  
    // Отправляем запросы на VirusTotal API последовательно с использованием чанков
    let apiKeyIndex = 0;
    for (const chunk of chunks) {
      for (const url of chunk) {
        // Выбираем axiosInstance для отправки запроса в зависимости от индекса ключа API
        const axiosInstance = (apiKeyIndex % 2 === 0) ? axios.create({ headers: { 'x-apikey': apiKey1 } }) : axios.create({ headers: { 'x-apikey': apiKey2 } });
  
        // Отправляем POST-запрос на VirusTotal API для добавления URL-адреса
        const encodedParams = new URLSearchParams();
        encodedParams.set('url', url);
        const options = {
          method: 'POST',
          url: 'https://www.virustotal.com/api/v3/urls',
          headers: {
            accept: 'application/json',
          },
          data: encodedParams
        };

        try {
          const response = await axiosInstance.request(options);
          console.log(`Ответ для URL-адреса ${url}:`, response.data);
          // console.log(response.data.type);
          // inputVT.current.value = response.data.type;
        } catch (error) {
          console.error(`Ошибка при отправке запроса для URL-адреса ${url}:`, error);
          hasErrors = true;
        }
  
        // Увеличиваем индекс ключа API
        apiKeyIndex++;
        await new Promise(resolve => setTimeout(resolve, delayBetweenRequests)); // Задержка между запросами
      }
    }
    
    if (hasErrors) {
        // Выводим сообщение об ошибке в popup
        console.log('Возникла ошибка при отправке запросов на проверку URL-адресов.');
        inputVT.current.value = 'There are dangerous links on the page!!!';

      } else {
        console.log('SAFE');
        inputVT.current.value = 'SAFE';
      }
  };

  export default sendUrlsToVirusTotal;
  