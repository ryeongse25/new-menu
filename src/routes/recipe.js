const express = require("express");
const router = express.Router();
const recipe = require("../controller/RecipeController");

// recipe main page
router.get("/", recipe.main);

// write page
router.get("/write", recipe.write_recipe_page);

// detail page
router.post("/detail", recipe.post_write);

module.exports = router;