import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import '../css/ForumPost.css'
import Moment from 'react-moment'
import 'moment/locale/sv'
import Reportflag from '../components/ReportFlag'
export default function FormComments(props){
    const [haveLocktFordata, setHaveLocktFordata] = useState(false);
    const [comment, setComment] = useState();
    function goToOwner() {
        props.history.push('/profile/' + props.post.owner._id)
    }

    const getOneComment = async() =>{
        setHaveLocktFordata(true)
        const data = await fetch('/api/comment/' + props.comment._id);
        const result = await data.json();
        setComment(result);
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
            <span className="postCreater" onClick={goToOwner}>
            {props.admin === "admin" ? '': 
              !props.post.isAnonym ? ' ' + (props.post.owner && props.post.owner.firstName) : ''}
                    
                </span>
                {' '}
                {props.admin === "admin" ? '': <Reportflag props={props} post={comment} type={"comment"}/>}
                </Card.Text>
                <Card.Text className="forum-text">{props.comment.text}</Card.Text>
            </Card.Body>
    </Card> 
        )    
}
