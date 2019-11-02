import React, { useEffect, useState } from 'react'
import { Store } from '../utilities/Store'
import { Image, Button } from 'react-bootstrap'
import '../css/MyProfile.css'

export default function MyProfile() {
    const { state, dispatch } = React.useContext(Store);

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
            <Image src="https://i.pravatar.cc/220" alt="profile-picture" roundedCircle className="profile-picture" />
            <div className="myprofile-info">
                <h3>{state.currentUser.firstName} -</h3>&nbsp;<h3>25</h3>
            </div>
            <div className="myprofile-buttons">
                <Button variant="light" onClick="">Visa profil<i className="far fa-eye"></i></Button>
                <Button variant="light" onClick="">Redigera profil<i className="fas fa-cog"></i></Button>
            </div>
            <Button onClick={logout}>Logga ut</Button>
        </div>
    )
}
