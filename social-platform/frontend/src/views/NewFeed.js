import React, { useRef, useState } from 'react'
import { Form, Button, Image } from 'react-bootstrap';
import { Store } from '../utilities/Store'
import '../css/NewFeedPost.css'

export default function NewFeed() {
    const text = useRef();
    const { state } = React.useContext(Store);
    const [feedImage, setFeedImage] = useState();
    const [error, setError] = useState(false);
    const [displayImage, setDisplayImage] = useState();

    function fileSelectorHandler(event) {
        setFeedImage(event.target.files[0]);
        let newImage = URL.createObjectURL(event.target.files[0])
        setDisplayImage(newImage)
    }

    function validate(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('feedImage', feedImage)
        newImage(formData);
    }

    async function newImage(formData) {
        let newImage = await fetch('/api/new-image', {
            method: "POST",
            body: formData
        })
        let result = await newImage.json()

        if (result.error) {
            setError(true)
        } else if (result.success) {
            let date = new Date().getTime();
            setError(false)
            newPost(text.current.value, state.currentUser.id, date, result.file)
        }
    }
    async function newPost(text, owner, date, image) {
        let data = {
            text,
            owner,
            date,
            image
        }
        let newPost = await fetch('/api/new-post', {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        })
        let result = await newPost.json();
        if (result.status === 200) {
            setError(false)
        } else {
            setError(true)
        }
    }
    return (
        <div className="new-feed-content">
            <h1 className="form-headline">Ny Post</h1>
            <Form noValidate onSubmit={validate} className="new-feed-form">
                <Form.Group className="form-group" controlId="exampleForm.ControlInput1">
                    <Form.Label className="form-label">Text</Form.Label>
                    <Form.Control className="new-feed-text-input" required ref={text} type="text" as="textarea" rows="3" maxLength="100" />
                </Form.Group>
                <div className="new-feed-profile-pictures">
                    <input type="file" name="file" id="file" className="new-feed-inputfile" onChange={fileSelectorHandler}></input>
                    {displayImage === undefined ? <label htmlFor="file"><div className="new-feed-placeholder"><div className="new-feed-add-image-icon"><i className="fas fa-plus"></i></div></div></label> :
                        <Image  className="new-feed-edit-profile-pictures" src={displayImage} alt="your image" />
                    }
                </div>
                {/* <Button variant="light" className="newfeed-upoad-image-button"><input type="file" className="newfeed-input" onChange={fileSelectorHandler}></input></Button>
                <Image id="display-image" className="new-feed-display-image" src={displayImage} alt="your image"></Image> */}
                {error ? <p className="new-feed-error">Vi tar bara emot JPEG eller PNG</p> : <p className="new-feed-no-error">&nbsp;</p>}
                <Button variant="light" type="submit" className="register-button newfeed-upload-button">Publicera </Button>
            </Form>
        </div>
    )
}
