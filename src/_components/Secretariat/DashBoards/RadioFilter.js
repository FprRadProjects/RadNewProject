
import React, {Component} from 'react';
import {RadioGroup, Radio} from 'react-radio-group'
import connect from "react-redux/es/connect/connect";
import PropTypes from "prop-types"

class RadioFilter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            filterFields: {
                done: "0",
                seen: "2",
                worker: "0",
                date: "0"
            }
        }
    }

    handleChange(Value, e) {
        let fields=this.state.filterFields;
        let targetName=e.target.name;
        fields[targetName]=Value;
        const {fetchData, Params} = this.props;
        if(targetName==="date")
            Params["calendar"] = "";

        this.setState({fields});
        Params[targetName] = Value;
        fetchData(Params)
    }

    render() {
        return (
            <div className="col-lg-3">
                <RadioGroup onChange={this.handleChange.bind(this)}
                            selectedValue={this.state.filterFields.done}
                            name="done">
                    <label>
                        <Radio value="0"/>{this.context.t("undone")}
                    </label>
                    <label>
                        <Radio value="1"/>{this.context.t("done")}
                    </label>
                </RadioGroup>
                <br/>
                <RadioGroup onChange={this.handleChange.bind(this)}
                            selectedValue={this.state.filterFields.seen}
                            name="seen">
                    <label>
                        <Radio value="0"/>{this.context.t("unseen")}
                    </label>
                    <label>
                        <Radio value="1"/>{this.context.t("seen")}
                    </label>
                    <label>
                        <Radio value="2"/>{this.context.t("all")}
                    </label>
                </RadioGroup>
                <br/>
                <RadioGroup onChange={this.handleChange.bind(this)}
                            selectedValue={this.state.filterFields.worker}
                            name="worker">
                    <label>
                        <Radio value="0"/>{this.context.t("worker")}
                    </label>
                    <label>
                        <Radio value="1"/>{this.context.t("manager")}
                    </label>
                    <label>
                        <Radio value="2"/>{this.context.t("creator")}
                    </label>
                    <label>
                        <Radio value="3"/>{this.context.t("successor")}
                    </label>
                </RadioGroup>
                <br/>
                <RadioGroup onChange={this.handleChange.bind(this)}
                            selectedValue={this.state.filterFields.date}
                            name="date">
                    <label>
                        <Radio value="0"/>{this.context.t("all")}
                    </label>
                    <label>
                        <Radio value="1"/>{this.context.t("previous_days")}
                    </label>
                    <label>
                        <Radio value="2"/>{this.context.t("next_days")}
                    </label>
                    <label>
                        <Radio value="3"/>{this.context.t("next_seven_days")}
                    </label>
                    <label>
                        <Radio value="4"/>{this.context.t("current_day")}
                    </label>
                </RadioGroup>
            </div>
        );
    }
}


RadioFilter.contextTypes = {
    t: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const {lang} = state.i18nState
    return {
        lang
    };
}

const connectedRadioFilter = connect(mapStateToProps, null)(RadioFilter);
export {connectedRadioFilter as RadioFilter};