import React from 'react'
import { Image, Form } from 'react-bootstrap'
import MessageCard from '../components/MessageCard';
import '../css/Messages.css'
import { Store } from '../utilities/Store'

export default function Messages() {

    const { state } = React.useContext(Store);

    const displayChats = state.currentUser.matches.map(match => <MessageCard name={match.firstName} image={match.profilePictures[0]} key={match._id} />)

    return (
        <div>
            <p>Meddelande</p>
            <div className="recent-matches">
                <Image src={'http://localhost:3001/uploads/placeholder.jpg'} alt="profile-picture" roundedCircle className="match-picture" />
                <Image src={'http://localhost:3001/uploads/placeholder.jpg'} alt="profile-picture" roundedCircle className="match-picture" />
                <Image src={'http://localhost:3001/uploads/placeholder.jpg'} alt="profile-picture" roundedCircle className="match-picture" />
                <Image src={'http://localhost:3001/uploads/placeholder.jpg'} alt="profile-picture" roundedCircle className="match-picture" />
            </div>
            <div className="matches-search">
                <Form.Control as="input" placeholder="Sök" className="matches-search-input" maxLength="20" />
            </div>
            {displayChats}
        </div>
    )
}
