const fs = require("fs");
const path = require("path");
const uuidv4 = require("uuid/v4");
const usersPath = path.join(__dirname, "..", "db", "users", "all-users.json");

const usersService = {
  postUser: user => {
    try {
      return new Promise((res, rej) => {
        fs.readFile(usersPath, "utf8", (err, data) => {
          const usersArr = data ? JSON.parse(data) : [];
          usersArr.push({ id: uuidv4(), ...user });

          fs.writeFile(usersPath, JSON.stringify(usersArr), err => {
            if (err) rej(err);

            res({ status: "success", user: usersArr[usersArr.length - 1] });
          });
        });
      });
    } catch (e) {
      throw new Error("Error while creating user: ", e);
    }
  },
  getUserById: id => {
    try {
      return new Promise((res, rej) => {
        fs.open(usersPath, "r", (err, fd) => {
          fs.readFile(fd, "utf8", (err, data) => {
            if (err) rej(err);
            const usersArr = data ? JSON.parse(data) : [];
            const user = usersArr.find(el => el.id === id);
            res(user ? { status: "success", user } : { status: "no found" });
          });
        });
      });
    } catch (e) {
      throw new Error("Error while getting user by id: ", e);
    }
  }
};

module.exports = { usersPath, usersService };
