import React, { useState, useRef } from 'react'
import '../css/EditProfile.css'
import { Form, Button } from 'react-bootstrap'
import { Store } from '../utilities/Store'
import Autosuggest from 'react-autosuggest';
import useLifeCycle from '../utilities/useLifeCycle'

export default function EditProfile() {
    const { state, dispatch } = React.useContext(Store);
    const [userBio, setUserBio] = useState(state.currentUser.bio);
    const [checkedGender, setCheckedGender] = useState(state.currentUser.gender);
    const [userInterests, setUserInterests] = useState(state.currentUser.interests);
    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    
    const newInterest = useRef();
    const newInterestTest = useRef();
    const [interestsFromDb, setInterestsFromDb] = useState([])

    const test = [
        {
            _id: "b0hjk23791",
            name: "test1"
        },
        {
            _id: "dwjdlka7289382932",
            name: "test2"
        }
    ]

    useLifeCycle({
        mount: () => {
           getAllInterests()
           console.log("db: ", interestsFromDb)
           console.log(test)
        }
    })

    

    const getAllInterests = async () => {
        let data = await fetch('/api/get-interests');
        data = await data.json()
        setInterestsFromDb(data)
    }

    const getSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : interestsFromDb.filter(lang =>
            lang.name.toLowerCase().slice(0, inputLength) === inputValue
        );
    };

    const getSuggestionValue = suggestion => suggestion.name;

    const renderSuggestion = suggestion => (
        <div>
            {suggestion.name}
        </div>
    );

    const onChange = (event, { newValue }) => {
        setValue(newValue)
    };

    const onSuggestionsFetchRequested = ({ value }) => {
        setSuggestions(getSuggestions(value))
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([])
    };

    const inputProps = {
        placeholder: 'Lägg till ett intresse',
        value,
        onChange: onChange
    };

    const handleGenderOptionChange = (e) => {
        setCheckedGender(e.target.value)
    }

    const handleBioChange = (e) => {
        setUserBio(e.target.value)
    }

    const addInterest = () => {
        if (!newInterestTest.current.props.inputProps.value) {
            console.log("no can do")
        } else {
            setUserInterests([...userInterests, { name: newInterestTest.current.props.inputProps.value }])
            newInterest.current.value = ''
        }
    }

    const handleRemoveInterest = (interest) => {
        setUserInterests(userInterests.filter(item => item !== interest))
    }

    const updateStateWithNewProfile = async () => {
        let data = await fetch('/api/currentuser/' + state.currentUser.id)
        data = await data.json()
        dispatch({
            type: 'SET_CURRENT_USER',
            payload: data
        })
    }

    const updateProfile = async () => {
        if (userInterests.length > 0) {
            await addInterestDB()
        }
        let data = {
            userBio,
            checkedGender,
            userInterests
        }
        let result = await fetch(`/api/update/${state.currentUser.id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        });

        result = await result.json()

        updateStateWithNewProfile()
    }

    const addInterestDB = async () => {
        let data = userInterests
        let result = await fetch('/api/add-interest', {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        });

        result = await result.json()
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
                        userInterests.map(interest => <div key={interest.name} className="edit-profile-interest">{interest.name} <i className="fas fa-times-circle" onClick={() => handleRemoveInterest(interest)}></i></div>)
                    }
                </div>
            </div>
            <Button className="update-profile" onClick={updateProfile}>Uppdatera profil</Button>
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
                ref={newInterestTest}
            />
        </div>
    )
}
