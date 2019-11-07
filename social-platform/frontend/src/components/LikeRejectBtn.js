import React, { useState } from 'react'
import { Button } from 'reactstrap';
import { Store } from '../utilities/Store'

export default function LikeRejectBtn(props) {
    const { state } = React.useContext(Store);
    const [currUserId]  = useState(state.currentUser.id);

    async function likeOrReject(opinion) {        
        let data = {
            judgedPerson: props.displayedPerson._id
        }            
        await fetch('/api/'+opinion+'/'+currUserId, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json'}
        })        
        //check for match!
        if(opinion === "like"){
            checkForMatch(props.displayedPerson);
        }
        props.callback();
    }

    async function checkForMatch(likedPerson){
       if(likedPerson.likes.includes(currUserId)){
            console.log("ITS A MATCH"); 

            let data = {
                match: likedPerson._id,
                currUser: currUserId
            }            
            await fetch('/api/match', {
                method: "PUT",
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json'}
            })             
        }
    }

    return (
        <div>
            <div>
                <Button onClick={()=>likeOrReject("like")} ><span role="img" aria-label="like">❤️</span></Button>
                <Button onClick={()=>likeOrReject("reject")} ><span role="img" aria-label="reject">👎</span></Button>
            </div>
        </div>
    )

}
