import React, { useState, useRef } from 'react'
import '../css/EditProfile.css'
import { Form, Button, Image } from 'react-bootstrap'
import { Store } from '../utilities/Store'
import Autosuggest from 'react-autosuggest';
import useLifeCycle from '../utilities/useLifeCycle'

export default function EditProfile() {
    const { state, dispatch } = React.useContext(Store);
    const [userBio, setUserBio] = useState(state.currentUser.bio);
    const [checkedGender, setCheckedGender] = useState(state.currentUser.gender);
    const [userInterests, setUserInterests] = useState(state.currentUser.interests);
    const [interestInput, setInterestInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const newInterest = useRef();
    const [interestsFromDb, setInterestsFromDb] = useState([])
    const [profileImages, setProfileImages] = useState()
    const [displayProfileImage, setDisplayProfileImage] = useState("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPcAAADMCAMAAACY78UPAAAAMFBMVEW8vsDn6Onq6+y5u73CxMbIycvh4uPW2NnR09Tc3d/AwsTk5ebU1dfg4eK9v8HOz9HoolfoAAADEUlEQVR4nO3c63KqMBRAYZINVUTw/d/2yNVEg4JHkZ2s709nOuKwhhSDhGYZAAAAAAAAAAAAAAAAACROpCkKkV/vxtbkUtmrukirvKmt6dhzSuHyZ0YphcvZmlt48evd2YwY1yGZA15YLzyZ7qPXbfNf789W7rpPv96fraQ6zptEz2upfo5lUiU3b+krk5unytA5XJeUw3XJ6Rh3vpT2MoRLVhTD0c+kHn8dp2v29Tz2UNid5/J4w9ts8xjen95ttOF99sMnlxyGX0caPmXfT1Skjjl8OqyP87OYw+Uym92Gm0jDp+zwPGX8JiK28BfZt0uVuMLl+CLbDd9yx77rmt17NhlvTP8aE1F4M/xcMoab5vVrAGArxTft9zwvlf2i/X7v6tzm/AK694Zuuummm+74uj81W1HWfc4/pFbVbT91n09KuuneGbrvu6Xzzluq7m7OdVWZwxv3BDR3S2GG2wbrFzVo7s6nycf6cM3d5mb1XSDF3Rd3Vebandfb7ex5K53uys0OLz6eL4ql2wTv+s3fJ1Xc7Y3zKrTKo5xfm6u32zuvhb78b9dCVLNvqbfbG+iBYX6yM6t9uo31dr+Yt/QbzY10zd2SV125NaHscQ1+uEpzd/snXBpbHkPbjINh5spVd/dwIRraZPrjD09htXfPbeF8yIU+4qLqdk717hNVwVVeEXVLNY3o5uWDgxF1/01L86Q2nsBIj6a7X47dhYv/vGRwpMfSPa5Cb8Pzu+zQSI+kW6bJen73FPjMSI+j2zl/V+ORfz7S4+h2R7Z/WT430qPoPgVTfX93Nxxi6F6Q/TCz19+9cDWE/w2c/u7Fi0C8ka6+O3j6Dh9w79pdeffybH+kK++WYnm2N9J1d6/LnvkWWmH3kg9uL3wa6aq712Y7I11zt4SnpE8P+Li94u63Vm+O83S93VK+tT6zlmFrrd3jYqa1hm0Vd//XW9JN997QnWq3+Vi3rnX3yT5n8QV07w3ddNNNN92RdCf6fy2yTz0UGpTMv80GAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKZ/TikowOqV20oAAAAASUVORK5CYII=")

    useLifeCycle({
        mount: () => {
            getAllInterests()
            if (state.currentUser.profilePictures !== '') {
                setDisplayProfileImage(`http://localhost:3001/${state.currentUser.profilePictures}`)
            }
        }
    })

    function fileSelectorHandler(event) {
        setProfileImages(event.target.files[0]);
        let newImage = URL.createObjectURL(event.target.files[0])
        console.log(newImage);
        setDisplayProfileImage(newImage)
    }

    function validate(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('feedImage', profileImages)
        newImage(formData);
    }

    async function newImage(formData) {
        console.log(formData)
        let newImage = await fetch('/api/new-image', {
            method: "POST",
            body: formData
        })
        let result = await newImage.json()
        console.log("result: ", result);

        if (result.error) {
            console.log("fel filtyp");
        } else if (result.success) {
            updateProfile(result.file)
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

    const updateProfile = async (imagePath) => {
        if (userInterests.length > 0) {
            await addInterestDB()
        }
        console.log(imagePath)
        let resizedImage = imagePath.slice(0, 8) + "resized/" + imagePath.slice(8)
        console.log(resizedImage)
        let data = {
            userBio,
            checkedGender,
            userInterests,
            resizedImage
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
                        <input type="file" name="file" id="file" className="inputfile" onChange={fileSelectorHandler}></input>
                        <div className="choose-file">
                            <label htmlFor="file"><Image id="display-image" className="edit-profile-pictures" src={displayProfileImage} alt="your image"></Image></label>
                        </div>
                    </Form>
                    <Form>
                        <input type="file" name="file" id="file" className="inputfile" onChange={fileSelectorHandler}></input>
                        <div className="choose-file">
                            <label htmlFor="file"><Image id="display-image" className="edit-profile-pictures" src={displayProfileImage} alt="your image"></Image></label>
                        </div>
                    </Form>
                    <Form>
                        <input type="file" name="file" id="file" className="inputfile" onChange={fileSelectorHandler}></input>
                        <div className="choose-file">
                            <label htmlFor="file"><Image id="display-image" className="edit-profile-pictures" src={displayProfileImage} alt="your image"></Image></label>
                        </div>
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
