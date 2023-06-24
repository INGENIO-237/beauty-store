const router = require("express").Router();

const { ensureAuthenticated } = require("../../config/checkAuth");
const db = require("../../config/db");

router.use(ensureAuthenticated)
// Multer storage engine
// const storage = require("../../utils/image-storage");

// // Package in charge of handling images
// const multer = require("multer");
// const upload = multer({ storage: storage });

// Products
router.get("/", (req, res) => {
  db.query(
    { sql: "SELECT * FROM category ORDER BY cattitle ASC" },
    (error, result) => {
      if (error) console.error(error.message);
      const categories = result;
      db.query(
        {
          sql: "SELECT * FROM article art, category cat WHERE art.catid = cat.catid",
        },
        (error, result) => {
          if (error) console.error(error.message);
          res.render("pages/admin/products", {
            layout: "dashboard-layout.ejs",
            products: result,
            categories,
          });
        }
      );
    }
  );
});

// router.post("/", upload.single("image"), createProduct);

// router.get("/:id", getSingleProduct);

// router.post("/:id", upload.single("image"), updateProduct);

// router.get("/delete/:id", deleteProduct);

module.exports = router;
