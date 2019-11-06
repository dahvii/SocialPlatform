import React, { useState, useEffect } from 'react'
import '../css/EditProfile.css'
import { Form, Button } from 'react-bootstrap'
import { Store } from '../utilities/Store'

export default function EditProfile() {
    const { state, dispatch } = React.useContext(Store);
    const [userBio, setUserBio] = useState(state.currentUser.bio);
    const [checkedGender, setCheckedGender] = useState(state.currentUser.gender)

    useEffect(() => {

    })

    const handleGenderOptionChange = (e) => {
        setCheckedGender(e.target.value)
    }

    const handleBioChange = (e) => {
        setUserBio(e.target.value)
    }

    const updateStateWithNewProfile = async () => {
        console.log("lalalalal")
        let data = await fetch('/api/currentuser/' + state.currentUser.id)
        data = await data.json()
        dispatch({
            type: 'SET_CURRENT_USER',
            payload: data
        })
    }

    const updateProfile = async () => {
        console.log("blablabla")
        let data = {
            userBio,
            checkedGender
        }
        let result = await fetch(`/api/update/${state.currentUser.id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        });

        result = await result.json()
        console.log(result)

        updateStateWithNewProfile()
    }




    return (
        <div>
            <h2>Redigera profil</h2>
            <div className="edit-profile-content">
                <Form>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Om dig (max 200 tecken)</Form.Label>
                        <Form.Control as="textarea" rows="3" defaultValue={userBio} onChange={handleBioChange} maxLength="200" />
                    </Form.Group>
                </Form>
                <Form>

                    <div className="form-check">
                        <label>
                            <input
                                type="radio"
                                value="Male"
                                checked={checkedGender === "Male"}
                                onChange={handleGenderOptionChange}
                                className="form-check-input"
                            />
                            Man
                        </label>
                    </div>

                    <div className="form-check">
                        <label>
                            <input
                                type="radio"
                                value="Female"
                                checked={checkedGender === "Female"}
                                onChange={handleGenderOptionChange}
                                className="form-check-input"
                            />
                            Kvinna
                        </label>
                    </div>
                </Form>
                <h4>Intressen</h4>
                <Button onClick={updateProfile}>Uppdatera profil</Button>
            </div>
        </div>
    )
}
