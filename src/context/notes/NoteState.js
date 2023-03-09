import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const s1 = {
        "name": "Mem Nil",
        "age": " 22",
    };

    const [state, setState] = useState(s1)

    const update = () => {
        setTimeout(() => {
            setState({
                "name": "Mem Weds Nil",
                "age": "26",
            })
        }, 2000);
    }

    return (
        <NoteContext.Provider value={{ state, update }}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
