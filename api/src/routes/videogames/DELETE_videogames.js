//Ruta de uso exclusivo para admin. No tiene conexión con el front.

const { Router } = require("express");
const {
  deleteVideogameFromDb,
} = require("../../controllers/deleteVideogameFromDb");

const router = Router();

router.delete("/", async (req, res) => {
  const { name } = req.body;

  try {
    const result = await deleteVideogameFromDb(name);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
