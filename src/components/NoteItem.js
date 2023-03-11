import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

function NoteItem(props) {
    const { note, updateNote } = props;
    const context = useContext(noteContext);

    const { deleteNote } = context;

    const onClickDelete = () => {
        deleteNote(note._id);
    }

    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex  justify-content-between">
                        <h5 className="card-title text-break" style={{ maxWidth: "15ch" }}>{note.title}</h5>

                        <div className="buttons">
                            <i className="fa-solid fa-trash mx-1" onClick={onClickDelete}></i>
                            <i className="fa-solid fa-pen-to-square mx-1" onClick={() => { updateNote(note) }}></i>
                        </div>
                    </div>

                    <span className="card-text text-justify">{note.description}</span>
                </div>
            </div>
        </div>
    )
}



export default NoteItem