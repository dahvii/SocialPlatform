import React, { useState, useRef } from 'react'
import '../css/EditProfile.css'
import { Form, Button, Image } from 'react-bootstrap'
import { Store } from '../utilities/Store'
import Autosuggest from 'react-autosuggest';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';
import useLifeCycle from '../utilities/useLifeCycle'
import AgeSlider from '../components/AgeSlider'

export default function EditProfile() {
    const { state, dispatch } = React.useContext(Store);
    const [userBio, setUserBio] = useState(state.currentUser.bio);
    const [checkedGender, setCheckedGender] = useState(state.currentUser.gender);
    const [userInterests, setUserInterests] = useState(state.currentUser.interests);
    const [interestInput, setInterestInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const newInterest = useRef();
    const hometown = useRef(state.currentUser.hometown);
    const [imagesPaths, setImagesPaths] = useState(state.currentUser.profilePictures);
    const [interestsFromDb, setInterestsFromDb] = useState([]);
    const [imagesToRemove, setImagesToRemove] = useState([]);
    const [genderPrefFemale, setGenderPrefFemale] = useState(false);
    const [genderPrefNonBinary, setGenderPrefNonBinary] = useState(false);
    const [genderPrefMale, setGenderPrefMale] = useState(false);
    const [agePref, setAgePref]= useState([18, 60]);



    useLifeCycle({
        mount: () => {
            getAllInterests()
            addPrefToCheckBox()
            console.log("currUser ", state.currentUser);
            if(state.currentUser.agePreference.length > 1){
                setAgePref([state.currentUser.agePreference[0],state.currentUser.agePreference[1]]);
            }
        }
    })

    function addPrefToCheckBox() {
        if (state.currentUser.genderPreference) {
            if (state.currentUser.genderPreference.includes("Female")) {
                setGenderPrefFemale(true);
            }
            if (state.currentUser.genderPreference.includes("NonBinary")) {
                setGenderPrefNonBinary(true);
            }
            if (state.currentUser.genderPreference.includes("Male")) {
                setGenderPrefMale(true);
            }
        }
    }

    function fileSelectorHandler(event) {
        const formData = new FormData();
        formData.append('feedImage', event.target.files[0])
        newImage(formData)
    }

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
        if (userInterests.length > 0) {
            await addInterestDB()
        }

        deleteImage()

        let genderPref = []
        if (genderPrefFemale) {
            genderPref.push("Female")
        }
        if (genderPrefNonBinary) {
            genderPref.push("NonBinary")
        }
        if (genderPrefMale) {
            genderPref.push("Male")
        }

        let data = {
            userBio,
            checkedGender,
            userInterests,
            imagesPaths,
            hometown: hometown.current.value,
            genderPreference: genderPref,
            agePreference: agePref
        }
        
        let result = await fetch(`/api/update/${state.currentUser.id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        });

        result = await result.json()

        if (result.success) {
            store.addNotification({
                title: 'Din profil har uppdaterats',
                message: ' ',
                type: 'success',                         // 'default', 'success', 'info', 'warning'
                container: 'top-center',                // where to position the notifications
                animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                dismiss: {
                    duration: 3000,
                    onScreen: false,
                }
            })
        }

        updateStateWithNewProfile()
    }

    const deleteImage = async () => {
        console.log(imagesToRemove)
        let data = {
            images: imagesToRemove
        }

        await fetch('/api/delete-image/', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        })
    }

    const addInterestDB = async () => {
        let data = userInterests
        await fetch('/api/add-interest', {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const handleRemoveInterest = (interest) => {
        setUserInterests(userInterests.filter(item => item !== interest))
    }

    const handleRemoveImage = async (image) => {
        setImagesToRemove([...imagesToRemove, image])
        setImagesPaths(imagesPaths.filter(img => img !== image))
        // let data = {
        //     image: image
        // }
        // await fetch('/api/delete-image/', {
        //     method: 'POST',
        //     body: JSON.stringify(data),
        //     headers: { 'Content-Type': 'application/json' }
        // })
    }

    const handleGenderOptionChange = (e) => {
        setCheckedGender(e.target.value)
    }

    const handleGenderPrefChange = (e) => {
        if (e.target.value === 'Female') {
            let newValue = !genderPrefFemale;
            setGenderPrefFemale(newValue);
        } else if (e.target.value === 'NonBinary') {
            let newValue = !genderPrefNonBinary;
            setGenderPrefNonBinary(newValue);
        } else {
            let newValue = !genderPrefMale;
            setGenderPrefMale(newValue);
        }
    }

    const ageSliderCallback = (value) => {
        setAgePref(value);
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
                <div className="all-profile-pictures mb-2">
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
                                <div className="profile-pic-container"><div onClick={() => handleRemoveImage(imagesPaths[1])} className="remove-pic-icon"><i className="fas fa-minus-circle"></i></div><Image id="profile-image2" className="edit-profile-pictures" src={`http://localhost:3001/${imagesPaths[1]}`} alt="your image" /></div>
                            }
                        </div>
                    </Form>
                    <Form>
                        <div className="profile-pictures">
                            <input type="file" name="file" id="file" className="inputfile" onChange={fileSelectorHandler}></input>
                            {imagesPaths[2] === undefined ? <label htmlFor="file"><div className="placeholder"><div className="add-image-icon"><i className="fas fa-plus"></i></div></div></label> :
                                <div className="profile-pic-container"><div onClick={() => handleRemoveImage(imagesPaths[2])} className="remove-pic-icon"><i className="fas fa-minus-circle"></i></div><Image id="profile-image3" className="edit-profile-pictures" src={`http://localhost:3001/${imagesPaths[2]}`} alt="your image" /></div>
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
                    <div className="edit-profile-form-check">
                        <label className="m-0">
                            <input
                                type="radio"
                                value="Female"
                                checked={checkedGender === "Female"}
                                onChange={handleGenderOptionChange}
                                className="form-check-input"
                            />
                            <span className="checkmark"></span>
                            Kvinna
                        </label>
                    </div>
                    <div className="edit-profile-form-check">
                        <label className="m-0">
                            <input
                                type="radio"
                                value="NonBinary"
                                checked={checkedGender === "NonBinary"}
                                onChange={handleGenderOptionChange}
                                className="form-check-input"
                            />
                            <span className="checkmark"></span>
                            Icke-binär
                        </label>
                    </div>
                    <div className="edit-profile-form-check">
                        <label>
                            <input
                                type="radio"
                                value="Male"
                                checked={checkedGender === "Male"}
                                onChange={handleGenderOptionChange}
                                className="form-check-input"
                            />
                            <span className="checkmark"></span>
                            Man
                        </label>
                    </div>
                </Form>
                <Form className="selection mt-2">
                    <h4>Intressen</h4>
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
                <Form className="selection mt-2">
                    <h4>Hemort</h4>
                    <Form.Control as="input" className="bio-text" rows="3" defaultValue={userBio} ref={hometown} maxLength="20" />
                </Form>
                <Form className="selection mt-2">
                    <h4>Preferenser</h4>
                    <h5>Kön</h5>
                    <div className="edit-profile-form-check">
                        <label className="m-0">
                            <input
                                type="checkbox"
                                value="Female"
                                checked={genderPrefFemale}
                                onChange={handleGenderPrefChange}
                                className="form-check-input"
                            />
                            <span className="checkmark"></span>
                            Kvinnor
                        </label>
                    </div>
                    <div className="edit-profile-form-check">
                        <label className="m-0">
                            <input
                                type="checkbox"
                                value="NonBinary"
                                checked={genderPrefNonBinary}
                                onChange={handleGenderPrefChange}
                                className="form-check-input"
                            />
                            <span className="checkmark"></span>
                            Icke-binära
                        </label>
                    </div>
                    <div className="edit-profile-form-check">
                        <label>
                            <input
                                type="checkbox"
                                value="Male"
                                checked={genderPrefMale}
                                onChange={handleGenderPrefChange}
                                className="form-check-input"
                            />
                            <span className="checkmark"></span>
                            Män
                        </label>
                    </div>
                    <h5>Ålder</h5>
                    <p>Föreslå personer mellan {agePref[0]} och {agePref[1] >= 60 ? "60+": agePref[1]} </p>
                    <AgeSlider sliderCallback={ageSliderCallback} startValue= {agePref[0]} endValue= {agePref[1]}/>
                </Form>
            </div>
            <Button variant="light" className="update-profile-button" onClick={updateProfile}>Uppdatera profil</Button>
        </div>
    )
}
