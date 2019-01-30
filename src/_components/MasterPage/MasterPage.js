import React from 'react';
import {BrowserRouter, Route,  Switch} from "react-router-dom";
import {connect} from 'react-redux';
import {userActions} from '../../_actions/User';
import Header from "../sections/Header";
import NoMatch from "../NoMatch";
import  {DashBoard}  from "../MainPage/DashBoard";

import {Works,References} from "../Secretariat/DashBoards";



//teeeeeeeeeeeeeeeeeeest
import  {mainpageActions} from "../../_actions"
//teeeeeeeeeeeeeeeeeeest


class MasterPage extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.CheckToken());



//teeeeeeeeeeeeeeeeeeest

const tests = this.props.dispatch(mainpageActions.GetCounts(13081))
        console.log(this.props.dispatch(mainpageActions.GetCounts(13081)))
        //const {title, status} = await dispatcher.perform(runTransition(url))


        /*var test = this.props.dispatch(mainpageActions.GetCounts(13081));
        alert(test)*/
//teeeeeeeeeeeeeeeeeeest

    }

    render() {
        const { users} = this.props;
        return (
            <BrowserRouter>
                <div>
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
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(MasterPage);
export {connectedHomePage as HomePage};