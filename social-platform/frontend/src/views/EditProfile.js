import React, { useState, useRef, useEffect } from 'react'
import '../css/EditProfile.css'
import { Form, Button, Image } from 'react-bootstrap'
import { Store } from '../utilities/Store'
import Autosuggest from 'react-autosuggest';
import useLifeCycle from '../utilities/useLifeCycle'
import { debuglog } from 'util';

export default function EditProfile() {
    const { state, dispatch } = React.useContext(Store);
    const [userBio, setUserBio] = useState(state.currentUser.bio);
    const [checkedGender, setCheckedGender] = useState(state.currentUser.gender);
    const [userInterests, setUserInterests] = useState(state.currentUser.interests);
    const [interestInput, setInterestInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const newInterest = useRef();
    const [imagesPaths, setImagesPaths] = useState(state.currentUser.profilePictures);
    const [interestsFromDb, setInterestsFromDb] = useState([])

    useLifeCycle({
        mount: () => {
            getAllInterests()
        }
    })

    function fileSelectorHandler(event) {
        let img = URL.createObjectURL(event.target.files[0])
        console.log(img);
        const formData = new FormData();
        formData.append('feedImage', event.target.files[0])
        newImage(formData)
    }


    function validate(e) {
        e.preventDefault();

        updateProfile()
    }

    // const addImages = () => {
    //     const formData = new FormData();
    //     selectedImages.map(image => {
    //         formData.append('feedImage', image)
    //     })
    //     newImage(formData);
    // }

    async function newImage(formData) {
        let newImage = await fetch('/api/new-image', {
            method: "POST",
            body: formData
        })
        let result = await newImage.json()
        if (result.error) {
            console.log("fel filtyp");
        } else if (result.success) {
            console.log(result.file)
            // let correntPath = result.file.slice(0, 8) + "resized/" + result.file.slice(8)
            setImagesPaths([...imagesPaths, result.file])
        }
    }

    const getAllInterests = async () => {
        let data = await fetch('/api/get-interests');
        data = await data.json()
        setInterestsFromDb(data)
    }

    const addInterest = () => {
        if (!newInterest.current.props.inputProps.value) {
            console.log("no can do") // display errormessage empty
        } else if (interestInput.length > 20) {
            console.log("TOOO BIG") // display errormessage too long
        } else {
            setUserInterests([...userInterests, { name: interestInput }])
            setInterestInput('')
        }
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
        console.log(imagesPaths)
        if (userInterests.length > 0) {
            await addInterestDB()
        }

        let data = {
            userBio,
            checkedGender,
            userInterests,
            imagesPaths
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

    const handleRemoveInterest = (interest) => {
        setUserInterests(userInterests.filter(item => item !== interest))
    }

    const handleRemoveImage = async (image) => {
        // image = image.slice(1);
        let data = {
            image: image
        }
        console.log(image)
        setImagesPaths(imagesPaths.filter(img => img !== image))
        let result = await fetch('/api/delete-image/', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        })
        result = await result.json()
        console.log(result)
    }

    const handleGenderOptionChange = (e) => {
        setCheckedGender(e.target.value)
    }

    const handleBioChange = (e) => {
        setUserBio(e.target.value)
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
        setInterestInput(newValue)
    };

    const onSuggestionsFetchRequested = ({ value }) => {
        setSuggestions(getSuggestions(value))
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([])
    };

    const inputProps = {
        placeholder: 'Lägg till ett intresse',
        value: interestInput,
        onChange: onChange
    };

    return (
        <div>
            <h2>Redigera profil</h2>
            <div className="edit-profile-content">
                <div className="all-profile-pictures">
                    <Form>
                        <div className="profile-pictures">
                            <input type="file" name="file" id="file" className="inputfile" onChange={fileSelectorHandler}></input>
                            {imagesPaths[0] === undefined ? <label htmlFor="file"><div className="placeholder"><div className="add-image-icon"><i className="fas fa-plus"></i></div></div></label> :
                                <div className="profile-pic-container"><div onClick={() => handleRemoveImage(imagesPaths[0])} className="remove-pic-icon"><i className="fas fa-minus-circle"></i></div><Image id="profile-image1" className="edit-profile-pictures" src={`http://localhost:3001/${imagesPaths[0]}`} alt="your image" /></div>
                            }
                        </div>
                    </Form>
                    <Form>
                        <div className="profile-pictures">
                            <input type="file" name="file" id="file" className="inputfile" onChange={fileSelectorHandler}></input>
                            {imagesPaths[1] === undefined ? <label htmlFor="file"><div className="placeholder"><div className="add-image-icon"><i className="fas fa-plus"></i></div></div></label> :
                                <div className="profile-pic-container"><div className="remove-pic-icon"><i className="fas fa-minus-circle"></i></div><Image id="profile-image2" className="edit-profile-pictures" src={`http://localhost:3001/${imagesPaths[1]}`} alt="your image" /></div>
                            }
                        </div>
                    </Form>
                    <Form>
                        <div className="profile-pictures">
                            <input type="file" name="file" id="file" className="inputfile" onChange={fileSelectorHandler}></input>
                            {imagesPaths[2] === undefined ? <label htmlFor="file"><div className="placeholder"><div className="add-image-icon"><i className="fas fa-plus"></i></div></div></label> :
                                <div className="profile-pic-container"><div className="remove-pic-icon"><i className="fas fa-minus-circle"></i></div><Image id="profile-image3" className="edit-profile-pictures" src={`http://localhost:3001/${imagesPaths[2]}`} alt="your image" /></div>
                            }
                        </div>
                        {/* <Button onClick={addImages}>test</Button> */}
                    </Form>
                </div>
                <Form className="mb-2">
                    <Form.Group controlId="userBio">
                        <Form.Label>Berätta lite om dig själv</Form.Label>
                        <div className="textarea-container">
                            <Form.Control as="textarea" className="bio-text" rows="3" defaultValue={userBio} onChange={handleBioChange} maxLength="200" />
                            <div className="bio-length">{userBio.length}/200</div>
                        </div>
                    </Form.Group>
                </Form>
                <Form className="selection">
                    <h4>Kön</h4>
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
                        <label className="m-0">
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
                <Form className="selection mt-2">
                    <h4>Intressen</h4>

                    {/* <Button onClick={addInterest}>Lägg till intresse</Button> */}
                    <div className="add-interest-container mt-2 mb-2">
                        <Autosuggest
                            suggestions={suggestions}
                            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={onSuggestionsClearRequested}
                            getSuggestionValue={getSuggestionValue}
                            renderSuggestion={renderSuggestion}
                            inputProps={inputProps}
                            ref={newInterest}
                        />
                        <div className="add-interest-icon"><i className="fas fa-plus-circle" onClick={addInterest}></i></div>
                    </div>
                    <div className="edit-profile-all-interests">
                        {
                            userInterests.map(interest => <div key={interest.name} className="edit-profile-interest mr-1">{interest.name} <i className="fas fa-times-circle" onClick={() => handleRemoveInterest(interest)}></i></div>)
                        }
                    </div>
                </Form>
            </div>
            <Button className="update-profile" onClick={validate}>Uppdatera profil</Button>
        </div>
    )
}
