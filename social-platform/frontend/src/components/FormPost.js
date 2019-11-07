import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom'
import '../css/ForumPost.css'

export default function FormPost(props){
    //<Card.Text className="timestamp">Skapad {timeStamp.toLocaleTimeString(undefined, { timeStyle: "short" })}</Card.Text>
    return(  
    <Card className="Postcard">
        <Link className="forumLink" to={`/onepost/${props.post._id}`}>        
            <Card.Body> 
                <Card.Title className="titel">{props.post.timeStamp}</Card.Title>
                <Card.Title className="titel">{props.post.titel}</Card.Title>
                <Card.Title className="titel">Skriven av { props.post.owner.firstName}</Card.Title>
                <Card.Text>{props.post.text}</Card.Text>
            </Card.Body>
        </Link>
    </Card> 
        )    
}
