import NoteContext from "./noteContext";
import { useState } from "react";
import hostId, { getAuthToken } from "../../constants/Constants";


const NoteState = (props) => {
    const notesInitial = [];

    // const { token } = props;
    // console.log('token', token);

    const [notes, setNotes] = useState(notesInitial)


    // Fetching all the notes from the server
    const fetchAllNotes = async () => {
        const authToken = getAuthToken();
        if (!authToken) return;

        const response = await fetch(`${hostId}/api/notes/fetchallnotes/`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": authToken
            },
        });

        const notes = await response.json();
        // if (!notes || notes.length <= 0) return;

        // const notes = await JSON.stringify(json).json();
        console.log('json', notes);
        // if (notes)
        if (notes && notes.length > 0)
            notes.sort((a, b) => { return b.date.localeCompare(a.date) });
        // console.log('json', json);

        setNotes(notes);
        // // console.log('JSON', json);
    }


    // Adding a note
    const addNote = async (note) => {
        const authToken = getAuthToken();
        if (!authToken) return;

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
        const newNotes = notes.concat(json);
        newNotes.sort((a, b) => { return b.date.localeCompare(a.date) });

        setNotes(newNotes);
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
                "auth-token": getAuthToken()
            },

            body: data
        });

        return response;
    }

    // *********************


    // Editing a note
    const editNote = async (note) => {

        const authToken = getAuthToken();
        if (!authToken) return;

        const response = await editNoteToServer(note);
        // console.log('Response Update', response);

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
                "auth-token": getAuthToken()
            },

            body: data
        });

        return response;
    }



    // *********************

    // Deleting a note
    const deleteNote = async (id) => {

        const authToken = getAuthToken();
        if (!authToken) return;

        const response = await deleteNoteFromServer(id);
        // console.log('Delete Note', response)
        // console.log('Delete Note Status', response.status);

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
                "auth-token": getAuthToken()
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
