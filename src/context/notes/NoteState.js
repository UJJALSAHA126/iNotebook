import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {

    const hostId = "http://localhost:5000";

    const notesInitial = [];

    const [notes, setNotes] = useState(notesInitial)


    // Fetching all the notes from the server
    const fetchAllNotes = async () => {

        const response = await fetch(`${hostId}/api/notes/fetchallnotes/`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwNzVjZjQ5MDYwNWNmYjhmNzU4NTdhIn0sImlhdCI6MTY3ODIxMzA1Mn0.Le8SUdfNIi66adYQSXG6bcChAtR8fhDOxT5-4ZXuwO8"
            },
        });

        const json = await response.json();

        console.log('json', json);
        json.sort((a, b) => { return b.date.localeCompare(a.date) });
        console.log('json', json);

        setNotes(json);
        // console.log('JSON', json);
    }


    // Adding a note
    const addNote = async (note) => {
        const newNote = {
            "title": note.title,
            "description": note.description,
            "tag": note.tag,
            "user": note.user
        }

        const response = await addNoteToServer(newNote);
        console.log('Response Add', response);

        if (response.status !== 200) return;

        const json = await response.json();

        setNotes(notes.concat(json));
        console.log('Note Added : ', json);
    }

    // Add note to the server
    const addNoteToServer = async (note) => {
        const newNote = {
            "title": note.title,
            "description": note.description,
            "tag": note.tag,
            "user": note.user
        }

        const data = JSON.stringify(newNote);

        const response = await fetch(`${hostId}/api/notes/addnote/`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwNzVjZjQ5MDYwNWNmYjhmNzU4NTdhIn0sImlhdCI6MTY3ODIxMzA1Mn0.Le8SUdfNIi66adYQSXG6bcChAtR8fhDOxT5-4ZXuwO8"
            },

            body: data
        });

        return response;
    }

    // *********************


    // Editing a note
    const editNote = async (note) => {
        const response = await editNoteToServer(note);
        console.log('Response Update', response);

        if (response.status !== 200) return;

        const newNotes = notes.filter((noteI) => (note._id !== noteI._id));
        newNotes.push(note);

        newNotes.sort((a, b) => { return b.date.localeCompare(a.date) });
        setNotes(newNotes);

    }

    // Editing a note on the server
    const editNoteToServer = async (note) => {

        const data = JSON.stringify(note);

        const response = await fetch(`${hostId}/api/notes/updatenote/${note._id}`, {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwNzVjZjQ5MDYwNWNmYjhmNzU4NTdhIn0sImlhdCI6MTY3ODIxMzA1Mn0.Le8SUdfNIi66adYQSXG6bcChAtR8fhDOxT5-4ZXuwO8"
            },

            body: data
        });

        return response;
    }



    // *********************

    // Deleting a note
    const deleteNote = async (id) => {

        const response = await deleteNoteFromServer(id);
        console.log('Delete Note', response)
        console.log('Delete Note Status', response.status);

        if (response.status !== 200) return;

        const newNotes = notes.filter((note) => (note._id !== id));
        setNotes(newNotes);
    }

    // Deleting a note from the server
    const deleteNoteFromServer = async (id) => {

        const response = await fetch(`${hostId}/api/notes/deletenote/${id}`, {
            method: "DELETE", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwNzVjZjQ5MDYwNWNmYjhmNzU4NTdhIn0sImlhdCI6MTY3ODIxMzA1Mn0.Le8SUdfNIi66adYQSXG6bcChAtR8fhDOxT5-4ZXuwO8"
            },
        });

        return response;
    }





    return (
        <NoteContext.Provider value={{ notes, fetchAllNotes, addNote, editNote, deleteNote }}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
