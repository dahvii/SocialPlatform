import React, { useRef, useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import '../css/register.css'
import { Link } from 'react-router-dom'

export default function Register() {
    useEffect(() => {
        document.body.className += " loaded"
    })

    const firstName = useRef();
    const lastName = useRef();
    const email = useRef();
    const password = useRef();
    const password2 = useRef();
    const [firstNameError, setFirstNameError] = useState(false)
    const [lastNameError, setLastNameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [password2Error, setPassword2Error] = useState(false)
    const [matchingPasswordError, setMatchingPasswordError] = useState(false)

    function validate(e) {
        let allGood = false;
        if (firstName.current.value === '') {
            setFirstNameError(true)
            allGood = false;
        } else {
            allGood = true;
            setFirstNameError(false)
        }
        if (lastName.current.value === '') {
            setLastNameError(true)
            allGood = false;
        } else {
            allGood = true;
            setLastNameError(false)
        }
        if (email.current.value === '') {
            setEmailError(true)
            allGood = false;
        } else {
            allGood = true;
            setEmailError(false)
        }
        if (password.current.value === '') {
            setPasswordError(true)
            allGood = false;
        } else {
            allGood = true;
            setPasswordError(false)
        }
        if (password2.current.value === '') {
            setPassword2Error(true)
            allGood = false;
        } else {
            allGood = true;
            setPassword2Error(false)
        }
        if (password.current.value !== password2.current.value) {
            setMatchingPasswordError(true)
            allGood = false;
        } else {
            setMatchingPasswordError(false);
            allGood = true
        }
        if (allGood) {
            register(email.current.value, password.current.value, firstName.current.value, lastName.current.value)
        }
        e.preventDefault();
    }
    async function register(email, password, firstName, lastName) {
        let data = {
            email,
            password,
            firstName,
            lastName
        }

        let registerUser = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        });

        let result = await registerUser.json();
        console.log(result)

    }

    return (
        <div className="register-content">
            <Form noValidate onSubmit={validate} className="form">
                <h1 className="form-headline">SKAPA KONTO</h1>
                <Form.Group className="form-group" controlId="exampleForm.ControlInput1">
                    <Form.Label className="form-label">Namn</Form.Label>
                    <Form.Control required ref={firstName} className="form-controll" type="name" placeholder="Lisa" />
                    {firstNameError ?
                        <p className="form-error">Du måste fylla i ett förnamn</p>
                        : <p className="form-error form-error-hidden">&mvsp;</p>
                    }
                </Form.Group>
                <Form.Group className="form-group" controlId="exampleForm.ControlInput2">
                    <Form.Label>Efternamn</Form.Label>
                    <Form.Control required ref={lastName} className="form-controll" type="name" placeholder="Svensson" />
                    {lastNameError ?
                        <p className="form-error">Du måste fylla i ett efternamn</p>
                        : <p className="form-error form-error-hidden">&mvsp;</p>
                    }
                </Form.Group>
                <Form.Group className="form-group" controlId="exampleForm.ControlInput3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control required ref={email} className="form-controll" type="email" placeholder="name@example.com" autoComplete="email" />
                    {emailError ?
                        <p className="form-error">Du måste fylla i en email</p>
                        : <p className="form-error form-error-hidden">&mvsp;</p>
                    }
                </Form.Group>
                <Form.Group className="form-group" controlId="exampleForm.ControlInput4">
                    <Form.Label>Lösenord</Form.Label>
                    <Form.Control required ref={password} className="form-controll" type="password" placeholder="*******" autoComplete="new-password" />
                    {passwordError ?
                        <p className="form-error">Du måste fylla i ett lösenord</p>
                        : <p className="form-error form-error-hidden">&mvsp;</p>
                    }
                </Form.Group>
                <Form.Group className="form-group" controlId="exampleForm.ControlInput5">
                    <Form.Label>Upprepa lösenord</Form.Label>
                    <Form.Control required ref={password2} className="form-controll" type="password" placeholder="*******" autoComplete="new-password" />
                    {password2Error ?
                        <p className="form-error">Du måste fylla i ett lösenord</p>
                        : <p className="form-error form-error-hidden">&mvsp;</p>
                    }
                    {
                        matchingPasswordError ?
                            <p className="form-error">Dina lösenord ska matcha</p>
                            : <p className="form-error form-error-hidden">&mvsp;</p>
                    }
                </Form.Group>
                <Button variant="light" type="submit" className="register-button">SKAPA KONTO</Button>
            </Form>
            <Link to="/login">
                <p className="already-account">
                    Har du redan ett konto?
        </p>
            </Link>
        </div>
    )
}