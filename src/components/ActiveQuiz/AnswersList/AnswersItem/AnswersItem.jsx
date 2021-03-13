import React from 'react';
import classes from './AnswersItem.module.css'

const AnswersItem = props => {
    const cls = [classes.answerItem]
    if (props.answerState) {
        cls.push(classes[props.answerState])
    }

    return (
        <li className={cls.join(' ')} onClick={()=> {props.onClickAnswer(props.answer.id)}}>
            {props.answer.text}
        </li>
    )
};

export default AnswersItem