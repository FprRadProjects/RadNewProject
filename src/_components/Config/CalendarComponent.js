import React, {Component} from 'react';
import '../../content/css/Calendar.css';
import 'moment-jalaali';
import Calendar from 'react-persian-calendar'

class CalendarComponent extends Component {

    render() {
        const{CalendarChange}=this.props;
        return (
            <div>
                <Calendar onChange={CalendarChange} />

            </div>
        );
    }
}


export default CalendarComponent;