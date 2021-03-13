import axios from "axios";

export default axios.create({
    baseURL: 'https://react-quiz-app-1e41f-default-rtdb.firebaseio.com/'
})