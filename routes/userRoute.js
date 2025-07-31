const express = require("express");

const router = express.Router();

const userController = require("../controller/userController");

router.get("/users", userController.getAllUsers);

router.post("/users/login", userController.logIn);

router.put("/users/update/:id", userController.updateUser);

module.exports = router;
