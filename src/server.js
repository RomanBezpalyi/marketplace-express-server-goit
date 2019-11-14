const routes = require("./routes/routes");
const morgan = require("morgan");
const express = require("express");
const bodyParser = require("body-parser");
const middlewares = require("./middlewares/middlewares");

const server = express();

server
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(morgan("combined"))
  .use(middlewares.commonMidleware)
  .use("/products", routes.products)
  .use("/users", routes.users)
  .use("/orders", routes.orders)
  .use("/image", routes.image)
  .use("/*", routes.invalidRoute)
  .use(middlewares.errorHandler);

module.exports = server;
