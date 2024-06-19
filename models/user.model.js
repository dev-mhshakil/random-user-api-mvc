const fs = require("fs");

const usersFile = "users.json";

const readUsers = () => {
  if (!fs.existsSync(usersFile)) {
    fs.writeFileSync(usersFile, JSON.stringify([]), "utf8");
  }
  const data = fs.readFileSync(usersFile, "utf8");
  return JSON.parse(data);
};

const writeUsers = (users) => {
  fs.writeFileSync(usersFile, JSON.stringify(users), "utf8");
};

module.exports = {
  readUsers,
  writeUsers,
};
