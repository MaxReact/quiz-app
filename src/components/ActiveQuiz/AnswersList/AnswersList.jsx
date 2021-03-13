import React from "react";
import './AnswersList.css';
import AnswersItem from "./AnswersItem/AnswersItem";

const AnswersList = props => (
    <ul className='answerList'>
        {
            props.answers.map((answer, index) => {
                return (
                    <AnswersItem
                        onClickAnswer={props.onClickAnswer}
                        key={index}
                        answer={answer}
                        answerState={props.answerState ? props.answerState[answer.id] : null}
                    />
                )
            })
        }
    </ul>
)

export default AnswersList