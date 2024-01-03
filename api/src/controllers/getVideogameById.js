
const isUUID = require("is-uuid");
const { getApiVideogameById } = require("./utils/getInfoFromApi");
const { getDbVideogameByPk } = require("./utils/getInfoFromDb");

const getVideogameById = async (id) => {
  let result = isUUID.v4(id)
    ? await getDbVideogameByPk(id)
    : await getApiVideogameById(id);
  if (!result) throw Error("No se encontró el videojuego en la base de datos");
  return result;
};

module.exports = {
  getVideogameById,
};
