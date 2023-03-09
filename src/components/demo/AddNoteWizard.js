import React, { useContext, useState } from 'react'
import '../css/addNoteWizard.css'
import noteContext from '../../context/notes/noteContext';

function AddNoteWizard() {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState(
        {
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
        <div className="full-body">
            <div className='container-wizard'>
                <form>

                    <div className="form-group-1">
                        <label htmlFor="title">Title</label>
                        <input type="text" className="form-control" id="title" name="title" placeholder="Enter your title" onChange={onChange} />
                    </div>

                    <div className="form-group-2">
                        <label htmlFor="tag">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" placeholder="Enter your note's tag" onChange={onChange} />
                    </div>

                    <div className="form-group-3 last">
                        <label htmlFor="description">Another label</label>
                        <textarea type="text" rows={8} className="form-control" id="description" name="description" placeholder="Another input" onChange={onChange}></textarea>
                    </div>

                    <div className="d-flex justify-content-end">
                        <button type="button" className="btn btn-outline-danger mx-3">Cancel</button>
                        <button type="button" className="btn btn-outline-success mx-3" onClick={handleClick}>Save</button>
                    </div>

                </form>

            </div>

        </div>
    )
}

export default AddNoteWizard