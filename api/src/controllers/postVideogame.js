

const { Videogame, Genre } = require("../db");

const postVideogame = async (
  name,
  description,
  released,
  rating,
  platforms,
  genres
) => {
  try {
    const newVideogame = await Videogame.create({
      name,
      description,
      released,
      rating,
      platforms,
    });

    const genreDb = await Genre.findAll({ where: { name: genres } });

    newVideogame.addGenres(genreDb);

    return { success: "El videojuego fue creado" };
  } catch (error) {
    console.error("Error al crear el videojuego:", error);
    return { error: "Hubo un error al crear el videojuego" };
  }
};

module.exports = {
  postVideogame,
};
