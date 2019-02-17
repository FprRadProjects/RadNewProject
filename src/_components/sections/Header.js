import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import NavItem from "./NavItem";
import {userActions} from '../../_actions/User';
import {history} from "../../_helpers";
import PropTypes from "prop-types"
import {connect} from 'react-redux';

class Header extends Component {
    handleLogout = (event) => {
        userActions.logout();
        history.push("/login")
    }

    render() {
        const {auth: isAuthenticated, users} = this.props;

        return (

            <nav className="navbar navbar-expand-md navbar-dark bg-dark rtl">
                <Link className="navbar-brand" to="/"></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04"
                        aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarsExample04">
                    <ul className="navbar-nav mr-auto">
                        <NavItem className="nav-link"  activeOnlyWhenExact={true} to="/">{this.context.t("home")}</NavItem>
                        <NavItem className="nav-link" to="/works">{this.context.t("work_dashboard")}</NavItem>
                        <NavItem className="nav-link" to="/references">{this.context.t("references_dashboard")}</NavItem>
                        {users && users !== "Network Error" ?
                            <label className="text-white">
                                {this.context.t("user_login")}: {users.username}
                            </label>
                            : <h5>{this.context.t("user_info_not_available")}</h5>}
                        {
                            isAuthenticated
                                ? (
                                    <Link className="btn btn-success " to="/login"
                                          onClick={this.handleLogout.bind(this)}>{this.context.t("logout")}</Link>
                                ) : (
                                    <div>
                                    </div>
                                )
                        }
                    </ul>
                    <div className="my-2 my-lg-0">

                    </div>
                </div>
            </nav>


        );
    }
}
Header.contextTypes = {
    t: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const {lang} = state.i18nState
    return {
        lang
    };
}


const connectedHeader = connect(mapStateToProps,null)(Header);
export { connectedHeader as Header };
