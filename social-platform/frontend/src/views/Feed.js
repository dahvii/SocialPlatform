import React from 'react'
import { Button } from 'react-bootstrap'
import '../css/Feed.css'

export default function Feed(props) {

    function addPost() {
        props.history.push('/new-feed-post')
    }

    return (
        <div>
            <p>Feed view</p>
            <Button className="add-feed-button" variant="light" onClick={addPost}>
                <i className="fas fa-plus plus-icon"></i>
            </Button>
        </div>
    )
}
