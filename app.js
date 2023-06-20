const express = require("express");
const layouts = require("express-ejs-layouts");
const session = require("express-session");
require("dotenv").config();

const PORT = process.env.PORT || 8000;
const app = express();

const passport = require("passport");

require("./config/passport")(passport);

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: false }));

// EJS
app.use(layouts);
app.set("view engine", "ejs");

app.use(express.static("public"));

app.use("/", require("./routes/main"));
app.use("/auth", require("./routes/auth"));
app.use("/articles", require("./routes/article"));
// app.use("/carts", require("./routes/cart"));
// app.use("/orders", require("./routes/order"));
// app.use("/payments", require("./routes/payment"));
// app.use("/payments", require("./routes/payment"));
// app.use("/support", require("./routes/support"));

app.listen(PORT, () => {
  console.log(`App running on PORT ${PORT}`);
});
