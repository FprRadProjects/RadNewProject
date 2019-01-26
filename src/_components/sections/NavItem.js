import React, {Component} from 'react';
import {Route,Link} from 'react-router-dom'
class NavItem extends Component {
    render() {
        const{to,activeOnlyWhenExact,children}=this.props
        return (
            <div>
                <Route
                    path={to}
                    exact={activeOnlyWhenExact}
                    children={({ match }) => (
                        <li className={["nav-item",match ? "active" : ""].join(' ')} >
                            <Link className="nav-link" to={to}>{children}</Link>
                        </li>
                    )}
                />
            </div>
        );
    }
}


export default NavItem;
