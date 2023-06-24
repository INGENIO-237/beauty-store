const { ensureAuthenticated } = require("../../config/checkAuth");
const db = require("../../config/db");

const router = require("express").Router();

router.use(ensureAuthenticated);

router.get("/", (req, res) => {
  db.query(
    {
      sql: "SELECT * FROM payment pay, order ord WHERE pay.orderid = ord.orderid ORDER BY pay.paymentdate",
    },
    (error, result) => {
      if (error) console.error(error.message);
      const payments = result;
      res.render("pages/admin/payments", {
        layout: "dashboard-layout.ejs",
        payments,
      });
    }
  );
});

module.exports = router;
