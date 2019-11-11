import React, { useState, useRef, useContext } from 'react'
import useLifeCycle from '../utilities/useLifeCycle'
import { Card, Image, InputGroup, FormControl, Button } from 'react-bootstrap'
import { Store } from '../utilities/Store'
import '../css/FeedComment.css'
import Moment from 'react-moment'
import 'moment/locale/sv'


export default function FeedComments(statee, props) {
    const { state } = useContext(Store);
    const [post, setPost] = useState();
    const [loading, setLoading] = useState(true)
    const newComment = useRef();
    useLifeCycle({
        mount: () => {
            getPost();
        }
    })

    async function sendComment(){
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
            console.log("allt ok");
        } else {
            console.log("something went wrong");
        }
    }

    function goToOwner() {
        props.history.push('/profile/' + props.post.owner._id)
    }

    async function getPost() {
        let result = await fetch(`/api${statee.location.pathname}`);
        result = await result.json();
        setPost(result);
        setLoading(false)
        console.log(result);

    }
    return (
        <div className="feed-post-one-post">
            {
                loading ? <p>loading</p> :

                    <Card className="feed-post-card">
                        <Card.Header className="feed-comment-header">
                            <i className="fas fa-chevron-left feed-comment-arrow-left"></i>
                            Kommentarer
                <i className="fas fa-ellipsis-h"></i>
                        </Card.Header>
                        <Card.Body>
                            <Image onClick={goToOwner} src="data:image/jpeg;base64,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"
                                roundedCircle className="feed-post-profile-picture" />
                            <span className="feed-post-text-owner" onClick={goToOwner}>{post.owner.firstName}</span>
                            <span className="feed-post-owner-comment"> {post.text} </span> <br />
                            <Moment fromNow>{post.timeStamp}</Moment>
                        </Card.Body>
                        <Card.Footer>
                            <InputGroup size="sm" className="mb-3">
                                <FormControl ref={newComment} aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                                <InputGroup.Prepend>
                                    <Button onClick={sendComment}>Skicka</Button>
                                </InputGroup.Prepend>
                            </InputGroup>
                        </Card.Footer>

                    </Card>
            }
        </div>
    )
}
