import React, { Component } from 'react';
import Carousel from './Carousel';

export default class SwipePreview extends Component {

    render(){
        console.log(this.props.user);
        
        return (
            <div> 
                <Carousel></Carousel>
                <div>{this.props.user ? this.props.user.firstName: "" }</div>
                <div>Stad</div>
                <div>icon X km bort</div>
                <div>kort bio första meningarna lixxx</div>
            </div>
        )
    }
}
