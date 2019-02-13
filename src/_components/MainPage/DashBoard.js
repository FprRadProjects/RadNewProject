import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mainpageActions } from '../../_actions/MainPage';
import FullCalendar from './FullCalendar';

class DashBoard extends Component {
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
            </div>
        );
    }
}


function mapStateToProps(state) {
    const { Value} = state.Common;
   console.log(Value)
    return {
        Value
    };
}
const mapDispatchToProps = dispatch => ({
    GetCounts: (Params) => {
        dispatch(mainpageActions.GetCounts(Params))
    }
});

const connectedDashBoard = connect(mapStateToProps,mapDispatchToProps)(DashBoard);
export { connectedDashBoard as DashBoard };



