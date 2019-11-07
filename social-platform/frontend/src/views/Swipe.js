import React, { useState } from 'react'
import SwipePreview from '../components/SwipePreview';
import LikeRejectBtn from '../components/LikeRejectBtn.js';
import { Store } from '../utilities/Store'
import Profile from './Profile';
import useLifeCycle from '../utilities/useLifeCycle';

export default function Swipe() {
    const { state } = React.useContext(Store);
    const [showDetails, setShowDetails] = useState(false);
    const [people, setPeople] = useState([]);
    const [endOfSwipe, setEndOfSwipe] = useState(false);
    const [displayedPersonindex, setDisplayedPersonindex] = useState(0);
    const [currUserId]  = useState(state.currentUser.id);

    useLifeCycle({
        mount: () => {
            getUsers();
        }
    })

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

    const btnCallback = () => {
        nextPerson();   
    }

    return (
        <div>
            {!endOfSwipe &&
                <div>
                    {!showDetails &&
                        <SwipePreview displayedPerson={people[displayedPersonindex]} changeView={changeView} ></SwipePreview>
                    }

                    {showDetails &&
                        <Profile displayedPerson={people[displayedPersonindex]} changeView={changeView}></Profile>
                    }
                
                    <LikeRejectBtn callback = {btnCallback} displayedPerson = {people[displayedPersonindex]}></LikeRejectBtn>
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
