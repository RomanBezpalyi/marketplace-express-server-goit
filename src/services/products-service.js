const fs = require("fs");
const path = require("path");

const productsPath = path.join(
  __dirname,
  "..",
  "db",
  "products",
  "all-products.json"
);

const productsService = {
  getAll: () => {
    try {
      return new Promise((res, rej) => {
        fs.open(productsPath, "r", (err, fd) => {
          fs.readFile(fd, "utf8", (err, data) => {
            if (err) rej(err);
            res({ status: "success", products: JSON.parse(data) });
            fs.close(fd, () => {
              console.log("succes read file");
            });
          });
        });
      });
    } catch (e) {
      throw new Error("Error getting all products: ", e);
    }
  },

  getById: id => {
    try {
      return new Promise((res, rej) => {
        fs.open(productsPath, "r", (err, fd) => {
          fs.readFile(fd, "utf8", (err, data) => {
            const productsArr = JSON.parse(data);
            const product = productsArr.find(el => el.id === id);
            res(
              product
                ? { status: "success", product }
                : { status: "no products", products: [] }
            );
            if (err) rej(err);
          });
        });
      });
    } catch (e) {
      throw new Error("Error getting products by id: ", e);
    }
  },

  getByIds: ids => {
    try {
      return new Promise((res, rej) => {
        fs.open(productsPath, "r", (err, fd) => {
          fs.readFile(fd, "utf8", (err, data) => {
            const productsArr = JSON.parse(data);
            const idsArr = ids.split(",");
            const products = productsArr.filter(product =>
              idsArr.includes(String(product.id))
            );
            res(
              products.length
                ? { status: "success", products }
                : { status: "no products", products: [] }
            );
            if (err) rej(err);
          });
        });
      });
    } catch (e) {
      throw new Error("Error getting products by ids: ", e);
    }
  },

  getByCat: cat => {
    try {
      return new Promise((res, rej) => {
        fs.open(productsPath, "r", (err, fd) => {
          fs.readFile(fd, "utf8", (err, data) => {
            const categoriesArr = cat.split(",");

            const productsArr = JSON.parse(data);
            const products = productsArr.filter(product => {
              const matchedCategories = categoriesArr.map(category =>
                product.categories.includes(category) ? true : false
              );
              // returns false if there is at least one false AND true if all categories matched
              return !matchedCategories.includes(false);
            });
            res(
              products.length
                ? { status: "success", products }
                : { status: "no products", products: [] }
            );
            if (err) rej(err);
          });
        });
      });
    } catch (e) {
      throw new Error("Error getting products by category: ", e);
    }
  }
};

module.exports = {
  productsPath,
  productsService
};
