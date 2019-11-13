import React from 'react'
import '../css/MessageSender.css'
import { Image } from 'react-bootstrap'

export default function MessageSender(props) {
    return (
        <div>
            <div className="chat-message">
                <div>
                    <Image src={'http://localhost:3001/uploads/placeholder.jpg'} alt="profile-picture" roundedCircle className="chat-sender-picture" />
                </div>
                <div className="bubble-sender sender">{props.message}</div>
            </div>
        </div>
    )
}
