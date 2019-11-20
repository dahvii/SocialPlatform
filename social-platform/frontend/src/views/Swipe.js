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
    const [amountOfSwipes, setAmountOfSwipes] = useState(0)
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
        // console.log("swipe getTopTen ", data);
        setPeople(data);         
        setDisplayedPersonindex(0);
        if (data.length === 0) {
            setEndOfSwipe(true);
        }        
    }

    function changeView() {
        setShowDetails(!showDetails);
    }

    function nextPerson() {
        let newIndex = displayedPersonindex + 1;
        if (newIndex >= people.length) {
            //if array ended - fetch more 10 more users
            getTopTen();
            setSwipecounter();
        } else {
            //take next person in array and show their profile
            setDisplayedPersonindex(newIndex);
            setShowDetails(false);
            setSwipecounter();
        }
    }

    function setSwipecounter(){
        if(amountOfSwipes > 9){
            dispatch({
                type: "SHOW_QUESTION",
                payload: true
            })
            setAmountOfSwipes(0)
        } else{
            let newNumber= amountOfSwipes+1;
            setAmountOfSwipes(newNumber)
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
