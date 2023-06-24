const router = require("express").Router();
const bcrypt = require("bcrypt");

const passport = require("passport");
const db = require("../config/db");
const { ensureAuthenticated } = require("../config/checkAuth");

// Login
router.get("/login", (req, res) =>
  res.render("pages/auth/login", { layout: "layout-2.ejs" })
);

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/auth/dashboard",
    failureRedirect: "/auth/login",
  })(req, res, next);
});

// Dashboard
router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("pages/admin/dashboard-admin", {
    layout: "dashboard-layout.ejs",
  });
});

// Profile
router.get("/profile", ensureAuthenticated, (req, res) => {
  res.render("pages/auth/profile", { layout: "dashboard-layout.ejs" });
});

// Register
router.get("/partnership", (req, res) =>
  res.render("pages/auth/partnership", { layout: "layout-2.ejs" })
);

router.post("/partnership", (req, res) => {
  const { name, email, password, phone, location } = req.body;

  console.log(req.body);

  if (!name || !email || !password || !phone || !location) {
    res.send("All fields are mandatory");
  } else {
    db.query(
      { sql: "SELECT * FROM store WHERE useremail = ?" },
      [email],
      (error, result) => {
        if (error) res.send(error.message);
        if (result.length > 0) {
          res.send("This email address is already taken");
        } else {
          bcrypt.hash(password, 10, (error, hash) => {
            if (error) res.send(error.message);
            db.query(
              {
                sql: "INSERT INTO store(useremail,userpwd, location, phone) VALUES(?,?,?,?)",
              },
              [email, hash, location, phone],
              (error, result) => {
                if (error) res.send(error.message);
                res.redirect("/auth/login");
              }
            );
          });
        }
      }
    );
  }
});

// Logout
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) throw err;
  });
  res.redirect("/auth/login");
});

module.exports = router;
