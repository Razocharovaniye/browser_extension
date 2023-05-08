import checkIP from "./checkip";

const checkUrl = async (inputRef, inputHTTPS, inputVT) => {
    
    const tabs = await chrome.tabs.query({ currentWindow: true, active: true });
    inputRef.current.value = tabs[0].url;
    const protocol = tabs[0].url.split(':')[0];
    const domain = new URL(tabs[0].url).hostname;

    try {
        const response = await fetch(`https://dns.google/resolve?name=${domain}`);
        const data = await response.json();
        const ip = data.Answer[0].data;
        console.log(`IP address after CheckURL: ${ip}`);
        console.log(`Hostname after CheckURL: ${domain}`);

        checkIP(domain, inputVT);

        if (protocol === 'https') {
            console.log('This page is using HTTPS');
            inputHTTPS.current.value = 'HTTPS';
          } else {
            console.log('This page is using an unencrypted protocol!');
            inputHTTPS.current.value = `Unencrypted protocol! ${protocol}`;
          }
      
    } catch (error) {
        console.error(error);
    };

};


export default checkUrl;
