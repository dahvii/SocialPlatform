import React from 'react'
import { Button } from 'react-bootstrap';
import '../css/start.css';
import { Link } from 'react-router-dom'

export default function Start() {
    // window.onload = function() {
    //     document.body.className += " loaded";
    // }
    return (
        <div className="start-page-content">
            <div>
                <h1 className="start-page-tri">Tri<span className="start-page-dot">.</span></h1>
            </div>
            <div>
                <Link to="/register"><Button variant="light" className="start-page-button">FORSTÄTT MED LOGIN</Button></Link>
            </div>
        </div>
    )
}
