import React, { useState, useEffect } from 'react'
import { Image, Form } from 'react-bootstrap'
import MessageCard from '../components/MessageCard';
import '../css/Messages.css'
import { Store } from '../utilities/Store'

export default function Messages(props) {
    const { state } = React.useContext(Store);
    const [sortedMessages, setSortedMessages] = useState([])

    useEffect(() => {
        setSortedMessages(state.currentUser.matches.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)));
    },[state.currentUser.matches])

    const displayChats = sortedMessages.map(match => <MessageCard match={match} key={match.person._id} />)
    const displayLatestMatches = state.currentUser.matches.slice(0, 4).map(match => <Image key={match.person._id} src={match.person.profilePictures[0] ? `http://localhost:3001/${match.person.profilePictures[0]}` : 'http://localhost:3001/uploads/placeholder.jpg'} alt="profile-picture" roundedCircle className="match-picture" />)

    return (
        <div>
            <p>Senaste matchningarna</p>
            <div className="recent-matches">
                {displayLatestMatches}
            </div>
            <hr />
            <div className="matches-search">
                <Form.Control as="input" placeholder="Sök" className="matches-search-input" maxLength="20" />
            </div>
            {displayChats}
        </div>
    )
}
