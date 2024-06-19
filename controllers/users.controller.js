const { v4: uuidv4 } = require("uuid");
const usersModel = require("../models/user.model");

const users = usersModel.readUsers();
module.exports.getRandomUser = (req, res) => {
  if (users.length === 0) {
    return res.status(404).send({ message: "User not found" });
  }

  const randomUser = users[Math.floor(Math.random() * users.length)];
  res.send(randomUser);
};

module.exports.getAllUsers = (req, res) => {
  const limit = parseInt(req.query.limit);
  console.log(limit);
  if (limit && limit > 0) {
    return res.send(users.slice(0, limit));
  }
  res.send(users);
};

module.exports.createUser = (req, res) => {
  const { id, name, contact, address, photoURL } = req.body;

  if (!name || !contact || !address || !photoURL) {
    return res.status(400).send({ message: "All fields are required" });
  }

  const newUser = {
    id: uuidv4(),
    name: name,
    contact: contact,
    address: address,
    photoURL,
  };

  users.push(newUser);
  usersModel.writeUsers(users);
  res.status(201).send(newUser);
};

module.exports.updateUser = (req, res) => {
  const userId = req.query.id;

  const { id, name, gender, contact, address, photoURL } = req.body;

  const userIndex = users.findIndex((user) => user.id == userId);

  if (userIndex === -1) {
    return res.status(404).send({ message: "User not found" });
  }

  if (name) users[userIndex].name = name;
  if (gender) users[userIndex].gender = gender;
  if (contact) users[userIndex].contact = contact;
  if (address) users[userIndex].address = address;
  if (photoURL) users[userIndex].photoURL = photoURL;
  usersModel.writeUsers(users);
  res.send(users[userIndex]);
};

module.exports.bulkUpdateUsers = (req, res) => {
  const { users: usersToUpdate } = req.body;

  if (!Array.isArray(usersToUpdate)) {
    return res.status(400).send({ message: "Invalid request body" });
  }

  usersToUpdate.forEach(({ id, name, gender, contact, address, photoURL }) => {
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex !== -1) {
      if (name) users[userIndex].name = name;
      if (gender) users[userIndex].gender = gender;
      if (contact) users[userIndex].contact = contact;
      if (address) users[userIndex].address = address;
      if (photoURL) users[userIndex].photoURL = photoURL;
    }
  });

  usersModel.writeUsers(users);
  res.send(users);
};

module.exports.deleteUser = (req, res) => {
  const userId = req.query.id;

  const userIndex = users.findIndex((user) => user.id == userId);

  if (userIndex === -1) {
    return res.status(404).send({ message: "User not found." });
  }

  users.splice(userIndex, 1);
  usersModel.writeUsers(users);
  res.send(users);
};
