const debug = require("debug")("app:http");
module.exports = {
  errorHandler: (err, req, res, next) => {
    if (err) {
      console.error(err.stack);
    }
    res.statusCode = 500;
    res.json({ message: "Something went wrong" });
    next();
  },
  commonMidleware: (req, res, next) => {
    debug(`request name is ${req.pathname}`);
    next();
  }
};
