const express = require("express");
const router = express.Router();
const ranking = require("../controller/RankingController");

router.get("/", ranking.index);

module.exports = router;