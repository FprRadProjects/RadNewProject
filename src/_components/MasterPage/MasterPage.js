import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import { userActions } from '../../_actions/User';
import { Header } from "../sections/Header";
import NoMatch from "../NoMatch";
import { DashBoard } from "../MainPage/DashBoard";

import { Works, References } from "../Secretariat/DashBoards";
import { setLanguage } from "redux-i18n";

import '../../content/css/font-awesome.min.css';
import '../../content/css/main.css'
import { Sidebar } from '../sections/Sidebar';
import  '../../content/js/script.js';

class MasterPage extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.GetUserInfo());
    }
    componentWillMount() {
       // const lang = localStorage.getItem("lang");
      //  this.props.dispatch(setLanguage(lang))
    }
  
    render() {
        const { users, alert, loading } = this.props;

        return (
            <BrowserRouter>
                <div>
                    {loading &&
                        <div className="loader-wrapper">
                            <div className="loader">
                                <div className="line"></div>
                                <div className="line"></div>
                                <div className="line"></div>
                                <div className="line"></div>
                                <h4>اتوماسیون تحت وب راد</h4>
                            </div>
                        </div>
                    }
                    {alert.message &&
                        <div className={`alert ${alert.type}`}>{alert.message}</div>
                    }
                    <div className="page-wrapper">
                        <Header auth={true} users={users} />
                        <div className="page-body-wrapper sidebar-close">
                            <Sidebar auth={true} users={users} />
                            <div className="page-body">
                                <div className="container-fluid">
                                    <Switch>
                                        <Route path="/" exact={true} component={DashBoard} />
                                        <Route path="/works" component={Works} />
                                        <Route path="/references" component={References} />
                                        <Route component={NoMatch} />
                                    </Switch>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    const { loading } = state.loading;
    const { users } = state;
    return {
        alert,
        loading,
        users,
    };
}

const connectedHomePage = connect(mapStateToProps)(MasterPage);
export { connectedHomePage as HomePage };