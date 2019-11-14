import React from 'react'
import { Image } from 'react-bootstrap';
import '../css/MessageCard.css'

export default function MessageCard(props) {
    return (
        <div>
            <div className="message-container">
                <Image src={props.image ? `http://localhost:3001/${props.image}` : 'http://localhost:3001/uploads/placeholder.jpg'} alt="profile-picture" roundedCircle className="message-picture" />
                <div className="message-name-info">
                    <h3>{props.name}</h3>
                    <p>Senaste meddelande blablablabla ...</p>
                </div>
            </div>
        </div>
    )
}
