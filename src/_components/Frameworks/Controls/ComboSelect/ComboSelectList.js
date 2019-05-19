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
    componentWillReceiveProps(nextProps){
        if(nextProps.selectedOption!==this.props.selectedOption){
            this.setState({selectedOption:nextProps.selectedOption });
          }
    }
    handleChange = (selectedOption,e) => {
        const {onChange } = this.props;
        this.setState({ selectedOption });
        onChange(e,selectedOption);
      }
      InputChangeHandler=(event)=>{
       return event.replace("ی", "ي");
      }
    render() { 

        const {options,name ,classname,isDisabled} = this.props;
        return (
            <Select isDisabled={isDisabled}
            onInputChange={this.InputChangeHandler.bind(this)}
            className={classname}
            name={name}
        value={this.state.selectedOption}
        onChange={this.handleChange.bind(this)}
        options={options}
        isRtl
        placeholder={this.context.t("Select")}
        classNamePrefix="custom-select"
      />
        );
    }
}

ComboSelectList.contextTypes = {
    t: PropTypes.func.isRequired
}



const connectedComboSelectList = connect(null, null)(ComboSelectList);
export {connectedComboSelectList as ComboSelectList};
