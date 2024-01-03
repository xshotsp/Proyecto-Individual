const { getDbGenres } = require("./utils/getInfoFromDb");
const { getApiGenres } = require("./utils/getInfoFromApi");
const { Genre } = require("../db");

const getGenres = async () => {
  let genres = [];
  genres = await getDbGenres();
  if (!genres.length) {
    genres = await getApiGenres();
    genres.forEach((obj) =>
      Genre.create({
        id: obj.id,
        name: obj.name,
      })
    );
  }
  return genres;
};
module.exports = {
  getGenres,
};
