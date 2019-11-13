import React from 'react'
import { Image, Form } from 'react-bootstrap';
import MessageSender from '../components/MessageSender'
import MessageReceiver from '../components/MessageReceiver'
import '../css/Chat.css'


export default function Chat() {
    return (
        <div className="chat-content">
            <div className="chat-header mb-2">
                <i class="fas fa-chevron-left chat-go-back"></i>
                <Image src={'http://localhost:3001/uploads/placeholder.jpg'} alt="profile-picture" roundedCircle className="chat-header-picture" />
                <h2 className="chat-name">Name</h2>
            </div>
            <div className="chat-messages">
                <MessageSender message={"NÄMEN HEJ PÅ DIG"} />
                <MessageReceiver message={"HUR MÅR DU!?!?!?!??!?!?!"} />
                <MessageSender message={"JAG MÅR BARA BRA TACK HUR ÄR DET MED DIG IDAAG DÅ!???"} />
                <MessageSender message={"JAG MÅR BARA BRA TACK HUR ÄR DET MED DIG IDAAG DÅ!???"} />
                <MessageSender message={"JAG MÅR BARA BRA TACK HUR ÄR DET MED DIG IDAAG DÅ!???"} />
                <MessageSender message={"JAG MÅR BARA BRA TACK HUR ÄR DET MED DIG IDAAG DÅ!???"} />
                <MessageSender message={"JAG MÅR BARA BRA TACK HUR ÄR DET MED DIG IDAAG DÅ!???"} />
                <MessageSender message={"JAG MÅR BARA BRA TACK HUR ÄR DET MED DIG IDAAG DÅ!???"} />
                <MessageSender message={"JAG MÅR BARA BRA TACK HUR ÄR DET MED DIG IDAAG DÅ!???"} />
                <MessageSender message={"JAG MÅR BARA BRA TACK HUR ÄR DET MED DIG IDAAG DÅ!???"} />
                <MessageSender message={"JAG MÅR BARA BRA TACK HUR ÄR DET MED DIG IDAAG DÅ!???"} />
                <MessageSender message={"JAG MÅR BARA BRA TACK HUR ÄR DET MED DIG IDAAG DÅ!???"} />
                <MessageSender message={"JAG MÅR BARA BRA TACK HUR ÄR DET MED DIG IDAAG DÅ!???"} />
                <MessageSender message={"JAG MÅR BARA BRA TACK HUR ÄR DET MED DIG IDAAG DÅ!???"} />
                <MessageSender message={"JAG MÅR BARA BRA TACK HUR ÄR DET MED DIG IDAAG DÅ!???"} />

            </div>

            <div className="message-input-container">
                <Form.Control as="input" className="message-input" maxLength="20" />
                <i class="far fa-play-circle send-chat-message"></i>
            </div>
        </div>
    )
}
