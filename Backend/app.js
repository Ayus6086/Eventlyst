const express = require("express");
const connectDb = require("./db");
const usersRouter = require("./routes/users");
const eventsRouter = require("./routes/Events");

require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

connectDb();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// users routes
app.use("/api/v1/users", usersRouter);

// events routes
app.use("/api/v1/events", eventsRouter);

const PORT = process.env.PORT ?? 3001;

// liste on the port
app.listen(PORT, () => console.log(`Running app on PORT ${PORT}`));