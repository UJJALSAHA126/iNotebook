import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    // const s1 = {
    //     "name": "Mem Nil",
    //     "age": " 22",
    // };

    // const [state, setState] = useState(s1)

    // const update = () => {
    //     setTimeout(() => {
    //         setState({
    //             "name": "Mem Weds Nil",
    //             "age": "26",
    //         })
    //     }, 2000);
    // }

    const notesInitial = [
        {
            "_id": "640785dda3d43235003dfb6c7",
            "user": "64075cf490605cfb8f75857a",
            "title": "My Note",
            "description": "Mem Nil Rocks",
            "tag": "personal",
            "date": "2023-03-07T18:43:41.284Z",
            "__v": 0
        },
        {
            "_id": "6407940b2b8e5089f6adac5bd",
            "user": "64075cf490605cfb8f75857a",
            "title": "My Note 2",
            "description": "Mem Nil Rocks 2",
            "tag": "personal",
            "date": "2023-03-07T19:44:11.525Z",
            "__v": 0
        },

        {
            "_id": "640785dda34n3235003dfb6c7",
            "user": "64075cf490605cfb8f75857a",
            "title": "My Note",
            "description": "Mem Nil Rocks",
            "tag": "personal",
            "date": "2023-03-07T18:43:41.284Z",
            "__v": 0
        },
        {
            "_id": "6407940b2b8e5q089f6adc5bd",
            "user": "64075cf490605cfb8f75857a",
            "title": "My Note 2",
            "description": "Mem Nil Rocks 2",
            "tag": "personal",
            "date": "2023-03-07T19:44:11.525Z",
            "__v": 0
        },
        {
            "_id": "640785dda343235r003dfb6c7",
            "user": "64075cf490605cfb8f75857a",
            "title": "My Note",
            "description": "Mem Nil Rocks",
            "tag": "personal",
            "date": "2023-03-07T18:43:41.284Z",
            "__v": 0
        },
        {
            "_id": "6407940b2b8e5089mf6adc5bd",
            "user": "64075cf490605cfb8f75857a",
            "title": "My Note 2",
            "description": "Mem Nil Rocks 2",
            "tag": "personal",
            "date": "2023-03-07T19:44:11.525Z",
            "__v": 0
        },
        {
            "_id": "640785dda34323a5003dfb6c7",
            "user": "64075cf490605cfb8f75857a",
            "title": "My Note",
            "description": "Mem Nil Rocks",
            "tag": "personal",
            "date": "2023-03-07T18:43:41.284Z",
            "__v": 0
        },
        {
            "_id": "6407a940b2b8e5089f6adc5bd",
            "user": "64075cf490605cfb8f75857a",
            "title": "My Note 2",
            "description": "Mem Nil Rocks 2",
            "tag": "personal",
            "date": "2023-03-07T19:44:11.525Z",
            "__v": 0
        },

    ];

    const [notes, setNotes] = useState(notesInitial)

    // Adding a note
    const addNote = (note) => {
        setNotes(notes.concat(note));
        console.log('Note Added : ', note);
    }

    // Editing a note
    const editNote = () => {

    }

    // Deleting a note
    const deleteNote = (id) => {
        const newNotes = notes.filter((note) => (note._id !== id));
        setNotes(newNotes);
    }


    return (
        <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote }}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
