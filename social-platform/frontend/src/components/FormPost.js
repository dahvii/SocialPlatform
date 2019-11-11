import React from 'react';
import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom'
import '../css/ForumPost.css'
import Moment from 'react-moment'
import 'moment/locale/sv'

export default function FormPost(props){
    return(  
    <Card className="Postcard">
        <Link className="forumLink" to={`/onepost/${props.post._id}`}>        
            <Card.Body> 
                <Card.Title className="titel"><Moment fromNow>{props.post.timeStamp}</Moment></Card.Title>
                <Card.Title className="titel">{props.post.titel}</Card.Title>
                {!props.post.isAnonym ? <Card.Title className="titel">Skriven av { props.post.owner.firstName}</Card.Title> : ''}
                {props.post.image == null ? '':<Card.Img variant="top" src={`http://localhost:3001/` + props.post.image} className="feed-post-image" />}
                <Card.Text>{props.post.text}</Card.Text>
            </Card.Body>
        </Link>
    </Card> 
        )    
}
