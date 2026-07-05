import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    googleId: {
        type: String,
        required: true,
        unique: true
    },
    pic: {
        type: String
    }
});

const noteBookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

const noteSchema = new mongoose.Schema({
    note: {
        type: String,
        required: true
    },
    noteBook: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "NoteBook"
    }
})

const User = mongoose.model("User", userSchema);
const NoteBook = mongoose.model("NoteBook", noteBookSchema);
const Note = mongoose.model("Note", noteSchema);

export { NoteBook, Note };
export default User;
