const { Router } = require("express");
const { getVideogameById } = require("../../controllers/getVideogameById");

const router = Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getVideogameById(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
});

module.exports = router;
