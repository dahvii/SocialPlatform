import React, { useRef, useState } from 'react'
import { Form, Button, Image } from 'react-bootstrap'
import '../css/AddForumPost.css'
export default function AddFormPost(props){
  
    const titel = useRef();
    const text = useRef();
    const [titelError,setTitelError] = useState(false);
    const [textError,setTextError] = useState(false);
    const[anonym, setAnonym] = useState(false)
    const [feedImage, setFeedImage] = useState();
    const [displayImage, setDisplayImage] = useState("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPcAAADMCAMAAACY78UPAAAAMFBMVEW8vsDn6Onq6+y5u73CxMbIycvh4uPW2NnR09Tc3d/AwsTk5ebU1dfg4eK9v8HOz9HoolfoAAADEUlEQVR4nO3c63KqMBRAYZINVUTw/d/2yNVEg4JHkZ2s709nOuKwhhSDhGYZAAAAAAAAAAAAAAAAACROpCkKkV/vxtbkUtmrukirvKmt6dhzSuHyZ0YphcvZmlt48evd2YwY1yGZA15YLzyZ7qPXbfNf789W7rpPv96fraQ6zptEz2upfo5lUiU3b+krk5unytA5XJeUw3XJ6Rh3vpT2MoRLVhTD0c+kHn8dp2v29Tz2UNid5/J4w9ts8xjen95ttOF99sMnlxyGX0caPmXfT1Skjjl8OqyP87OYw+Uym92Gm0jDp+zwPGX8JiK28BfZt0uVuMLl+CLbDd9yx77rmt17NhlvTP8aE1F4M/xcMoab5vVrAGArxTft9zwvlf2i/X7v6tzm/AK694Zuuummm+74uj81W1HWfc4/pFbVbT91n09KuuneGbrvu6Xzzluq7m7OdVWZwxv3BDR3S2GG2wbrFzVo7s6nycf6cM3d5mb1XSDF3Rd3Vebandfb7ex5K53uys0OLz6eL4ql2wTv+s3fJ1Xc7Y3zKrTKo5xfm6u32zuvhb78b9dCVLNvqbfbG+iBYX6yM6t9uo31dr+Yt/QbzY10zd2SV125NaHscQ1+uEpzd/snXBpbHkPbjINh5spVd/dwIRraZPrjD09htXfPbeF8yIU+4qLqdk717hNVwVVeEXVLNY3o5uWDgxF1/01L86Q2nsBIj6a7X47dhYv/vGRwpMfSPa5Cb8Pzu+zQSI+kW6bJen73FPjMSI+j2zl/V+ORfz7S4+h2R7Z/WT430qPoPgVTfX93Nxxi6F6Q/TCz19+9cDWE/w2c/u7Fi0C8ka6+O3j6Dh9w79pdeffybH+kK++WYnm2N9J1d6/LnvkWWmH3kg9uL3wa6aq712Y7I11zt4SnpE8P+Li94u63Vm+O83S93VK+tT6zlmFrrd3jYqa1hm0Vd//XW9JN997QnWq3+Vi3rnX3yT5n8QV07w3ddNNNN92RdCf6fy2yTz0UGpTMv80GAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKZ/TikowOqV20oAAAAASUVORK5CYII=");
    const [error, setError] = useState(false);

    const handleCheck = () => {
        setAnonym(!anonym);
      };

      function fileSelectorHandler(event) {
        setFeedImage(event.target.files[0]);
        let newImage = URL.createObjectURL(event.target.files[0]);
        setDisplayImage(newImage);
    }

    function validate(e) {
        let allGood = false;
        if (titel.current.value === '') {
            setTitelError(true)
            allGood = false;
        } else {
            allGood = true;
            setTitelError(false)
        }
        if (text.current.value === '') {
            setTextError(true)
            allGood = false;
        } else {
            allGood = true;
            setTextError(false)
        }
        if (allGood) {
            if (displayImage !== 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPcAAADMCAMAAACY78UPAAAAMFBMVEW8vsDn6Onq6+y5u73CxMbIycvh4uPW2NnR09Tc3d/AwsTk5ebU1dfg4eK9v8HOz9HoolfoAAADEUlEQVR4nO3c63KqMBRAYZINVUTw/d/2yNVEg4JHkZ2s709nOuKwhhSDhGYZAAAAAAAAAAAAAAAAACROpCkKkV/vxtbkUtmrukirvKmt6dhzSuHyZ0YphcvZmlt48evd2YwY1yGZA15YLzyZ7qPXbfNf789W7rpPv96fraQ6zptEz2upfo5lUiU3b+krk5unytA5XJeUw3XJ6Rh3vpT2MoRLVhTD0c+kHn8dp2v29Tz2UNid5/J4w9ts8xjen95ttOF99sMnlxyGX0caPmXfT1Skjjl8OqyP87OYw+Uym92Gm0jDp+zwPGX8JiK28BfZt0uVuMLl+CLbDd9yx77rmt17NhlvTP8aE1F4M/xcMoab5vVrAGArxTft9zwvlf2i/X7v6tzm/AK694Zuuummm+74uj81W1HWfc4/pFbVbT91n09KuuneGbrvu6Xzzluq7m7OdVWZwxv3BDR3S2GG2wbrFzVo7s6nycf6cM3d5mb1XSDF3Rd3Vebandfb7ex5K53uys0OLz6eL4ql2wTv+s3fJ1Xc7Y3zKrTKo5xfm6u32zuvhb78b9dCVLNvqbfbG+iBYX6yM6t9uo31dr+Yt/QbzY10zd2SV125NaHscQ1+uEpzd/snXBpbHkPbjINh5spVd/dwIRraZPrjD09htXfPbeF8yIU+4qLqdk717hNVwVVeEXVLNY3o5uWDgxF1/01L86Q2nsBIj6a7X47dhYv/vGRwpMfSPa5Cb8Pzu+zQSI+kW6bJen73FPjMSI+j2zl/V+ORfz7S4+h2R7Z/WT430qPoPgVTfX93Nxxi6F6Q/TCz19+9cDWE/w2c/u7Fi0C8ka6+O3j6Dh9w79pdeffybH+kK++WYnm2N9J1d6/LnvkWWmH3kg9uL3wa6aq712Y7I11zt4SnpE8P+Li94u63Vm+O83S93VK+tT6zlmFrrd3jYqa1hm0Vd//XW9JN997QnWq3+Vi3rnX3yT5n8QV07w3ddNNNN92RdCf6fy2yTz0UGpTMv80GAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKZ/TikowOqV20oAAAAASUVORK5CYII='){
                const formData = new FormData();
                formData.append('feedImage', feedImage)
                console.log(titel.current.value);
                
                newImage(formData);
            }else{
                registerwhithoutImg(titel.current.value, text.current.value)
            }
        }
        e.preventDefault();
    }

    async function addtodb(data){
        let registerFormPost = await fetch('/api/forum', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json'}
        });
        let result = await registerFormPost.json();
        return result;
    }

    async function newImage(formData) {
        let newImage = await fetch('/api/new-image', {
            method: "POST",
            body: formData
        })
        let result = await newImage.json()

        if (result.error) {
            setError(true)
        } else if (result.success) {
            setError(false)
            registerwhithImg(titel.current.value, text.current.value, result.file)
        }
    }
    async function registerwhithImg(titel,text,image) {
        let data = {
            titel,
            text,
            image,
            anonym,
        }
        let result = await addtodb(data);
        props.showNewPost(result);
    }
   
    async function registerwhithoutImg(titel,text) {
        let data = {
            titel,
            text,
            anonym,
        }
        let result = await addtodb(data);
        props.showNewPost(result);
    }
    return (
        <> 
       <Form noValidate onSubmit={validate} className="addpost-form-background">
                <h1 className="addpost-form-titel">Skapa ett nytt forum inlägg</h1>
                <Form.Group className="form-group" controlId="ForumForm.ControlInput">
                    <Form.Label className="form-label-whitesmoke">Titel</Form.Label>
                    <Form.Control required ref={titel} className="form-controll-textarea" type="name" placeholder="Titel" />
                    {titelError ?
                        <p className="forum-form-error form-label-whitesmoke">Du måste fylla i en Titel</p>
                        : <p className="forum-form-error-hidden form-label-whitesmoke">&nbsp;</p>
                    }
                </Form.Group>
                <Form.Group className="form-group" controlId="textarea">
                    <Form.Label className="form-label-whitesmoke">Post text</Form.Label>
                    <Form.Control required ref={text} className="form-controll-textarea" as="textarea" rows="3" placeholder="Post text" />
                    {textError ?
                        <p className="forum-form-error form-label-whitesmoke">Du måste skriva någon text</p>
                        : <p className="forum-form-error-hidden form-label-whitesmoke">&nbsp;</p>
                    }
                </Form.Group>
                <Form.Group>
                <Button variant="light" className="newfeed-upoad-image-button"><input type="file" className="newfeed-input form-label-red" onChange={fileSelectorHandler}></input></Button>
                <Image id="display-image" className="new-feed-display-image" src={displayImage} alt="your image"></Image>
                {error ? <p className="forum-form-error form-label-whitesmoke">Vi tar bara emot JPEG eller PNG</p> 
                : <p className="forum-form-error-hidden form-label-whitesmoke">&nbsp;</p>}
                </Form.Group>
                <Form.Group>
                    <Form.Check className="anonymBasicCheckbox" type="checkbox" label="Anonym" checked={anonym} onChange={handleCheck}/>
                </Form.Group>
                <Button variant="light" type="submit" className="post-button">Post</Button>
            </Form>
        
        </>
    )
}