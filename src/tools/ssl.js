
const checkSSL = async (inputRef, inputSSL) => {

    const tabs = await chrome.tabs.query({ currentWindow: true, active: true });
    inputRef.current.value = tabs[0].url;
    const domain = new URL(tabs[0].url).hostname;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'd5ba603465msh685ac3b94966e4ep143f8djsn71ade5a05982',
            'X-RapidAPI-Host': 'ssl-checker.p.rapidapi.com'
        }
    };
  
    fetch(`https://ssl-checker.p.rapidapi.com/check-ssl?source=${domain}`, options)
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