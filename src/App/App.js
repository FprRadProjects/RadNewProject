import React from 'react';
import {Router, Route} from 'react-router-dom';
import {connect} from 'react-redux';

import {history} from '../_helpers';
import {alertActions} from '../_actions';
import {PrivateRoute} from '../_components';
import {HomePage} from '../_components/MasterPage';
import {LoginPage} from '../_components/LoginPage';

class App extends React.Component {
    constructor(props) {
        super(props);
        const {dispatch} = this.props;
        history.listen((location, action) => {
            dispatch(alertActions.clear());
        });
    }


    render() {

        return (
            <div className="d-flex flex-1">

                <Router history={history}>
                    <div className="flex-1">

                        <PrivateRoute exact
                                      path={history.location.pathname !== "/login" ? history.location.pathname : "/"}
                                      component={HomePage}  />
                        <Route path="/login" component={LoginPage} />
                    </div>
                </Router>
            </div>
        );
    }
}



const connectedApp = connect(null)(App);
export {connectedApp as App};