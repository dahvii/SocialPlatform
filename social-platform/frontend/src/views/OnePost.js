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
    function goToOwner() {
        props.history.push('/profile/' + post.owner._id)
    }
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
                <span className="postCreater" onClick={goToOwner}>
                {!post.isAnonym ? post.owner && post.owner.firstName : ''}
                </span>
                 {post.image == null ? '':<Card.Img variant="top" src={`http://localhost:3001/` + post.image} className="feed-post-image" />}
                </Card.Text>
                    <Card.Text className="forum-text">{post.text}</Card.Text>
                </Card.Body>
                </Card>
                : ''
            }
            {newComment === true ? <AddCommentsForm showNewComment = {showNewComment} forumPostId={props.match.params.id} />  : '' }
            {comments.reverse().map((comment, index) => <FormComment key ={index} comment={comment} post={post} history={props.history}/>)}
            <Button className="add-forum-buton" variant="light" onClick={showNewComment}>
               {!newComment ? <i className="fas fa-plus forum-button-icon"></i>:<i className="fas fa-minus forum-button-icon"></i>}
            </Button>
        </>
    )
}