const Event = require("../model/EventsSchema"); 
const cloudinary = require("../helper/cloudinary");

const uploadToCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: "events" },
            (error, result) => {
                if (error) return reject(error);
                resolve(result.secure_url);
            }
        );
        stream.end(fileBuffer);
    });
};

async function addEvent(req, res) {
    try {
        const { title, description, date, time, capacity,createdBy, image, tags } = req.body;

        if (!req.file) {
            return res.status(400).json({
                error: true,
                message: "Event image is required!",
            });
        }

        const imageurl = await uploadToCloudinary(req.file.buffer);

        const result = await Event.create({
            title,
            description,
            date,
            time,
            capacity,
            createdBy,
            image: imageurl,
            tags,
        });

        if (result) {
            return res.status(200).json({
                error: false,
                message: "Added event",
            });
        } else {
            return res.status(400).json({
                error: true,
                message: "Error in adding events",
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: true,
            message: "Internal server error",
        });
    }
}

module.exports = {
    addEvent,
};