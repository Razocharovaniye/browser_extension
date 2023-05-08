
const sendFileTOSBX = async (inputSBX) => {
    console.log("я тут")
    const API_KEY = 'aCAQQr7SDohjQS8d-J2I8lhvXb-gX9SXI-pbTnbJX5qi0dnNPCeZf1F_g2Wl0skHlXnI7JepiumQX3UiZAYHpg';

    chrome.downloads.search({state: 'complete', limit: 1}, (results) =>  {
        if (results && results.length > 0) {
            console.log("а теперь тут")
        // Получаем путь к скачанному файлу
            const filePath = results[0].filename;
            const fileName = filePath.substring(filePath.lastIndexOf('/') + 1);
            
    
        // Создаем объект FormData и добавляем скачанный файл в него
            const formData = new FormData();
            formData.append('file', new Blob([filePath], { type: 'application/octet-stream' }), fileName);

            console.log("я тут пытаюсь файл отправить")
            
    
        // Отправляем запрос на получение file_uri
            fetch("https://10.11.6.97/api/v1/storage/uploadScanFile", {
                method: "POST",
                headers: {
                    'X-Api-Key': API_KEY,
                },                          
                body: formData,
            })

            .then((response) => response.json())
            .then((data) => {
                const fileUri = data.data.file_uri;
                console.log(data)

                fetch('https://10.11.6.97/api/v1/analysis/createScanTask', {
                method: 'POST',
                headers: {
                    'X-Api-Key': API_KEY,
                    'Content-type': 'application/json'
                },

                body: JSON.stringify({
                    "file_uri": `${fileUri}`,
                    "file_name": `${fileName}`,
                    "options": {
                        "sandbox": {
                            "enabled": true,
                            "image_id": "win10-1803-x64",
                            "analysis_duration": 60
                        }
                    }
                })
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    console.log(data.data.result, data.data.result.verdict, data.data.scan_id);
                    inputSBX.current.value = data.data.result.verdict;
                })
                .catch(error => {
                    console.error('Error:', error);
                    inputSBX.current.value = error;
                });
            })
        };
    });
}


export default sendFileTOSBX;
  