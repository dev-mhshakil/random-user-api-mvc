const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");

router.route("/user/random").get(usersController.getRandomUser);

router.route("/user").get(usersController.getAllUsers);

router.route("/user/save").post(usersController.createUser);

router.route("/user/update").patch(usersController.updateUser);

router.route("/user/update/bulk-update").patch(usersController.bulkUpdateUsers);

router.route("/user/delete/:id").delete(usersController.deleteUser);

module.exports = router;
