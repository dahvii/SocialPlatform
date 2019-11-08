import React, { useState, useEffect } from 'react'
import { Carousel } from 'react-bootstrap'
import { Store } from '../utilities/Store'
import imageLoader from '../utilities/ImageHandler';
import useLifeCycle from '../utilities/useLifeCycle';
import '../css/Profile.css'

export default function Profile(props) {
    const { state} = React.useContext(Store);
    const [images, setImages] = useState([])
    const [profile, setProfile] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if(props.displayedPerson){
            setProfile(props.displayedPerson)
        }else{
            getProfile()
        } 
    }, [props.displayedPerson]);

    useLifeCycle({
        mount: () => {
            const images = imageLoader();
            setImages(images)
        }
    })

    const getProfile = async () => {
        let result = await (await fetch("/api/person/" + props.match.params.id)).json();
        setProfile(result)
        setLoading(false)
    }

    const profilePictures = images.map(image => (
        <Carousel.Item key={image.id}>
            <img
                className="d-block w-100"
                src={image.src}
                alt="First slider"
            />
        </Carousel.Item>
    ))

    return (
        <div>
            <Carousel interval={null} fade={true}>
                {profilePictures}
            </Carousel>

            {props.displayedPerson && 
            <div className="profile-down-btn" onClick={props.changeView}><i className="fas fa-angle-double-down"></i></div> 
            }
            <div className="profile-info">
                <div className="name-age">
                    <h3>{profile.firstName}&nbsp;-</h3 >&nbsp;<h3>25</h3>
                </div>
                <div className="town-location">
                    <div className="hometown">
                        <i className="fas fa-home"></i>
                        <p>Malmö</p>
                    </div>
                    <div className="location">
                        <i className="fas fa-map-marker-alt"></i>
                        <p>5 km</p>
                    </div>
                    <hr />
                    <div className="bio"><p>{profile.bio}</p></div>
                </div>
            </div>
        </div>
    )
}
