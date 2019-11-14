const path = require("path");
const fileService = require("./file-upload");

module.exports = {
  postImage: (file, userID) => {
    const fileNameArr = file.originalname.split("");
    const slicedToDot = fileNameArr
      .slice(fileNameArr.lastIndexOf("."))
      .join("");
    fileService.moveFile(
      file.path,
      path.join(__dirname, "../assets", `user-${userID}${slicedToDot}`)
    );

    return { status: `was saved in: user-${userID}` };
  }
};
