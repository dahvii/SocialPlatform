import React, { useState, useEffect } from 'react'
import { Image } from 'react-bootstrap';
import '../css/MessageCard.css'
import { Link } from 'react-router-dom'
import { Store } from '../utilities/Store'

export default function MessageCard(props) {

    const { state } = React.useContext(Store);
    const [showNotification, setShowNotification] = useState(false)

    useEffect(() => {
        if (state.currentUser) {
            shouldNotificationShow()
        }
    })

    const shouldNotificationShow = () => {
        for (let i = 0; i < state.currentUser.matches.length; i++) {
            if (state.currentUser.matches[i].match_seen === false) {
                setShowNotification(true)
                break;
            } else if (state.currentUser.matches[i].messages.receiver === state.currentUser.id && state.currentUser.matches[i].messages.seen === false) {
                setShowNotification(true)
                break;
            }
        }
    }

    return (
        <div>
            <Link to={{
                pathname: `chat/${props.match.person._id}`,
                state: { firstName: props.match.person.firstName, img: props.match.person.profilePictures[0], match: props.match._id, seen: props.match.match_seen, latestMessage: props.match.messages }
            }}
                style={{ textDecoration: 'none', color: 'whitesmoke' }}>
                <div className="message-container">
                    <div className="messagecard-image-container">
                        {
                            showNotification ? <i className="fas fa-circle message-card-notification-dot"></i> : ''
                        }
                        <Image src={props.match.person.profilePictures[0] ? `http://localhost:3001/${props.match.person.profilePictures[0]}` : 'http://localhost:3001/uploads/placeholder.jpg'} alt="profile-picture" roundedCircle className="message-picture" />
                    </div>
                    <div className="message-name-info">
                        <h3>{props.match.person.firstName}</h3>
                        <p>{props.match.messages !== undefined ? props.match.messages.message : "Ni har inte chattat ännu!"}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}
