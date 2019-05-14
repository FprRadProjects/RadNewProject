import { connect } from "react-redux"
import PropTypes from "prop-types"
import Select from 'react-select';
import React, { Component } from 'react';
import AsyncPaginate from "react-select-async-paginate";

var LoadParams = {}
class ApiComboMultiSelectList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            Params: this.props.Params
        }

    }
    componentDidMount() {
        const { selectedOption } = this.props;
        this.setState({ selectedOption: selectedOption });
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedOption !== this.props.selectedOption)
            this.setState({ selectedOption: nextProps.selectedOption });
        if (nextProps.Params !== this.props.Params)
            this.setState({ Params: nextProps.Params });
    }
    handleChange = (selectedOption, e) => {
        const { onChange } = this.props;
        this.setState({ selectedOption: { label: selectedOption.name + " - " + selectedOption.coname, value: selectedOption.id_taraf } });
        console.log(selectedOption)
        onChange(e, this.state.selectedOption);
    }
    InputChangeHandler = (event) => {
        return event.replace("ی", "ي");
    }

    loadOptions = async (search, prevOptions) => {
        const { fetchData, showField } = this.props;
        LoadParams = this.state.Params;
        var filter = [];
        if (search) {
            search = search.replace("ی", "ي");
            filter = Object.keys(showField).map((keyName, index) => {
                return (
                    { "columnName": showField[keyName], "operation": "contains", "value": search }
                )
            });
            LoadParams.filter = filter;
            LoadParams.page = 1;
        }
        console.log(LoadParams)
        return fetchData(LoadParams).then(data => {
            if (data.status) {
                const hasMore = LoadParams.page * LoadParams.pagesize < data.data.totalcount;
                if (hasMore)
                    LoadParams.page = LoadParams.page + 1;
                return Promise.resolve({
                    options: data.data.rows,
                    hasMore
                });
            }
        });

    };
    CustomOption = props => {
        const { showField } = this.props;
        const { innerProps, innerRef, isDisabled } = props;
        return (!isDisabled ? (
            <table ref={innerRef} {...innerProps} style={{ width: '100%', border: '1px solid #000' }}>
                <tbody>
                    <tr className="row">
                        {showField !== undefined && Object.keys(showField).map((keyName, index) => {
                            return (
                                <td className="col-2">{props.data[showField[keyName]]}</td>
                            )
                        })}
                    </tr>
                </tbody>
            </table>
        ) : null)
    };
    render() {
        const { name, classname, isDisabled, fetchData, Params } = this.props;
        return (

            <AsyncPaginate
                loadOptions={this.loadOptions}
                components={{ Option: this.CustomOption }}
                isDisabled={isDisabled}
                // onInputChange={this.InputChangeHandler.bind(this)}
                className={classname}
                name={name}
                value={this.state.selectedOption}
                // onChange={this.handleChange.bind(this)}
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