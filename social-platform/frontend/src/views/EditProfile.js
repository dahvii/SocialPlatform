import React, { useState, useRef } from 'react'
import '../css/EditProfile.css'
import { Form, Button } from 'react-bootstrap'
import { Store } from '../utilities/Store'

export default function EditProfile() {
    const { state, dispatch } = React.useContext(Store);
    const [userBio, setUserBio] = useState(state.currentUser.bio);
    const [checkedGender, setCheckedGender] = useState(state.currentUser.gender);
    const [userInterests, setUserInterests] = useState(["Simma", "Svampplockning", "Something", "blablabla", "testestestst"]);
    const newInterest = useRef();


    const handleGenderOptionChange = (e) => {
        setCheckedGender(e.target.value)
    }

    const handleBioChange = (e) => {
        setUserBio(e.target.value)
    }

    const addInterest = () => {
        if (!newInterest.current.value.length) {
            console.log("no can do")
        } else {
            setUserInterests([...userInterests, newInterest.current.value])
            newInterest.current.value = ''
        }
    }

    const handleRemoveInterest = (interest) => {
        setUserInterests(userInterests.filter(item => item !== interest))
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
                    <Form.Group controlId="userBio">
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
                <Form>
                    <Form.Group controlId="interests">
                        <Form.Label>Lägg till intresse</Form.Label>
                        <Form.Control as="textarea" rows="1" maxLength="30" ref={newInterest} />
                    </Form.Group>
                </Form>
                <Button onClick={addInterest}>Lägg till intresse</Button>
                <div className="edit-profile-all-interests">
                    {
                        userInterests.map(interest => <div key={interest} className="edit-profile-interest">{interest} <i className="fas fa-times-circle" onClick={() => handleRemoveInterest(interest)}></i></div>)
                    }
                </div>
            </div>
            <Button className="update-profile" onClick={updateProfile}>Uppdatera profil</Button>
        </div>
    )
}
