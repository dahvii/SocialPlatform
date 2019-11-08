import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import AddCommentsForm from '../components/AddCommentsToPost';
import FormComment from '../components/ForumComments';
import Button from 'react-bootstrap/Button';
import '../css/Comments.css'
import Moment from 'react-moment'
import 'moment/locale/sv'
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
        {console.log(post.isAnonym), 'podtens '}
        
        <Card className="Postcard one-post">
            <Card.Body> 
                <Card.Title className="titel"><Moment fromNow>{post.timeStamp}</Moment></Card.Title>
                <Card.Title className="titel">{post.titel}</Card.Title>
                {post.isAnonym ? <Card.Title className="titel">Skriven av {post.owner && post.owner.firstName}</Card.Title> : ''}
                <Card.Text>{post.text}</Card.Text>
            </Card.Body>
            </Card>
            {comments.map((comment, index) => <FormComment key ={index} comment={comment} post={post}/>)}
            <Button className="costumBtn" onClick={()=>  showNewComment() } >Lägg till komentar</Button>
            {newComment === true ? <AddCommentsForm showNewComment = {showNewComment} forumPostId={props.match.params.id} />  : '' }
        </>
    )
}