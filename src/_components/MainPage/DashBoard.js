import React, {Component} from 'react';
import {connect} from 'react-redux';
import {mainpageActions} from '../../_actions/MainPage';
import {FullCalendar} from './FullCalendar';
import {LeftCounts} from './LeftCounts';

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
        const {GetEvents, GetCounts} = this.props;


        return (
            <div className="row">

                <FullCalendar GetCounts={GetCounts} GetEvent={GetEvents} Params={CalParams}/>
                <LeftCounts GetCounts={GetCounts} Params={CalParams} />
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

const connectedDashBoard = connect(null, mapDispatchToProps)(DashBoard);
export {connectedDashBoard as DashBoard};



