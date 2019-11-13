import React from 'react'
import { Image } from 'react-bootstrap';
import '../css/MessageCard.css'

export default function MessageCard() {
    return (
        <div>
            <div className="message-container">
                <Image src={'http://localhost:3001/uploads/placeholder.jpg'} alt="profile-picture" roundedCircle className="message-picture" />
                <div className="message-name-info">
                    <h3>Name</h3>
                    <p>Senaste meddelande blablablabla ...</p>
                </div>
            </div>
        </div>
    )
}
