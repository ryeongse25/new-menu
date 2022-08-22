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
router.post("/detail", upload.array("userfile"), recipe.post_write);

// detail page
router.get("/detail", recipe.detail_page);

module.exports = router;