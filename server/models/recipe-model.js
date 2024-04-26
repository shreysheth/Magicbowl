const { default: mongoose, model, Schema } = require("mongoose");

const timeSchema = new mongoose.Schema({
    hours: { type: Number, default: 0 },
    minutes: { type: Number, default: 0 }
  });

const recipeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    author:{
        type: String,
        required: true
    },
    isVegetarian: {
        type: Boolean,
        required: true,
    },
    prepTime: {
        type: timeSchema,
    },
    cookTime: {
        type: timeSchema
    },
    ingredients: {
        type: [{type: String}],
        required: true,
    },
    method: {
        type: [{type: String}],
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    saves: {
        type: Number,
        default: 0,
    }
})

const Recipe = new model("Recipe", recipeSchema);

module.exports = Recipe;