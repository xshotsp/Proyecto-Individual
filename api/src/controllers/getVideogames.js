

const { getApiVideogames } = require("./utils/getInfoFromApi");
const { getDbVideogames } = require("./utils/getInfoFromDb");

const getVideogames = async () => {
  const arrayDbVideogames = await getDbVideogames();
  const arrayApiVideogames = await getApiVideogames();
  return [...arrayDbVideogames, ...arrayApiVideogames];
};

module.exports = { getVideogames };
