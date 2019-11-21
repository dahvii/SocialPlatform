import React, { useRef, useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import { Store } from '../utilities/Store'
import '../css/login.css'
import { Link } from 'react-router-dom'
import socket from '../utilities/Socket'

export default function Login(props) {
    const email = useRef();
    const password = useRef();
    const [loginError, setLoginError] = useState(false)
    const { dispatch } = React.useContext(Store);


    function validate(e) {
        login(email.current.value, password.current.value)
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
            socket.emit('login', { id: result.sessUser.id })
            let currUser = await checkCurrentUser(result.sessUser.id);
            if (currUser.isAdmin) {
                dispatch({
                    type: 'SET_Admin',
                    payload: true
                })
            }

            let gotEmptyProps = await checkForEmptyProp(currUser);
            props.history.push({
                pathname: '/',
                state: { emptyProps: gotEmptyProps }
            })
        }

    }

    const checkCurrentUser = async (id) => {
        let data = await fetch('/api/currentuser/' + id)
        try {
            data = await data.json();
        } catch { }

        dispatch({
            type: 'SET_CURRENT_USER',
            payload: data
        })
        return data;
    }

    const checkForEmptyProp = (currUser) => {
        let gotEmptyProps = false;
        if (!currUser.gender) {
            gotEmptyProps = true;
        }
        if (!currUser.bio) {
            gotEmptyProps = true;
        }
        if (currUser.profilePictures.length === 0) {
            gotEmptyProps = true;
        }
        return gotEmptyProps;
    }


    return (
        <div className="login-content">
            <Form noValidate onSubmit={validate} className="form">
                <h1 className="login-form-headline">LOGGA IN</h1>
                <Form.Group className="login-form-group" controlId="exampleForm.ControlInput1">
                    <Form.Label className="login-form-label">Email</Form.Label>
                    <Form.Control required ref={email} className="login-form-controll" type="email" placeholder="lisa@live.se" />
                </Form.Group>
                <Form.Group className="login-form-group" controlId="exampleForm.ControlInput2">
                    <Form.Label>Lösenord</Form.Label>
                    <Form.Control required ref={password} className="login-form-controll" type="password" placeholder="Lösenord" />
                    {loginError ?
                        <p className="login-form-error">Email och lösenord matchade inte</p>
                        : <p className="login-form-error login-form-error-hidden">&nbsp;</p>
                    }
                </Form.Group>

                <Button variant="light" type="submit" className="login-button">Logga in</Button>
            </Form>
            <Link to="/register">
                <p className="register-already-account">
                    Har du inte ett konto?
        </p>
            </Link>
        </div>
    )
}
