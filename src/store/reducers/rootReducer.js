import { combineReducers } from "redux";
import quizReducer from "./quiz";
import createQuiz from "./create"
import authReducer from "./auth";

export default combineReducers({
    quiz: quizReducer,
    create: createQuiz,
    auth: authReducer
})