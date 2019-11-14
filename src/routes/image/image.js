const express = require("express");
const imageController = require("../../controllers/image-controller");
const fileUploadService = require("../../services/file-upload");

const router = express.Router();

router.post(
  "/",
  fileUploadService.upload.single("file"),
  imageController.postImage
);

module.exports = router;
