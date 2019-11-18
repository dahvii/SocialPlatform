import React from 'react'
import '../css/MessageSender.css'
import { Image } from 'react-bootstrap'
import Moment from 'react-moment';

export default function MessageSender(props) {

    return (

        <div>
            <p className="chat-message-time"><Moment fromNow>{props.time}</Moment></p>
            <div className="chat-message">
                <div>
                    <Image src={props.img ? `http://localhost:3001/${props.img}` : 'http://localhost:3001/uploads/placeholder.jpg'} alt="profile-picture" roundedCircle className="chat-sender-picture" />
                </div>
                <div className="bubble-sender sender">{props.message}</div>
            </div>
        </div>
    )
}
