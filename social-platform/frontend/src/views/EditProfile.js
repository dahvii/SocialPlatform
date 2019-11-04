import React, { useState, useEffect } from 'react'
import '../css/EditProfile.css'
import { Form, Button } from 'react-bootstrap'
import { Store } from '../utilities/Store'

export default function EditProfile() {
    const { state } = React.useContext(Store);
    const [userBio, setUserBio] = useState(state.currentUser.bio);
    const [checkedGender, setCheckedGender] = useState(state.currentUser.gender)

    useEffect(() => {

    })

    const handleGenderOptionChange = (e) =>{
        console.log(e.target.value)
        setCheckedGender(e.target.value)
    }

    return (
        <div>
            <h2>Redigera profil</h2>
            <div className="edit-profile-content">
                <Form>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Om dig (max 200 tecken)</Form.Label>
                        <Form.Control as="textarea" rows="3" defaultValue={userBio} maxLength="200" />
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
                <Button>Uppdatera profil</Button>
            </div>
        </div>
    )
}
