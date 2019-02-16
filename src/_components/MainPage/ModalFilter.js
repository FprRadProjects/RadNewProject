import React, {Component} from 'react';
import {RadioGroup, Radio} from 'react-radio-group'
import connect from "react-redux/es/connect/connect";
import PropTypes from "prop-types"

class ModalFilter extends Component {

    handleDoneChange(value) {
        const {GetEvent, GetCounts, Params} = this.props;

        Params.done = value;
        GetCounts(Params)
        GetEvent(Params)
    }

    handleSeenChange(value) {
        const {GetEvent, GetCounts, Params} = this.props;

        Params.seen = value;
        GetCounts(Params)
        GetEvent(Params)
    }

    handleWorkerChange(value) {
        const {GetEvent, GetCounts, Params} = this.props;

        Params.worker = value;
        GetCounts(Params)
        GetEvent(Params)
    }
    handleDateChange(value) {
        const {GetEvent, GetCounts, Params} = this.props;

        Params.date = value;
        GetCounts(Params)
        GetEvent(Params)
    }

    render() {
        return (
            <div className="col-lg-3">
                <RadioGroup onChange={this.handleDoneChange.bind(this)}
                            name="done">
                    <label>
                        <Radio value="0"/>{this.context.t("undone")}
                    </label>
                    <label>
                        <Radio value="1"/>{this.context.t("done")}
                    </label>
                </RadioGroup>
                <br/>
                <RadioGroup onChange={this.handleSeenChange.bind(this)}
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
                <RadioGroup onChange={this.handleWorkerChange.bind(this)}
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
                <RadioGroup onChange={this.handleDateChange.bind(this)}
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
                        <Radio value="3"/>{this.context.t("Current_day")}
                    </label>
                </RadioGroup>
            </div>
        );
    }
}


ModalFilter.contextTypes = {
    t: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const {lang} = state.i18nState
    return {
        lang
    };
}

const connectedModalFilter = connect(mapStateToProps, null)(ModalFilter);
export {connectedModalFilter as ModalFilter};