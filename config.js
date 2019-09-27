const dev = {
  port: process.env.PORT || 9000,
  jwt_secret: process.env.JWT_SECRET || 'nlkfdsld2SDF#423@#k3423keGHJ*kflnsf',
  imdb_api_url: "https://movie-database-imdb-alternative.p.rapidapi.com/",
  imdb_api_host: "movie-database-imdb-alternative.p.rapidapi.com",
  imdb_api_key: "48ce6d31b7msh19d0178bdb9f4e4p1cbc5cjsnd2b581898472",
  omdb_api_url: "http://www.omdbapi.com/",
  omdb_api_key: "328ae496",
  db_connection_url: 'mongodb://test:test123@ds125525.mlab.com:25525/movie-store'
};

const config = dev;

module.exports = config;
