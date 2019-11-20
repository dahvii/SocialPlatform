import React, { useRef, useState } from 'react'
import { Image, Form } from 'react-bootstrap';
import MessageSender from '../components/MessageSender'
import MessageReceiver from '../components/MessageReceiver'
import { Store } from '../utilities/Store'
import useLifeCycle from '../utilities/useLifeCycle'
import '../css/Chat.css'
import socket from '../utilities/Socket'

export default function Chat(props) {
    const { state, dispatch } = React.useContext(Store);
    const message = useRef();
    const [allMessages, setAllMessages] = useState([])

    useLifeCycle({
        mount: () => {
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

    const scrollToBottom = () => {
        let chatWindow = document.getElementById('chat-window');
        chatWindow.scrollTop = chatWindow.scrollHeight
    }

    const updateStateWithNewProfile = async () => {
        let data = await fetch('/api/currentuser/' + state.currentUser.id)
        data = await data.json()
        dispatch({
            type: 'SET_CURRENT_USER',
            payload: data
        })
    }

    const scrollWin = () => {
        window.scrollTo(100, 0);
      };

    const backToMessages = () => {
        props.history.push('/messages')
    }

    socket.on('update-messages', async data => {
        console.log(data)
        // console.log("INNE I UPDATE MESSAGES")
        // let result = await fetch(`/api/get-messages/${state.currentUser.id}/${props.match.params.id}`)
        // result = await result.json()
        // console.log(result)
        // setAllMessages(result)
    })

    const getMessages = async () => {
        console.log("getting messages")
        let result = await fetch(`/api/get-messages/${state.currentUser.id}/${props.match.params.id}`)
        result = await result.json()
        setAllMessages(result)
        scrollToBottom()
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
            socket.emit('new-message', result)
            message.current.value = ''
            setAllMessages([...allMessages, data])
            scrollToBottom()
        }
    }

    const displayMessages = allMessages.map(message => message.sender === state.currentUser.id ?
        <MessageReceiver key={message.sentAt} message={message.message} time={message.sentAt} /> :
        <MessageSender key={message.sentAt} img={props.location.state.img} time={message.sentAt} message={message.message} />
    )

    return (
        <div className="chat-content">
            <div className="chat-header mb-2">
                <i className="fas fa-chevron-left chat-go-back" onClick={backToMessages}></i>
                <Image src={props.location.state.img ? `http://localhost:3001/${props.location.state.img}` : 'http://localhost:3001/uploads/placeholder.jpg'} alt="profile-picture" roundedCircle className="chat-header-picture" />
                <h2 className="chat-name">{props.location.state.firstName}</h2>
            </div>
            <div id="chat-window" className="chat-messages">
                {displayMessages}
            </div>

            <div className="message-input-container">
                <Form.Control as="input" className="message-input" maxLength="20" ref={message} />
                <i className="far fa-play-circle send-chat-message" onClick={sendMessage}></i>
            </div>
        </div>
    )
}
