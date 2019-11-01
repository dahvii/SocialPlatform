import React, { useRef, useState, useEffect } from 'react'
import { Form, Button, FormControl } from 'react-bootstrap'
//import { Link } from 'react-router-dom'
import store from '../utilities/Store'
export default function AddFormPost(){
  
    const owner = 'curent'
    const titel = useRef();
    const textarea = useRef();
    //const timeStamp = useRef();
    const [titelError,setTitelError] = useState(false);
    const [textAreaError,setTextAreaError] = useState(false);
    
    function validate(e) {
        let allGood = false;
        if (titel.current.value === '') {
            setTitelError(true)
            allGood = false;
        } else {
            allGood = true;
            setTitelError(false)
        }
        if (textarea.current.value === '') {
            setTextAreaError(true)
            allGood = false;
        } else {
            allGood = true;
            setTextAreaError(false)
        }
        if (allGood) {
            register(titel.current.value, textarea.current.value, owner)
        }
        e.preventDefault();
    }

    async function register(titel,textarea,owner) {
        let data = {
            titel,
            textarea,
            owner 
        }
        console.log(data)
        ////////////////////////////////////////////////////////////////////???????????????????????????????????????????????????
        let registerFormPost = await fetch('/api/form', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json'}
        });
        let result = await registerFormPost.json();
        console.log(result)    
    }
    /*
    useEffect(() => {
        console.log("hej")
        document.body.className += " loaded"
    })
    */
    return (    
        <div className="register-content">
            <Form noValidate onSubmit={validate} className="form">
                <h1 className="form-headline">SKAPA en ny post</h1>
                <Form.Group className="form-group" controlId="exampleForm.ControlInput1">
                    <Form.Label className="form-label">Titel</Form.Label>
                    <Form.Control required ref={titel} className="form-controll" type="name" placeholder="Titel" />
                    {titelError ?
                        <p className="form-error">Du måste fylla i en Titel</p>
                        : <p className="form-error">&mvsp;</p>
                    }
                </Form.Group>
                <Form.Group className="form-group" controlId="exampleForm.ControlInput2">
                    <Form.Label>Text</Form.Label>
                    <Form.Control required ref={textarea} className="form-controll" type="name" placeholder="Post text"/>
                    {textAreaError ?
                        <p className="form-error">Du måste skriva någon text</p>
                        : <p className="form-error">&mvsp;</p>
                    }
                </Form.Group>  
                <Button variant="light" type="submit" className="register-button">Post</Button>
            </Form>
        </div>
    )
}