import React from 'react'
import { Image } from 'react-bootstrap';
import '../css/MessageCard.css'
import { Link } from 'react-router-dom'

export default function MessageCard(props) {

    return (
        <div>
            <Link to={{
                pathname: `chat/${props.id}`,
                state: { firstName: props.name, img: props.image}
            }}
                style={{ textDecoration: 'none', color: 'whitesmoke' }}>
                <div className="message-container">
                    <Image src={props.image ? `http://localhost:3001/${props.image}` : 'http://localhost:3001/uploads/placeholder.jpg'} alt="profile-picture" roundedCircle className="message-picture" />
                    <div className="message-name-info">
                        <h3>{props.name}</h3>
                        <p>Senaste meddelande blablablabla ...</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}
