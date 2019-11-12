import React, { useState } from 'react'
import { Store } from '../utilities/Store';
import '../css/LikeRejectBtn.css';
import TRIModal from './TRIModal';

export default function LikeRejectBtn(props) {
    const { state, dispatch } = React.useContext(Store);
    const [currUserId]  = useState(state.currentUser.id);
    const [showModal, setShowModal]  = useState(false);
    
    async function likeOrReject(opinion) {            
        let data = {
            judgedPerson: props.displayedPerson.id
        }            
        await fetch('/api/'+opinion+'/'+currUserId, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json'}
        })     
        
        
        //check for match!
        if(opinion === "like"){
            await checkForMatch(props.displayedPerson);
        }
        updateStateWithNewProfile();
        console.log("showModal ",showModal);

        //props.callback();
    }

    async function checkForMatch(likedPerson){     
       if( likedPerson.likes && likedPerson.likes.includes(currUserId)){      
           console.log("they match");
                
            setShowModal(true);            
            let data = {
                match: likedPerson.id,
                currUser: currUserId
            }            
            await fetch('/api/match', {
                method: "PUT",
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json'}
            });
            console.log("showModal ",showModal);
                        
        }
    }

    const updateStateWithNewProfile = async () => {        
        let data = await fetch('/api/currentuser/' + currUserId)
        data = await data.json()
        dispatch({
            type: 'SET_CURRENT_USER',
            payload: data
        })
    } 

    const closeMatchModal = () => {
        console.log("closeMatchModal");
        
        setShowModal(false);
    }

    return (
        <div className="btn-group">
            <div className="like-reject-btn" onClick={()=>likeOrReject("like")} ><img src = "https://cdn.shopify.com/s/files/1/1061/1924/products/Heart_Eyes_Emoji_2_large.png?v=1571606090" alt="like"></img> </div>
            <div className="like-reject-btn" onClick={()=>likeOrReject("reject")} ><img src = "https://cdn.shopify.com/s/files/1/1061/1924/products/Dizzy_Emoji_Icon_ac9b8e32-707e-4cae-9ea7-5ad1c136e2d9_large.png?v=1571606089"alt="reject"></img> </div>
            <TRIModal match={props.displayedPerson} show= {showModal} callback= {closeMatchModal}></TRIModal>
        </div>
    )

}
