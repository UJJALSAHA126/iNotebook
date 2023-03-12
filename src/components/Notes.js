import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem';
import AddNote from './AddNote';
// import { Link } from 'react-router-dom';


function Notes() {

    const context = useContext(noteContext);
    const { notes, fetchAllNotes, addNote, editNote } = context;

    const ref = useRef(null);

    useEffect(() => {
        fetchAllNotes();
        // console.log('Notes useEffect');
        // eslint-disable-next-line
    }, [])


    const handleUpdateClicked = (currNote) => {
        // updateNote(currNote);
        // console.log('Update Note Clicked !!');
        ref.current.click();
        setNote(currNote);
    }

    const [note, setNote] = useState(
        {
            "user": "64075cf490605cfb8f75857a",
            "title": "",
            "description": "",
            "tag": "personal",
            "date": "2023-03-07T18:43:41.284Z",
            "__v": 0
        }
    );

    const updateNoteFromModal = (currNote) => {
        editNote(currNote);
        console.log('Update Note Clicked !!');
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }


    return (
        <>

            {/* <Link to="/about"> */}
            {/* <button type="button" className="btn btn-primary btn-lg my-3" onClick={() => handleUpdateClicked(note)}>
                Add a new note
            </button> */}
            {/* </Link> */}

            <AddNote />


            {/* <!-- Button trigger modal --> */}
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" style={{ width: "100%" }} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl" >
                    <div className="modal-content">

                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>


                        <div className="modal-body">

                            <form>

                                <div className="form-group-1">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" value={note.title} className="form-control" id="title" name="title" placeholder="Title" onChange={onChange} />
                                </div>

                                <div className="form-group-2">
                                    <label htmlFor="tag">Tag</label>
                                    <input type="text" value={note.tag} className="form-control" id="tag" name="tag" placeholder="Enter your note's tag" onChange={onChange} />
                                </div>

                                <div className="form-group-3 last">
                                    <label htmlFor="description">Description</label>
                                    <textarea type="text" value={note.description} rows={8} className="form-control" id="description" name="description" placeholder="Add Description" onChange={onChange}></textarea>
                                </div>

                            </form>

                        </div>


                        <div className="modal-footer">
                            {/* <button type="button" className="btn btn-outline-danger mx-3">Cancel</button>
                            <button type="button" className="btn btn-outline-success mx-3" onClick={handleClick}>Save</button> */}
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={
                                () => updateNoteFromModal(note)
                            }>Update Note</button>
                        </div>

                    </div>
                </div>
            </div>



            <div className="row my-3">
                <h2>Your Notes</h2>
                {
                    notes.map((note) => {
                        return <NoteItem key={note._id} updateNote={handleUpdateClicked} note={note} />;
                    })
                }
            </div>
        </>
    )
}

export default Notes