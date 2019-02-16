import React, { Component } from 'react';
import 'fullcalendar-jalaali/fullcalendar.min.css'
import $ from 'jquery';
import moment from 'moment';
import jmoment from 'moment-jalaali';
import 'fullcalendar-jalaali/fullcalendar.min.js';
import 'fullcalendar-jalaali/locale-all.js';
import connect from "react-redux/es/connect/connect";
import PropTypes from "prop-types"

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

    const{GetEvent,GetCounts,Params,lang}=  this.props;
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
            isRTL: lang==="fa"?true:false,
            isJalaali: lang==="fa"?true:false,
            locale: lang
        }
    );

}

    render() {

        return (
            <div ref='calendar'  className="col-lg-9"></div>
        );
    }
}
FullCalendar.contextTypes = {
    t: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { Events} = state.MainPage;
    const {lang} = state.i18nState
    return {
        Events,
        lang
    };
}


const connectedFullCalendar = connect(mapStateToProps, null)(FullCalendar);
export { connectedFullCalendar as FullCalendar };