const express = require("express");
const notes = require("./data/notes");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

// get
app.get("/", (req, res) => {
    res.send("Api is running");
});
app.get("/api/notes", (req, res) => {
    res.json(notes);
});
app.get("/api/notes/:id", (req, res) =>{
    const note = notes.find((n) => 
        n._id === req.params.id
    );
    res.send(note);
})

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running at ${PORT}`));