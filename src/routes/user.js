const express = require("express");
const router = express.Router();
const user = require("../controller/UserController");

// login
router.get("/", user.login);
router.post("/login", user.post_login);

// find_id
router.get("/find_id", user.find_id);
router.post("/find_id", user.post_find_id);
router.post("/find_id/result", user.find_id_result);

// register
router.get("/register", user.register);
router.post("/id_check", user.id_check);
router.post("/register", user.post_register);

// profile
router.get("/profile", user.profile);

// delete
router.delete("/delete", user.delete);

module.exports = router;