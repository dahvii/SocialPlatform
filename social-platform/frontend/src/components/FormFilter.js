import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import '../css/FilterForum.css'
export default function FormFilter(){
    

    const [comments,setComments] = useState([]);
    const [timeStamp,setTimeStamp] = useState(new Date);
    
    
    const createNewPost= ()=>{
        
    }
    return(
        <>
        <Card className="Postcard">
            <Card.Body >
                <Card.Title >Sortering</Card.Title>
                <Form.Group controlId="formGridState">
                <Form.Label className="forum-filter-label">Sortering</Form.Label>
                <Form.Control as="select">
                    <option>Nyast</option>
                    <option>Mest komenterad</option>
                </Form.Control>
            </Form.Group>
            </Card.Body>
        </Card>
        </>
    )
}