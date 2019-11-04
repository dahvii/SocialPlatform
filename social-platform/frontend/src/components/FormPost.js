import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import '../css/ForumPost.css'
export default function FormPost(){

    const [owner,setOwner] = useState('');
    const [titel,setTitel] = useState('');
    const [text,setText] = useState('');
    const [comments,setComments] = useState([]);
    const [timeStamp,setTimeStamp] = useState(new Date(1572602979453));
    const [image,setImage] = useState([]);
    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(true);
    const [haveLocktFordata, setHaveLocktFordata] = useState(false);

    const getAllForumPost = async() =>{
        setHaveLocktFordata(true)
        setLoading(false)
        const data = await fetch('/api/forum');
        const result = await data.json();
        setPost(result); 
    }
    
    useEffect(() => {
      if(!haveLocktFordata){
        getAllForumPost();
        }
    })    
    
    return(  
        <>
        {loading ? '':
        post.map((post, index) => 
        <div key={index}>
             <Card className="Postcard">
            <Card.Body>
                <Card.Text className="timestamp">Skapad {timeStamp.toLocaleTimeString(undefined, { timeStyle: "short" })}</Card.Text>
                <Card.Title className="titel">{post.titel}</Card.Title>
                <Card.Text>{post.text}</Card.Text>
            </Card.Body>
            </Card>
        </div> 
            )}
        </>
    )
}