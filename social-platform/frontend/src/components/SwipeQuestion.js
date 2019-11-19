import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { Store } from '../utilities/Store'
import '../css/SwipeQuestion.css'
import useLifeCycle from '../utilities/useLifeCycle'

export default function SwipeQuestion() {
    const { dispatch } = React.useContext(Store);
    const { state } = React.useContext(Store);
    const [checkedAnswere, setCheckedAnswere] = useState();
    // const [questionNumber, setQuestionNumber] = useState(0);
    const [questions, setQuestions] = useState()
    const [hasloaded, setHasLoaded] = useState(false)
    const [skip, setSkip] = useState()

    useLifeCycle({
        mount: ()  => {
            setSkip(state.currentUser.questionsAnswered)
            getQuestion();
        }
    })

    async function getQuestion() {
        let result
        if(skip === undefined){
            result = await fetch(`/api/questions/${state.currentUser.questionsAnswered}`);
        } else{
            result = await fetch(`/api/questions/${skip}`);
        }
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
        console.log("setDbQN: ", result.questionsAnswered)
        setSkip(result.questionsAnswered)
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
        if(result.success === true){
            await setDBQuestionNumber()
            getQuestion()
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
                            <h4 className="swipe-question-question">{questions.question}</h4>
                            <div>
                                {
                                    questions.answer.map(answ => <div key={answ.text} className="edit-profile-form-check">
                                        <Button variant="light" onClick={() => sendAnswer({...answ, type: questions.type})} className="swipe-question-button">{answ.text}</Button>
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
