import React, { useRef, useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import { Store } from '../utilities/Store'
import '../css/NewFeedPost.css'

export default function NewFeed() {
    const { state } = React.useContext(Store);
    const [image, setImage] = useState()
    const text = useRef();


    function validate(e) {
        let date = new Date().getTime();
        let likes = 0

        newPost(text.current.value, state.currentUser.id, date, likes);
        e.preventDefault();
    }

    const fileSelectorHandler = event => {
        console.log("innan: ", image)
        console.log(event.target.files[0]);
        setImage(event.target.files[0]);
        setTimeout(function() {
            console.log(image)
        },600)
    }

    async function newPost(text, owner, date, likes){
        let data = {
            text,
            owner, 
            date,
            likes
        }
        console.log("data: ", data);

        let newPost = await fetch('/api/new-post', {
            method: "POST",
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json'}
        })

        let result = await newPost.json();
        console.log("result: ", result)


    }
    return (
        <div className="new-feed-content">
            <h1 className="form-headline">Ny Post</h1>
            <Form noValidate onSubmit={validate} className="new-feed-form">
                <Form.Group className="form-group" controlId="exampleForm.ControlInput1">
                    <Form.Label className="form-label">Text</Form.Label>
                    <Form.Control className="new-feed-text-input" required ref={text} type="text" as="textarea" rows="3" maxLength="100" />
                </Form.Group>
                <Button variant="light" className="register-button"><input type="file" onChange={fileSelectorHandler}></input></Button>
                <Button variant="light" type="submit" className="register-button">Publicera </Button>
            </Form>
        </div>
    )
}
