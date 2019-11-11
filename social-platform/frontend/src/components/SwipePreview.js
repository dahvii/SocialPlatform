import React, { useState, useEffect } from 'react'
import { Carousel } from 'react-bootstrap'
import imageLoader from '../utilities/ImageHandler';
import useLifeCycle from '../utilities/useLifeCycle';
import '../css/SwipePreview.css';

export default function Profile(props) {
    const [images, setImages] = useState([]);
    const [shortBio, setShortBio] = useState("");

    useEffect(() => {
        if(props.displayedPerson && props.displayedPerson.bio && props.displayedPerson.bio.length > 40){
            setShortBio(props.displayedPerson.bio.substring(0, 40)+'...');
        }
        //console.log("preview props", props);
    },[props])

    useLifeCycle({
        mount: () => {
            const images = imageLoader();
            setImages(images)    
        }
    })

    const profilePictures = images.map(image => (
        <Carousel.Item key={image.id}>
            <img
                className="d-block carousel-img"
                src={image.src}
                alt="First slider"
            />
        </Carousel.Item>
    ))

    return (
        <div>
            {props.displayedPerson && 
            <div className="preview-info" onClick={props.changeView}>
                <div className="name-age">
                    <h3>{props.displayedPerson.firstName}&nbsp;-</h3 >&nbsp;<h3>25</h3>
                </div>
                <div className="bio"><p>{shortBio}</p></div>
            </div>}
            <Carousel interval={null} fade={true}>
                {profilePictures}
            </Carousel>
        </div>
    )
}

