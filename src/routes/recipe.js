const express = require("express");
const router = express.Router();
const recipe = require("../controller/RecipeController");

const path = require("path");
const multer = require("multer");
const { METHODS } = require("http");
const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, path.join(__dirname, '../public/img/user_recipe/'));
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + ext);
        }
    }),
    limits: {fileSize : 5*1024*1024},
})

// recipe main page
router.get("/", recipe.main);

// write page
router.get("/write", recipe.write_recipe_page);
router.post("/post_write", upload.array("userfile"), recipe.post_write);
router.post("/post_update", upload.array("userfile"), recipe.post_update);

// detail page
router.get("/detail", recipe.detail_page);

// update page
router.get("/update", recipe.update);

// mealkit page
router.get("/mealkit", recipe.mealkit_page);
router.get("/mealkit/id1", recipe.mealkit_detail);

// like
router.post("/like", recipe.like);
router.post("/dislike", recipe.dislike);

// review
router.post("/review", recipe.review);
router.delete("/deletereview", recipe.deleteReview);
router.get("/getreview", recipe.getReview);
router.patch("/updatereview", recipe.updateReview);

// search
router.get("/search", recipe.search);

module.exports = router;