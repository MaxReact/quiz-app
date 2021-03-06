import React, {Component} from 'react';
import Layout from './hoc/Layout/Layout';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'
import Quiz from './containers/Quiz/Quiz';
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import QuizList from "./containers/QuizList/QuizList";
import Auth from "./containers/Auth/Auth";
import Logout from "./components/Logout/Logout";
import { connect } from "react-redux"
import { autoLogin } from './store/actions/auth';

class App extends Component {
    componentDidMount () {
        this.props.autoLogin()
    }
    render() {
        let routers = (
            <Switch>
                <Route path="/auth" component={Auth}/>
                <Route path="/quiz/:id" component={Quiz}/>
                <Route path="/" exact component={QuizList}/>
                <Redirect to="/" />
            </Switch>
        )
        if(this.props.isAuth) {
            routers = (
                <Switch>
                    <Route path="/quiz-creator" component={QuizCreator}/>
                    <Route path="/quiz/:id" component={Quiz}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/" exact component={QuizList}/>
                    <Redirect to="/" />
                </Switch>
            )
        }
        return (
            <Layout>
                {routers}
            </Layout>
        )
    }
}

function mapStateToProps(state) {
    return {
        isAuth: !!state.auth.token
    }
}

function mapDispatchToProps(dispatch) {
    return {
        autoLogin: () => dispatch(autoLogin())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
