const express = require("express")
const connectDB = require("./db");
const usersRouter = require("./routes/users");
const eventRouter = require("./routes/Events");
const app = express()
require("dotenv").config();
app.use(express.json());
//user routes
app.use("/api/v1/users", usersRouter);
//events routes
app.use("/api/v1/events", eventRouter);
const PORT = process.env.PORT ?? 3001;
connectDB();
app.listen(PORT, () => console.log(`Running app on ${PORT}`));