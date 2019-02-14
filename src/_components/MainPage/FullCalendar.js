import React, { Component } from 'react';
import 'fullcalendar-jalaali/fullcalendar.min.css'
import $ from 'jquery';
import moment from 'moment';
import jmoment from 'moment-jalaali';
import 'fullcalendar-jalaali/fullcalendar.min.js';
import 'fullcalendar-jalaali/locale-all.js';
import connect from "react-redux/es/connect/connect";

class FullCalendar extends Component {
    componentWillUpdate(nextProps, nextState, nextContext) {
        const { calendar } = this.refs;
        const{Events}=  nextProps;
        const events = Events==undefined?events:Events.AllEvent;
        $(calendar).fullCalendar('removeEventSources');
        $(calendar) .fullCalendar( 'addEventSource', events )

    }

    componentDidMount() {
    const { calendar } = this.refs;

    const{GetEvent,GetCounts,Params}=  this.props;
    $(calendar).fullCalendar(
        {
            header: {
                center: 'nextYear ,next ,title ,prev ,prevYear',
                right: 'today',
                left: ''
            },
            dayClick: function (date, jsEvent, view, resourceObj) {
                //alert(jmoment(moment(date).locale('fa').format('YYYY/MM/DD')).format('jYYYY/jMM/jDD'));

                Params.calendar=jmoment(moment(date).locale('fa').format('YYYY/MM/DD')).format('jYYYY/jMM/jDD');
                GetCounts(Params);
            },
            viewRender: function (view, element) {
                Params.startdate=view.start;
                Params.enddate=view.end;
                GetEvent(Params);
                GetCounts(Params);

            },
            isRTL: true,
            isJalaali:true,
            locale:"fa"
        }
    );

}

    render() {

        return (
            <div ref='calendar'  className="col-lg-9"></div>
        );
    }
}
function mapStateToProps(state) {
    const { Events} = state.MainPage;
    return {
        Events
    };
}


const connectedFullCalendar = connect(mapStateToProps, null)(FullCalendar);
export { connectedFullCalendar as FullCalendar };