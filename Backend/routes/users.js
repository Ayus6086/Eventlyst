const express = require("express");
const router = express.Router();
const {signupUser} = require("../controller/users");
const {loginUser} = require("../controller/users");
router.post("/signup", signupUser);
router.post("/login", loginUser);
module.exports = router;
