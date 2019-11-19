import React from 'react'
import { Card, Image } from 'react-bootstrap'
import Moment from 'react-moment'
import 'moment/locale/sv'
import Reportflag from '../components/ReportFlag';
export default function Comment(recievedProps) { 
    function goToOwner() {
        recievedProps.history.push('/profile/' + recievedProps.comment.writtenBy._id)
    }
    return (
        <div>
            <Card.Footer className="comment-one-comment">
                <span className="comment-comment-owner">
                        <Image onClick={goToOwner} src={recievedProps.comment.writtenBy.profilePictures[0] ? `http://localhost:3001/${recievedProps.comment.writtenBy.profilePictures[0]}` : 'http://localhost:3001/uploads/placeholder.jpg'}
                            roundedCircle className="feed-post-profile-picture" />
                        <span className="feed-post-text-owner" onClick={goToOwner}>{recievedProps.comment.writtenBy.firstName}</span>
                    <p>&nbsp;</p>
                    <Reportflag props={recievedProps.props} post={recievedProps.comment} type={"comment"}/>
                    <p>&nbsp;</p>
                    <p className="comment-text-comment">
                        {recievedProps.comment.text}
                    </p>
                </span>
                <p className="comment-time-stamp"><Moment fromNow>{recievedProps.comment.timeStamp}</Moment></p>
            </Card.Footer>
        </div>
    )
}
