import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import NavItem from "./NavItem";
import { userActions } from '../../_actions/User';
import { history } from "../../_helpers";
import PropTypes from "prop-types"
import { connect } from 'react-redux';

class Sidebar extends Component {

    handleLogout = (event) => {
        userActions.logout();
        history.push("/login")
    }

    render() {
        const { auth: isAuthenticated, users } = this.props;
        return (
            // <div >
            <div className="page-sidebar custom-scrollbar">
                <ul className="sidebar-menu">
                    <li>
                        <a href="#" className="sidebar-header">
                            <i className="icon-system"></i>
                            <span>سیستم</span>
                            <i className="fa fa-angle-left pull-left"></i>
                        </a>
                        <ul className="sidebar-submenu">
                            <li>
                                <a href="#!">
                                    <i className="icon-system"></i>
                                    <span>تغییر کاربر</span>
                                </a>
                            </li>
                            <li>
                                <a href="#!">
                                    <i className="icon-system"></i>
                                    <span>تنظیمات کاربری</span>
                                    <i className="fa fa-angle-left pull-left"></i>
                                </a>
                                <ul className="sidebar-submenu">
                                    <li>
                                        <a href="#!">
                                            <i className="icon-system"></i>
                                            <span>تغییر کلمه عبور</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#!">
                                            <i className="icon-system"></i>
                                            <span>معرفی جانشین</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#!">
                                            <i className="icon-system"></i>
                                            <span>تنظیمات فرم مدیریت کارها</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#!">
                                            <i className="icon-system"></i>
                                            <span>تنظیمات دسترسی تقویم</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <Link to="/login" onClick={this.handleLogout.bind(this)}>
                                    <i className="icon-system"></i>
                                    <span>{this.context.t("logout")}</span>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#" className="sidebar-header">
                            <i className="icon-automation"></i>
                            <span>اتوماسیون</span>
                            <i className="fa fa-angle-left pull-left"></i>
                        </a>
                        <ul className="sidebar-submenu">
                            <li>
                                <a href="#!">
                                    <i className="icon-system"></i>
                                    <span>تعریف کار و پیش نیازها</span>
                                </a>
                            </li>
                            <li>
                                <a href="#!">
                                    <i className="icon-system"></i>
                                    <span>طرف حساب و پیش نیازها</span>
                                </a>
                            </li>
                            <li>
                                <a href="#!">
                                    <i className="icon-system"></i>
                                    <span>پیش فرض های ویرایشگر</span>
                                </a>
                            </li>
                            <li>
                                <a href="#!">
                                    <i className="icon-system"></i>
                                    <span>پیش فرض های متنی</span>
                                </a>
                            </li>
                            <li>
                                <a href="#!">
                                    <i className="icon-system"></i>
                                    <span>پرونده</span>
                                </a>
                            </li>
                            <li>
                                <a href="#!">
                                    <i className="icon-system"></i>
                                    <span>ثبت کار</span>
                                </a>
                            </li>
                            <NavItem activeOnlyWhenExact={true} to="/">
                                <i className="icon-system"></i>
                                <span>تقویم کاری</span>
                            </NavItem>
                        </ul>
                    </li>
                    <li>
                        <a href="#" className="sidebar-header">
                            <i className="icon-secretariat"></i>
                            <span>دبیرخانه</span>
                            <i className="fa fa-angle-left pull-left"></i>
                        </a>
                        <ul className="sidebar-submenu">
                            <li>
                                <a href="#!">
                                    <i className="icon-system"></i>
                                    <span>پیش فرض های دبیرخانه</span>
                                </a>
                            </li>
                            <li>
                                <a href="#!">
                                    <i className="icon-system"></i>
                                    <span>ثبت نامه وارده</span>
                                </a>
                            </li>
                            <li>
                                <a href="#!">
                                    <i className="icon-system"></i>
                                    <span>ثبت نامه صادره</span>
                                </a>
                            </li>
                            <li>
                                <a href="#!">
                                    <i className="icon-system"></i>
                                    <span>نامه داخلی</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#" className="sidebar-header">
                            <i className="icon-project"></i>
                            <span>پروژه</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="sidebar-header">
                            <i className="icon-financial"></i>
                            <span>عملیات مالی</span>
                            <i className="fa fa-angle-left pull-left"></i>
                        </a>
                        <ul className="sidebar-submenu">
                            <li>
                                <a href="#!">
                                    <i className="icon-system"></i>
                                    <span>تعاریف حسابداری</span>
                                </a>
                            </li>
                            <li>
                                <a href="#!">
                                    <i className="icon-system"></i>
                                    <span>تعاریف خزانه داری و پیش نیازها</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#" className="sidebar-header">
                            <i className="icon-archive"></i>
                            <span>آرشیو</span>
                            <i className="fa fa-angle-left pull-left"></i>
                        </a>

                    </li>
                    <li>
                        <a href="#" className="sidebar-header">
                            <i className="icon-terminal"></i>
                            <span>ترمینال داده</span>
                            <i className="fa fa-angle-left pull-left"></i>
                        </a>

                    </li>
                    <li>
                        <a href="#" className="sidebar-header">
                            <i className="icon-dashboard"></i>
                            <span>کارتابل ها</span>
                            <i className="fa fa-angle-left pull-left"></i>
                        </a>
                        <ul className="sidebar-submenu">
                            <NavItem to="/works">
                                <i className="icon-system"></i>
                                <span>کارتابل کارها</span>
                            </NavItem>
                        </ul>
                    </li>
                    <li>
                        <a href="#" className="sidebar-header">
                            <i className="icon-report"></i>
                            <span>گزارشات</span>
                            <i className="fa fa-angle-left pull-left"></i>
                        </a>

                    </li>
                    <li>
                        <a href="#" className="sidebar-header">
                            <i className="icon-setting"></i>
                            <span>تنظیمات مدیر</span>
                            <i className="fa fa-angle-left pull-left"></i>
                        </a>

                    </li>
                </ul>
                <div className="sidebar-widget text-center">
                    <div className="sidebar-widget-bottom p-10">
                        <p>
                            ورژن 9.8.13
                        </p>
                        <br />
                        <p>
                            1397/11/08
                        </p>
                    </div>
                </div>
            </div>






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