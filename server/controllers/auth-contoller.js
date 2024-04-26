const User = require("../models/user-model");
const bcrypt = require("bcrypt");

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
      savedRecipes
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
      savedRecipes
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

module.exports = { login, register };
