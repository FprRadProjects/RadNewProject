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
import {MyAwesomeMenu} from "../Config/MyAwesomeMenu";
import {mainpageActions} from "../../_actions/MainPage";
import {design_Actions} from "../../_actions/Design";

class MasterPage extends React.Component {
    componentDidMount() {
        this.props.GetUserInfo();
    }
    componentWillMount() {
        const lang = localStorage.getItem("lang");
        this.props.setLanguage(lang);
    }

    render() {
        const {
            users, alert, loading,GetTemplateForm,
            Set_ShortKey_TemplateForm, Set_EditText_TemplateForm, Set_Hide_TemplateForm
        } = this.props;
        return (
            <div>
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
                    {alert.message &&
                    <div className={`alert ${alert.type}`}>{alert.message}</div>
                    } </div>

            </BrowserRouter>
                <MyAwesomeMenu Set_Hide_TemplateForm={Set_Hide_TemplateForm}
                               Set_EditText_TemplateForm={Set_EditText_TemplateForm}
                               Set_ShortKey_TemplateForm={Set_ShortKey_TemplateForm}
                               GetTemplateForm={GetTemplateForm}
                               FormId="1"/>
            </div>
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

const mapDispatchToProps = dispatch => ({
    GetCounts: (Params) => {
        dispatch(mainpageActions.GetCounts(Params))
    },
    GetEvents: (Params) => {
        dispatch(mainpageActions.GetEvents(Params))
    },
    GetTemplateForm: (Params) => {
        dispatch(design_Actions.GetTemplateForm(Params))
    },
    Set_EditText_TemplateForm: (Params) => {
        dispatch(design_Actions.Set_EditText_TemplateForm(Params))
    },
    Set_Hide_TemplateForm: (Params) => {
        dispatch(design_Actions.Set_Hide_TemplateForm(Params))
    },
    Set_ShortKey_TemplateForm: (Params) => {
        dispatch(design_Actions.Set_ShortKey_TemplateForm(Params))
    },
    GetUserInfo: () => {
        dispatch(userActions.GetUserInfo())
    },
    setLanguage: (param) => {
        dispatch(setLanguage(param))
    },

});
const connectedHomePage = connect(mapStateToProps,mapDispatchToProps)(MasterPage);
export { connectedHomePage as HomePage };