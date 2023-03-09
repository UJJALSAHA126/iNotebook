import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

function AddNote() {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState(
        {
            "_id": "640adf785dda3d43235003dfb6c7",
            "user": "64075cf490605cfb8f75857a",
            "title": "Added Note",
            "description": "Mem Nil Rocks Added",
            "tag": "personal",
            "date": "2023-03-07T18:43:41.284Z",
            "__v": 0
        }
    );

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note);
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }


    return (
        <div className="container my-3">

            <h2>Add a Note</h2>

            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={onChange} />
                </div>

                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote