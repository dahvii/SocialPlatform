import React, { useRef, useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import '../css/register.css'
import { Link } from 'react-router-dom'

export default function Register(props) {
    useEffect(() => {
        document.body.className += " loaded"
    })
    const [datesOfMonth, setDatesOfMonth] = useState([])
    const year = useRef();
    const month = useRef();
    const date = useRef();
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
    const [ageError, setAgeError] = useState(false);

    useEffect(() => {
        getDates();
    }, []);


    function validate(e) {
        let allGood = true;
        if (firstName.current.value === '') {
            setFirstNameError(true)
            allGood = false;
        } else {
            setFirstNameError(false)
        }
        if (lastName.current.value === '') {
            setLastNameError(true)
            allGood = false;
        } else {
            setLastNameError(false)
        }
        if (email.current.value === '') {
            setEmailError(true)
            allGood = false;
        } else {
            setEmailError(false)
        }
        if (password.current.value === '') {
            setPasswordError(true)
            allGood = false;
        } else {
            setPasswordError(false)
        }
        if (password2.current.value === '') {
            setPassword2Error(true)
            allGood = false;
        } else {
            setPassword2Error(false)
        }
        if (password.current.value !== password2.current.value || password.current.value === '') {
            setMatchingPasswordError(true)
            allGood = false;
        } else {
            setMatchingPasswordError(false);
        }
        let birthDay = validateBirthDay();
        if(birthDay){
            setAgeError(false);            
        }else{
            setAgeError(true);
            allGood = false;
        }        
        if (allGood) {            
            register(email.current.value, password.current.value, firstName.current.value, lastName.current.value, birthDay)
        }
        e.preventDefault();
    }
    async function register(email, password, firstName, lastName, dateOfBirth) {
        let data = {
            email,
            password,
            firstName,
            lastName, 
            dateOfBirth
        }
        
        let registerUser = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        });

        await registerUser.json();

        if(result.status === 200){
            props.history.push('/login')
        }

    }

    function validateBirthDay(){
        let birthDate = new Date(year.current.value, month.current.value-1, date.current.value, 12, 12);           
        let today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        let monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }         
        if(age >= 18){
             return birthDate;
        }else{
            return false;
        }
    }

    function getDates(){
        let lastDayOfMonth;
        if(month.current && year.current){           
            lastDayOfMonth = new Date(year.current.value, month.current.value, 0).getDate();
        }else{            
            lastDayOfMonth = 31;
        }
        let dates = [];         
        for(let i= 1; i <= lastDayOfMonth; i++){
            dates.push(<option key={i}>{i}</option>);
        }
        setDatesOfMonth(dates);
    }

    function getMonths(){
        let months = [];        
        for(let i= 1; i <= 12; i++){
            months.push(<option key={i}>{i}</option>);
        }

        return(months.map(item => {
            return item;
        }))
    }
    function getYears(){ 
        let years = [];
        let date= new Date();
        let yearLimit= date.getFullYear()-18;
            
        for(let i= yearLimit; i >= 1900 ; i--){
            years.push(<option key={i}>{i}</option>);
        }

        return(years.map(item => {
            return item;
        }))
    }

    function updateDates(){
        getDates();
    }

    return (
        <div className="register-content">
            <Form noValidate onSubmit={validate} className="register-form">
                <h1 className="register-form-headline">SKAPA KONTO</h1>
                <Form.Group className="register-birthday-input">
                    <div>
                    <Form.Label>År</Form.Label>
                    <Form.Control onChange={updateDates} ref={year} as="select">
                    {getYears()}
                    </Form.Control>
                        
                    </div>
                    <div>
                    <Form.Label>Månad</Form.Label>
                    <Form.Control onChange={updateDates} ref={month} as="select">
                    {getMonths()}
                    </Form.Control>
                        
                    </div>
                    <div>
                    <Form.Label>Datum</Form.Label>
                    <Form.Control ref={date} as="select">
                    {datesOfMonth.map((item) => item)}
                    </Form.Control>   
                    </div>
                </Form.Group>
                    {ageError &&
                        <p className="register-form-error">Du måste vara över 18 för att använda appen</p>
                    }
                <Form.Group className="register-form-group" controlId="exampleForm.ControlInput1">
                    <Form.Label className="register-form-label">Namn</Form.Label>
                    <Form.Control required ref={firstName} className="register-form-controll" type="name" placeholder="Lisa" />
                    {firstNameError ?
                        <p className="register-form-error">Du måste fylla i ett förnamn</p>
                        : <p className="register-form-error register-form-error-hidden">&mvsp;</p>
                    }
                </Form.Group>
                <Form.Group className="register-form-group" controlId="exampleForm.ControlInput2">
                    <Form.Label>Efternamn</Form.Label>
                    <Form.Control required ref={lastName} className="register-form-controll" type="name" placeholder="Svensson" />
                    {lastNameError ?
                        <p className="register-form-error">Du måste fylla i ett efternamn</p>
                        : <p className="register-form-error register-form-error-hidden">&mvsp;</p>
                    }
                </Form.Group>
                <Form.Group className="register-form-group" controlId="exampleForm.ControlInput3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control required ref={email} className="register-form-controll" type="email" placeholder="name@example.com" autoComplete="email" />
                    {emailError ?
                        <p className="register-form-error">Du måste fylla i en email</p>
                        : <p className="register-form-error register-form-error-hidden">&mvsp;</p>
                    }
                </Form.Group>
                <Form.Group className="register-form-group" controlId="exampleForm.ControlInput4">
                    <Form.Label>Lösenord</Form.Label>
                    <Form.Control required ref={password} className="register-form-controll" type="password" placeholder="*******" autoComplete="new-password" />
                    {passwordError ?
                        <p className="register-form-error">Du måste fylla i ett lösenord</p>
                        : <p className="register-form-error register-form-error-hidden">&mvsp;</p>
                    }
                </Form.Group>
                <Form.Group className="register-form-group" controlId="exampleForm.ControlInput5">
                    <Form.Label>Upprepa lösenord</Form.Label>
                    <Form.Control required ref={password2} className="register-form-controll" type="password" placeholder="*******" autoComplete="new-password" />
                    {password2Error ?
                        <p className="register-form-error">Du måste fylla i ett lösenord</p>
                        : <p className="register-form-error register-form-error-hidden">&mvsp;</p>
                    }
                    {
                        matchingPasswordError ?
                            <p className="register-form-error">Dina lösenord ska matcha</p>
                            : <p className="register-form-error register-form-error-hidden">&mvsp;</p>
                    }
                </Form.Group>
                <Button variant="light" type="submit" className="register-button">SKAPA KONTO</Button>
            </Form>
            <Link to="/login">
                <p className="register-already-account">
                    Har du redan ett konto?
        </p>
            </Link>
        </div>
    )
}