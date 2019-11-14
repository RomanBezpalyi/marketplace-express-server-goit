const express = require("express");
const usersController = require("../../controllers/users-controller");

const router = express.Router();

router.get("/:id", usersController.getUserById);
router.post("/", usersController.postUser);

module.exports = router;
