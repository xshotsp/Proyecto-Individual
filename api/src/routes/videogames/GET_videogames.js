const { Router } = require("express");
const { getVideogames } = require("../../controllers/getVideogames");
const {
  getVideogamesByQuery,
} = require("../../controllers/getVideogamesByQuery");

const router = Router();

router.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    let videogames;
    name
      ? (videogames = await getVideogamesByQuery(name))
      : (videogames = await getVideogames());
    return res.status(200).json(videogames);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
});

module.exports = router;
