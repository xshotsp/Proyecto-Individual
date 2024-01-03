//Funciones encargadas de conseguir información de la base de datos
const { Videogame, Genre } = require("../../db");

const getDbVideogames = async () => {
  const arrayDbVideogames = await Videogame.findAll({
    include: [
      {
        model: Genre,
        attributes: ["name"],
      },
    ],
  });
  return arrayDbVideogames;
};

const getDbVideogameByPk = async (id) => {
  const result = await Videogame.findByPk(id, {
    include: [
      {
        model: Genre,
        attributes: ["name"],
      },
    ],
  });

  return result;
};

const getDbGenres = async () => {
  const result = await Genre.findAll();
  return result;
};

module.exports = {
  getDbVideogames,
  getDbVideogameByPk,
  getDbGenres,
};
