import React, { Component } from 'react'
import SwipeDetails from '../components/SwipeDetails';
import SwipePreview from '../components/SwipePreview';



export default class Swipe extends Component {
    constructor(props) {
        super(props);
        this.state = { showDetails: false};
    }

    changeView(){
        let change = this.state.showDetails ? false : true;
        this.setState({showDetails: change })
    }

    render(){
        return (
            <div>
                <div onClick= {() => this.changeView()}>
                    {!this.state.showDetails && 
                        <SwipePreview ></SwipePreview>
                    }
                        
                    {this.state.showDetails &&
                        <SwipeDetails></SwipeDetails>
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
