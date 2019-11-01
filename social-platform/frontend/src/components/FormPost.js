import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
export default function FormPost(){
    
    const [owner,setOwner] = useState('');
    const [titel,setTitel] = useState('');
    const [text,setText] = useState('');
    const [comments,setComments] = useState([]);
    const [timeStamp,setTimeStamp] = useState(new Date(1572529241000));
    const [image,setImage] = useState([]);
    
    return(
        <>
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{titel}</Card.Title>
                <Card.Text>Skapad {timeStamp.toLocaleTimeString(undefined, { timeStyle: "short" })}</Card.Text>
                <Card.Text>{text}</Card.Text>
            </Card.Body>
        </Card>
        </>
    )
}