const express = require("express");
const router = express.Router();
const { bookTicket } = require("../controller/bookings");
const { isAuthorized } = require("../middleware/auth");

router.post("/book", isAuthorized, bookTicket);

module.exports = router;