const express = require("express");

const router = express.Router();

const userController = require("../controller/userController");

router.get("/users", userController.getAllUsers);

router.post("/users/login", userController.logIn);

router.get("/users/:id", userController.getUserProfile);

router.put("/users/update/:id", userController.updateUser);

router.put("/users/reset-password/:id", userController.updateUserPassword);

module.exports = router;
