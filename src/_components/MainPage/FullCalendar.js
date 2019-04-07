import React, { Component } from 'react';
import 'fullcalendar-jalaali/fullcalendar.css'
import '../../content/css/custom-fullcalendar.css';
import $ from 'jquery';
import moment from 'moment';
import jmoment from 'moment-jalaali';
import 'fullcalendar-jalaali/fullcalendar.min.js';
import 'fullcalendar-jalaali/locale-all.js';
import connect from "react-redux/es/connect/connect";
import PropTypes from "prop-types"
import {setLanguage} from "redux-i18n";

class FullCalendar extends Component {

    componentWillUpdate(nextProps, nextState, nextContext) {
        const { calendar } = this.refs;
        const{Events,lang}=  nextProps;
        const events = Events==undefined?events:Events.AllEvent;
        $(calendar).fullCalendar('removeEventSources');
        $(calendar) .fullCalendar( 'addEventSource', events )


    }

    componentDidMount() {

        const lang= localStorage.getItem("lang");
        this.props.dispatch(setLanguage(lang))
        const { calendar } = this.refs;
        const{GetEvent,GetCounts,Params,ChaneSelectedDate}=  this.props;
        $(calendar).fullCalendar(
        {
            header: {
                center: 'nextYear ,next ,title ,prev ,prevYear',
                right: 'today',
                left: ''
            },
            dayClick: function (date, jsEvent, view, resourceObj) {
                //alert(jmoment(moment(date).locale('fa').format('YYYY/MM/DD')).format('jYYYY/jMM/jDD'));

                let calendar=jmoment(moment(date).locale('fa').format('YYYY/MM/DD')).format('jYYYY/jMM/jDD');
                Params.calendar=calendar;
                GetCounts(Params);
                let selectedDate=jmoment(moment(date).locale('fa').format('YYYY/MM/DD')).format('jYYYY/jMM/jDD');
                if(lang==='en')
                    selectedDate=moment(date).locale('fa').format('YYYY/MM/DD');
          
                ChaneSelectedDate(selectedDate);
                var thisDate = jmoment(moment(date).locale('fa').format('YYYY/MM/DD')).format('jYYYY-jMM-jDD');
                $('.fc-day,.fc-day-top').removeClass('fc-highlight');
                $('[data-date="' + thisDate + '"]').addClass("fc-highlight");
            },
            viewRender: function (view, element) {
                Params.startdate=view.start;
                Params.enddate=view.end;
                GetEvent(Params);
                GetCounts(Params);

            },
            isRTL: lang==="fa"?true:false,
            isJalaali: lang==="fa"?true:false,
            locale: lang,
            height: 550,
            buttonIcons: {
                prev: 'right-single-arrow',
                next: 'left-single-arrow',
                prevYear: 'right-double-arrow',
                nextYear: 'left-double-arrow'
            },
        }
    );

}

    render() {

        return (
            <div ref='calendar'></div>
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