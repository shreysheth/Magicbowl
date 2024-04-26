const Recipe = require("../models/recipe-model");

const getAllRecipes = async (req, res) => {
  try {
    const recipeExist = await Recipe.find();
    if (!recipeExist) {
      res.status(400).json({ message: "No recipes found" });
    }
    res.status(200).json(recipeExist);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "oops! something went wrong", error: error });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const recipeExists = await Recipe.findById(req.params.id);
    if (!recipeExists) {
      res.status(404).json({ message: "recipe not found" });
    }
    res.status(200).json(recipeExists);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "oops! something went wrong", error: error });
  }
};

const addRecipe = async (req, res) => {
  try {
    const {
      name,
      url,
      description,
      author,
      isVegetarian,
      prepTime,
      cookTime,
      ingredients,
      method,
      likes,
      saves
    } = req.body;

    const recipeAdded = await Recipe.create({
      name,
      url,
      description,
      author,
      isVegetarian,
      prepTime,
      cookTime,
      ingredients,
      method,
      likes,
      saves
    });

    res
      .status(200)
      .json({ mesasge: "recipe added successfully", recipe: recipeAdded });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "oops! something went wrong", error: error });
  }
};

const updateRecipe = async (req, res) => {
  try {
    const {
      name,
      url,
      description,
      author,
      isVegetarian,
      prepTime,
      cookTime,
      ingredients,
      method,
      likes,
      saves
    } = req.body;

    const recipeExists = await Recipe.findById(req.params.id);

    if (!recipeExists) {
      res.status(404).json({ message: "recipe not found" });
    }

    const recipeUpdated = await Recipe.updateOne({
      name,
      url,
      description,
      author,
      isVegetarian,
      prepTime,
      cookTime,
      ingredients,
      method,
      likes,
      saves
    });
    res
      .status(200)
      .json({ message: "recipe updated successfully", recipe: recipeUpdated });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "oops! something went wrong", error: error });
  }
};

module.exports = { getAllRecipes, getRecipeById, addRecipe, updateRecipe };
