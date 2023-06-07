const express = require("express");
const layouts = require("express-ejs-layouts");
require("dotenv").config();

const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.urlencoded({ extended: false }));

// EJS
app.use(layouts);
app.set("view engine", "ejs");

app.use(express.static("public"));

app.use("/", require("./routes/main"));
// app.use("/admins", require("./routes/admin"));
app.use("/articles", require("./routes/article"));
// app.use("/carts", require("./routes/cart"));
// app.use("/orders", require("./routes/order"));
// app.use("/payments", require("./routes/payment"));
// app.use("/payments", require("./routes/payment"));
// app.use("/stores", require("./routes/store"));
// app.use("/support", require("./routes/support"));

app.listen(PORT, () => {
  console.log(`App running on PORT ${PORT}`);
});
