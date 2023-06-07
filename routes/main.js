const router = require("express").Router();

// Landing page
router.get("", (req, res) => {
  res.render("index");
});

router.get("/partnership", (req, res) => {
  res.render("pages/partnership");
});

router.get("/login", (req, res) => {
  res.render("pages/login");
});

router.get("/forgot-password", (req, res) => {
  res.render("pages/forgot-password");
});

module.exports = router;
