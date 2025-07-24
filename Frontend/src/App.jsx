import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/signup/Signup";

import { ToastContainer, toast } from "react-toastify";
import AddEvent from "./pages/addEvent/AddEvent";
import RrotectedRoutes from "./RrotectedRoutes";
import Events from "./pages/EventsPage/EventsPage";
import SingleEventPage from "./pages/SingleEvents/SingleEvent";

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/events" element={<Events />} />
          <Route path="/event/:id" element={<SingleEventPage />} />

          {/* protected routes */}
          <Route
            path="/add-event"
            element={
              <RrotectedRoutes adminOnly={true}>
                <AddEvent />
              </RrotectedRoutes>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;