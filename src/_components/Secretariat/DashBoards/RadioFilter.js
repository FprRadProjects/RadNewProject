import React, { Component } from 'react';
import { RadioGroup, Radio } from 'react-radio-group'
import connect from "react-redux/es/connect/connect";
import PropTypes from "prop-types"
import {CalendarComponent} from "../../Frameworks";

class RadioFilter extends Component {

    constructor(props) {
        super(props);
        const { Params } = this.props;

        this.state = {
            ...this.state,
            filterFields: {
                done: Params.done,
                seen: Params.seen,
                worker: Params.worker,
                date: Params.date,
                calendar: Params.calendar
            }
        }
    }

    handleChange(Value, e) {
        let fields = this.state.filterFields;
        let targetName = e.target.name;
        fields[targetName] = Value;
        const { fetchData, Params } = this.props;
        if (targetName === "date") {
            Params.calendar = "";
            fields.calendar = "";
        } 
        this.setState({ fields });
        Params[targetName] = Value;
        fetchData(Params)
    }


    CalendarChange(event, e) {
        event = event.replace(/-/g, '/');
        const { fetchData, Params } = this.props;
        Params.calendar = event;
        Params.date = null;
        let filterFields = this.state.filterFields;
        filterFields.date = null;
        filterFields.calendar = event;
        this.setState({ filterFields })
        fetchData(Params);
    }
    render() {

        return (
            <div className="r-filter-modal__content">
                <div className="row">
                    <div className="col">
                        <div className="card ">
                            <div className="card-header">
                                <i className="done-work">
                                </i>
                            </div>
                            <div className="card-body">
                                <RadioGroup onChange={this.handleChange.bind(this)}
                                    selectedValue={this.state.filterFields.done}
                                    name="done">
                                    <div className="radio">
                                        <Radio value="0" id="done0" />
                                        <label htmlFor="done0">{this.context.t("undone")}</label>
                                    </div>
                                    <div className="radio">
                                        <Radio value="1" id="done1" />
                                        <label htmlFor="done1">{this.context.t("done")}</label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </div>

                    </div>
                    <div className="col">
                        <div className="card ">
                            <div className="card-header">
                                <i className="seen-work">
                                </i>
                            </div>
                            <div className="card-body">
                                <RadioGroup onChange={this.handleChange.bind(this)}
                                    selectedValue={this.state.filterFields.seen}
                                    name="seen">
                                    <div className="radio">
                                        <Radio value="0" id="seen0" />
                                        <label htmlFor="seen0">{this.context.t("unseen")}</label>
                                    </div>
                                    <div className="radio">
                                        <Radio value="1" id="seen1" />
                                        <label htmlFor="seen1">{this.context.t("seen")}</label>
                                    </div>
                                    <div className="radio">
                                        <Radio value="2" id="seen2" />
                                        <label htmlFor="seen2">{this.context.t("all")}</label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card ">
                            <div className="card-header">
                                <i className="user-mode">
                                </i>
                            </div>
                            <div className="card-body">
                                <RadioGroup onChange={this.handleChange.bind(this)}
                                    selectedValue={this.state.filterFields.worker}
                                    name="worker">
                                    <div className="radio">
                                        <Radio value="0" id="worker0" />
                                        <label htmlFor="worker0">{this.context.t("worker")}</label>
                                    </div>
                                    <div className="radio">
                                        <Radio value="1" id="worker1" />
                                        <label htmlFor="worker1">{this.context.t("manager")}</label>
                                    </div>
                                    <div className="radio">
                                        <Radio value="2" id="worker2" />
                                        <label htmlFor="worker2">{this.context.t("creator")}</label>
                                    </div>
                                    <div className="radio">
                                        <Radio value="3" id="worker3" />
                                        <label htmlFor="worker3">{this.context.t("successor")}</label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card ">
                            <div className="card-header">
                                <i className="range-date">
                                </i>
                            </div>
                            <div className="card-body">
                                <RadioGroup ref="dateName" onChange={this.handleChange.bind(this)}
                                    selectedValue={this.state.filterFields.date}
                                    name="date">
                                    <div className="radio">
                                        <Radio value="0" id="date0" />
                                        <label htmlFor="date0">{this.context.t("all")}</label>
                                    </div>
                                    <div className="radio">
                                        <Radio value="1" id="date1" />
                                        <label htmlFor="date1">{this.context.t("previous_days")}</label>
                                    </div>
                                    <div className="radio">
                                        <Radio value="2" id="date2" />
                                        <label htmlFor="date2">{this.context.t("next_days")}</label>
                                    </div>
                                    <div className="radio">
                                        <Radio value="3" id="date3" />
                                        <label htmlFor="date3">{this.context.t("next_seven_days")}</label>
                                    </div>
                                    <div className="radio">
                                        <Radio value="4" id="date4" />
                                        <label htmlFor="date4">{this.context.t("current_day")}</label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </div>
                    </div>
                    <CalendarComponent CalendarChange={this.CalendarChange.bind(this)} value={this.state.filterFields.calendar} />
                </div>
            </div>
        );

    }
}


RadioFilter.contextTypes = {
    t: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { lang } = state.i18nState
    return {
        lang
    };
}

const connectedRadioFilter = connect(mapStateToProps, null)(RadioFilter);
export { connectedRadioFilter as RadioFilter };