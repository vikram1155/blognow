const asyncHandler = require("express-async-handler");
const Note = require("../models/noteModel");

const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user._id });
  res.json(notes);
});

const createNotes = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;
  if (!title || !category || !content) {
    req.status(401);
    throw new Error("Plaease fill all fields!");
  } else {
    const note = new Note({ user: req.user._id, title, content, category });
    const createdNote = await note.save(); //save to db
    res.status(201).json(createdNote);
  }
});

const getNoteById = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (note) {
    res.json(note);
  } else {
    res.status(400).json({ message: "Note not found" });
  }
  res.json(note);
});

const updateNote = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;
  const note = await Note.findById(req.params.id);
  if (note.user.toString() != req.user._id.toString()) {
    res.status(401).json("you are not authorized to change");
  }
  if (note) {
    note.title = title;
    note.content = content;
    note.category = category;
    const updatedNote = await note.save();
    res.json(updatedNote);
  } else {
    res.status(404);
    throw new Error("Note not found");
  }
});

// to delete notes - api
const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (note.user.toString() != req.user._id.toString()) {
    res.status(401).json("you are not authorized to delete");
  }
  if(note){
    await note.remove();
    res.json({message:"note removed"});
  }
  else{
    res.status(404);
    res.json({message:"note not removed"});
  }
});

module.exports = { getNotes, createNotes, getNoteById, updateNote, deleteNote };
