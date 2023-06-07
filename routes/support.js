const router = require("express").Router();

// Commercials
router.get("/", (req, res) => {
  res.render("pages/support");
});

module.exports = router;
