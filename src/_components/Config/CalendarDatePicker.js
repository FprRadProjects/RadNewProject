import React, { Component } from 'react';
import PropTypes from "prop-types"
import {connect} from "react-redux"
import { JalaliField } from 'material-ui-hichestan-datetimepicker';
import { create } from 'jss';
import rtl from 'jss-rtl';
import JssProvider from 'react-jss/lib/JssProvider';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
const theme = createMuiTheme({
  direction: "rtl",
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      'Nahid',
    ].join(','),
  },  
});

const generateClassName = createGenerateClassName();
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
class CalendarDatePicker extends Component {
  
    constructor(props) {
        super(props);
        const { setDate } = this.props;
        this.state = {
          value: setDate,
        };
    }

      onChange=name=>event=>{
        this.setState({
          value: event.target.formatted,
        });
         const{CalendarChange,fieldname}=this.props;
         CalendarChange(event.target.formatted,fieldname);
      }
  
    render() {
        return (
          <JssProvider jss={jss} generateClassName={generateClassName}>
          <MuiThemeProvider theme={theme}>
            <JalaliField
          id="standard-name"
          value={this.state.value}
          onChange={this.onChange('value')}
          margin="normal"
          style={{width: '100%'}}
        />
        
        </MuiThemeProvider>
      </JssProvider>
        );
    }
}


const connectedCalendarDatePicker = connect(null, null)(CalendarDatePicker);
export {connectedCalendarDatePicker as CalendarDatePicker};


