import React, { Component } from 'react'
import SwipeDetails from '../components/SwipeDetails';
import SwipePreview from '../components/SwipePreview';
import Carousel from '../components/Carousel';
import { Button } from 'reactstrap';




export default class Swipe extends Component {
    constructor(props) {
        super(props);
        this.state = { showDetails: false, people: [], endOfSwipe: false};
        //run function for finding people
        this.getUsers();
    }

    //later to be an algorithm to find suitable matches 
    //but for now read on all users 
    async getUsers(){
        let response = await fetch('/api/users');
        let data = await response.json();
        this.setState({people: data, displayedPersonindex: 0})
        if(data.length === 0){
            this.setState({endOfSwipe: true})
        }
    }

    changeView(){
        let change = this.state.showDetails ? false : true;
        this.setState({showDetails: change })
    }

    async like(){
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

        this.nextPerson();
    }

    reject(){
        console.log("reject");
        this.nextPerson();
    }

    nextPerson(){
        console.log("nextperson ");
        let newIndex = this.state.displayedPersonindex +1;
        console.log("new Index ", newIndex);
        console.log("lenght of people array ", this.state.people.length);
        
        if (newIndex >= this.state.people.length){
            //if array ended - show a endofSwipe-promt or something
            this.setState({endOfSwipe: true})
            console.log("if");
        }else{
            //take next person in array and show their profile
            this.setState({displayedPersonindex: newIndex});
            console.log("else");
        }
    }

    render(){
        console.log("swipe state displayed person index ", this.state.displayedPersonindex);
        
        return (
            <div>
                {!this.state.endOfSwipe &&
                <div>
                    <Carousel></Carousel>

                    <div onClick= {() => this.changeView()}>
                        {!this.state.showDetails && 
                            <SwipePreview user = {this.state.people[this.state.displayedPersonindex]} ></SwipePreview>
                        }
                            
                        {this.state.showDetails && 
                            <SwipeDetails user = {this.state.people[this.state.displayedPersonindex]} ></SwipeDetails>
                        }
                    </div>

                    <div>
                        <Button onClick={() => this.like()} ><span role="img" aria-label="like">❤️</span></Button>
                        <Button onClick={() => this.reject()} ><span role="img" aria-label="reject">👎</span></Button>
                    </div>
                </div>
                }

                {this.state.endOfSwipe &&
                <div>
                    <p>No more people to show</p>
                </div>
                }


            </div>
        )
    }
}
