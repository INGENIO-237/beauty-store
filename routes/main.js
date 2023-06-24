const router = require("express").Router();

// Landing page
router.get("", (req, res) => {
  res.render("index");
});

router.get("/forgot-password", (req, res) => {
  res.render("pages/auth/forgot-password");
});

module.exports = router;
