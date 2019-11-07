import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import AddCommentsForm from '../components/AddCommentsToPost';
import FormComment from '../components/ForumComments';
import Button from 'react-bootstrap/Button';
export default function OnePost(props) {
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [haveLocktFordata, setHaveLocktFordata] = useState(false);
    const [newComment,setNewComment] = useState(false);

    const showNewComment = ()=>{
        setNewComment(!newComment);
        getPostComments();
     }
    
    useEffect(() => {
    if(!haveLocktFordata){
        getOnePost();
        getPostComments();
    }       
    })

    const getOnePost = async() =>{
        setHaveLocktFordata(true)
        setLoading(false)
        const data = await fetch('/api/onepost/' + props.match.params.id);
        const result = await data.json();
        setPost(result);
    }

    const getPostComments = async() =>{
        setHaveLocktFordata(true)
        setLoading(false)
        const data = await fetch('/api/onepost/' + props.match.params.id);
        const result = await data.json();
        setComments(result.comments);
    }
    
    return (
        <>
        <Card className="Postcard">
            <Card.Body> 
                <Card.Title className="titel">{post.timeStamp}</Card.Title>
                <Card.Title className="titel">{post.titel}</Card.Title>
                <Card.Title className="titel">Skriven av {post.owner && post.owner.firstName}</Card.Title>
                <Card.Text>{post.text}</Card.Text>
            </Card.Body>
            </Card>
            {comments.map((comment, index) => <FormComment key ={index} comment={comment}/>)}
            <Button className="costumBtn" onClick={()=>  showNewComment() } >Skapa nytt Inlägg</Button>
            {newComment === true ? <AddCommentsForm showNewComment = {showNewComment} forumPostId={props.match.params.id} />  : '' }
        </>
    )
}