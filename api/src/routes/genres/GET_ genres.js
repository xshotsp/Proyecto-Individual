const { Router } = require("express");
const { getGenres } = require("../../controllers/getGenres");

const genresRouter = Router();

genresRouter.get("/", async (req, res) => {
  try {
    const genres = await getGenres();
    return res.status(200).json(genres);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
});

module.exports = genresRouter;
