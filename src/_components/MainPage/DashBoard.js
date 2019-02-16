import React, {Component} from 'react';
import {connect} from 'react-redux';
import {mainpageActions} from '../../_actions/MainPage';
import {FullCalendar} from './FullCalendar';
import {LeftCounts} from './LeftCounts';
import PropTypes from "prop-types"

var CalParams = {
    "seen": 2,
    "done": 0,
    "date": 4,
    "calendar": "",
    "worker": 0,
    "typ_id": "0",
    "startdate": "",
    "enddate": ""
};

class DashBoard extends Component {
<<<<<<< HEAD
<<<<<<< HEAD
    componentDidMount() {
        const {GetCounts}=this.props;
        let data = {"seen":2,"done":1,"date":0,"calendar":"","worker":0,"typ_id":"0"}
        GetCounts(data)
    }
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
        const {Value}=this.props;
        console.log(this.props)

        return (
            <div>

                <div>
                    Cheque:{Value!==undefined? Value.Cheque:0}
                </div>
                <div>
                    Email:{Value!==undefined? Value.Email:0}
                </div>
                <div>
                    Message:{Value!==undefined? Value.Message:0}
                </div>
                <div>
                    Note:{Value!==undefined? Value.Note:0}
                </div>
                <div>
                    Secretariat:{Value!==undefined? Value.Secretariat:0}
                </div>
                <div>
                    Work:{Value!==undefined? Value.Work:0}
                </div>
                <div>
                    Sms:{Value!==undefined? Value.Sms:0}
                </div>
            <FullCalendar events={events} />
=======
    render() {
        CalParams = {
            "seen": 2,
            "done": 0,
            "date": 4,
            "calendar": "",
            "worker": 0,
            "typ_id": "0",
            "startdate": "",
            "enddate": ""
        };
        const {GetEvents, GetCounts,alert} = this.props;

        return (
=======
    render() {
        CalParams = {
            "seen": 2,
            "done": 0,
            "date": 4,
            "calendar": "",
            "worker": 0,
            "typ_id": "0",
            "startdate": "",
            "enddate": ""
        };
        const {GetEvents, GetCounts,alert} = this.props;

        return (
>>>>>>> 5fb4c5cd86af2aa19fbcaeb48924aa4d70f8caab
            <div className="row">

                <FullCalendar GetCounts={GetCounts} GetEvent={GetEvents} Params={CalParams}/>
                <LeftCounts GetCounts={GetCounts} Params={CalParams} />
                {alert.message &&
                <div className={`alert ${alert.type}`}>{alert.message}</div>
                }
<<<<<<< HEAD
>>>>>>> 5fb4c5cd86af2aa19fbcaeb48924aa4d70f8caab
=======
>>>>>>> 5fb4c5cd86af2aa19fbcaeb48924aa4d70f8caab
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => ({
    GetCounts: (Params) => {
        dispatch(mainpageActions.GetCounts(Params))
    },

    GetEvents: (Params) => {
        dispatch(mainpageActions.GetEvents(Params))
    }
});
DashBoard.contextTypes = {
    t: PropTypes.func.isRequired
}

function mapStateToProps(state) {
<<<<<<< HEAD
<<<<<<< HEAD
    const { Value} = state.Common;
   console.log(Value)
    return {
        Value
=======
=======
>>>>>>> 5fb4c5cd86af2aa19fbcaeb48924aa4d70f8caab
    const {alert} = state;
    const {lang} = state.i18nState
    return {
        alert,
        lang
<<<<<<< HEAD
>>>>>>> 5fb4c5cd86af2aa19fbcaeb48924aa4d70f8caab
=======
>>>>>>> 5fb4c5cd86af2aa19fbcaeb48924aa4d70f8caab
    };
}
const mapDispatchToProps = dispatch => ({
    GetCounts: (Params) => {
        dispatch(mainpageActions.GetCounts(Params))
    }
});

<<<<<<< HEAD
<<<<<<< HEAD
const connectedDashBoard = connect(mapStateToProps,mapDispatchToProps)(DashBoard);
export { connectedDashBoard as DashBoard };
=======
const connectedDashBoard = connect(mapStateToProps, mapDispatchToProps)(DashBoard);
export {connectedDashBoard as DashBoard};
>>>>>>> 5fb4c5cd86af2aa19fbcaeb48924aa4d70f8caab
=======
const connectedDashBoard = connect(mapStateToProps, mapDispatchToProps)(DashBoard);
export {connectedDashBoard as DashBoard};
>>>>>>> 5fb4c5cd86af2aa19fbcaeb48924aa4d70f8caab



