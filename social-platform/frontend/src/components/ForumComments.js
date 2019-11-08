import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom'
import '../css/ForumPost.css'

export default function FormComments(props){
    const [writtenBy, setWrittenBy] = useState({});
    const [haveLocktFordata, setHaveLocktFordata] = useState(false);
    const [loading, setLoading] = useState(true);

    const getOneComment = async() =>{
        setHaveLocktFordata(true)
        setLoading(false)
        const data = await fetch('/api/comment/' + props.comment._id);
        const result = await data.json();
        setWrittenBy(result.writtenBy);
    }

    useEffect(() => {
        if(!haveLocktFordata){
            getOneComment();
        }
    })
        //<Card.Text className="timestamp">Skapad {timeStamp.toLocaleTimeString(undefined, { timeStyle: "short" })}</Card.Text>
    return(  
        <Card className="Postcard">  
            <Card.Body> 
                <Card.Title className="titel">{props.comment.timeStamp}</Card.Title>
                {props.post.isAnonym ? <Card.Title className="titel">Skriven av {writtenBy.firstName}</Card.Title> : ''}
                <Card.Text>{props.comment.text}</Card.Text>
            </Card.Body>
    </Card> 
        )    
}
