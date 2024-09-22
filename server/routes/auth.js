const express = require("express");
const {
  register,
  login,
  logout,
} = require("../controllers/auth-controller.js");
const authenticate = require("../middleware/authenticate.js");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", authenticate, logout);

module.exports =  router;
