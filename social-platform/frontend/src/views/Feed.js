import React from 'react'
import {Store } from '../utilities/Store'

export default function Feed() {
    const { state } = React.useContext(Store);

    return (
        <div>
            <p>Feed view</p>
        </div>
    )
}
