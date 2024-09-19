const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./src/config/db");
const jwt = require("jsonwebtoken");
const userRouter = require("./src/routes/auth");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");

app.use(bodyParser.json());

connectDB();

console.log("my name is", process.env.myVar);
app.get("/", (req, res) => {
  res.send("Welcome to login module");
});
app.use("/user", userRouter);
// Swagger setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
