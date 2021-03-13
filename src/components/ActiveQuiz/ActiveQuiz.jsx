import React from "react";
import './ActiveQuiz.css';
import AnswersList from "./AnswersList/AnswersList";

const ActiveQuiz = props => (
    <div className='activeQuiz'>
        <p className='question'>
            <span>
                <b>{props.activeQuestion}.</b>&nbsp;
                {props.question}
            </span>

            <small>{props.activeQuestion} in {props.quizLength}</small>
        </p>
        <AnswersList
            onClickAnswer={props.onClickAnswer}
            answers={props.answers}
            answerState={props.answerState}
        />
    </div>
)

export default ActiveQuiz