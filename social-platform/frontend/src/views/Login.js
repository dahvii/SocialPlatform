import React, { useRef, useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import { Store } from '../utilities/Store'
import '../css/login.css'

export default function Login(props) {
    const email = useRef();
    const password = useRef();
    const [loginError, setLoginError] = useState(false)
    const { dispatch } = React.useContext(Store);

    function validate(e) {
        let allGood = false;
        if (email.current.value === '') {
            setLoginError(true)
            allGood = false;
        } else {
            allGood = true;
            setLoginError(false)
        }
        if (password.current.value === '') {
            setLoginError(true)
            allGood = false;
        } else {
            allGood = true;
            setLoginError(false)
        }

        if (allGood) {
            login(email.current.value, password.current.value)
        }
        e.preventDefault();
    }

    async function login(email, password) {
        let data = {
            email,
            password
        }
        let loginUser = await fetch('/api/login', {
            method: "POST",
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        })

        let result = await loginUser.json();

        if (result.error === "login-error") {
            setLoginError(true);
        } else {
            dispatch({
                type: "SET_LOGGEDIN",
                payload: true
            });
            dispatch({
                type: 'SET_CURRENT_SESSION',
                payload: result.sessUser
            })
            checkCurrentUser(result.sessUser.id)
            props.history.push('/')
        }

    }

    const checkCurrentUser = async (id) => {
        let data = await fetch('/api/person/' + id)
        try {
            data = await data.json();
        } catch { }

        dispatch({
            type: 'SET_CURRENT_USER',
            payload: data
        })
    }


    return (
        <div className="login-content">
            <Form noValidate onSubmit={validate} className="form">
                <h1 className="form-headline">LOGGA IN</h1>
                <Form.Group className="form-group" controlId="exampleForm.ControlInput1">
                    <Form.Label className="form-label">Namn</Form.Label>
                    <Form.Control required ref={email} className="form-controll" type="email" placeholder="lisa@live.se" />
                    {loginError ?
                        <p className="form-error">Du måste fylla i ett förnamn</p>
                        : <p className="form-error form-error-hidden">&mvsp;</p>
                    }
                </Form.Group>
                <Form.Group className="form-group" controlId="exampleForm.ControlInput2">
                    <Form.Label>Lösenord</Form.Label>
                    <Form.Control required ref={password} className="form-controll" type="name" placeholder="Svensson" />
                    {loginError ?
                        <p className="form-error">Du måste fylla i ett efternamn</p>
                        : <p className="form-error form-error-hidden">&mvsp;</p>
                    }
                </Form.Group>

                <Button variant="light" type="submit" className="register-button">Logga in</Button>
            </Form>
        </div>
    )
}
