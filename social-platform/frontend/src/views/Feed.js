import React from 'react'
import {Store } from '../utilities/Store'

export default function Feed() {
    const { state } = React.useContext(Store);

    console.log("från feed: " ,state.currentUser)
    return (
        <div>
            feed view
        </div>
    )
}
