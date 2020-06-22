import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import PropTypes from "prop-types"
import { connect } from 'react-redux';
import { history } from "../../_helpers";

import {
    BasicInfo_action
} from "../../_actions";
class NavItem extends Component {
    onClick = (e) => {
        const { UserAccessForm, AccessInfo, AccessType, OnClickHandler, lang, Id } = this.props;
        if (AccessInfo !== undefined) {
            let formName = lang == "fa" ? AccessInfo.form_name : AccessInfo.en_form_name;
            let AccessParams = { "sysname": AccessInfo.sys_name, "type": AccessType !== undefined ? AccessType : "show", formname: formName };
            if (AccessInfo.sys_name !== 'web_fm_mainpage') {
                UserAccessForm(AccessParams).then(data => {
                    if (data.status) {
                        if (OnClickHandler !== undefined)
                            OnClickHandler();
                        else {
                            var linkId = document.getElementById(Id);
                            linkId.click();
                        }
                    }
                    else {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                });
            } else {
                if (OnClickHandler !== undefined)
                    OnClickHandler();
                else {
                    var linkId = document.getElementById(Id);
                    linkId.click();
                }
            }
        }
        else {
            if (OnClickHandler !== undefined)
                OnClickHandler();
            else {
                var linkId = document.getElementById(Id);
                linkId.click();
            }
        }
    }
    render() {
        const { to, activeOnlyWhenExact, children, Id } = this.props
        return (
            <Route
                path={to}
                exact={activeOnlyWhenExact}
                children={({ match }) => (
                    // <li className={["nav-item",match ? "active" : ""].join(' ')} >
                    //     <Link className="nav-link" to={to}>{children}</Link>
                    // </li>
                    <li>
                        <Link to={to} id={Id} style={{ display: 'none' }} ></Link>
                        <a onClick={this.onClick.bind(this)} >{children}</a>
                    </li>
                )}
            />
        );
    }
}


NavItem.contextTypes = {
    t: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
    UserAccessForm: (Params) => {
        return dispatch(BasicInfo_action.UserAccessForm(Params))
    },
});

function mapStateToProps(state) {
    const { lang } = state.i18nState
    return {
        lang,
    };
}

const connectedNavItem = connect(mapStateToProps, mapDispatchToProps)(NavItem);
export { connectedNavItem as NavItem };
