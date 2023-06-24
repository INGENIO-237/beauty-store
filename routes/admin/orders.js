const { ensureAuthenticated } = require("../../config/checkAuth");
const db = require("../../config/db");

const router = require("express").Router();

router.use(ensureAuthenticated)

router.get("/", (req, res) => {
  db.query(
    {
      sql: "SELECT * FROM order ord, cart c, article art WHERE ord.orderid = c.orderid AND c.articleid = art.articleid ORDER BY ord.orderdate DESC",
    },
    (error, result) => {
      if (error) console.error(error.message);
      const orders = result;
      console.log(result);
      res.render("pages/admin/orders", {
        layout: "dashboard-layout.ejs",
        orders,
      });
    }
  );
});

module.exports = router;
