import React, { Component } from 'react';
import { connect } from "react-redux"
import { JalaliField } from 'material-ui-hichestan-datetimepicker';
import { MuiThemeProvider } from '@material-ui/core/styles';

class CalendarDatePicker extends Component {

  constructor(props) {
    super(props);
    const { setDate } = this.props;
    this.state = {
      value: setDate,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.setDate !== this.state.value) {
      this.setState({ value: nextProps.setDate });
    }
  }
  onChange = name => event => {
    this.setState({
      value: event.target.formatted,
    });
    const { CalendarChange, fieldname,disabled } = this.props;
    CalendarChange(event.target.formatted, fieldname);
  }

  render() {
    const { formid } = this.props;
    return (
        <MuiThemeProvider >
          <JalaliField  formid={formid}
            id="standard-name"
            value={this.state.value}
            onChange={this.onChange('value')}
            margin="normal"
            style={{ width: '100%' }}
            autoComplete="off"
          />

        </MuiThemeProvider>
    );
  }
}


const connectedCalendarDatePicker = connect(null, null)(CalendarDatePicker);
export { connectedCalendarDatePicker as CalendarDatePicker };


