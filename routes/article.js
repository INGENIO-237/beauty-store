const { getAllArticlesHandler } = require("../controllers/article");

const router = require("express").Router();

// @desc Get all articles
// @route GET /api/{version}/articles
// private
router.get("/", getAllArticlesHandler);

// // @desc Create an article
// // @route POST /api/{version}/articles
// // private
// router.post("/", upload.single('image_art'), createArticleHandler);

// // @desc Get single article
// // @route GET /api/{version}/articles/:id
// // private
// router.get("/:id", checkId, getArticleHandler);

// // @desc Update single article
// // @route PUT /api/{version}/articles/:id
// // private
// router.put("/:id", checkId, upload.single('image_art'), updateArticleHandler);

// // @desc Delete single article
// // @route DELETE /api/{version}/articles/:id
// // private
// router.delete("/:id", checkId, deleteArticleHandler);

module.exports = router;
