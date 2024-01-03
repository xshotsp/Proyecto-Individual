

const { getApiVideogames } = require("./utils/getInfoFromApi");
const { getDbVideogames } = require("./utils/getInfoFromDb");

const getVideogamesByQuery = async (name) => {
  const arrayApiVideogames = await getApiVideogames();
  const arrayDbVideogames = await getDbVideogames();
  let arrayAllVideogames = [...arrayDbVideogames, ...arrayApiVideogames];

  arrayAllVideogames = arrayAllVideogames.filter((obj) =>
    obj.name.toLowerCase().includes(name.toLowerCase())
  );

  if (!arrayAllVideogames.length) throw Error("No se encontraron coincidencias")

  return arrayAllVideogames.slice(0, 15);
};

module.exports = {
  getVideogamesByQuery,
};
