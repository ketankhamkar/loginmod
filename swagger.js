// swagger.js

const swaggerAutogen = require("swagger-autogen")();

// Swagger document configuration
const doc = {
  info: {
    title: "loginmodules",
    description: "This is a sample API documentation",
  },
  host: "localhost:5000",
  schemes: ["http"],
};

const outputFile = "./swagger-output.json";

const endpointsFiles = ["./app.js"];

// Generate Swagger documentation
swaggerAutogen(outputFile, endpointsFiles, doc);
