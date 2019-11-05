import React, { Component } from 'react';

export default class SwipePreview extends Component {

    render(){
       // console.log("swipepreview props.user ",this.props.user);
        
        return (
            <div> 
                <div>{this.props.user ? this.props.user.firstName: "" }</div>
                <div>Stad</div>
                <div>icon X km bort</div>
                <div>kort bio första meningarna lixxx</div>
            </div>
        )
    }
}
