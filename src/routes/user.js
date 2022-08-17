const express = require("express");
const router = express.Router();
const user = require("../controller/UserController");

// login
router.get("/", user.login);
router.post("/login", user.post_login);

// register
router.get("/register", user.register);
router.post("/id_check", user.id_check);
router.post("/register", user.post_register);

// profile
router.get("/profile", user.profile);

module.exports = router;