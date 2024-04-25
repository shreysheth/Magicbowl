const {z} = require("zod");

const signUpSchema = z.object({
    name: z
    .string({required_error: "name is required."}),
    username: z
    .string({required_error: "username is required"})
    .min(3, "username cannot be less than 3 characters"),
    email: z
    .string({required_error: "email is required"})
    .email("invalid email address"),
    password: z
    .string({required_error: "password is required"})
    .min(8, "password must be at least 8 characters long"),
    profilePicture: z
    .string()
    .default('../assets/images/default-profile-picture.jpg'),
    role: z
    .enum(['user', 'chef', 'admin'])
    .default('user'),
    isApproved: z
    .boolean()
    .default(false),
})

module.exports = signUpSchema;