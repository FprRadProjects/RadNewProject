import React, {Component, Suspense} from 'react';
import {history} from '../_helpers';
import {Route, Router} from "react-router-dom";
import {PrivateRoute} from "../_components";
import {HomePage} from "../_components/MasterPage";
import {LoginPage} from "../_components/LoginPage";

class Test extends Component {

    render() {

        const {t} = this.props;

        return (
            <div className="App">
                    <div className="d-flex flex-1">
                        <Router history={history}>
                            <div className="flex-1">
                                <PrivateRoute exact
                                              path={history.location.pathname !== "/login" ? history.location.pathname : "/"}
                                              component={HomePage}/>
                                <Route path="/login" component={LoginPage}/>
                            </div>
                        </Router>
                    </div>
            </div>
        );
    }
}

export default Test;