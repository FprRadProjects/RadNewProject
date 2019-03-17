import React, { lazy, Suspense } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import "bootstrap-v4-rtl/dist/css/bootstrap.min.css"
import { history } from '../_helpers/index';
import { PrivateRoute } from '../_components/index';
import { setLanguage } from "redux-i18n"

class App extends React.Component {
    constructor(props) {
        super(props);
        this.props.setLanguage("fa");
    }


    render() {
        const { user } = this.props;
        var HomePage = null;
        var LoginPage = null;
        if (user !== undefined && user !== null)
            HomePage = lazy(() => import('../_components/MasterPage/MasterPage'));
        else
            LoginPage = lazy(() => import('../_components/LoginPage/LoginPage'));
        return (
            <React.Suspense fallback={<h1></h1>}>
                <Router history={history}>
                    <Switch>
                        {LoginPage !== null && <Route path="/login" render={props => (<LoginPage />)} />}
                        {LoginPage !== null && <Route path="/" render={props => (<LoginPage />)} />}
                        {HomePage !== null && <PrivateRoute exact user={user} component={HomePage}
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

function mapStateToProps(state) {
    const { user } = state.authentication;
    return {
        user,
    };
}


const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export { connectedApp as App };
