import React, { useRef, useState, useEffect } from 'react'
import { Form, Button, FormControl } from 'react-bootstrap'
//import { Link } from 'react-router-dom'
import {Store} from '../utilities/Store'
import '../css/AddForumPost.css'
//import { set } from 'mongoose';
export default function AddFormPost(props){
    
    const { state, dispatch } = React.useContext(Store);
    //const owner = state.currentUser.firstName;
    const titel = useRef();
    const text = useRef();
    const [titelError,setTitelError] = useState(false);
    const [textError,setTextError] = useState(false);
    const [timeStamp,setTimeStamp] = useState(new Date);

    const[anonym, setAnonym] = useState(false)
    

    const handleCheck = () => {
        setAnonym(!anonym);
      };


    function validate(e) {
        let allGood = false;
        console.log(anonym);
        
        if (titel.current.value === '') {
            setTitelError(true)
            allGood = false;
        } else {
            allGood = true;
            setTitelError(false)
        }
        if (text.current.value === '') {
            setTextError(true)
            allGood = false;
        } else {
            allGood = true;
            setTextError(false)
        }
        if (allGood) {
            register(titel.current.value, text.current.value)
        }
        e.preventDefault();
    }

    async function register(titel,text) {
        //setTimeStamp(new Date)
        console.log(anonym);
        
        let data = {
            titel,
            text,
            anonym
        }
        let registerFormPost = await fetch('/api/forum', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json'}
        });
        let result = await registerFormPost.json();
        console.log(result)
        props.showNewPost();
    }
    return (
        <> 
       <Form noValidate onSubmit={validate} className="form">
                <h1 className="form-titel">Skapa en ny post</h1>
                <Form.Group className="form-group" controlId="ForumForm.ControlInput1">
                    <Form.Label className="form-label">Titel</Form.Label>
                    <Form.Control required ref={titel} className="form-controll" type="name" placeholder="Titel" />
                    {titelError ?
                        <p className="form-error">Du måste fylla i en Titel</p>
                        : <p className="form-error-hidden">&mvsp;</p>
                    }
                </Form.Group>
                <Form.Group className="form-group" controlId="textarea">
                    <Form.Label>Post text</Form.Label>
                    <Form.Control required ref={text} className="form-controll" as="textarea" rows="3" placeholder="Post text" />
                    {textError ?
                        <p className="form-error">Du måste skriva någon text</p>
                        : <p className="form-error-hidden">&mvsp;</p>
                    }
                </Form.Group>
                <Form.Group controlId="formBasicCheckboxAnonym">
                    <Form.Check className="anonymBasicCheckbox" type="checkbox" label="Anonym" checked={anonym} onChange={handleCheck}/>
                </Form.Group>
                <Button variant="light" type="submit" className="post-button">Post</Button>
            </Form>
        
        </>
    )
}