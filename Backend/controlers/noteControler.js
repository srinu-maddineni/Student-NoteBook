import User, { NoteBook, Note } from "../model/user.js";

// Create a new note inside a notebook
const createNote = async (req, res) => {
    try {
        const { note, noteBook } = req.body;

        if (!note || !noteBook) {
            return res.status(400).json({
                success: false,
                message: "Note content and noteBook ID are required"
            });
        }

        // 1. Verify that the notebook exists and belongs to the authenticated user
        const notebookObj = await NoteBook.findById(noteBook);
        if (!notebookObj) {
            return res.status(404).json({
                success: false,
                message: "Notebook not found"
            });
        }

        if (notebookObj.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized: You do not own this notebook"
            });
        }

        // 2. Create and save the new note
        const newNote = new Note({
            note,
            noteBook
        });

        await newNote.save();

        res.status(201).json({
            success: true,
            message: "Note created successfully",
            note: newNote
        });

    } catch (error) {
        console.error("Create Note Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create note",
            error: error.message
        });
    }
};

// Update an existing note
const updateNote = async (req, res) => {
    try {
        const { noteId } = req.params;
        const { note: newContent } = req.body;

        if (!newContent) {
            return res.status(400).json({
                success: false,
                message: "Updated note content is required"
            });
        }

        // 1. Find the note and verify ownership via the notebook
        const existingNote = await Note.findById(noteId).populate("noteBook");
        if (!existingNote) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        if (existingNote.noteBook.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized: You do not own the notebook this note belongs to"
            });
        }

        // 2. Update the note
        existingNote.note = newContent;
        await existingNote.save();

        // Convert the populated notebook back to ID in the response for consistency
        const updatedNote = existingNote.toObject();
        updatedNote.noteBook = updatedNote.noteBook._id;

        res.status(200).json({
            success: true,
            message: "Note updated successfully",
            note: updatedNote
        });

    } catch (error) {
        console.error("Update Note Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update note",
            error: error.message
        });
    }
};

// Delete an existing note
const deleteNote = async (req, res) => {
    try {
        const { noteId } = req.params;

        // 1. Find the note and verify ownership
        const existingNote = await Note.findById(noteId).populate("noteBook");
        if (!existingNote) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        if (existingNote.noteBook.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized: You do not own the notebook this note belongs to"
            });
        }

        // 2. Delete the note
        await Note.findByIdAndDelete(noteId);

        res.status(200).json({
            success: true,
            message: "Note deleted successfully"
        });

    } catch (error) {
        console.error("Delete Note Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete note",
            error: error.message
        });
    }
};

export { createNote, updateNote, deleteNote };
