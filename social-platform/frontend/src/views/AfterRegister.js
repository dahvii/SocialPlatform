import React, {useState} from 'react'
import RegisterQuestion from '../components/RegisterQuestion'


export default function AfterRegister(props) {
    let [question, setQuestion] = useState(1);

    let question1 = "Vilket kön identifierar du dig som?"
    let question1Answere = ["Tjej", "Kille", "Annat"]

    let question3 = "Vilket kön är du intresserad av"
    let question3Answere = ["Tjej", "Kille", "Annat"]



    if (question = 1) {
        return <RegisterQuestion question={question1} answere={question1Answere} />
    // } else if (question = 2) {
    //     return <RegisterQuestion question={question2} answere={question2Answere} />
    } else if (question = 3) {
        return <RegisterQuestion question={question3} answere={question3Answere} />
    } else if (question >= 4) {
        props.history.push('/')
    }
}
