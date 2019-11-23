import React, { useState } from 'react'
import { Store } from '../utilities/Store'
import { Image, Button } from 'react-bootstrap'
import '../css/MyProfile.css'
import useLifeCycle from '../utilities/useLifeCycle';
import calcAge from '../utilities/CalcAge';

export default function MyProfile(props) {
    const { state, dispatch } = React.useContext(Store);
    const [age, setAge] = useState();
    useLifeCycle({
        mount: () => {
            setAge(calcAge(state.currentUser.dateOfBirth))
            console.log(state.currentUser.admin);

        }
    })
    const logout = async () => {
        let result = await fetch('/api/logout', {
            method: 'DELETE'
        });
        result = await result.json()
        if (result.success) {
            dispatch({ type: "LOGOUT_USER" })
        }
    }

    const goToProfile = () => {
        props.history.push(`/profile/${state.currentUser.id}`)
    }

    const goToAdmin = () => {
        props.history.push(`/adminPage`)
    }

    const goToEditProfile = () => {
        props.history.push('/edit-profile')
    }
    
    return (
        <div className="myprofile-content">
            <Image src={state.currentUser.profilePictures[0] ? `http://localhost:3001/${state.currentUser.profilePictures[0]}` : 'http://localhost:3001/uploads/placeholder.jpg'} alt="profile-picture" roundedCircle className="profile-picture" />
            <div className="myprofile-info mb-3">
                <h3>{state.currentUser.firstName} -</h3>&nbsp;<h3>{age}</h3>
            </div>
            <div className="myprofile-buttons">
                <Button className="profile-button" variant="light" onClick={goToProfile}>Visa profil<i className="far fa-eye"></i></Button>
                <Button className="profile-button" variant="light" onClick={goToEditProfile}>Redigera profil<i className="fas fa-cog"></i></Button>
            </div>
            {state.currentUser.admin &&
                <Button className="profile-button" variant="light" onClick={goToAdmin}>Gå till admin-sidan</Button>
            }
            <div className="myprofile-logout">
                <Button variant="light" className="myprofile-logout-button" onClick={logout}>Logga ut</Button>
            </div>
        </div>
    )
}
