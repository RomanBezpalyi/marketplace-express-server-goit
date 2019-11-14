const debug = require("debug")("controller");
const orderService = require("../services/orders-service");

module.exports = {
  postOrder: async function(req, res) {
    try {
      const order = await orderService.postOrder(req.body);
      res.json(order);
    } catch (e) {
      debug("error %O", e);
    }
  }
};
