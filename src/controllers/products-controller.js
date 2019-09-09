const debug = require("debug")("controller");
const { productsService } = require("../services/products-service");

module.exports = {
  get: async function(req, res) {
    try {
      let products;
      if (req._parsedUrl.path === "/") {
        products = await productsService.getAll();
      }

      if (req.query.ids) {
        products = await productsService.getByIds(req.query.ids);
      }

      if (req.query.cat) {
        products = await productsService.getByCat(req.query.cat);
      }

      res.json(products);
    } catch (e) {
      debug("error %O", e);
    }
  },
  getById: async function(req, res) {
    try {
      const productId = Number(req.params.id);
      const product = await productsService.getById(productId);
      res.json(product);
    } catch (e) {
      debug("error %O", e);
    }
  }
};
