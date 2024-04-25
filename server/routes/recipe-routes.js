const express = require("express");
const router = express.Router();
const validate = require("../middleware/schema-validation-middleware");
const recipeValSchema = require("../validators/recipe-validator");
const recipeController = require("../controllers/recipe-controller");

router.route("/").get(recipeController.getAllRecipes);
router.route("/:id").get(recipeController.getRecipeById);
router
  .route("/add")
  .post(validate(recipeValSchema), recipeController.addRecipe);
router
  .route("/update/:id")
  .put(validate(recipeValSchema), recipeController.updateRecipe);

module.exports = router;
