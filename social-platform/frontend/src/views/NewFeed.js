import React, { useRef, useState } from 'react'
import { Form, Button, Image } from 'react-bootstrap';
import { Store } from '../utilities/Store'
import '../css/NewFeedPost.css'

export default function NewFeed() {
    const text = useRef();
    const { state } = React.useContext(Store);
    const [feedImage, setFeedImage] = useState();
    const [error, setError] = useState(false);
    const [displayImage, setDisplayImage] = useState("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPcAAADMCAMAAACY78UPAAAAMFBMVEW8vsDn6Onq6+y5u73CxMbIycvh4uPW2NnR09Tc3d/AwsTk5ebU1dfg4eK9v8HOz9HoolfoAAADEUlEQVR4nO3c63KqMBRAYZINVUTw/d/2yNVEg4JHkZ2s709nOuKwhhSDhGYZAAAAAAAAAAAAAAAAACROpCkKkV/vxtbkUtmrukirvKmt6dhzSuHyZ0YphcvZmlt48evd2YwY1yGZA15YLzyZ7qPXbfNf789W7rpPv96fraQ6zptEz2upfo5lUiU3b+krk5unytA5XJeUw3XJ6Rh3vpT2MoRLVhTD0c+kHn8dp2v29Tz2UNid5/J4w9ts8xjen95ttOF99sMnlxyGX0caPmXfT1Skjjl8OqyP87OYw+Uym92Gm0jDp+zwPGX8JiK28BfZt0uVuMLl+CLbDd9yx77rmt17NhlvTP8aE1F4M/xcMoab5vVrAGArxTft9zwvlf2i/X7v6tzm/AK694Zuuummm+74uj81W1HWfc4/pFbVbT91n09KuuneGbrvu6Xzzluq7m7OdVWZwxv3BDR3S2GG2wbrFzVo7s6nycf6cM3d5mb1XSDF3Rd3Vebandfb7ex5K53uys0OLz6eL4ql2wTv+s3fJ1Xc7Y3zKrTKo5xfm6u32zuvhb78b9dCVLNvqbfbG+iBYX6yM6t9uo31dr+Yt/QbzY10zd2SV125NaHscQ1+uEpzd/snXBpbHkPbjINh5spVd/dwIRraZPrjD09htXfPbeF8yIU+4qLqdk717hNVwVVeEXVLNY3o5uWDgxF1/01L86Q2nsBIj6a7X47dhYv/vGRwpMfSPa5Cb8Pzu+zQSI+kW6bJen73FPjMSI+j2zl/V+ORfz7S4+h2R7Z/WT430qPoPgVTfX93Nxxi6F6Q/TCz19+9cDWE/w2c/u7Fi0C8ka6+O3j6Dh9w79pdeffybH+kK++WYnm2N9J1d6/LnvkWWmH3kg9uL3wa6aq712Y7I11zt4SnpE8P+Li94u63Vm+O83S93VK+tT6zlmFrrd3jYqa1hm0Vd//XW9JN997QnWq3+Vi3rnX3yT5n8QV07w3ddNNNN92RdCf6fy2yTz0UGpTMv80GAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKZ/TikowOqV20oAAAAASUVORK5CYII=");

    function fileSelectorHandler(event) {
        setFeedImage(event.target.files[0]);
        let newImage = URL.createObjectURL(event.target.files[0])
        console.log(newImage);
        setDisplayImage(newImage)
    }

    function validate(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('feedImage', feedImage)
        newImage(formData);
        console.log(formData)
    }

    async function newImage(formData) {
        let newImage = await fetch('/api/new-image', {
            method: "POST",
            body: formData
        })
        let result = await newImage.json()
        console.log("result: ", result);

        if (result.error) {
            console.log("fel filtyp");
            setError(true)
        } else if (result.success) {
            let date = new Date().getTime();
            setError(false)
            newPost(text.current.value, state.currentUser.id, date, result.file)
        }
    }
    async function newPost(text, owner, date, image) {
        let data = {
            text,
            owner,
            date,
            image
        }
        let newPost = await fetch('/api/new-post', {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        })
        let result = await newPost.json();
        if (result.status === 200) {
            console.log("allt ok");
            setError(false)
        } else {
            console.log("something went wrong");
            setError(true)
        }
    }
    return (
        <div className="new-feed-content">
            <h1 className="form-headline">Ny Post</h1>
            <Form noValidate onSubmit={validate} className="new-feed-form">
                <Form.Group className="form-group" controlId="exampleForm.ControlInput1">
                    <Form.Label className="form-label">Text</Form.Label>
                    <Form.Control className="new-feed-text-input" required ref={text} type="text" as="textarea" rows="3" maxLength="100" />
                </Form.Group>
                <Button variant="light" className="newfeed-upoad-image-button"><input type="file" className="newfeed-input" onChange={fileSelectorHandler}></input></Button>
                <Image id="display-image" className="new-feed-display-image" src={displayImage} alt="your image"></Image>
                {error ? <p className="new-feed-error">Vi tar bara emot JPEG eller PNG</p> : <p className="new-feed-no-error">&nbsp;</p>}
                <Button variant="light" type="submit" className="register-button newfeed-upload-button">Publicera </Button>
            </Form>
        </div>
    )
}
