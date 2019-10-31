import React from 'react'
import { Button } from 'react-bootstrap'
import { Store } from '../utilities/Store'

export default function Profile() {
    const { dispatch } = React.useContext(Store);

    const logout = async () => {
        let result = await fetch('/api/logout', {
            method: 'DELETE'
        });
        result = await result.json()
        if (result.success) {
            dispatch({ type: "LOGOUT_USER" })
        }
    }

    return (
        <div>
            <p>Profile view</p>
            <Button onClick={logout}>Log out</Button>
        </div>
    )
}
