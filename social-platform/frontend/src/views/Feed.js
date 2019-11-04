import React from 'react'
import {Store } from '../utilities/Store'
import {Button} from 'react-bootstrap'
import '../css/Feed.css'

export default function Feed(props) {
    const { state } = React.useContext(Store);

    function addPost(){
        props.history.push('/new-feed-post')
    }

    console.log("från feed: " ,state.currentUser)
    return (
        <div>
            <p>Feed view</p>
           
            <Button className="add-feed-button" variant="light" onClick={addPost}>
            <i className="fas fa-plus plus-icon"></i>
            </Button>
        </div>
    )
}
