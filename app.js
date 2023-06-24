const express = require("express");
const layouts = require("express-ejs-layouts");
const session = require("express-session");
require("dotenv").config();

const PORT = process.env.PORT || 8000;
const app = express();

const passport = require("passport");
const userSession = require("./middlewares/user-session");

require("./config/passport")(passport);

// Session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);


app.use(passport.initialize());
app.use(passport.session());

// User session middleware
app.use(userSession);

app.use(express.urlencoded({ extended: false }));

// EJS
app.use(layouts);
app.set("view engine", "ejs");

app.use(express.static("public"));

app.use("/", require("./routes/main"));
app.use("/auth", require("./routes/auth"));
app.use("/products", require("./routes/admin/products"));
app.use("/orders", require("./routes/admin/orders"));
app.use("/transactions", require("./routes/admin/payments"));

app.listen(PORT, () => {
  console.log(`App running on PORT ${PORT}`);
});
