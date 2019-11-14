import React from 'react';
import Card from 'react-bootstrap/Card';
import '../css/ForumPost.css'
import Moment from 'react-moment'
import 'moment/locale/sv'

export default function FormPost(props) {
  let stop;

  function goToOwner() {
    stop = true;
    props.history.push('/profile/' + props.post.owner._id);
  }
  
  function goToPost() {
    if (!stop) {
      props.history.push('/onepost/' + props.post._id);
    }
  }

  return (
    <Card className="forum-postcard">
      <span className="forumLink" onClick={goToPost} >
        <Card.Body className="forum-cardbody">
          <Card.Text className="forum-post-time forum-text forum-text-top">
            <Moment fromNow>{props.post.timeStamp}</Moment>
            <span className="postCreater" onClick={goToOwner}>
              {!props.post.isAnonym ? ' ' + props.post.owner.firstName : ''}
            </span>
          </Card.Text>
          <Card.Text className="forum-text">{props.post.text}</Card.Text>
          <Card.Text className="forum-text forum-text-bot">{props.post.image == null ? '' : <i className="far fa-image"></i>} <i className="far fa-comments forum-text"></i> {props.post.comments.length}</Card.Text>
        </Card.Body>
      </span>
    </Card>
  )
}
