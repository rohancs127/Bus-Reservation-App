const UserModel = require("../models/usersModel");

const UserController = {
  createUser: async (req, res) => {
    const { name, email, password } = req.body;

    try {
      const newUser = await UserModel.createUser(name, email, password);
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await UserModel.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  },

  getUserById: async (req, res) => {
    const { user_id } = req.params;

    try {
      const user = await UserModel.getUserById(user_id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  },

  updateUser: async (req, res) => {
    const { user_id } = req.params;
    const { name, email, password } = req.body;

    try {
      const updatedUser = await UserModel.updateUser(
        user_id,
        name,
        email,
        password
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(updatedUser);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  },

  deleteUser: async (req, res) => {
    const { user_id } = req.params;

    try {
      await UserModel.deleteUser(user_id);
      res.json({ message: "User deleted" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  },
};

module.exports = UserController;
