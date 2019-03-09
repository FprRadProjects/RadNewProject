import React, {Component} from 'react';
import {connect} from "react-redux"
import PropTypes from "prop-types"
import Select from 'react-select';
class ComboSelectList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
          }
    }
    componentDidMount(){
        const {selectedOption } = this.props;
        this.setState({ selectedOption:selectedOption });

    }
    handleChange = (selectedOption,e) => {
        const {onChange } = this.props;
        this.setState({ selectedOption });
        onChange(e,selectedOption);
      }
    render() { 

        const {options,name } = this.props;
        return (
            <Select
            name={name}
        value={this.state.selectedOption}
        onChange={this.handleChange.bind(this)}
        options={options}
      />
        );
    }
}

ComboSelectList.contextTypes = {
    t: PropTypes.func.isRequired
}



const connectedComboSelectList = connect(null, null)(ComboSelectList);
export {connectedComboSelectList as ComboSelectList};
