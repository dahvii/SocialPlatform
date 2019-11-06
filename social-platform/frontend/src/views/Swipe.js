import React, { useState, useEffect } from 'react'
import SwipeDetails from '../components/SwipeDetails';
import SwipePreview from '../components/SwipePreview';
import Carousel from '../components/Carousel';
import { Button } from 'reactstrap';
import { Store } from '../utilities/Store'

export default function Swipe() {
    const { state } = React.useContext(Store);
    const [showDetails, setShowDetails] = useState(false);
    const [people, setPeople] = useState([]);
    const [endOfSwipe, setEndOfSwipe] = useState(false);
    const [displayedPersonindex, setDisplayedPersonindex] = useState(0);
    const [currUserId]  = useState(state.currentUser.id);
    const [currUser]  = useState(state.currentUser);


    useEffect(() => {   
        getUsers();
    },[]);

    async function getPopulatedUser(){
        let response = await fetch('/api/populated/'+currUserId);
        let data = await response.json();
        console.log("populated ", data);

    }
    //later to be an algorithm to find suitable matches 
    //but for now read on all users 
    async function getUsers() {
        let response = await fetch('/api/users');
        let data = await response.json();
        //console.log("data ", data);
        filterThePeople(data);
    }
    
    function filterThePeople(data){    
        //take away currrUser from the list                
        let newArray = data.filter(function(item) {            
            return item._id !== currUserId;
        });
        //take away people you already liked
        let test = newArray.map(function (person) {
            //for(like of curr)

        }) 
        //take away people you already rejected 
    
        setPeople(newArray);
        if (newArray.length === 0) {
            setEndOfSwipe(true);
        }        
    }

    function changeView() {
        let change = showDetails ? false : true;
        setShowDetails(change);
    }

    async function likeOrReject(opinion) {        
        let data = {
            judgedPerson: people[displayedPersonindex]._id
        }            
        await fetch('/api/'+opinion+'/'+currUserId, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json'}
        })        
        //check for match!
        if(opinion === "like"){
            checkForMatch(people[displayedPersonindex]);
        }
        nextPerson();
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

    function nextPerson() {
        let newIndex = displayedPersonindex + 1;
        if (newIndex >= people.length) {
            //if array ended - show a endofSwipe-promt or something
            setEndOfSwipe(true);
        } else {
            //take next person in array and show their profile
            setDisplayedPersonindex(newIndex);
        }
    }



    return (
        <div>
            {!endOfSwipe &&
                <div>
                    <Carousel></Carousel>

                    <div onClick={changeView}>
                        {!showDetails &&
                            <SwipePreview user={people[displayedPersonindex]} ></SwipePreview>
                        }

                        {showDetails &&
                            <SwipeDetails user={people[displayedPersonindex]} ></SwipeDetails>
                        }
                    </div>

                    <div>
                        <Button onClick={()=>likeOrReject("like")} ><span role="img" aria-label="like">❤️</span></Button>
                        <Button onClick={()=>likeOrReject("reject")} ><span role="img" aria-label="reject">👎</span></Button>
                    </div>
                </div>
            }

            {endOfSwipe &&
                <div>
                    <p>No more people to show</p>
                </div>
            }

        </div>
    )

}
