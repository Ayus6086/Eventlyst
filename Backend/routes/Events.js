const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const {
  addEvent,
  getAllEvents,
  getSingleEvent,
} = require("../controller/Events");
const { isAuthorized, isAdmin } = require("../middleware/auth");

// router.use((req, res, next) => {
//   console.log("h1");
//   next();
// });

// add event
router.post("/add", isAuthorized, isAdmin, upload.single("image"), addEvent);

// get all events
router.get("/all", getAllEvents);

router.get("/single", isAuthorized, getSingleEvent);

// router.post("/add", isAuthorized, isAdmin, upload.single("image"), addEvent);

// update event

// create api to get the events

// get events

// delete event --> you all will do

module.exports = router;