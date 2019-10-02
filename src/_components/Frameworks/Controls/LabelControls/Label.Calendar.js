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
    this.setState({ setDate: nextProps.setDate });
  }
  render() {

    const { DeletedElements, EditedElements, className1, LabelclassName, Text, className2, InputclassName, name, mask,
      CalendarChange, Id, FormId, ColClassName, isDisabled } = this.props;
    return (
      <MenuProvider id="menu_id">
        {(DeletedElements === undefined || DeletedElements["LabelCalendar-" + Id] === undefined ||
          DeletedElements["LabelCalendar-" + Id].IsShow
        ) &&
          <div className={ColClassName === undefined ? "col-6" : ColClassName} id={"LabelCalendar-" + Id} Description={Text} formid={FormId} element={"LabelCalendar-" + Id}>
            <div className={className1 === undefined ? "form-group row" : className1} id={"LabelCalendarDiv1-" + Id} Description={Text} formid={FormId} element={"LabelCalendar-" + Id} >
              <label formid={FormId} className={LabelclassName === undefined ? "col-2 col-form-label" : LabelclassName} id={"LabelCalendarLbl-" + Id} element={"LabelCalendar-" + Id}
                erowid={(EditedElements === undefined || EditedElements["LabelCalendarLbl-" + Id] === undefined) ?
                  0 : EditedElements["LabelCalendarLbl-" + Id].Id}
                public={(EditedElements === undefined || EditedElements["LabelCalendarLbl-" + Id] === undefined) ?
                  "false" : EditedElements["LabelCalendarLbl-" + Id].IsPublic + ""}
                Description={Text}
              >{(EditedElements === undefined || EditedElements["LabelCalendarLbl-" + Id] === undefined) ?
                Text : EditedElements["LabelCalendarLbl-" + Id].Title}</label>
              <div formid={FormId} className={className2 === undefined ? "col-10" : className2} id={"LabelCalendarDiv2-" + Id} element={"LabelCalendar-" + Id} Description={Text}>
                <CalendarDatePicker formid={FormId} fieldname={name}
                  className={InputclassName === undefined ? "form-control my-2  ltr" : InputclassName} element={"LabelCalendar-" + Id}
                  Description={Text} id={"LabelCalendarInput-" + Id} isDisabled={isDisabled}
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
