
import React, { useRef, useState } from 'react'
export default function ReportFlag(props) {
    const swhitch = async () =>{
        if (props.type === "forumpost") {
           await report();            
        }else{
            console.log('Kunde ej rappotera deta');
        }
    }

    const report = async () => {
        let data = {
            id: props.post._id
        }
        let newreport = await fetch(`/api/addForumPostToReportedList/${props.post._id}`, {
            method: "PUT",
            body: JSON.stringify(data),
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
