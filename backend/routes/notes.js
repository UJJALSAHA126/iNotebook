const express = require("express");
const User = require("../models/User");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

// Route 1: Get all the notes
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
});

// Route 2: Add a new note using post
router.post(
    "/addnote",
    fetchuser,
    [
        body("title", "Enter a valid title !").isLength({ min: 3 }),
        body("description", "Enter a valid description !").isLength({ min: 5 }),
    ],

    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { title, description, tag } = req.body;

            const note = new Note({
                title,
                description,
                tag,
                user: req.user.id,
            });

            const savedNote = await note.save();

            res.json(savedNote);

        } catch (error) {
            res.status(500).json(error.message);
        }
    }
);

// Route 3: Update an existing note
router.put(
    "/updatenote/:id",
    fetchuser,
    [
        body("title", "Enter a valid title !").isLength({ min: 3 }),
        body("description", "Enter a valid description !").isLength({ min: 5 }),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { title, description, tag } = req.body;

            const newNote = {};
            if (title) newNote.title = title;
            if (description) newNote.description = description;
            if (tag) newNote.tag = tag;

            // Find the note and update

            let note = await Note.findByIdAndUpdate(req.params.id);
            if (!note) return res.status(404).send("Note note found !!");

            if (req.user.id !== note.user.toString()) {
                return res.status(404).send("Access Denied !!");
            }

            note = await Note.findByIdAndUpdate(
                req.params.id,
                { $set: newNote },
                { new: true }
            );
            res.json({ note });
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
);



// Route 4: Delete an existing note
router.delete(
    "/deletenote/:id",
    fetchuser,
    async (req, res) => {
        try {
            
            // Find the note and delete

            let note = await Note.findByIdAndUpdate(req.params.id);
            if (!note) return res.status(404).send("Note note found !!");

            if (req.user.id !== note.user.toString()) {
                return res.status(404).send("Access Denied !!");
            }

            note = await Note.findByIdAndDelete(req.params.id);
            res.json({ success: "Note has been deleted successfully", note: note });

        } catch (error) {
            res.status(500).json(error.message);
        }
    }
);

router.get("/", (req, res) => {
    res.send("Notes");

    console.log("Req", req.body);
});

module.exports = router;
