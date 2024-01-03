const { Videogame, Genre } = require("../db");

const deleteVideogameFromDb = async (nameParams) => {
  const deletedVideogame = await Videogame.destroy({
    where: {
      name: nameParams,
    },
  });

  if (!deletedVideogame)
    throw Error(
      "No se encontró un videojuego con ese nombre en la base de datos"
    );
    
  return { success: "El videojuego fue borrado de la base de datos" };
};

module.exports = { deleteVideogameFromDb };
