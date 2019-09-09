const imageService = require("../services/image-service");
const debug = require("debug")("controller");

module.exports = {
  postImage: function(req, res) {
    const image = imageService.postImage(req.file, req.body.userId);
    res.json(image);
  }
};
