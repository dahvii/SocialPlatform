
import {Store} from '../utilities/Store'
import React, { useRef, useState, } from 'react'
import { Form, Button } from 'react-bootstrap'
import '../css/AddForumPost.css'

export default function AddCommentsToPost(props) {

    const { state } = React.useContext(Store);
    const writtenBy = state.currentUser.firstName;
    const text = useRef();
    const [textError,setTextError] = useState(false);
    const [timeStamp,setTimeStamp] = useState(new Date());

    function validate(e) {
        let allGood = false;
        if (text.current.value === '') {
            setTextError(true)
            allGood = false;
        } else {
            allGood = true;
            setTextError(false)
        }
        if (allGood) {
            register(text.current.value, writtenBy, timeStamp.getTime())
        }
        e.preventDefault();
    }

    async function register(text) {
        setTimeStamp(new Date())
        let data = {
            text,
            forumPostId: props.forumPostId
        }
        
        let registerFormComments = await fetch('/api/onepost', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json'}
        });
        let result = await registerFormComments.json();
        props.showNewComment(result);
    }

    return (
        <>
        <div className="ForumPost forum-comment">
            <Form noValidate onSubmit={validate} className="form">
                <Form.Group className="form-group" controlId="textarea">
                    <Form.Label className="form-label-whitesmoke" >Kommentars text</Form.Label>
                    <Form.Control required ref={text} className="form-controll-textarea" as="textarea" rows="3" placeholder="Post text" />
                    {textError ?
                        <p className="forum-form-error form-label-whitesmoke">Du måste skriva någon Komentar</p>
                        : <p className="forum-form-error-hidden form-label-whitesmoke">&nbsp;</p>
                    }
                </Form.Group>
                <Button variant="light" type="submit" className="comment-button">Kommentera</Button>
            </Form>
        </div>
        </>
    )
}