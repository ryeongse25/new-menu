const express = require("express");
const router = express.Router();
const recipe = require("../controller/RecipeController");

// recipe main page
router.get("/", recipe.main);

// write page
router.get("/write", recipe.write_recipe_page);
router.post("/detail", upload.fields([{name: 'userfile1'}, {name: 'userfile2'}, {name: 'userfile3'}]), recipe.post_write);

// detail page
router.get("/detail", recipe.detail_page);

module.exports = router;