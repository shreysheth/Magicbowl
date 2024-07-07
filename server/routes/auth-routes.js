const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-contoller");
const validate = require("../middleware/schema-validation-middleware");
const signUpSchema = require("../validators/auth-validator");

router.route("/chefs").get(authController.getAllChefs)
router.route("/chefs/:id").get(authController.getChefById)
router.route("/chefs/:id/recipes").get(authController.getRecipesByChefId)
router.route("/login").post(authController.login);
router.route("/register").post(validate(signUpSchema), authController.register);

module.exports = router;
