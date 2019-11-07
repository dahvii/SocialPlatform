import React, { useState } from 'react'
import { Store } from '../utilities/Store';
import '../css/LikeRejectBtn.css'


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
        <div className="btn-group">
            <div className="like-reject-btn" onClick={()=>likeOrReject("like")} ><img src = "https://cdn.shopify.com/s/files/1/1061/1924/products/Heart_Eyes_Emoji_2_large.png?v=1571606090" alt="like"></img> </div>
            <div className="like-reject-btn" onClick={()=>likeOrReject("reject")} ><img src = "https://cdn.shopify.com/s/files/1/1061/1924/products/Dizzy_Emoji_Icon_ac9b8e32-707e-4cae-9ea7-5ad1c136e2d9_large.png?v=1571606089"alt="reject"></img> </div>
        </div>
    )

}
