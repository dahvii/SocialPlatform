import React from 'react'
import { Image } from 'react-bootstrap';
import '../css/MessageCard.css'
import { Link } from 'react-router-dom'

export default function MessageCard(props) {

    return (
        <div>
            <Link to={{
                pathname: `chat/${props.match.person._id}`,
                state: { firstName: props.match.person.firstName, img: props.match.person.profilePictures[0]}
            }}
                style={{ textDecoration: 'none', color: 'whitesmoke' }}>
                <div className="message-container">
                    <Image src={props.match.person.profilePictures[0] ? `http://localhost:3001/${props.match.person.profilePictures[0]}` : 'http://localhost:3001/uploads/placeholder.jpg'} alt="profile-picture" roundedCircle className="message-picture" />
                    <div className="message-name-info">
                        <h3>{props.match.person.firstName}</h3>
                        <p>{props.match.messages !== undefined ? props.match.messages.message : "Ni har inte chattat ännu!"}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}
