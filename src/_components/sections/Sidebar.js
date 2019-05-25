import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { NavItem } from "./NavItem";
import { userActions } from '../../_actions/User';
import PropTypes from "prop-types"
import { connect } from 'react-redux';
import { NewWork } from '../Automation/RecordForms/Work.New';
import { FormInfo } from "../../locales";
class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            NewWorkModal: false,
        };
    }

    handleLogout = (event) => {
        userActions.logout();
    }
    handleNewWork = (event) => {
        userActions.logout();
    }
    OpenNewWork() {
        this.setState({
            NewWorkModal: !this.state.NewWorkModal
        })
    }

    toggleNewWork() {
        this.setState(prevState => ({
            NewWorkModal: !prevState.NewWorkModal
        }));

    }
    render() {
        const { auth: isAuthenticated, users, lang } = this.props;
        return (
            // <div >
            <div className="page-sidebar custom-scrollbar" >
                <ul className="sidebar-menu">
                    <li>
                        <a className="sidebar-header">
                            <i className="icon-system"></i>
                            <span>{this.context.t("frm_System")}</span>
                            <i className="fa fa-angle-left pull-left"></i>
                        </a>
                        <ul className="sidebar-submenu">
                            <li>
                                <a >
                                    <i className="icon-system"></i>
                                    <span>{this.context.t("frm_User_Settings")}</span>
                                    <i className="fa fa-angle-left pull-left"></i>
                                </a>
                                <ul className="sidebar-submenu">
                                    <li>
                                        <a >
                                            <i className="icon-system"></i>
                                            <span>تغییر کلمه عبور</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a >
                                            <i className="icon-system"></i>
                                            <span>معرفی جانشین</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a >
                                            <i className="icon-system"></i>
                                            <span>تنظیمات فرم مدیریت کارها</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a >
                                            <i className="icon-system"></i>
                                            <span>تنظیمات دسترسی تقویم</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <NavItem activeOnlyWhenExact={false} to="/"  Id= "logout"  OnClickHandler={this.handleLogout.bind(this)}>
                                <i className="icon-system"></i>
                                <span>{this.context.t("logout")}</span>
                            </NavItem>
                        </ul>
                    </li>
                    <li>
                        <a className="sidebar-header">
                            <i className="icon-automation"></i>
                            <span>{this.context.t("frm_Automation")}</span>
                            <i className="fa fa-angle-left pull-left"></i>
                        </a>
                        <ul className="sidebar-submenu">
                            <li>
                                <a >
                                    <i className="icon-system"></i>
                                    <span>تعریف کار و پیش نیازها</span>
                                </a>
                            </li>
                            <li>
                                <a >
                                    <i className="icon-system"></i>
                                    <span>طرف حساب و پیش نیازها</span>
                                </a>
                            </li>
                            <li>
                                <a >
                                    <i className="icon-system"></i>
                                    <span>پیش فرض های ویرایشگر</span>
                                </a>
                            </li>
                            <li>
                                <a >
                                    <i className="icon-system"></i>
                                    <span>پیش فرض های متنی</span>
                                </a>
                            </li>
                            <li>
                                <a >
                                    <i className="icon-system"></i>
                                    <span>پرونده</span>
                                </a>
                            </li>
                            <NavItem activeOnlyWhenExact={false}  Id= "frm_Create_Work" to="#" OnClickHandler={this.OpenNewWork.bind(this)}
                            AccessInfo={FormInfo.fm_pub_sabt_kar}>
                                <i className="icon-system"></i>
                                <span>{this.context.t("frm_Create_Work")}</span>
                            </NavItem>
                            <NavItem activeOnlyWhenExact={true}  Id= "frm_Main_Page" to="/" AccessInfo={FormInfo.web_fm_mainpage}>
                                <i className="icon-system"></i>
                                <span>{this.context.t("frm_Main_Page")}</span>
                            </NavItem>
                        </ul>
                    </li>
                    <li>
                        <a className="sidebar-header">
                            <i className="icon-secretariat"></i>
                            <span>{this.context.t("frm_Secretariat")}</span>
                            <i className="fa fa-angle-left pull-left"></i>
                        </a>
                        <ul className="sidebar-submenu">
                            <li>
                                <Link to="#" >
                                    <i className="icon-system"></i>
                                    <span>{this.context.t("frm_Secretariat_Defaults")}</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="#" >
                                    <i className="icon-system"></i>
                                    <span>{this.context.t("frm_Insert_Incoming_Letter")}</span>
                                </Link>
                            </li><li>
                                <Link to="#" >
                                    <i className="icon-system"></i>
                                    <span>{this.context.t("frm_Insert_Letter_Issuedr")}</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="#" >
                                    <i className="icon-system"></i>
                                    <span>{this.context.t("frm_Insert_Draft_Letter_Issued")}</span>
                                </Link>
                            </li>
                            
                            <NavItem activeOnlyWhenExact={false} to="/references" 
                            Id= "frm_Dashboard_References" AccessInfo={FormInfo.fm_dabir_kartabl_erjaat} >
                                <i className="icon-system"></i>
                                <span>{this.context.t("frm_Dashboard_References")}</span>
                            </NavItem>
                            <li>
                                <Link to="#" >
                                    <i className="icon-system"></i>
                                    <span>{this.context.t("frm_Dashboard_Letters")}</span>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a className="sidebar-header">
                            <i className="icon-project"></i>
                            <span>{this.context.t("frm_Projects")}</span>
                        </a>
                    </li>
                    <li>
                        <a className="sidebar-header">
                            <i className="icon-financial"></i>
                            <span>{this.context.t("frm_Financial_Operations")}</span>
                            <i className="fa fa-angle-left pull-left"></i>
                        </a>
                        <ul className="sidebar-submenu">
                            <li>
                                <a >
                                    <i className="icon-system"></i>
                                    <span>تعاریف حسابداری</span>
                                </a>
                            </li>
                            <li>
                                <a >
                                    <i className="icon-system"></i>
                                    <span>تعاریف خزانه داری و پیش نیازها</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a className="sidebar-header">
                            <i className="icon-archive"></i>
                            <span>{this.context.t("frm_Archives")}</span>
                            <i className="fa fa-angle-left pull-left"></i>
                        </a>

                    </li>
                    <li>
                        <a className="sidebar-header">
                            <i className="icon-terminal"></i>
                            <span>{this.context.t("frm_Data_Terminal")}</span>
                            <i className="fa fa-angle-left pull-left"></i>
                        </a>

                    </li>
                    <li>
                        <a className="sidebar-header">
                            <i className="icon-dashboard"></i>
                            <span>{this.context.t("frm_Dashboards")}</span>
                            <i className="fa fa-angle-left pull-left"></i>

                        </a>
                        <ul className="sidebar-submenu">
                            <li>
                                <Link to="/works" >
                                    <i className="icon-dashboard"></i>
                                    <span>{this.context.t("frm_Dashboard_Work")}</span>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a className="sidebar-header">
                            <i className="icon-report"></i>
                            <span>{this.context.t("frm_Reports")}</span>
                            <i className="fa fa-angle-left pull-left"></i>
                        </a>

                    </li>
                    <li>
                        <a className="sidebar-header">
                            <i className="icon-setting"></i>
                            <span>{this.context.t("frm_System_Administrator_Settings")}</span>
                            <i className="fa fa-angle-left pull-left"></i>
                        </a>

                    </li>
                </ul>
                <div className="sidebar-widget text-center">
                    <div className="sidebar-widget-bottom p-10">
                        <p>
                            {this.context.t("version")} 0.1.1
                        </p>
                        <br />
                        <p>
                            {lang == "fa" ? "1397/12/25" : "2019/03/17"}
                        </p>
                    </div>
                </div>

                {this.state.NewWorkModal && <NewWork modal={this.state.NewWorkModal}
                    toggle={this.toggleNewWork.bind(this)} />
                }
            </div >






            // <div>





            //     <nav className="navbar navbar-expand-md navbar-dark bg-dark rtl">
            //         <Link className="navbar-brand" to="/"></Link>
            //         <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04"
            //             aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
            //             <span className="navbar-toggler-icon"></span>
            //         </button>

            //         <div className="collapse navbar-collapse" id="navbarsExample04">
            //             <ul className="navbar-nav mr-auto">
            //                 <NavItem className="nav-link" activeOnlyWhenExact={true} to="/">{this.context.t("home")}</NavItem>
            //                 <NavItem className="nav-link" to="/works">{this.context.t("work_dashboard")}</NavItem>
            //                 <NavItem className="nav-link" to="/references">{this.context.t("references_dashboard")}</NavItem>
            //                 {users && users !== "Network Error" ?
            //                     <label className="text-white">
            //                         {this.context.t("user_login")}: {users.username}
            //                     </label>
            //                     : <h5>{this.context.t("user_info_not_available")}</h5>}
            //                 {
            //                     isAuthenticated
            //                         ? (
            //                             <Link className="btn btn-success " to="/login"
            //                                 onClick={this.handleLogout.bind(this)}>{this.context.t("logout")}</Link>
            //                         ) : (
            //                             <div>
            //                             </div>
            //                         )
            //                 }
            //             </ul>
            //             <div className="my-2 my-lg-0">

            //             </div>
            //         </div>
            //     </nav>

            // </div>
            // </div>
        );
    }
}

Sidebar.contextTypes = {
    t: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { lang } = state.i18nState
    return {
        lang
    };
}


const connectedSidebar = connect(mapStateToProps, null)(Sidebar);
export { connectedSidebar as Sidebar };
