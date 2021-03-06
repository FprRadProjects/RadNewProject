import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap-v4-rtl"
import { connect } from 'react-redux';
import { userActions } from '../../_actions/User';
import { Header } from "../sections/Header";
import NoMatch from "../NoMatch";
import { DashBoard } from "../MainPage/DashBoard";
import PropTypes from "prop-types"

import { Works, References } from "../Secretariat/DashBoards";
import { setLanguage } from "redux-i18n";

import '../../content/css/font-awesome.min.css';
import '../../content/css/main.css'
import { Sidebar } from '../sections/Sidebar';
import '../../content/js/script.js';
import { MyAwesomeMenu } from "../Frameworks";
import { mainpageActions } from "../../_actions/MainPage";
import { design_Actions } from "../../_actions/Design";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from 'react-loader-advanced';
import { workManagement } from "../Secretariat/DashBoards/workManagement";
import {ReportView} from "../Frameworks/Stimulsoft";
import { withCookies } from 'react-cookie';

class MasterPage extends React.Component {
    constructor(props) {
        super(props);


    }
    componentDidMount() {
        this.props.GetUserInfo();
        const lang = localStorage.getItem("lang");
        this.props.setLanguage(lang);
    }

    render() {
        document.title = this.context.t("SoftWare_Name")
        const {
            users, lang, loading, GetTemplateForm,
            Set_ShortKey_TemplateForm, Set_EditText_TemplateForm, Set_Hide_TemplateForm,
            Delete_ShortKeyElements_Template,cookies } = this.props;
        const loaddddd = <div className="loader-wrapper">
            <div className="loader">
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div> 
                <h4>لطفا صبر کنید</h4>
            </div>
        </div>;
        return (
            <Loader show={loading === undefined ? false : loading} message={loaddddd} >
                <BrowserRouter>

                    {/* {loading &&
                            <div className="loader-wrapper">
                                <div className="loader">
                                    <div className="line"></div>
                                    <div className="line"></div>
                                    <div className="line"></div>
                                    <div className="line"></div>
                                    <h4>{this.context.t("SoftWare_Name")}</h4>
                                </div>
                            </div>
                        } */}

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
                                        <Route path="/workManagement" component={workManagement} />
                                        <Route path="/report" component={ReportView} />
                                        <Route component={NoMatch} />
                                    </Switch>
                                </div>
                            </div>
                        </div>

                    </div>

                </BrowserRouter>
                <MyAwesomeMenu Set_Hide_TemplateForm={Set_Hide_TemplateForm}
                    Set_EditText_TemplateForm={Set_EditText_TemplateForm}
                    Set_ShortKey_TemplateForm={Set_ShortKey_TemplateForm}
                    GetTemplateForm={GetTemplateForm} Delete_ShortKeyElements_Template={Delete_ShortKeyElements_Template}
                     />

                <ToastContainer
                    bodyClassName="toastify"
                    rtl={lang ==="fa"?true:false }
                    position="bottom-left"
                    autoClose={5000}
                />
            </Loader>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const { alert } = state;
    const { loading } = state.loading;
    const { users } = state;
    const { lang } = state.i18nState
    return {
        alert,
        loading,
        users,
        lang,
        cookies: ownProps.cookies,
    };
}

MasterPage.contextTypes = {
    t: PropTypes.func.isRequired
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
    Delete_ShortKeyElements_Template: (FormId, RowId) => {
        dispatch(design_Actions.Delete_ShortKeyElements_Template(FormId, RowId))
    },

    GetUserInfo: () => {
        dispatch(userActions.GetUserInfo())
    },
    setLanguage: (param) => {
        dispatch(setLanguage(param))
    },

});
export default  withCookies(connect(mapStateToProps, mapDispatchToProps)(MasterPage))
