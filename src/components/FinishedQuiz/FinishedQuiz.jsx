import React from "react";
import classes from './FinishedQuiz.module.css';
import Button from "../UI/Button/Button";
import {Link} from "react-router-dom";

const FinishedQuiz = props => {
    const successCounter = Object.keys(props.results);
    let counter = 0;
    for (let i = 0; i <= successCounter.length; i++) {
        if (props.results[i] === 'success') {
            counter++;
        }
    }

    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                {
                    props.quiz.map((quizItem, index) => {
                        const cls = [
                            'fa ',
                            props.results[quizItem.id] === 'error' ? 'fa-times ' : 'fa-check ',
                            classes[props.results[quizItem.id]]
                        ]
                        return (
                            <li key={index}>
                                <b>{index + 1}</b>.&nbsp;
                                {quizItem.question}
                                <i className={cls.join(' ')}/>
                            </li>
                        )
                    })
                }
            </ul>

            <p>True {counter} in {props.quiz.length}</p>

            <div>
                <Button onClick ={props.onRetry} type={'primary'}>Retry</Button>
                <Link to='/'>
                    <Button type={'success'}>Go to test</Button>
                </Link>
            </div>
        </div>
    )
}


export default FinishedQuiz