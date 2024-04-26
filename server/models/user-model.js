const { default: mongoose } = require("mongoose");
const validator = require('validator');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    min: [3, "username cannot be less than 3 characters"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Please enter a valid email address.'
    }
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default: "../assets/images/default-profile-picture.jpg",
  },
  role: {
    type: String,
    enum: ["user", "chef", "admin"],
    default: "user",
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  likedRecipes: {
    type: Array,
    default: []
  },
  savedRecipes: {
    type: Array,
    default: []
  }
},  
{
    timestamps: true
});

userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            role: this.role
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: "30d",
        }
    );
    } catch (error) {
        console.error(error);
    }
}

userSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        console.error(error);
    }
}

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }

    try {
        const saltRounds = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
        const hashPassword = await bcrypt.hash(this.password, saltRounds);
        this.password = hashPassword;
    } catch (error) {
        next(error);
    }
});

const User = new mongoose.model("User", userSchema);

module.exports = User;
