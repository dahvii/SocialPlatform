import React, { useState, useRef, useContext } from 'react'
import useLifeCycle from '../utilities/useLifeCycle'
import { Card, Image, InputGroup, FormControl, Button } from 'react-bootstrap'
import { Store } from '../utilities/Store'
import Comment from '../components/Comment'
import '../css/FeedComment.css'
import Moment from 'react-moment'
import 'moment/locale/sv'
import Reportflag from '../components/ReportFlag';
export default function FeedComments(props) {
    const { state } = useContext(Store);
    const [post, setPost] = useState();
    const [loading, setLoading] = useState(true)
    const newComment = useRef();

    useLifeCycle({
        mount: () => {
            getPost();
        }
    })

    async function sendComment() {
        let text = newComment.current.value
        let writtenById = state.currentUser.id;
        let timeStamp = new Date().getTime();
        let postId = post._id;
        let data = {
            text,
            writtenById,
            timeStamp,
            postId
        }
        let newCommentPost = await fetch('/api/feed-post/new-comment', {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        })
        let result = await newCommentPost.json();
        if (result.status === 200) {
            let newPost = { ...post }
            newPost.comments.push(result.newComment)
            setPost(newPost)
        } else {
            //error message
            console.log("something went wrong");
        }
    }

    function goToOwner() {
        props.history.push('/profile/' + post.owner._id)
    }

    function goBack() {
        props.history.push('/')
    }


    async function getPost() {
        let result = await fetch(`/api${props.location.pathname}`);
        result = await result.json();
        setPost(result);
        setLoading(false)
    }
    return (
        <div className="feed-post-one-post">
            {
                loading ? <p>loading</p> :
                    <Card className="feed-post-card-comments">
                        <Card.Header className="feed-comment-header">
                            <i onClick={goBack} className="fas fa-chevron-left feed-comment-arrow-left"></i>
                            Kommentarer
                <i className="fas fa-ellipsis-h"></i>
                        </Card.Header>
                        <Card.Body className="feed-comments-text-content">
                            <Image onClick={goToOwner}
                                src={state.currentUser.profilePictures[0] ? `http://localhost:3001/${state.currentUser.profilePictures[0]}` : 'http://localhost:3001/uploads/placeholder.jpg'}
                                roundedCircle className="feed-post-profile-picture" />
                            <span className="feed-post-text-owner" onClick={goToOwner}>{post.owner.firstName}</span>
                            {' '}
                            <span className="feed-post-owner-comment"> {post.text} </span> <br />
                            <div className="feed-post-owner-comment-div">
                                <Moment fromNow>{post.timeStamp}</Moment>
                                <Reportflag props={props} post={post} type={"feedpost"} />
                            </div>
                        </Card.Body>
                        <div className="feed-comments-all-comments">
                            {
                                post.comments.map(comment => <Comment props={props} key={comment._id} comment={comment} history={props.history} />)
                            }
                        </div>
                    </Card>
            }
            <div className="new-comment-fixed-bottom">
                <InputGroup className="mb-3">
                    <FormControl ref={newComment} aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                    <InputGroup.Prepend>
                        <Button onClick={sendComment}>Skicka</Button>
                    </InputGroup.Prepend>
                </InputGroup>
            </div>

        </div>
    )
}
