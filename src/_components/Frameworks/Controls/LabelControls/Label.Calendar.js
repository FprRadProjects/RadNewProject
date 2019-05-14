import React, { Component } from 'react';
import { connect } from "react-redux"
import PropTypes from "prop-types"
import InputMask from 'react-input-mask';
import { MenuProvider } from "react-contexify";
import {
  CalendarDatePicker
} from "../Calendar";
class LabelCalendar extends Component {
  constructor(props) {
    super(props);
    const { setDate } = this.props;
    this.state = {
      setDate: setDate
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.setDate !== this.state.setDate) {
      this.setState({ setDate: nextProps.setDate });
    }
  }
  render() {

    const { DeletedElements, EditedElements, className1, LabelclassName, Text, className2, InputclassName, name, mask,
      CalendarChange, Id, FormId, ColClassName } = this.props;
    return (
      <MenuProvider id="menu_id">
        {(DeletedElements === undefined || DeletedElements["LabelCalendar-" + Id] === undefined ||
          DeletedElements["LabelCalendar-" + Id].IsShow
        ) &&
          <div className={ColClassName} id={"LabelCalendar-" + Id} Description={Text} formid={FormId} element={"LabelCalendar-" + Id}>
            <div className={className1} id={"LabelCalendarDiv1-" + Id} Description={Text} formid={FormId} element={"LabelCalendar-" + Id} >
              <span formid={FormId} className={LabelclassName} id={"LabelCalendarLbl-" + Id} element={"LabelCalendar-" + Id}
                erowid={(EditedElements === undefined || EditedElements["LabelCalendarLbl-" + Id] === undefined) ?
                  0 : EditedElements["LabelCalendarLbl-" + Id].Id}
                public={(EditedElements === undefined || EditedElements["LabelCalendarLbl-" + Id] === undefined) ?
                  "false" : EditedElements["LabelCalendarLbl-" + Id].IsPublic + ""}
                Description={Text}
              >{(EditedElements === undefined || EditedElements["LabelCalendarLbl-" + Id] === undefined) ?
                Text : EditedElements["LabelCalendarLbl-" + Id].Title}</span>
              <div formid={FormId} className={className2} id={"LabelCalendarDiv2-" + Id} element={"LabelCalendar-" + Id} Description={Text}>
                <CalendarDatePicker formid={FormId} fieldname={name}
                  className={InputclassName} element={"LabelCalendar-" + Id}
                  Description={Text} id={"LabelCalendarInput-" + Id}
                  setDate={this.state.setDate} CalendarChange={CalendarChange.bind(this)} />
              </div>
            </div>
          </div>
        }

      </MenuProvider>
    );
  }
}

LabelCalendar.contextTypes = {
  t: PropTypes.func.isRequired
}



const connectedLabelCalendar = connect(null, null)(LabelCalendar);
export { connectedLabelCalendar as LabelCalendar };
