import React, { useState } from 'react'
import { Image } from 'react-bootstrap';
import '../css/MessageCard.css'
import { Link } from 'react-router-dom'
import { Store } from '../utilities/Store'
import useLifeCycle from '../utilities/useLifeCycle'

export default function MessageCard(props) {

    const { state } = React.useContext(Store);
    const [showNotification, setShowNotification] = useState(false)

    useLifeCycle({
        mount: () => {
            console.log(props.match)
            if (state.currentUser) {
                shouldNotificationShow()
            }
        }
    })

    const shouldNotificationShow = () => {
            if (props.match.match_seen === false) {
                setShowNotification(true)
            } else if (props.match.messages !== undefined) {
                if (props.match.messages.receiver === state.currentUser.id && props.match.messages.seen === false) {
                    setShowNotification(true)
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
