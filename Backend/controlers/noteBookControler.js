import User, { NoteBook } from "../model/user.js";

const createNoteBook = async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Title is required to create a notebook"
            });
        }

        // 1. Get user ID from req.user (attached by authMiddleware)
        const userId = req.user.id;

        // 2. Check if the user actually exists in the database
        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({
                success: false,
                message: "User not found. Cannot create notebook."
            });
        }

        // 3. Create and save the Notebook
        const newNotebook = new NoteBook({
            title,
            user: userId
        });

        await newNotebook.save();

        res.status(201).json({
            success: true,
            message: "Notebook created successfully",
            notebook: newNotebook
        });

    } catch (error) {
        console.error("Create Notebook Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create notebook",
            error: error.message
        });
    }
};

export { createNoteBook };
