const axios = require('axios');
const config = require('./config');

exports.getMovie = (imdbId) => {
  try {
    const result = await axios({
      "method":"GET",
      "url": config.imdb_api_url,
      "headers":{
        "content-type":"application/octet-stream",
        "x-rapidapi-host": config.imdb_api_host,
        "x-rapidapi-key": config.imdb_api_key
      },"params":{
      "i": imdbId,
      "r":"json"
      }
    })
    return result.data;
    
  } catch(err) {
    console.log(err);
    throw err;
  }
};

exports.getMovieDetails = (imdbId) => {
  try {
    const result = await axios({
      "method": "GET",
      "url": config.omdb_api_url,
      "params": {
        "i": imdbId,
        "apikey": config.omdb_api_key
      }
    });
    return result.data;

  } catch(err) {
    console.log(err);
    throw err;
  }
};
