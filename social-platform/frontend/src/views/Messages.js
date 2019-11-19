import React from 'react'
import { Image, Form } from 'react-bootstrap'
import MessageCard from '../components/MessageCard';
import '../css/Messages.css'
import { Store } from '../utilities/Store'

export default function Messages(props) {

    const { state } = React.useContext(Store);

    // const displayChats = state.currentUser.matches.map(match => console.log(match.person.firstName))

    const displayChats = state.currentUser.matches.map(match => <MessageCard match={match} key={match.person._id} />)
    const displayLatestMatches = state.currentUser.matches.slice(0, 4).map(match => <Image key={match.person._id} src={match.person.profilePictures[0] ? `http://localhost:3001/${match.person.profilePictures[0]}` : 'http://localhost:3001/uploads/placeholder.jpg'} alt="profile-picture" roundedCircle className="match-picture" />)

    return (
        <div>
            <p>Meddelande</p>
            <div className="recent-matches">
                {displayLatestMatches}
            </div>
            <div className="matches-search">
                <Form.Control as="input" placeholder="Sök" className="matches-search-input" maxLength="20" />
            </div>
            {displayChats}
        </div>
    )
}
