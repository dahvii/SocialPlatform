import React from 'react'
import '../css/MessageReceiver.css'
import Moment from 'react-moment';

export default function MessageReceiver(props) {
    return (
        <div>
            <p className="chat-message-time"><Moment fromNow>{props.time}</Moment></p>
            <div className="chat-message-receiver">
                <div className="bubble-receiver receiver">{props.message}</div>
            </div>
        </div>
    )
}
