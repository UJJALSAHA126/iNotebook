import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { Link } from 'react-router-dom';


function Notes() {

    const context = useContext(noteContext);
    const { notes, fetchAllNotes } = context;

    useEffect(() => {
        fetchAllNotes();
        // eslint-disable-next-line
    }, [])


    return (
        <>

            <Link to="/about">
                <button type="button" className="btn btn-primary btn-lg my-3">
                Add a new note
                </button>
            </Link>

            {/* <AddNote /> */}

            <div className="row my-3">
                <h2>Your Notes</h2>
                {
                    notes.map((note) => {
                        return <NoteItem key={note._id} note={note} />;
                    })
                }
            </div>
        </>
    )
}

export default Notes