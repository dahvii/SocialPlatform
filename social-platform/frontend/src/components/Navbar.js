import React from 'react'
import { Store } from '../utilities/Store';

export default function Navbar() {
    const {state, dispatch} = React.useContext(Store);


function test(){
    dispatch({
        type: 'TEST',
        payload: "adsj"
    })
}
    return (
        <div>
            {/* <p>Navbar</p> */}
        </div>
    )
}
