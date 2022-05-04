const express = require("express");
const { getNotes, createNotes, getNoteById, updateNote, deleteNote } = require("../controllers/noteController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route('/').get(protect, getNotes); //to get all posts
router.route('/create').post(protect, createNotes); //to create posts
router.route('/:id').get(getNoteById).put(protect, updateNote).delete(protect, deleteNote); //to send id to db and update/delete them

module.exports = router;