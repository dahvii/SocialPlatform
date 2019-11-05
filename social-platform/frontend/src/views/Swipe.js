import React, { useState, useEffect } from 'react'
import SwipeDetails from '../components/SwipeDetails';
import SwipePreview from '../components/SwipePreview';
import Carousel from '../components/Carousel';
import { Button } from 'reactstrap';
import { Store } from '../utilities/Store'

export default function Swipe() {
    const { state } = React.useContext(Store);
    const [showDetails, setShowDetails] = useState(false);
    const [people, setPeople] = useState(getUsers());
    const [endOfSwipe, setEndOfSwipe] = useState(false);
    const [displayedPersonindex, setDisplayedPersonindex] = useState(0);
    const [currUserId]  = useState(state.currentUser.id);

    console.log(people);

    useEffect(() => {
        console.log('id', currUserId);
        
        
        //getUsers();
    })

    //make sure to read in initial people 

    //later to be an algorithm to find suitable matches 
    //but for now read on all users 
    async function getUsers() {
        console.log("getUsers()");
        
        let response = await fetch('/api/users');
        let data = await response.json();
        //this.setState({ people: data, displayedPersonindex: 0 })
        setPeople(data);
        if (data.length === 0) {
            //this.setState({ endOfSwipe: true })
            setEndOfSwipe(true);
        }
    }

    function changeView() {
        let change = showDetails ? false : true;
        //this.setState({ showDetails: change })
        setShowDetails(change);
    }

    async function like() {
        console.log("like");
        /*
                //nedan skissat för nu, inväntar merge och refactorering från johan 
                let data = {
                    likedUser: "currViewedPerson"
                }    
        
                let test = await fetch('/api/like/'+"currUserID", {
                    method: "PUT",
                    body: JSON.stringify(data),
                    headers: { 'Content-Type': 'application/json'}
                })
        
                let result = await test.json();
                console.log(result)
        */

        nextPerson();
    }

    function reject() {
        console.log("reject");
        nextPerson();
    }

    function nextPerson() {
        console.log("nextperson ");
        //let newIndex = this.state.displayedPersonindex + 1;
        let newIndex = displayedPersonindex + 1;
        console.log("new Index ", newIndex);
        console.log("lenght of people array ", people.length);

        if (newIndex >= people.length) {
            //if array ended - show a endofSwipe-promt or something
            //this.setState({ endOfSwipe: true })
            setEndOfSwipe(true);
            console.log("if");
        } else {
            //take next person in array and show their profile
            //this.setState({ displayedPersonindex: newIndex });
            setDisplayedPersonindex(newIndex);
            console.log("else");
        }
    }



    return (
        <div>
            {endOfSwipe &&
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
                        <Button onClick={like} ><span role="img" aria-label="like">❤️</span></Button>
                        <Button onClick={reject} ><span role="img" aria-label="reject">👎</span></Button>
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
