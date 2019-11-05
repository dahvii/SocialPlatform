import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import { Store } from '../utilities/Store'

export default function OnePost(props) {
    //const { state, dispatch } = React.useContext(Store);
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState({});
    const [comments, setComments] = useState({});
    const [haveLocktFordata, setHaveLocktFordata] = useState(false);
   
    useEffect(() => {
    if(!haveLocktFordata){
        getOnePost();
    }       
    })

    const getOnePost = async() =>{
        setHaveLocktFordata(true)
        setLoading(false)
        const data = await fetch('/api/onepost/' + props.match.params.id);
        const result = await data.json();
        setPost(result);
        console.log(result);
    }




    return (
        <>
        <Card className="Postcard">
            <Card.Body> 
                <Card.Title className="titel">{post.timeStamp}</Card.Title>
                <Card.Title className="titel">{post.titel}</Card.Title>
                <Card.Title className="titel">Skriven av { post.owner}</Card.Title>
                <Card.Text>{post.text}</Card.Text>
            </Card.Body>
            </Card>
        </>
    )
}


/*
för att skriva utt komentarerna senare när det finns
{post.map((comments, index) => 
        <div key={index}>
            <Card className="comentsCard">
            <Card.Body> 
                <Card.Title className="titel">{comments.timeStamp}</Card.Title>
                <Card.Title className="titel">{comments.titel}</Card.Title>
                <Card.Title className="titel">Skriven av { comments.owner}</Card.Title>
                <Card.Text>{comments.text}</Card.Text>
            </Card.Body>
            </Card>
        </div>
        )}

*/