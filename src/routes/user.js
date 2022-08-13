const express = require("express");
const router = express.Router();
const user = require("../controller/UserController");

// login
router.get("/", user.login);

// register
router.get("/register", user.register);
router.post("/id_check", user.idCheck);

// profile
router.get("/profile", user.profile);

module.exports = router;