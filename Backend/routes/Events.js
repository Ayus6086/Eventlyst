const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const {addEvent} = require("../controller/Events");
//add event
router.post("/add", upload.single("image"), addEvent);

//update event
//router.put("/update", upload.single("image"), updateEvent);
//get events
//router.get("/getEvents", getEvents);
// delete event
//router.delete("/delete", deleteEvent);
module.exports = router;    