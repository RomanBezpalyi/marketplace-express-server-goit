const debug = require("debug")("controller");
const { usersService } = require("../services/users-service");

module.exports = {
  postUser: async function(req, res) {
    try {
      const user = await usersService.postUser(req.body);
      res.json(user);
    } catch (e) {
      debug("error %O", e);
    }
  },
  getUserById: async function(req, res) {
    try {
      const id = req.params.id;
      const user = await usersService.getUserById(id);
      res.json(user);
    } catch (e) {
      debug("error %O", e);
    }
  }
};
