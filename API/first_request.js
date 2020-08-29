const axios = require('axios'); 

(async () => {
    try {
       const res = await axios.get('http://www.omdbapi.com/?s=chicago&apikey=thewdb');
       const parsedData = res.data
       console.log(parsedData);
    //    console.log(`${parsedData.name}  Lives in  ${parsedData.address.suite}`);
        
    } catch(err) {
        console.log(err);
    }
})()