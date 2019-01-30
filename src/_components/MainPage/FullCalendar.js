import React, { Component } from 'react';
import 'fullcalendar-jalaali/fullcalendar.min.css'
import $ from 'jquery';
import moment from 'moment';
import jmoment from 'moment-jalaali';
import 'fullcalendar-jalaali/fullcalendar.min.js';
import 'fullcalendar-jalaali/locale-all.js';

class FullCalendar extends Component {
    componentDidMount() {
        const { calendar } = this.refs;
        $(calendar).fullCalendar(
            {
                header: {
                    center: 'nextYear ,next ,title ,prev ,prevYear',
                    right: 'today',
                    left: ''
                },
                dayClick: function (date, jsEvent, view, resourceObj) {
                    alert(jmoment(moment(date).locale('fa').format('YYYY/MM/DD')).format('jYYYY/jMM/jDD'));
                },
                isRTL: true,
                events: this.props.events,
                isJalaali:true,
                locale:"fa"
            }
        );
    }
    render() {
        return (
            <div ref='calendar'></div>
        );
    }
}

export default FullCalendar;