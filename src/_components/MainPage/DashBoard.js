import React, {Component} from 'react';
import { connect } from 'react-redux';

class DashBoard extends Component {
    render() {
        return (
            <div>
                Full Calendar
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
    };
}

const connectedDashBoard = connect(mapStateToProps)(DashBoard);
export { connectedDashBoard as DashBoard };



