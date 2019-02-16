import React from 'react';
import {BrowserRouter, Route,  Switch} from "react-router-dom";
import {connect} from 'react-redux';
import {userActions} from '../../_actions/User';
import {Header} from "../sections/Header";
import NoMatch from "../NoMatch";
import  {DashBoard}  from "../MainPage/DashBoard";
import PropTypes from "prop-types"

import {Works,References} from "../Secretariat/DashBoards";
import {setLanguage} from "redux-i18n";




class MasterPage extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.GetUserInfo());
    }
    componentWillMount() {
        const lang= localStorage.getItem("lang");
        this.props.dispatch(setLanguage(lang))
    }
    render() {
        const { users} = this.props;
        return (
            <BrowserRouter>
                <div className="flex-1">
                    <Header auth={true} users={users}/>
                    <div className="container rtl">
                        <Switch>
                            <Route path="/" exact={true} component={DashBoard}/>
                            <Route path="/works" component={Works}/>
                            <Route path="/references" component={References}/>
                            <Route component={NoMatch}/>
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

function mapStateToProps(state) {
    const {users} = state;
    return {
        users,
    };
}

const connectedHomePage = connect(mapStateToProps)(MasterPage);
export {connectedHomePage as HomePage};