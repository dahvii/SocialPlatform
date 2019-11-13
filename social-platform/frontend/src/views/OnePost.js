import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import AddCommentsForm from '../components/AddCommentsToPost';
import FormComment from '../components/ForumComments';
import Button from 'react-bootstrap/Button';
import '../css/Comments.css'
import Moment from 'react-moment'
import 'moment/locale/sv'
export default function OnePost(props) {
    const [post, setPost] = useState();
    const [comments, setComments] = useState([]);
    const [haveLocktFordata, setHaveLocktFordata] = useState(false);
    const [newComment,setNewComment] = useState(false);

    const showNewComment = ()=>{
        setNewComment(!newComment);
        //getPostComments();
     }
    
    useEffect(  () => {
        if(!haveLocktFordata){
            getOnePost();
            test();
        }       
    })

    const getOnePost = async() =>{
        const data = await fetch('/api/onepost/' + props.match.params.id);
        const result = await data.json();
        console.log(result)
        setPost(result);
        setComments(result.comments) 
        setHaveLocktFordata(true)
    }

    const test = () => {
        console.log("hej")
        console.log(post)
    }
/*
    const getPostComments = async() =>{
        const data = await fetch('/api/onepost/' + props.match.params.id);
        const result = await data.json();
        setComments(result.comments);
        setHaveLocktFordata(true)
    }*/
    
    return (
        <>
        
            {
                haveLocktFordata ? 
                <Card className="forum-postcard">
                <Card.Body className="forum-cardbody"> 
                <Card.Text className="forum-post-time forum-text"><Moment fromNow>{post.timeStamp}</Moment>
                {!post.isAnonym ? ' '+ post.owner && post.owner.firstName : ''} {post.image == null ? '':<i className="far fa-image"></i>}
                </Card.Text>
                <Card.Text className="forum-text"><b>{post.titel}</b></Card.Text>
                    <Card.Text className="forum-text">{post.text}</Card.Text>
                </Card.Body>
                </Card>
                <Button className="costumBtn" onClick={()=>  showNewComment() } >Lägg till komentar</Button>
                {newComment === true ? <AddCommentsForm showNewComment = {showNewComment} forumPostId={props.match.params.id} />  : '' }
                {comments.reverse().map((comment, index) => <FormComment key ={index} comment={comment} post={post}/>)}
            : '' ;   
            }
            
            
        </>
    )
}


            
