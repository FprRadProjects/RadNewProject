import React, { Component } from 'react';
import { connect } from "react-redux";
import { RadioGroup, Radio } from 'react-radio-group';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import PropTypes from "prop-types"
import { SelectProjectModal } from "../../Project/";
import { SelectDefaultTextModal } from "../../Basic/";

import { Act_Reference, AutoBasicInfo_action, WorkBasic_action, design_Actions, WorkActions_action } from "../../../_actions";
import { FormInfo } from "../../../locales";
import { toast } from 'react-toastify';
import { RibbonNewReferral } from '../Ribbon/Ribbon.NewReferral';
import { ComboSelectList, CalendarDatePicker } from "../../Config";

var SaveParams = { form: "", data: [] };
var workTypeParams = { FlowId: 0, WorkGroupId: 0, HasFormGen: 0 }

class NewReferral extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            modal: false,
            workTypeSelectedOption: {},
            prioritySelectedOption: {},
            rollSelectedOption:{},
            backdrop: "static",
            modalClass: "modal-dialog-centered modal-xl r-modal r-referral-modal"
        };
    }
    componentDidMount() {
        const { SelectWorkTypeList,SelectPriorityList,SelectRoleList } = this.props;
        SelectPriorityList();
        SelectRoleList();
        SelectWorkTypeList(workTypeParams);
    }
    onReferralTypechangeHandle = (e, val) => {

    }
    onPrioritychangeHandle = (e, val) => {

    }
    onRollchangeHandle = (e, val) => {

    }
    ReferralDurationDateChange = (value, name) => {
    }
    ReferralDurationTimeHandle() {

    }
    OpenReferralTo() {

    }
    render() {
        const {  modal, toggle,SelectWorkTypeList_rows,SelectPriorityList_rows,
            SelectRoleList_rows} = this.props;
        var None = [{ value: 0, label: this.context.t("NoSelection") }]
        var RollList_rows = [{ value: 0, label: this.context.t("NoSelection") }];
        var ReferralTypeList = None.concat(SelectWorkTypeList_rows)
        var PriorityList = None.concat(SelectPriorityList_rows)
        var RollList = None.concat(SelectRoleList_rows)
        const modalBackDrop = `
        .modal-backdrop {
            opacity:.98!important;
            background: rgb(210,210,210);
            background: -moz-linear-gradient(-45deg, rgba(210,210,210,1) 0%, rgba(229,235,238,1) 50%, rgba(216,216,216,1) 50.1%, rgba(216,216,216,1) 100%);
            background: -webkit-linear-gradient(-45deg, rgba(210,210,210,1) 0%,rgba(229,235,238,1) 50%,rgba(216,216,216,1) 50.1%,rgba(216,216,216,1) 100%);
            background: linear-gradient(135deg, rgba(210,210,210,1) 0%,rgba(229,235,238,1) 50%,rgba(216,216,216,1) 50.1%,rgba(216,216,216,1) 100%);
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#d2d2d2', endColorstr='#d8d8d8',GradientType=1 );
        }`;
        return (
            <div>
                <Modal isOpen={modal} toggle={toggle} keyboard={false}
                    className={this.state.modalClass} backdrop={this.state.backdrop}>
                    <ModalHeader toggle={toggle}>{this.context.t("Referral")}</ModalHeader>
                    <ModalBody>
                        <div className="r-main-box__ribbon">
                            <RibbonNewReferral />
                        </div>
                        <div className="referral-modal">
                            <div className="row bg-gray mg-b-5">
                                <div className="col-1 d-flex">
                                    <span className="row-icon flow"></span>
                                </div>
                                <div className="col-11">
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="form-group row">
                                                <label className="col-2 col-form-label">{this.context.t("ReferralType")}</label>
                                                <div className="col-10">
                                                    {SelectWorkTypeList_rows !== undefined &&
                                                        <ComboSelectList options={ReferralTypeList} classname="my-2" name="referral_type_id" onChange={this.onReferralTypechangeHandle.bind(this)} selectedOption={this.state.workTypeSelectedOption} />
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group row">
                                                <label className="col-2 col-form-label">{this.context.t("Priority")}</label>
                                                <div className="col-10">
                                                    {SelectPriorityList_rows !== undefined &&
                                                        <ComboSelectList options={PriorityList} name="priority_id" classname="my-2" onChange={this.onPrioritychangeHandle.bind(this)} selectedOption={this.state.prioritySelectedOption} />
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="row bg-gray mg-b-5">
                                <div className="col-1 d-flex">
                                    <span className="row-icon creator"></span>
                                </div>
                                <div className="col-11">
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="form-group row">
                                                <label className="col-2 col-form-label">{this.context.t("Roll")}</label>
                                                <div className="col-10">
                                                    {SelectRoleList_rows !== undefined &&
                                                        <ComboSelectList options={RollList} name="roll_id" classname="my-2" onChange={this.onRollchangeHandle.bind(this)} selectedOption={this.state.rollSelectedOption} />
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group row">
                                                <label className="col-2 col-form-label">{this.context.t("ReferralTo")}</label>
                                                <div className="col-10">
                                                    <div className="input-group my-2">
                                                        <div className="input-group-prepend">
                                                            <Button color="primary"
                                                                onClick={this.OpenReferralTo.bind(this)}>{this.context.t("ReferralTo")}</Button>
                                                        </div>
                                                        <input type="text" autoComplete="off" className="form-control" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="row bg-gray mg-b-5">
                                <div className="col-1 d-flex">
                                    <span className="row-icon flow"></span>
                                </div>
                                <div className="col-11">
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="form-group row">
                                                <label className="col-2 col-form-label">{this.context.t("ReferralDurationDate")}</label>
                                                <div className="col-10">
                                                    <CalendarDatePicker className="form-control my-2" id="acfas" fieldname="" CalendarChange={this.ReferralDurationDateChange.bind(this)} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group row">
                                                <label className="col-2 col-form-label">{this.context.t("ReferralDurationTime")}</label>
                                                <div className="col-10">
                                                    <input type="text" autoComplete="off" className="form-control my-2" name=""

                                                        onChange={this.ReferralDurationTimeHandle.bind(this)} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="row bg-gray">
                                <div className="col-1 d-flex">
                                    <span className="row-icon description"></span>
                                </div>
                                <div className="col-11">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="form-group row">
                                                <label className="col-1 col-form-label">{this.context.t("ReferralDescription")}</label>
                                                <div className="col-11">
                                                    <textarea type="text" className="form-control my-2" rows="5"
                                                        name="" ref=""></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* {this.state.ReferralTomodal &&
                                    <ReferralToModal modal={this.state.ReferralTomodal}
                                        toggle={this.CloseReferralTo.bind(this)}
                                        Successtoggle={this.SuccessReferralTo.bind(this)}
                                    />} */}
                        </div>
                        <style>{modalBackDrop}</style>
                    </ModalBody>
                    <ModalFooter>
                        <h4>اختیارات</h4>
                        <div className="row authority">
                            <div className="col-8">
                                <div className="row">
                                    <div className="col-3">
                                        <div className="card ">
                                            <div className="card-header">
                                                <i className="done-work">
                                                </i>
                                            </div>
                                            <div className="card-body">
                                                <RadioGroup
                                                    name="import">
                                                    <div className="radio">
                                                        <Radio value="0" id="import0" />
                                                        <label htmlFor="import0">{this.context.t("ImportInformationFromLetter")}</label>
                                                    </div>
                                                    <div className="radio">
                                                        <Radio value="1" id="import1" />
                                                        <label htmlFor="import1">{this.context.t("ImportAttachmentFromLetter")}</label>
                                                    </div>
                                                </RadioGroup>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className="card ">
                                            <div className="card-header">
                                                <i className="done-work">
                                                </i>
                                            </div>
                                            <div className="card-body">
                                                <RadioGroup
                                                    name="send">
                                                    <div className="radio">
                                                        <Radio value="0" id="send0" />
                                                        <label htmlFor="send0">{this.context.t("SendSmsToUser")}</label>
                                                    </div>
                                                    <div className="radio">
                                                        <Radio value="1" id="send1" />
                                                        <label htmlFor="send1">{this.context.t("SendEmailToUser")}</label>
                                                    </div>
                                                </RadioGroup>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className="card ">
                                            <div className="card-header">
                                                <i className="done-work">
                                                </i>
                                            </div>
                                            <div className="card-body">
                                                <RadioGroup
                                                    name="referral">
                                                    <div className="radio">
                                                        <Radio value="0" id="referral0" />
                                                        <label htmlFor="referral0">{this.context.t("CreateCopy")}</label>
                                                    </div>
                                                    <div className="radio">
                                                        <Radio value="1" id="referral1" />
                                                        <label htmlFor="referral1">{this.context.t("ReferralWork")}</label>
                                                    </div>
                                                </RadioGroup>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className="card ">
                                            <div className="card-header border-0">
                                                <i className="done-work">
                                                </i>
                                            </div>
                                            <div className="card-body">
                                                <RadioGroup
                                                    name="workform">
                                                    <div className="radio">
                                                        <Radio value="0" id="workform0" />
                                                        <label htmlFor="workform0">{this.context.t("CopyWorkForm")}</label>
                                                    </div>
                                                    <div className="radio">
                                                        <Radio value="1" id="workform1" />
                                                        <label htmlFor="workform1">{this.context.t("NoWorkout")}</label>
                                                    </div>
                                                </RadioGroup>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ModalFooter>
                    <div className="authority-toggle">
                        <button type="button" className="js-authority-toggle-btn"></button>
                    </div>
                </Modal>
            </div >
        );
    }
}

const mapDispatchToProps = dispatch => ({
    FetchData: (Params) => {
        dispatch(Act_Reference.FetchData(Params))
    },
    GetTemplateForm: (Params) => {
        dispatch(design_Actions.GetTemplateForm(Params))
    },
    SaveWorkInfo: (SaveParams, msg) => {
        return dispatch(WorkActions_action.SaveWorkInfo(SaveParams, msg));
    },
    RebuildWork: (Peygir_id, msg) => {
        return dispatch(WorkActions_action.RebuildWork(Peygir_id, msg))
    },
    DeleteWork: (Peygir_id, msg) => {
        dispatch(WorkActions_action.DeleteWork(Peygir_id))
    },
    InitConfirmWork: (Params, msg) => {
        return dispatch(WorkActions_action.InitConfirmWork(Params, msg))
    },

    FetchWorkInfo: (peygir_id) => {
        dispatch(WorkBasic_action.FetchWorkInfo(peygir_id))
    },
    SelectWorkTypeList: (Params) => {
        dispatch(AutoBasicInfo_action.SelectWorkTypeList(Params))
    },
    SelectPriorityList: (Params) => {
        dispatch(AutoBasicInfo_action.SelectPriorityList(Params))
    },
    SelectRoleList: (Params) => {
        dispatch(AutoBasicInfo_action.SelectRoleList(Params))
    }


});
NewReferral.contextTypes = {
    t: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { alert } = state;
    const { loading } = state.loading;
    const { lang } = state.i18nState
    const { Refresh_Form } = state.Common;
    const { SelectWorkTypeList_rows,SelectPriorityList_rows,SelectRoleList_rows } = state.Auto_BasicInfo

    return {
        alert,
        loading,
        lang,
        Refresh_Form,
        SelectWorkTypeList_rows,
        SelectPriorityList_rows,
        SelectRoleList_rows
    };
}


const connectedNewReferral = connect(mapStateToProps, mapDispatchToProps)(NewReferral);
export { connectedNewReferral as NewReferral };

