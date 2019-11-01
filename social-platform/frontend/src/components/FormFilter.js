import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
export default function FormFilter(){
    
    const [titel,setTitel] = useState('');
    const [comments,setComments] = useState([]);
    const [timeStamp,setTimeStamp] = useState(new Date);
    
    
    const createNewPost= ()=>{
        
    }

    return(
        <>
        
        <Card style={{ width: '25rem' }}>
            <Card.Body>
                <Card.Title>Sök / Filter</Card.Title>
                <Form className="searchPage">
                    <div className="container-fluid ">
                        <div className="row ">
                            <Form.Group className="col-md-8" controlId="formGridName">
                                <Form.Label>Sök</Form.Label>
                                <Form.Control name="name" placeholder="Titel" />
                            </Form.Group>
                            <Form.Group className="col-md-4 sortBy" controlId="formGridState">
                                <Form.Label >Sort/Filter</Form.Label>
                                <Form.Control as="select" name="sortBy" placeholder="Nyast">
                                    <option value="titel">Titel</option>
                                    <option value="mostcoments">Mest Comenterad</option>
                                </Form.Control >
                            </Form.Group>
                        </div>
                    </div>
                </Form>
                
            </Card.Body>
        </Card>
        </>
    )
}