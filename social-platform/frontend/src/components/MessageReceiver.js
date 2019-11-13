import React from 'react'
import '../css/MessageReceiver.css'

export default function MessageReceiver(props) {
    return (
        <div>
            <div className="chat-message-receiver">
                <div className="bubble-receiver receiver">{props.message}</div>
            </div>
        </div>
    )
}
