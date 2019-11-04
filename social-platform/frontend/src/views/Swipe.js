import React, { Component } from 'react'
import SwipeDetails from '../components/SwipeDetails';
import SwipePreview from '../components/SwipePreview';



export default class Swipe extends Component {
    constructor(props) {
        super(props);
        this.state = { showDetails: false, people: []};
        //run function for finding people
        this.getUsers();
    }

    //later to be an algorithm to find suitable matches 
    //but for now read on all users 
    async getUsers(){
        let response = await fetch('/api/users');
        let data = await response.json();
        this.setState({people: data})
    }

    changeView(){
        console.log(this.state);
        let change = this.state.showDetails ? false : true;
        this.setState({showDetails: change })
    }

    render(){
        return (
            <div>
                <div onClick= {() => this.changeView()}>
                    {!this.state.showDetails && 
                        <SwipePreview user = {this.state.people[0]} ></SwipePreview>
                    }
                        
                    {this.state.showDetails &&
                        <SwipeDetails user = {this.state.people[0]} ></SwipeDetails>
                    }
                </div>

                <div>
                    <div >NOPE</div>
                    <div>LIKE</div>
                </div>
            </div>
        )
    }
}
