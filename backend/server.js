const express = require("express");
const notes = require("./data/notes");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const path = require("path");

dotenv.config();
connectDB();
// this is imporatnt to get data from users while sending request
app.use(express.json());
// get

// app.get("/api/notes", (req, res) => {
//     res.json(notes);
// });
// app.get("/api/notes/:id", (req, res) => {
//     const note = notes.find((n) =>
//         n._id === req.params.id
//     );
//     res.send(note);
// })

app.use("/api/users", userRoutes);

// routes for user Notes  - first create notes server, then notes Model, then goto notes Routes.js and then controller

app.use("/api/notes", noteRoutes);

// deployment

__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Api is running");
  });
}

// deployment

// check for errors and display errors in json
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running at ${PORT}`));
