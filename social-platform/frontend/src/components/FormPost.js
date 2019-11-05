import React, { useState, } from 'react';
import Card from 'react-bootstrap/Card';
import '../css/ForumPost.css'
export default function FormPost(props){
    //<Card.Text className="timestamp">Skapad {timeStamp.toLocaleTimeString(undefined, { timeStyle: "short" })}</Card.Text>
    return(  
        <Card className="Postcard">
            <Card.Body> 
                <Card.Title className="titel">{props.post.timeStamp}</Card.Title>
                <Card.Title className="titel">{props.post.titel}</Card.Title>
                <Card.Title className="titel">Skriven av { props.post.owner}</Card.Title>
                <Card.Text>{props.post.text}</Card.Text>
            </Card.Body>
        </Card> 
            )
    
}

/*
<div className="friendsList" to="/OnePost">
    <Link to={`/forum/${post._id}`} className="linkStyle">

    </Link>
</div>

*/

