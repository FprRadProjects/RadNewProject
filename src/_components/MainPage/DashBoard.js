import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mainpageActions } from '../../_actions/MainPage';
import FullCalendar from './FullCalendar';

class DashBoard extends Component {
    render() {
        let events = [
            {
                title: 'All Day Event',
                start: '2019-01-25'
            },
            {
                title: 'Long Event',
                start: '2019-01-26'
            },
        ];
        return (
            <FullCalendar events={events} />
        );
    }
}


function mapStateToProps(state) {
    return {
    };
}

const connectedDashBoard = connect(mapStateToProps)(DashBoard);
export { connectedDashBoard as DashBoard };



