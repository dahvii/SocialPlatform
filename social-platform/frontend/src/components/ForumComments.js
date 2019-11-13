import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import '../css/ForumPost.css'
import Moment from 'react-moment'
import 'moment/locale/sv'
export default function FormComments(props){
    const [writtenBy, setWrittenBy] = useState({});
    const [haveLocktFordata, setHaveLocktFordata] = useState(false);

    const getOneComment = async() =>{
        setHaveLocktFordata(true)
        const data = await fetch('/api/comment/' + props.comment._id);
        const result = await data.json();
        setWrittenBy(result.writtenBy);
    }

    useEffect(() => {
        if(!haveLocktFordata){
            getOneComment();
        }
    })
    return(  
        <Card className="forum-postcard">  
            <Card.Body className="forum-cardbody"> 
            <Card.Text className="forum-post-time forum-text"><Moment fromNow>{props.comment.timeStamp}</Moment>
                {!props.post.isAnonym ? ' '+ writtenBy.firstName : ''}
                </Card.Text>
                <Card.Text className="forum-text">{props.comment.text}</Card.Text>
            </Card.Body>
    </Card> 
        )    
}
