const express = require("express");
const router = express.Router();
const user = require("../controller/UserController");

// login
router.get("/", user.login);
router.post("/login", user.post_login);

// find id
router.get("/find_id", user.find_id);
router.post("/find_id", user.post_find_id);
router.post("/find_id/result", user.find_id_result);

// find password
router.get("/find_password", user.find_pw);
router.post("/find_password", user.post_find_pw);
router.post("/find_password/result", user.find_pw_result);

// register
router.get("/register", user.register);
router.post("/id_check", user.id_check);
router.post("/register", user.post_register);

// profile
router.get("/profile", user.profile);

// delete
router.delete("/delete", user.delete);

// update
router.get("/update", user.update_page);
router.patch("/update", user.update);

module.exports = router;