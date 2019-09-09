const users = require("./users/users");
const image = require("./image/image");
const orders = require("./orders/orders");
const products = require("./products/products");
const invalidRoute = require("./invalidRoute");

module.exports = {
  products,
  users,
  orders,
  image,
  invalidRoute
};
