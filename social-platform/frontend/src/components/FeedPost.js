import React, { useState } from 'react'
import { Card, Image } from 'react-bootstrap'
import { withRouter } from 'react-router-dom';
import { Store } from '../utilities/Store'
import useLifeCycle from '../utilities/useLifeCycle'
import Reportflag from '../components/ReportFlag';
function FeedPost(props) {
    const { state } = React.useContext(Store);
    const [likes, setLikes] = useState(props.post.likes.length)
    const [comments] = useState(props.post.comments.length)
    const [isLiked, setIsLiked] = useState()
    const [isCommented, setIsCommented] = useState();
    function goToOwner() {
        props.history.push('/profile/' + props.post.owner._id)
    }
    function goToComments() {
        props.history.push('/feed-post/' + props.post._id, {recievedPost : props.post}, {history: props.history})
    }

    useLifeCycle({
        mount: () => {
            if (props.post.likes.length > 0) {
                if (props.post.likes.map(like => like._id === state.currentUser.id).includes(true)) {
                    setIsLiked(true)
                } else {
                    setIsLiked(false)
                }
            } else {
                setIsLiked(false)
            }
            if(props.post.comments.length > 0) {
                if (props.post.comments.map(comment => comment.writtenBy === state.currentUser.id).includes(true)) {
                    setIsCommented(true)
                } else {
                    setIsCommented(false)
                }
            }
        }
    })

    async function likePost() {
        let data = {
            id: state.currentUser.id
        }
        if (!isLiked) {
            let newLike = await fetch(`/api/feed-post/like/${props.post._id}`, {
                method: "PUT",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" }
            })
            let result = await newLike.json();
            if (result.success === "success") {
                setLikes(likes + 1)
                setIsLiked(true)
            }
        } else if(isLiked) {
            let newDislike = await fetch(`/api/feed-post/dislike/${props.post._id}`, {
                method: "PUT",
                body: JSON.stringify(data),
                headers: {"Content-type": "application/json"}
            })
            let result = await newDislike.json();
            if (result.success === "success") {
                setLikes(likes - 1)
                setIsLiked(false)
            }
        }
    }
    return (
        <div className="feed-post-one-post">
            <Card className="feed-post-card">
                <Card.Text className="feed-post-text">
                    <Image onClick={goToOwner} src={props.post.owner.profilePictures[0] ? `http://localhost:3001/${props.post.owner.profilePictures[0]}` : 'http://localhost:3001/uploads/placeholder.jpg'}
                        roundedCircle className="feed-post-profile-picture" />
                    <span className="feed-post-text-owner" onClick={goToOwner}>{props.post.owner.firstName}</span>
                    <i className="fas fa-ellipsis-h feed-post-three-dots"></i>
                </Card.Text>
                <Card.Img variant="top" src={`http://localhost:3001/` + props.post.feedImage} className="feed-post-image" />
                <Card.Text className="feed-post-comment-heart">
                    {
                        isLiked ? <i className="fas fa-heart feed-post-heart feed-post-heart-red" onClick={likePost}></i> :
                            <i className="far fa-heart feed-post-heart" onClick={likePost}></i>
                    }
                    {
                        isCommented ? <i className="fas fa-comment feed-post-comment feed-post-comment-green" onClick={goToComments}></i> : 
                    <i className="far fa-comment feed-post-comment" onClick={goToComments}></i>
                    }
                    {' '}
                    <Reportflag props={props} post={props.post} type={"feedpost"}/>
                </Card.Text>
                <Card.Text className="feed-post-amout-likes">
                    
                    <span>{likes}{
                        likes > 1 ? " Gilla-markeringar" : " Gilla-markering"
                    } </span>
                </Card.Text>
                <Card.Body className="feed-post-card-body">
                    <Card.Text className="feed-post-text feed-post-text-content">
                        {props.post.text}
                    </Card.Text>
                    <Card.Text onClick={goToComments} className="feed-post-text feed-post-text-comments">
                        Visa alla {comments} kommentarer
                    </Card.Text>
                </Card.Body>

            </Card>
        </div>
    )
}

export default withRouter(FeedPost);