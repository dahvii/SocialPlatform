import React, { useState, useEffect } from 'react'
import { Carousel } from 'react-bootstrap'
import { Store } from '../utilities/Store'
import imageLoader from '../utilities/ImageHandler';
import useLifeCycle from '../utilities/useLifeCycle';
import LikeRejectBtn from '../components/LikeRejectBtn.js';
import calcAge from '../utilities/CalcAge';
import Moment from 'react-moment';
import '../css/Profile.css';

export default function Profile(props) {
    const [images, setImages] = useState([]);
    const [profile, setProfile] = useState({ profilePictures: [] });
    const [showBtn, setShowBtn] = useState(false);
    const { state } = React.useContext(Store);
    const [currUser] = useState(state.currentUser);
    const [age, setAge] = useState();
    // const [hasProfilePictures, setHasProfilePictures] = useState(false)

    useEffect(() => {
        if (props.displayedPerson) {
            setProfile(props.displayedPerson)
        } else {
            getProfile();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        setAge(calcAge(result.dateOfBirth));
        toShowOrNotToShowBtn(result);
    }

    const showProfilePictures = profile.profilePictures.map(image => (
        <Carousel.Item key={image}>
            <img
                className="d-block w-100"
                src={`http://localhost:3001/${image}`}
                alt="First slider"
            />
        </Carousel.Item>
    ))

    const toShowOrNotToShowBtn = (person) => {
        if (currUser.id !== person.id && !((currUser.likes && currUser.likes.includes(person.id)) || (currUser.rejects && currUser.rejects.includes(person.id)))) {
            setShowBtn(true);
        }
    }

    const removeBtns = () => {
        setShowBtn(false);
    }

    return (
        <div>
            <Carousel interval={null} fade={true}>
                {profile.profilePictures.length > 0 ?
                    showProfilePictures
                    :
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={'http://localhost:3001/uploads/placeholder.jpg'}
                            alt="First slider"
                        />
                    </Carousel.Item>
                }
            </Carousel>

            {props.displayedPerson &&
                <div className="profile-down-btn" onClick={props.changeView}><i className="fas fa-angle-double-down"></i></div>
            }
            <div className="profile-info">
                <div className="name-age">
                    <h3>{profile.firstName}&nbsp;-</h3 >&nbsp;<h3>{age}</h3>
                </div>
                <div className="town-location">
                    <div className="hometown">
                        <i className="fas fa-home"></i>
                        <p>{profile.hometown}</p>
                    </div>
                    <div className="location">
                        <i className="fas fa-map-marker-alt"></i>
                        <p>5 km</p>
                    </div>
                    <hr />
                    <div className="bio"><p>{profile.bio}</p></div>
                </div>
            </div>
            {
                showBtn &&
                <LikeRejectBtn callback={removeBtns} displayedPerson={profile}></LikeRejectBtn>
            }
        </div >
    )
}
