const Recipe = require("../models/recipe-model");
const User = require("../models/user-model");
const bcrypt = require("bcrypt");
const recipeValSchema = require("../validators/recipe-validator");
const { default: mongoose } = require("mongoose");

const getAllChefs = async (req, res) => {
  try {
    const chefExist = await User.find({role: "chef"});
    if (!chefExist) {
      res.status(400).json({ message: "No chefs found" });
    }
    res.status(200).json(chefExist);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "oops! something went wrong", error: error });
  }
};

const getRecipesByChefId = async (req, res) => {
  try {
    const chefExist = await User.findById(req.params.id);
    if (!chefExist) {
      res.status(400).json({ message: "No chefs found" });
    }
    const recipeIds = chefExist.recipes?.map(recipe => new mongoose.Types.ObjectId(recipe));
    const chefRecipes = await Recipe.find({ _id: {$in: recipeIds}})
    res.status(200).json(chefRecipes);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "oops! something went wrong", error: error });
  }
};

const getChefById = async (req, res) => {
  try {
    const chefExists = await User.findById(req.params.id);
    if (!chefExists) {
      res.status(404).json({ message: "chef not found" });
    }
    res.status(200).json(chefExists);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "oops! something went wrong", error: error });
  }
}

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const userExists = await User.findOne({
      $or: [{ username: username }, { email: username }],
    });

    if (!userExists) {
      res.status(400).json({ msg: "user does not exist" });
    }

    const isPasswordValid = userExists.comparePasswor(password);

    if (isPasswordValid) {
      res.status(200).json({
        msg: `${userExists.role} logged in successfully`,
        token: await userExists.generateToken(),
        userId: userExists._id.toString(),
      });
    } else {
      res.status(400).json({ msg: "Incorrect username or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ eror: error });
  }
};

const register = async (req, res) => {
  try {
    const {
      name,
      username,
      email,
      password,
      profilePicture,
      role,
      isApproved,
      likedRecipes,
      savedRecipes,
      recipes
    } = req.body;

    const userExists = await User.findOne({ username });
    if (userExists) {
      res.status(400).json({ msg: "User already exists" });
    }

    const userCreate = await User.create({
      name,
      username,
      email,
      password,
      profilePicture,
      role,
      isApproved,
      likedRecipes,
      savedRecipes,
      recipes
    });

    res.status(201).json({
      msg: `registered successfully as ${role}`,
      token: await userCreate.generateToken(),
      userId: userCreate._id.toString(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ eror: error });
  }
};

module.exports = { login, register, getAllChefs, getChefById, getRecipesByChefId };
