import React, {Component} from 'react';
import '../../../../content/css/Calendar.css';
import 'moment-jalaali';
import Calendar from 'react-persian-calendar'
import PropTypes from "prop-types"
import connect from "react-redux/es/connect/connect";

class CalendarComponent extends Component {

    render() {
        const{CalendarChange,value}=this.props;
        return (
            <div className="col">
            {value!=="" && value!==undefined  && <h5 className="text-center">{this.context.t("SelectedDate")} : {value}</h5>}
                <Calendar onChange={CalendarChange.bind(this)}  today={value} />

            </div>
        );
    }
}


CalendarComponent.contextTypes = {
    t: PropTypes.func.isRequired
}

const connectedCalendarComponent = connect(null, null)(CalendarComponent);
export { connectedCalendarComponent as CalendarComponent };