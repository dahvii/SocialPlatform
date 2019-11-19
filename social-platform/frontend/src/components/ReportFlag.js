import React, { useRef, useState } from 'react'
export default function ReportFlag(props) {
    console.log(props);
    
    const swhitch = async () =>{
        if (props.type === "forumpost") {
            console.log('forum');
           await reportForumPost();            
        }else if(props.type === "comment"){
            console.log('comment');
            await reportForumComment();
        }else if(props.type === "feedpost") {
            console.log('feedpost');
            await reportFeedPostComment();
        }else if(props.type === 'User'){
            console.log('user');
            await reportUser();
        }else{
            console.log('Kunde ej rappotera deta');
        }
    }

    const flagat = () =>{
        let data = {
            id: props.post._id
        }
        return data;
    }

    const reportForumPost = async () => {
       
        let newreport = await fetch(`/api/addForumPostToReportedList/${props.post._id}`, {
            method: "PUT",
            body: JSON.stringify(flagat),
            headers: { "Content-Type": "application/json" }
        })
        let result = await newreport.json();
    }

    const reportForumComment = async () => {
        let newreport = await fetch(`/api/addCommentToReportedList/${props.post._id}`, {
            method: "PUT",
            body: JSON.stringify(flagat),
            headers: { "Content-Type": "application/json" }
        })
        let result = await newreport.json();
    }

    const reportFeedPostComment = async () => {
        let newreport = await fetch(`/api/addFeedPostToReportedList/${props.post._id}`, {
            method: "PUT",
            body: JSON.stringify(flagat),
            headers: { "Content-Type": "application/json" }
        })
        let result = await newreport.json();
    }
    
    const reportUser = async () => {
        console.log(props.post.id);
        let newreport = await fetch(`/api/addUserToReportedList/${props.post.id}`, {
            method: "PUT",
            body: JSON.stringify(flagat),
            headers: { "Content-Type": "application/json" }
        })
        let result = await newreport.json();
    }
    return (
            <span onClick={swhitch}>
                <i className="fas fa-flag"></i>
            </span>
    )
}
