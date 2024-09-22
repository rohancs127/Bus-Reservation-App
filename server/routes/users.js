const express = require("express");
const router = express.Router();
const UserController = require("../controllers/usersController");

// POST request to create a new user
router.post("/", UserController.createUser);

// GET request to fetch all users
router.get("/", UserController.getAllUsers);

// GET request to fetch a user by ID
router.get("/:user_id", UserController.getUserById);

// PUT request to update a user
router.put("/:user_id", UserController.updateUser);

// DELETE request to delete a user
router.delete("/:user_id", UserController.deleteUser);

module.exports = router;
