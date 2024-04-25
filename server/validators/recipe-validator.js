const { z } = require("zod")

const timeSchema = z.object({
    hours: z.number().default(0),
    minutes: z.number().default(0),
  });

const recipeValSchema = z.object({
    name: z
    .string({required_error: "name is required"}),
    ur: z.
    string({required_error: "url is required"})
    .url("invalid url"),
    description: z
    .string({required_error: "description is required"}),
    author: z.string({required_error: "author is required"}),
    isVegetarian: z.boolean({required_error: "please select a valid option"}),
    prepTime: timeSchema,
    cookTime: timeSchema,
    ingredients: z.array(z.string()).nonempty("ingredients cannot be empty"),
    method: z.array(z.string()).nonempty("method cannot be empty"),
})

module.exports = recipeValSchema