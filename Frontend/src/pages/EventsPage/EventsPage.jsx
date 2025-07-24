import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import EventCard from "../../components/eventCard/eventCard";
import FilterBar from "../../components/filterBar/filterBar";
import "./Events.css";
import { getEvents } from "../../api/event";
import { toast } from "react-toastify";

function Events() {
  const [events, setEvents] = useState([]);
  const [sort, setSort] = useState("newest");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const result = await getEvents(sort);
        if (result.status === 200) {
          setEvents(result.data.data);
        }
      } catch (err) {
        toast.error("Error in fetching events");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [sort]);

  return (
    <>
      <Navbar />
      <div className="events-page">
        <h1 className="events-page__title">All Events</h1>
        <FilterBar sort={sort} setSort={setSort} />
        {loading ? (
          <p>loading...</p>
        ) : (
          <div className="events-grid">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Events;