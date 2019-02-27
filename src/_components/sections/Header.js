import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import NavItem from "./NavItem";
import { userActions } from '../../_actions/User';
import { history } from "../../_helpers";
import PropTypes from "prop-types"
import { connect } from 'react-redux';


import notifyIcon from '../../content/images/master/header/notify-icon.svg';
import editIcon from '../../content/images/master/header/edit-icon.svg';
import messageIcon from '../../content/images/master/header/message-icon.svg';
import userAvatar from '../../content/images/master/header/user-avatar.svg';


class Header extends Component {
    render() {
        const { CompanyName ,FormInfo,lang} = this.props;
        return (
            <div className="page-main-header">
                <div className="main-header-left">
                    <div className="logo-wrapper">
                        <Link to="/">{this.context.t("SoftWare_Name")}</Link>
                    </div>
                    <div className="mobile-sidebar">
                        <div className="media-body text-right switch-sm">
                            {/* <label className="switch">
                                <input type="checkbox" defaultChecked="checked" className="sidebar-toggle" />
                                <span className="switch-state"></span>
                            </label> */}
                            <label className="sidebar-toggle">
                                <input type="checkbox" defaultChecked="checked" />
                                <span className="sidebar-toggle-icon"></span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="main-header-right row">

                    <div className="nav-right col-3">
                        <ul className="nav-menus">
                            <li>
                                <a href="#!" className="txt-dark">
                                    <img className="align-self-center pull-right mr-2" src={notifyIcon} alt="header-notify" />
                                    <span className="badge notification">3</span>
                                </a>
                            </li>
                            <li>
                                <a href="#!" className="txt-dark">
                                    <img className="align-self-center pull-right mr-2" src={editIcon} alt="header-edit" />
                                </a>
                            </li>
                            <li>
                                <a href="#!" className="txt-dark">
                                    <img className="align-self-center pull-right mr-2" src={messageIcon} alt="header-message" />
                                    <span className="badge notification">3</span>
                                </a>
                            </li>
                        </ul>
                        <div className="d-lg-none mobile-toggle"><i className="icon-more"></i></div>
                    </div>
                    <div className="col-5">
                        <ul className="breadcrumb">
                            {lang ==='fa' && FormInfo!==undefined? FormInfo.fa_module_name2!==""&&<li className="breadcrumb-item"><a href="#">{FormInfo!==undefined? FormInfo.fa_module_name2:""}</a></li>:""}
                            {lang ==='en' && FormInfo!==undefined? FormInfo.en_module_name2!==""&&<li className="breadcrumb-item"><a href="#">{FormInfo!==undefined? FormInfo.en_module_name2:""}</a></li>:""}
                            {lang ==='fa' && FormInfo!==undefined? FormInfo.fa_module_name1!==""&&<li className="breadcrumb-item"><a href="#">{FormInfo!==undefined? FormInfo.fa_module_name1:""}</a></li>:""}
                            {lang ==='en' && FormInfo!==undefined? FormInfo.en_module_name1!==""&&<li className="breadcrumb-item"><a href="#">{FormInfo!==undefined? FormInfo.en_module_name1:""}</a></li>:""}
                            {lang ==='fa' && FormInfo!==undefined? FormInfo.form_name!==""&&<li className="breadcrumb-item"><a href="#">{FormInfo!==undefined? FormInfo.form_name:""}</a></li>:""}
                            {lang ==='en' && FormInfo!==undefined? FormInfo.en_form_name!==""&&<li className="breadcrumb-item active"><a href="#">{FormInfo!==undefined? FormInfo.en_form_name:""}</a></li>:""}
                        </ul>
                    </div>
                    <div className="col-4">
                        <ul className="user">
                            <li className="onhover-dropdown">
                                <div className="media">
                                    <img className="align-self-center" src={userAvatar} alt="header-user" />
                                    <span className="badge"><i className="fa fa-angle-down"></i></span>
                                    <div className="sep"></div>
                                    <div className="media-body">
                                        <h6>{CompanyName}</h6>
                                    </div>
                                </div>

                            </li>
                        </ul>
                    </div>
                </div>


            </div>
        );
    }
}
Header.contextTypes = {
    t: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { lang } = state.i18nState
    const {CompanyName} = state.BasicInfo;
    const { FormInfo } = state.BasicInfo;
    return {
        lang,
        FormInfo,
        CompanyName
    };
}


const connectedHeader = connect(mapStateToProps, null)(Header);
export { connectedHeader as Header };
