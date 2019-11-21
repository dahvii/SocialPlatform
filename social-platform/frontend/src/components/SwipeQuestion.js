import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { Store } from '../utilities/Store'
import '../css/SwipeQuestion.css'
import useLifeCycle from '../utilities/useLifeCycle'

export default function SwipeQuestion() {
    const { dispatch } = React.useContext(Store);
    const { state } = React.useContext(Store);
    const [questions, setQuestions] = useState()
    const [hasloaded, setHasLoaded] = useState(false)

    useLifeCycle({
        mount: () => {
            getQuestion(state.currentUser.questionsAnswered);
        }
    })

    async function getQuestion(newSkip) {
        let result = await fetch(`/api/questions/${newSkip}`);
        result = await result.json();
        setQuestions(result)
        setHasLoaded(true)
    }

    async function setDBQuestionNumber() {
        let data = {
            userId: state.currentUser.id,
            questionsAnswered: 1
        }
        let setDbQ = await fetch('/api/user-question/setAnswered', {
            method: "PUT",
            body: JSON.stringify(data),
            headers: { 'Content-type': "application/json" }
        })
        let result = await setDbQ.json()
        getQuestion(result.questionsAnswered)
    }

    async function sendAnswer(data) {
        let url
        if (data.type === "myCharacteristics") {
            url = state.currentUser.myCharacteristics
        } else if (data.type === "partnerCharacteristics") {
            url = state.currentUser.partnerCharacteristics
        }
        let answer = await fetch(`/api/characteristics/${url}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: { 'Content-type': "application/json" }
        })
        let result = await answer.json()
        if (result.success === true) {
            await setDBQuestionNumber()
            dispatch({
                type: "SHOW_QUESTION",
                payload: false
            })
        }
    }

    return (
        <>
            {
                hasloaded ? <Modal
                    backdrop="static"
                    show={state.showQuestion}
                    centered>
                    <Modal.Body className="swipe-question-modal">
                        <Form className="selection swipe-question-form">
                            {
                                questions.type === "partnerCharacteristics" ? <p className="swipe-question-type">Frågor om din partner</p> : <p className="swipe-question-type">Frågor om dig</p>
                            }
                            <h4 className="swipe-question-question">{questions.question}</h4>
                            <div>
                                {
                                    questions.answer.map(answ => <div key={answ.text} className="edit-profile-form-check">
                                        <Button variant="light" onClick={() => sendAnswer({ ...answ, type: questions.type })} className="swipe-question-button">{answ.text}</Button>
                                    </div>)
                                }
                            </div>
                        </Form>
                    </Modal.Body>
                </Modal>
                    : ''
            }

        </>
    );
}
