import axios from "../../axios/axios-quiz";
import { FETCH_QUIZES_ERROR, FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS, FETCH_QUIZ_SUCCESS, FINISH_QUIZ, QUIZ_NEXT_QUESTION, QUIZ_SET_STATE, RETRY_QUIZ } from "./actionTypes";


export function fetchQuizes() {
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try {
            const response = await axios.get('/quizes.json')

            const quizes = [];
            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Test №${index + 1}`
                })
            })
            dispatch(fetchQuizesSuccess(quizes))
        } 
        catch (e) {
            dispatch(fetchQuizesError())
        }
    }
}

export function fetchQuizById(quizId) {
    return async dispatch => {
        dispatch(fetchQuizesStart())

        try {
            const response = await axios.get(`/quizes/${quizId}.json`)
            const quiz = response.data
            
            dispatch(fetchQuizSuccess(quiz))
        } 
        catch(e) {
            dispatch(fetchQuizesError(e))
        }
    }
}

export function quizAnswerClick(id) {
    return (dispatch, getState) => {
        const state = getState().quiz
        const question = state.quiz[state.activeQuestion];
        const results = state.results;
        if (question.rightAnswerId === id) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }
            dispatch(quizSetState({[id]: 'success'}, results))
            
            const timeout = window.setTimeout(() => {
                if (isQuizFinished(state)) {
                    dispatch(finishQuiz())
                } else {
                    dispatch(quizNextQuestion(state.activeQuestion + 1))
                }
                window.clearTimeout(timeout)
            }, 500)


        } else {
            results[question.id] = 'error'
            dispatch(quizSetState({[id]: 'error'}, results))
        }
    }
}

export function retryQuiz() {
    return {
        type: RETRY_QUIZ
    }
}

export function quizNextQuestion(nextQuestion) {
    return {
        type: QUIZ_NEXT_QUESTION,
        nextQuestion
    }
}

export function finishQuiz() {
    return {
        type: FINISH_QUIZ
    }
}

export function quizSetState(answerState, results) {
    return {
        type: QUIZ_SET_STATE,
        answerState,
        results
    }
}

export function fetchQuizSuccess(quiz) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz
    }
}

export function fetchQuizesStart() {
    return {
        type: FETCH_QUIZES_START
    }
}

export function fetchQuizesSuccess(quizes) {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes
    }
}

export function fetchQuizesError(e) {
    return {
        type: FETCH_QUIZES_ERROR,
        error: e
    }
}

function isQuizFinished(state) {
    return state.activeQuestion + 1 === state.quiz.length
}