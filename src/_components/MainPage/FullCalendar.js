import React, { useState, useEffect, useContext,useRef } from 'react'
import 'fullcalendar-jalaali/fullcalendar.css'
import '../../content/css/custom-fullcalendar.css';
import $ from 'jquery';
import moment from 'moment';
import jmoment from 'moment-jalaali';
import 'fullcalendar-jalaali/fullcalendar.min.js';
import 'fullcalendar-jalaali/locale-all.js';
import connect from "react-redux/es/connect/connect";
import PropTypes from "prop-types"
import { setLanguage } from "redux-i18n";

function FullCalendar(props, context,refs) {
    const ref = React.useRef(null);

    useEffect(() => {

        const lang = localStorage.getItem("lang");
        props.dispatch(setLanguage(lang))
         const calendar = ref.current;
        $(calendar).fullCalendar(
            {
                header: {
                    center: 'nextYear ,next ,title ,prev ,prevYear',
                    right: 'today',
                    left: ''
                },
                dayClick: function (date, jsEvent, view, resourceObj) {
                    //alert(jmoment(moment(date).locale('fa').format('YYYY/MM/DD')).format('jYYYY/jMM/jDD'));

                    let calendar = jmoment(moment(date).locale('fa').format('YYYY/MM/DD')).format('jYYYY/jMM/jDD');
                    props.Params.calendar = calendar;
                    props.GetCounts(props.Params);
                    let selectedDate = jmoment(moment(date).locale('fa').format('YYYY/MM/DD')).format('jYYYY/jMM/jDD');
                    if (lang === 'en')
                        selectedDate = moment(date).locale('fa').format('YYYY/MM/DD');

                    props.ChaneSelectedDate(selectedDate);
                    var thisDate = jmoment(moment(date).locale('fa').format('YYYY/MM/DD')).format('jYYYY-jMM-jDD');
                    $('.fc-day,.fc-day-top').removeClass('fc-highlight');
                    $('[data-date="' + thisDate + '"]').addClass("fc-highlight");
                },
                viewRender: function (view, element) {
                    props.Params.startdate = view.start;
                    props.Params.enddate = view.end;
                    props.GetEvent(props.Params);
                    props.GetCounts(props.Params);

                },
                isRTL: lang === "fa" ? true : false,
                isJalaali: lang === "fa" ? true : false,
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
        const events =  props.Events == undefined ? [] :  props.Events.AllEvent;
        $(calendar).fullCalendar('removeEventSources');
        $(calendar).fullCalendar('addEventSource', events)
        return () => {

        }
    }, [ props]);


  


    return (
        <div ref={ref}></div>
    );
}
FullCalendar.contextTypes = {
    t: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    //const { Events } = state.MainPage;
    const { lang } = state.i18nState
    return {
        // Events,
        lang
    };
}


const connectedFullCalendar = connect(mapStateToProps, null)(FullCalendar);
export { connectedFullCalendar as FullCalendar };