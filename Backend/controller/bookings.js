const Bookings = require("../model/booking");
const Events = require("../model/events");
const QRCode = require("qrcode");

const bookTicket = async (req, res) => {
  try {
    // get the bookng data
    const { userId, eventId } = req.body;

    //   get the event details
    const event = await Events.findById(eventId);

    if (!event) {
      return res.status(404).json({
        error: true,
        message: "event not found",
      });
    }

    // get total bookings
    const bookingsCount = await Bookings.countDocuments({ eventId: eventId });

    // check if seets are available
    if (bookingsCount >= event.capacity) {
      return res.status(400).json({
        error: true,
        message: "All seets are booked",
      });
    }

    // create booking
    const booking = new Bookings({ userId, eventId, qrCode: "" });

    // Save to get _id
    await booking.save();

    const qrPayload = JSON.stringify({
      bookingId: booking._id,
      eventId,
      userId,
    });

    // Generate QR code as base64
    const qrCodeDataUrl = await QRCode.toDataURL(qrPayload);

    booking.qrCode = qrCodeDataUrl;

    await booking.save();

    res.status(201).json({
      error: true,
      message: "Booking Successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true, message: "Server Error" });
  }
};

module.exports = {
  bookTicket,
};