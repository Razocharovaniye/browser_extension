import sendUrlsToVirusTotal from "./scanAPI";

let URLS = [];

const checkHref = (inputRef, inputVT) => {
    let count = 0;
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

                // Получаем все ссылки на странице
                const links = doc.getElementsByTagName("a");
                const iframes = doc.getElementsByTagName("iframe");
                const scripts = doc.getElementsByTagName("script");
                const imgs = doc.getElementsByTagName("img");

                // Обходим все ссылки, фильтруя по протоколу и проверяя на уникальность
                for (let i = 0; i < links.length; i++) {
                    const href = links[i].getAttribute("href");
                    if (href) {
                        const url = new URL(href, tabs[0].url);
                        const urlString = url.href;
                        if (/^(http|https):\/\//.test(urlString) && !URLS.includes(urlString)) {
                            URLS.push(urlString);
                            count++;
                        }
                    }
                }
                

                // Обходим все iframe, фильтруя по протоколу и проверяя на уникальность
                for (let i = 0; i < iframes.length; i++) {
                    const src = iframes[i].getAttribute("src");
                    if (src) {
                        const url = new URL(src, tabs[0].url);
                        const urlString = url.href;
                        if (/^(http|https):\/\//.test(urlString) && !URLS.includes(urlString)) {
                            URLS.push(urlString);
                            count++;
                        }
                    }
                }

                // Обходим все скрипты, фильтруя по протоколу и проверяя на уникальность
                for (let i = 0; i < scripts.length; i++) {
                    const src = scripts[i].getAttribute("src");
                    if (src) {
                        const url = new URL(src, tabs[0].url);
                        const urlString = url.href;
                        if (/^(http|https):\/\//.test(urlString) && !URLS.includes(urlString)) {
                            URLS.push(urlString);
                            count++;
                        }
                    }
                }


                // Обходим все картинки, фильтруя по протоколу и проверяя на уникальность
                for (let i = 0; i < imgs.length; i++) {
                    const src = imgs[i].getAttribute("src");
                    if (src) {
                        const url = new URL(src, tabs[0].url);
                        const urlString = url.href;
                        if (/^(http|https):\/\//.test(urlString) && !URLS.includes(urlString)) {
                            URLS.push(urlString);
                            count++;
                        }
                    }
                }

                console.log(URLS);
                console.log(count);
                console.log(`${count} url check pending`);
                inputVT.current.value = `${count} url check pending`;
                sendUrlsToVirusTotal(URLS, inputVT);
            }
        };
        // Отправляем запрос
        xhr.send();
    });
   
}

export default checkHref;
