require("dotenv").config();
const express = require("express");
const app = express();
const authRoutes = require("./routes/auth-routes");
const recipeRoutes = require("./routes/recipe-routes");
const connectDb = require("./config/db");
const cors = require('cors');

app.use(express.json());
app.use(cors());

connectDb().then(() => {
  app.use("/api/auth", authRoutes);
  app.use("/api/recipe", recipeRoutes);

  app.get("/", (req, res) => {
    res.status(200).send("Server is up and running");
  });
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`server is up and running on port ${port}`);
});
