import React, {useState} from 'react'
import { Button, Image } from 'react-bootstrap'
import '../css/Feed.css'

export default function Feed(props) {
    const [displayImage, setDisplayImage] = useState();

    function addPost() {
        props.history.push('/new-feed-post')
    }

    async function test() {
        fetch('/api/image/hej')
            .then(response => response.blob())
            .then(images => {
                // Then create a local URL for that image and print it 
                setDisplayImage(URL.createObjectURL(images))
            })

    }

    return (
        <div>
            <p>Feed view</p>
            <Button onClick={test}>test</Button>
            <Image src={displayImage}></Image>
            <Button className="add-feed-button" variant="light" onClick={addPost}>
                <i className="fas fa-plus plus-icon"></i>
            </Button>
        </div>
    )
}
