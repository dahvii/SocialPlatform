import React, { useRef, useState } from 'react'
import { Image, Form } from 'react-bootstrap';
import MessageSender from '../components/MessageSender'
import MessageReceiver from '../components/MessageReceiver'
import { Store } from '../utilities/Store'
import useLifeCycle from '../utilities/useLifeCycle'
import '../css/Chat.css'

export default function Chat(props) {
    const { state, dispatch } = React.useContext(Store);
    const message = useRef();
    const [allMessages, setAllMessages] = useState([])

    useLifeCycle({
        mount: () => {
            console.log(state.currentUser)
            getMessages()
            if (props.location.state.seen === false) {
                updateMatchStatus()
            }
            else if (props.location.state.latestMessage !== undefined) {
                if (props.location.state.latestMessage.receiver === state.currentUser.id && props.location.state.latestMessage.seen === false) {
                    updateMessageStatus()
                }   
            }
        },
        unmount: () => {
            updateStateWithNewProfile()
        }
    })

    const updateStateWithNewProfile = async () => {
        let data = await fetch('/api/currentuser/' + state.currentUser.id)
        data = await data.json()
        dispatch({
            type: 'SET_CURRENT_USER',
            payload: data
        })
    }

    const backToMessages = () => {
        props.history.push('/messages')
    }

    const getMessages = async () => {
        let result = await fetch(`/api/get-messages/${state.currentUser.id}/${props.match.params.id}`)
        result = await result.json()
        setAllMessages(result)
        console.log(result)
    }

    const updateMatchStatus = async () => {
        let data = {
            matchId: props.location.state.match
        }
        console.log(props.location.state.match)
        let result = await fetch('/api/update-match-status', {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        })
        updateStateWithNewProfile()
    }

    const updateMessageStatus = async () => {
        let data = {
            messageId: props.location.state.latestMessage._id
        }

        let result = await fetch('/api/update-message-status', {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        })
        updateStateWithNewProfile()
    }

    const sendMessage = async () => {
        if (message.current.value.trim() !== '') {
            let data = {
                message: message.current.value,
                sender: state.currentUser.id,
                receiver: props.match.params.id,
                seen: false,
                sentAt: Date.now()
            }

            console.log(data)
            let result = await fetch('/api/new-message', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" }
            })
            result = await result.json()
            console.log(result)
            message.current.value = ''
        }
        getMessages()
    }

    const displayMessages = allMessages.map(message => message.sender === state.currentUser.id ?
        <MessageReceiver key={message._id} message={message.message} time={message.sentAt} /> :
        <MessageSender key={message._id} img={props.location.state.img} time={message.sentAt} message={message.message} />
    )

    return (
        <div className="chat-content">
            <div className="chat-header mb-2">
                <i className="fas fa-chevron-left chat-go-back" onClick={backToMessages}></i>
                <Image src={props.location.state.img ? `http://localhost:3001/${props.location.state.img}` : 'http://localhost:3001/uploads/placeholder.jpg'} alt="profile-picture" roundedCircle className="chat-header-picture" />
                <h2 className="chat-name">{props.location.state.firstName}</h2>
            </div>
            <div className="chat-messages">
                {displayMessages}
            </div>

            <div className="message-input-container">
                <Form.Control as="input" className="message-input" maxLength="20" ref={message} />
                <i className="far fa-play-circle send-chat-message" onClick={sendMessage}></i>
            </div>
        </div>
    )
}
