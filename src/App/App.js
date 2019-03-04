import React from 'react';
import {Router, Route} from 'react-router-dom';
import {connect} from 'react-redux';

import {history} from '../_helpers/index';
import {alertActions} from '../_actions/index';
import {PrivateRoute} from '../_components/index';
import {LoginPage} from '../_components/LoginPage/';
import {HomePage} from '../_components/MasterPage/index';

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
            <div>

                <Router history={history}>
                    <div>

                        <Route path="/login" component={LoginPage} />
                        <PrivateRoute exact
                                      path={history.location.pathname !== "/login" ? history.location.pathname : "/"}
                                      component={HomePage}  />
                    </div>
                </Router>
                
            </div>
        );
    }
}



const connectedApp = connect(null)(App);
export {connectedApp as App};