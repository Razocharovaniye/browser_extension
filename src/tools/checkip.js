import axios from 'axios';

const checkIP = async (domain, inputVT) => {
    const apiKey2 = '015f184ab06fcff5018d8d332f864ec7a6e2aecbb2565b1950948deae214a32e';

    const encodedParams = new URLSearchParams();
    encodedParams.set('url', domain);
    
    const options = {
      method: 'POST',
      url: 'https://www.virustotal.com/api/v3/urls',
      headers: {
        accept: 'application/json',
        'x-apikey': apiKey2,
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: encodedParams,
    };
    
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        inputVT.current.value = 'SAFE URL'
        
      })
      .catch(function (error) {
        console.error(error);
        inputVT.current.value = error;
      });
};

export default checkIP;
  