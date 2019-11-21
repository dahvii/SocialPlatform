import React, { useState, useEffect } from 'react'
import { Carousel } from 'react-bootstrap'
import '../css/SwipePreview.css';
import calcAge from '../utilities/CalcAge';

export default function Profile(props) {
    const [shortBio, setShortBio] = useState("");

    useEffect(() => {
        if (props.displayedPerson && props.displayedPerson.bio && props.displayedPerson.bio.length > 40) {
            setShortBio(props.displayedPerson.bio.substring(0, 40) + '...');
        }
    }, [props])

    let showProfilePictures;

    if (props.displayedPerson) {
        showProfilePictures = props.displayedPerson.profilePictures.map(image => (
            <Carousel.Item key={image}>
                <img
                    className="d-block w-100"
                    src={`http://localhost:3001/${image}`}
                    alt="First slider"
                    />
            </Carousel.Item>
        ))
    }

    return (
        <div>
            <div className="content">
                {props.displayedPerson &&
                    <div className="preview-info" onClick={props.changeView}>
                        <div className="name-age">
                <h3>{props.displayedPerson.firstName}&nbsp;-&nbsp;{calcAge(props.displayedPerson.dateOfBirth)}</h3>
                        </div>
                        <div className="bio"><p>{shortBio}</p></div>
                    </div>}
                <Carousel interval={null} fade={true}>
                    {props.displayedPerson ?
                        props.displayedPerson.profilePictures.length > 0 ?
                            showProfilePictures
                            :
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={'http://localhost:3001/uploads/placeholder.jpg'}
                                    alt="First slider"
                                />
                            </Carousel.Item>
                        : ''}
                </Carousel>
            </div>
        </div>
    )
}

