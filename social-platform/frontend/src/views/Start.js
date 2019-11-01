import React from 'react'
import {Button} from 'react-bootstrap';
import '../css/start.css';
import {Link} from 'react-router-dom'

export default function Start() {
    window.onload = function() {
        document.body.className += " loaded";
    }
    return (
        <div className="content">
            <h1 className="lisa">Lisa<span className="dot">.</span></h1>
            <Link to="/register"><Button variant="light" className="start-button">CONTINUE WITH LOGIN</Button></Link>
        </div>
    )
}
