import React from "react";
import { useNavigate, useParams } from "react-router";
import Navbar from "../../components/navbar/Navbar";
import "./SingleEvent.css";
import { useEffect } from "react";
import { getSingleEvent } from "../../api/event";
import { useState } from "react";

const SingleEventPage = () => {
  const { id } = useParams(); // get the id from url

  const [event, setEvent] = useState(null);
  const [isUserBooked, setUserBooked] = useState(false);
  const [seatsLeft, setSeatsLeft] = useState(null);

  const navigation = useNavigate();

  // const seatsLeft = event.capacity - event.bookingCount;

  const handleBooking = () => {
    alert("🎉 Booking successful! (hook API here)");
  };

  useEffect(() => {
    const getData = async () => {
      const res = await getSingleEvent(id);
      if (res.status === 200) {
        setEvent(res.data.data.event);
        const totalCapacity = res.data.data.event.capacity;
        const bookedCount = res.data.data.event.bookingCount ?? 0;
        setSeatsLeft(totalCapacity - bookedCount);
        setUserBooked(res.data.data.isUserBooked);
      } else {
        navigate("/not-found");
      }
    };

    getData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="single-event-container">
        <div className="single-event-card">
          {event ? (
            <>
              <img
                src={event.image}
                alt={event.title}
                className="event-image"
              />

              <div className="event-details">
                <h1 className="event-title">{event.title}</h1>
                <p className="event-description">{event.description}</p>

                <div className="seats-info">
                  <span
                    className={`seats-left ${
                      seatsLeft > 0 ? "available" : "sold-out"
                    }`}
                  >
                    {seatsLeft > 0
                      ? `🎟️ Seats Left: ${seatsLeft}`
                      : "❌ Fully Booked"}
                  </span>
                  <span className="total-seats">
                    Total Seats: {event.capacity}
                  </span>
                </div>

                <button
                  onClick={handleBooking}
                  disabled={seatsLeft === 0}
                  className={`book-button ${seatsLeft === 0 ? "disabled" : ""}`}
                >
                  {seatsLeft > 0 ? "Book Now" : "Sold Out"}
                </button>
              </div>
            </>
          ) : (
            <p>No Event found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SingleEventPage;