require("dotenv").config(); // 
const axios = require("axios");

const API_KEY = process.env.API_KEY; 

let urlsArray = [];
for (let i = 1; i <= 5; i++) {
  urlsArray.push(
    axios.get(`https://api.rawg.io/api/games?key=1be5de2656ee4bd488a4b8248b6e8343`)
  );
}

const getApiVideogames = async () => {
  let arrayVideogames = [];
  const results = await Promise.all(urlsArray);
  results.forEach(
    (result) => (arrayVideogames = [...arrayVideogames, ...result.data.results])
  );
  return arrayVideogames;
};

const getApiVideogameById = async (id) => {
  const result = await axios.get(
    `https://api.rawg.io/api/games?key=1be5de2656ee4bd488a4b8248b6e8343`
  );
  return {
    name: result.data.name,
    background_image: result.data.background_image,
    genres: result.data.genres,
    description: result.data.description,
    released: result.data.released,
    rating: result.data.rating,
    platforms: result.data.platforms,
    description_raw: result.data.description_raw,
  };
  
};

const getApiGenres = async () => {
  const genres = await axios.get(
    `https://api.rawg.io/api/genres?key=1be5de2656ee4bd488a4b8248b6e8343`
  );
  return genres.data.results;
};

module.exports = {
  getApiVideogames,
  getApiVideogameById,
  getApiGenres,
};
