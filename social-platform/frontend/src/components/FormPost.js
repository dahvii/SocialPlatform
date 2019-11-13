import React from 'react';
import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom'
import '../css/ForumPost.css'
import Moment from 'react-moment'
import 'moment/locale/sv'

export default function FormPost(props){
    return(  
    <Card className="forum-postcard">
        <Link className="forumLink" to={`/onepost/${props.post._id}`}>        
            <Card.Body className="forum-cardbody"> 
            <Card.Text className="forum-post-time forum-text"><Moment fromNow>{props.post.timeStamp}</Moment>
            {!props.post.isAnonym ? ' '+ props.post.owner.firstName : ''} {props.post.image == null ? '':<i className="far fa-image"></i>}
            </Card.Text>
                <Card.Text className="forum-text"><b>{props.post.titel}</b></Card.Text>
                <Card.Text className="forum-text">{props.post.text}</Card.Text>
            </Card.Body>
        </Link>
    </Card> 
        )    
}
