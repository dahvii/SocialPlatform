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
            <Card.Text className="forum-post-time forum-text forum-text-top">
                <Moment fromNow>{props.post.timeStamp}</Moment>
                <div className="postCreater">{!props.post.isAnonym ? ' '+ props.post.owner.firstName : ''}</div>
            </Card.Text>
                <Card.Text className="forum-text">{props.post.text}</Card.Text>
                <Card.Text className="forum-text forum-text-bot">{props.post.image == null ? '':<i className="far fa-image"></i>} <i className="far fa-comments forum-text"></i> {props.post.comments.length}</Card.Text>
            </Card.Body>
        </Link>
    </Card> 
        )    
}
