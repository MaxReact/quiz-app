import React, {Component} from 'react';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import './Quiz.css';
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from '../../components/UI/Loader/Loader';
import { connect } from 'react-redux';
import { fetchQuizById, quizAnswerClick, retryQuiz } from '../../store/actions/quiz';

class Quiz extends Component {

    componentWillUnmount() {
        this.props.retryQuiz()
    }

    componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id)
    }

    render() {
        return (
            <div className='quiz'>
                <div className="quizWrapper">
                    <h1>Answer the questions</h1>
                    {
                        this.props.loading || !this.props.quiz
                            ? <Loader/>
                            :   this.props.isFinished
                                ? <FinishedQuiz
                                    results={this.props.results}
                                    quiz={this.props.quiz}
                                    onRetry={this.props.retryQuiz}
                                />
                                : <ActiveQuiz
                                    answerState={this.props.answerState}
                                    quizLength={this.props.quiz.length}
                                    activeQuestion={this.props.activeQuestion + 1}
                                    question={this.props.quiz[this.props.activeQuestion].question}
                                    onClickAnswer={this.props.quizAnswerClick}
                                    answers={this.props.quiz[this.props.activeQuestion].answers}
                                />
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        results: state.quiz.results,
        isFinished: state.quiz.isFinished,
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState,
        quiz: state.quiz.quiz,
        loading: state.quiz.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
        retryQuiz: () => dispatch(retryQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)