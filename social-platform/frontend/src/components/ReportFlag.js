import React, { useState } from 'react'


export default function ReportFlag(props) {
    const [isReported, setIsReported] = useState(false);
    
    const swhitch = async () =>{
        setIsReported(true);
        if (props.type === "forumpost") {
           await reportForumPost();            
        }else if(props.type === "comment"){
            await reportForumComment();
        }else if(props.type === "feedpost") {
            await reportFeedPostComment();
        }else if(props.type === 'User'){
            await reportUser();
        }
    }

    const flagat = () =>{
        let data = {
            id: props.post._id
        }
        return data;
    }

    const reportForumPost = async () => {
       
       await fetch(`/api/addForumPostToReportedList/${props.post._id}`, {
            method: "PUT",
            body: JSON.stringify(flagat),
            headers: { "Content-Type": "application/json" }
        })        
    }

    const reportForumComment = async () => {
        await fetch(`/api/addCommentToReportedList/${props.post._id}`, {
            method: "PUT",
            body: JSON.stringify(flagat),
            headers: { "Content-Type": "application/json" }
        })
    }

    const reportFeedPostComment = async () => {
        await fetch(`/api/addFeedPostToReportedList/${props.post._id}`, {
            method: "PUT",
            body: JSON.stringify(flagat),
            headers: { "Content-Type": "application/json" }
        })
    }
    
    const reportUser = async () => {
        await fetch(`/api/addUserToReportedList/${props.post.id}`, {
            method: "PUT",
            body: JSON.stringify(flagat),
            headers: { "Content-Type": "application/json" }
        })
    }
    return (
            <span onClick={swhitch}>
                {isReported &&
                <i className="fas fa-flag"></i>                
                }
                {!isReported &&
                <i className="far fa-flag"></i>
                }
            </span>
    )
}
