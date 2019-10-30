import React from 'react'
import { Store } from '../utilities/Store';

export default function Navbar() {
    const {state} = React.useContext(Store);
    return (
        <div>
            <p>Navbar</p>
            <p>{state.test}</p>

        </div>
    )
}
