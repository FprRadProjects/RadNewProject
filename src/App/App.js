import React, { lazy, Suspense } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../_helpers/index';
import { PrivateRoute } from '../_components/index';
import { setLanguage } from "redux-i18n"
import { withCookies } from 'react-cookie';
import { cookieAction, userActions } from '../_actions';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.props.setLanguage("fa");
        const { _config } = this.props;
        localStorage.setItem("_Config", JSON.stringify(_config));
    }
    render() {
        const { user, cookies } = this.props;
        console.log(cookies.get('login'))
        console.log(user)
        var HomePage = null;
        var LoginPage = null;
        if (user != undefined && user != null) {
            if (cookies.get('login') != null)
                HomePage = lazy(() => import('../_components/MasterPage/MasterPage'));
            else
                userActions.logout();
        }
        else
            LoginPage = lazy(() => import('../_components/LoginPage/LoginPage'));

        // if (cookieAction.getCookie('login') != null)
        //     HomePage = lazy(() => import('../_components/MasterPage/MasterPage'));
        // else
        //userActions.logout();
        //LoginPage = lazy(() => import('../_components/LoginPage/LoginPage'));
        return (

            <React.Suspense fallback={<h1></h1>}>
                <Router history={history} >
                    <Switch>
                        {LoginPage !== null && <Route path="/login" render={props => (<LoginPage cookies={cookies} />)} />}
                        {LoginPage !== null && <Route path="/" render={props => (<LoginPage cookies={cookies} />)} />}
                        {HomePage !== null && <PrivateRoute exact user={user} component={HomePage} cookies1={cookies.get('login')}
                            path={history.location.pathname !== "/login" ? history.location.pathname : "/"}
                        />}
                    </Switch>
                </Router>
            </React.Suspense>
        );
    }
}
const mapDispatchToProps = dispatch => ({
    setLanguage: (param) => {
        dispatch(setLanguage(param))
    },
});

function mapStateToProps(state, ownProps) {
    const { user } = state.authentication;
    return {
        user,
        cookies: ownProps.cookies,
    };
}


const connectedApp = withCookies(connect(mapStateToProps, mapDispatchToProps)(App));
export { connectedApp as App };
