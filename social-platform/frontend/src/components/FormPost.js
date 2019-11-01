import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
export default function FormPost(){
    
    const [owner,setOwner] = useState('');
    const [titel,setTitel] = useState('');
    const [text,setText] = useState('');
    const [comments,setComments] = useState([]);
    const [timeStamp,setTimeStamp] = useState(new Date(1572602979453));
    const [image,setImage] = useState([]);
    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(true);


    const getAllForumPost = async() =>{
        const data = await fetch('/api/forum');
        const result = await data.json();
        setPost(result);
        setLoading(false) 
    }
    useEffect(() => {
      getAllForumPost();  
    })

    

    return(
        <>
        {loading ? '': post.forEach(function(post) {
          log  
        })
       
    }
        
        </>
    )
}

/*
 <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{post.titel}</Card.Title>
                <Card.Text>Skapad {timeStamp.toLocaleTimeString(undefined, { timeStyle: "short" })}</Card.Text>
                <Card.Text>{post.text}</Card.Text>
            </Card.Body>
        </Card>

*/