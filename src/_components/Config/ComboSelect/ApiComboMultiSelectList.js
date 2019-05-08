import { connect } from "react-redux"
import PropTypes from "prop-types"
import Select from 'react-select';
import React, { Component } from 'react';
import AsyncPaginate from "react-select-async-paginate";
import loadOptions from "./loadOptions";

const CustomOption = props => {
    const { innerProps, innerRef, isDisabled } = props;
    return (!isDisabled ? (
        <table ref={innerRef} {...innerProps} style={{ width: '100%', border: '1px solid #000' }}>
            <tbody>
                <tr>
                    <td>{props.data.value}</td>
                    <td>{props.data.label}</td>
                </tr>
            </tbody>
        </table>
    ) : null)
};

class ApiComboMultiSelectList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
        }
    }
    componentDidMount() {
        const { selectedOption } = this.props;
        this.setState({ selectedOption: selectedOption });
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedOption !== this.props.selectedOption) {
            this.setState({ selectedOption: nextProps.selectedOption });
        }
    }
    handleChange = (selectedOption, e) => {
        const { onChange } = this.props;
        this.setState({ selectedOption });
        onChange(e, selectedOption);
    }
    InputChangeHandler = (event) => {
        return event.replace("ی", "ي");
    }

    render() {
        const {options,name ,classname,isDisabled} = this.props;
        return (

            <AsyncPaginate
                loadOptions={loadOptions}
                components={{ Option: CustomOption }}

                isDisabled={isDisabled}
                onInputChange={this.InputChangeHandler.bind(this)}
                className={classname}
                name={name}
                value={this.state.selectedOption}
                onChange={this.handleChange.bind(this)}
                options={options}
                isRtl
                placeholder="انتخاب کنید"
                classNamePrefix="custom-select"
            />
        );
    }
}


ApiComboMultiSelectList.contextTypes = {
    t: PropTypes.func.isRequired
}

const connectedApiComboMultiSelectList = connect(null, null)(ApiComboMultiSelectList);
export { connectedApiComboMultiSelectList as ApiComboMultiSelectList };