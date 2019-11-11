import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom'
import '../css/ForumPost.css'
import Moment from 'react-moment'
import 'moment/locale/sv'
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
    return(  
        <Card className="Postcard">  
            <Card.Body> 
                <Card.Title className="titel"><Moment fromNow>{props.comment.timeStamp}</Moment></Card.Title>
                {!props.post.isAnonym ? <Card.Title className="titel">Skriven av {writtenBy.firstName}</Card.Title> : ''}
                <Card.Text>{props.comment.text}</Card.Text>
            </Card.Body>
    </Card> 
        )    
}
