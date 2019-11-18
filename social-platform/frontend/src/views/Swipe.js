import React, { useState } from 'react'
import SwipePreview from '../components/SwipePreview';
import SwipeQuestion from '../components/SwipeQuestion'
import LikeRejectBtn from '../components/LikeRejectBtn.js';
import { Store } from '../utilities/Store'
import Profile from './Profile';
import useLifeCycle from '../utilities/useLifeCycle';
import { Image, Button } from 'react-bootstrap'


export default function Swipe() {
    const { state, dispatch } = React.useContext(Store);
    const [showDetails, setShowDetails] = useState(false);
    const [people, setPeople] = useState([]);
    const [endOfSwipe, setEndOfSwipe] = useState(false);
    const [displayedPersonindex, setDisplayedPersonindex] = useState(0);
    const [currUserId]  = useState(state.currentUser.id);

    useLifeCycle({
        mount: () => {
            getTopTen();
        }
    })

    async function getTopTen() {
        let response = await fetch('/api/searchAlgorithm/'+currUserId);
        let data = await response.json();
        console.log("data ", data);
        setPeople(data);
        if (data.length === 0) {
            setEndOfSwipe(true);
        }        
    }

    function changeView() {
        setShowDetails(!showDetails);
    }

    function changeValue(){
        dispatch({
            type: "SHOW_QUESTION",
            payload: true
        })
    }

    function nextPerson() {
        let newIndex = displayedPersonindex + 1;
        if (newIndex >= people.length) {
            //if array ended - show a endofSwipe-promt or something
            setEndOfSwipe(true);
        } else {
            //take next person in array and show their profile
            setDisplayedPersonindex(newIndex);
            setShowDetails(false);
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
            <Button onClick={changeValue}>meeeeeeh</Button>
            <SwipeQuestion/>

            {endOfSwipe &&
                <div>
                    <div className="profile-picture-container">
                    <Image src={state.currentUser.profilePictures[0] ? `http://localhost:3001/${state.currentUser.profilePictures[0]}` : 'http://localhost:3001/uploads/placeholder.jpg'} alt="profile-picture" roundedCircle className="profile-picture" />
                    </div>
                    <p>There is no more people to show for you right now</p>
                </div>
            }

        </div>
    )

}
