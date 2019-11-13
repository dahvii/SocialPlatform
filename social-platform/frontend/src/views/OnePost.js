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
    
     const showNewComment = (result)=>{
        if(result._id){
          setComments([result, ...comments])
        }
        setNewComment(!newComment);
     }

    useEffect(  () => {
        if(!haveLocktFordata){
            getOnePost();
        }       
    })

    const getOnePost = async() =>{
        const data = await fetch('/api/onepost/' + props.match.params.id);
        const result = await data.json();
        setPost(result);
        setComments(result.comments) 
        setHaveLocktFordata(true)
    }
    return (
        <>
        { haveLocktFordata ? 
        <Card className="forum-postcard">
                <Card.Body className="forum-cardbody"> 
                <Card.Text className="forum-post-time forum-text"><Moment fromNow>{post.timeStamp}</Moment>
                {!post.isAnonym ? ' '+ post.owner && post.owner.firstName : ''} {post.image == null ? '':<i className="far fa-image"></i>}
                </Card.Text>
                <Card.Text className="forum-text"><b>{post.titel}</b></Card.Text>
                    <Card.Text className="forum-text">{post.text}</Card.Text>
                </Card.Body>
                </Card>
                : ''
            }

            <Button className="add-forum-buton" variant="light" onClick={showNewComment}>
               {!newComment ? <i className="fas fa-plus forum-button-icon"></i>:<i className="fas fa-minus forum-button-icon"></i>}
            </Button>
            {newComment === true ? <AddCommentsForm showNewComment = {showNewComment} forumPostId={props.match.params.id} />  : '' }
            {comments.reverse().map((comment, index) => <FormComment key ={index} comment={comment} post={post}/>)}
        </>
    )
}