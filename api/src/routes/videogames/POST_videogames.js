const { Router } = require("express");
const { postVideogame } = require("../../controllers/postVideogame");

const router = Router();

router.post("/", async (req, res) => {
  const { name, description, released, rating, platforms, genres } = req.body;
  try {
    const result = await postVideogame(
      name,
      description,
      released,
      rating,
      platforms,
      genres
    );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;
