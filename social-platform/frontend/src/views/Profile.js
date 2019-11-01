import React, { useEffect, useState } from 'react'
import { Button, Carousel } from 'react-bootstrap'
import { Store } from '../utilities/Store'
import imageLoader from '../utilities/ImageHandler';
import '../css/Profile.css'

export default function Profile() {
    const { state, dispatch } = React.useContext(Store);
    const [images, setImages] = useState([])

    // const images = [
    //     {
    //         src: 'https://avatarfiles.alphacoders.com/126/126080.jpg'
    //     },
    //     {
    //         src: 'https://i.pravatar.cc/400?img=4'
    //     },
    //     {
    //         src: 'https://i.pravatar.cc/400?img=5'
    //     }
    // ]

    useEffect(() => {
        const images = imageLoader();
        setImages(images)
    }, [])

    const logout = async () => {
        let result = await fetch('/api/logout', {
            method: 'DELETE'
        });
        result = await result.json()
        if (result.success) {
            dispatch({ type: "LOGOUT_USER" })
        }
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
            <div className="profile-info">
                <div className="name-age">
                    <h3>{state.currentUser.firstName}&nbsp;-</h3 >&nbsp;<h3>25</h3>
                </div>
                <div className="town-location">
                    <div className="hometown">
                        <i class="fas fa-home"></i>
                        <p>Malmö</p>
                    </div>
                    <div className="location">
                        <i class="fas fa-map-marker-alt"></i>
                        <p>5 km</p>
                    </div>
                    <hr />
                    <div className="bio"><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus quo eum ipsam reprehenderit saepe nesciunt perferendis repudiandae. Rem quod necessitatibus voluptas. Laudantium sint debitis ad eveniet eum vitae excepturi commodi.</p></div>
                </div>
            </div>
            <Button onClick={logout}>Log out</Button>
        </div>
    )
}
