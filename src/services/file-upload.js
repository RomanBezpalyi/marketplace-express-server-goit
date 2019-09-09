const multer = require("multer");
const path = require("path");
const fs = require("fs");

const debug = require("debug");

class FileService {
  constructor() {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        const assetsPath = path.join(__dirname, "..", "assets");
        fs.existsSync(assetsPath) || fs.mkdirSync(assetsPath);
        cb(null, assetsPath);
      },
      filename: (req, file, cb) => {
        cb(null, file.originalname);
      }
    });

    this.upload = multer({ storage });
  }

  moveFile(from, to) {
    return new Promise((res, rej) => {
      const rFile = fs.createReadStream(from);
      const wFile = fs.createWriteStream(to);

      rFile
        .on("error", err => {
          if (err) {
            debug(err);
            rej(err);
          }
        })
        .on("end", () => res(true));
      wFile
        .on("error", err => {
          if (err) {
            debug(err);
            rej(err);
          }
        })
        .on("end", () => {
          fs.unlink(from, () => {});
          res(true);
        });

      rFile.pipe(wFile);
    });
  }
}

module.exports = new FileService();
