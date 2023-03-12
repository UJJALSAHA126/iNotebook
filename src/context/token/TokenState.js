import TokenContext from "./tokenContext";
import React, { useState } from 'react'
import { getAuthToken } from "../../constants/Constants";

function TokenState(props) {

    const [authToken, setAuthToken] = useState(getAuthToken());

    return (
        <TokenContext.Provider value={{ authToken, setAuthToken }}>
            {props.children}
        </TokenContext.Provider>
    )
}

export default TokenState