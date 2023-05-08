
const checkSSL = async (inputRef, inputSSL) => {

    const tabs = await chrome.tabs.query({ currentWindow: true, active: true });
    inputRef.current.value = tabs[0].url;
    const domain = new URL(tabs[0].url).hostname;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '7ff658fcd0mshdcd9839e1a9e498p188ff5jsnb046c64d6067',
            'X-RapidAPI-Host': 'ssl-certificate-checker2.p.rapidapi.com'
        }
    };
  
    fetch(`https://ssl-certificate-checker2.p.rapidapi.com/ssl-certificate-checker/check?host=${domain}`, options)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            console.log(response.cipher.standardName, response.validFrom, response.validTo, response.expiresInDays, response.standardName);

            inputSSL.current.value = `Protocol: ${response.cipher.standardName} \nwill expire in ${response.expiresInDays} days`;
        })
        .catch(error => {
            console.error(error);
            inputSSL.current.value = err;
        });
};


export default checkSSL;