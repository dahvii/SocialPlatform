import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { Store } from '../utilities/Store'
import '../css/SwipeQuestion.css'

export default function SwipeQuestion() {
    const { dispatch } = React.useContext(Store);
    const { state } = React.useContext(Store);
    const [checkedGender, setCheckedGender] = useState();

    const handleGenderOptionChange = (e) => {
        setCheckedGender(e.target.value)
    }

    function handleClose() {
        dispatch({
            type: "SHOW_QUESTION",
            payload: false
        })
    }

    return (
        <>
            <Modal
                backdrop="static"
                show={state.showQuestion}
                onHide={handleClose}
                centered>
                <Modal.Body className="swipe-question-modal">
                    <Form className="selection swipe-question-form">
                        <h4 className="swipe-question-question">Fråga</h4>
                        <div className="edit-profile-form-check">
                            <label>
                                <input
                                    type="radio"
                                    value="Male"
                                    checked={checkedGender === "Fråga 1"}
                                    onChange={handleGenderOptionChange}
                                    className="form-check-input swipe-question-text"
                                />
                                <span className="checkmark"></span>
                                Fråga1 
                        </label>
                        </div>

                        <div className="edit-profile-form-check">
                            <label className="m-0">
                                <input
                                    type="radio"
                                    value="Female"
                                    checked={checkedGender === "Fråga 2"}
                                    onChange={handleGenderOptionChange}
                                    className="form-check-input"
                                />
                                <span className="checkmark"></span>
                                Fråga 2
                        </label>
                        </div>
                    <Button className="swipe-question-button" variant="light" onClick={handleClose}>
                        Forstätt
                    </Button>
                    </Form>
                </Modal.Body>
                

            </Modal>
        </>
    );
}
