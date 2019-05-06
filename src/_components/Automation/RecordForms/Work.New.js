import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import PropTypes from "prop-types"
import { SelectDefaultTextModal } from "../../Basic";
import InputMask from 'react-input-mask';
import { AttachmentsReview } from "../../Archives";

import {
    AutoBasicInfo_action,
    ArchiveBasic_action, WorkActions_action
} from "../../../_actions";
import { toast } from 'react-toastify';
import { RibbonNewWork } from '../Ribbon/Ribbon.NewWork';
import { ComboSelectList, CalendarDatePicker } from "../../Config";
import { ReferralToModal } from '../../Basic';
var finalSaveParams = {}
var thisSaveParams = {
    form: "",
    type: "sub",
    data: [],
    workers: [],
    attachFromParent: 1,
    infoFromParent: 1,
    replication: "",
    emailToWorker: 0,
    emailToAudience: 0,
    smsToWorker: 0,
    smsToAudience: 0,
    archivesList: []

};
var AttachmentParams = {
    "peygir_id": 0,
    "type": "List"
};
var workTypeParams = { FlowId: 0, WorkGroupId: 0, HasFormGen: 0 }
var DefaultInfoParams = { form: "referrals", wt_id: 0, flow_id: 0, isInternal: 0 }


class NewWork extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            modal: false,
            SelectedWorkers: [],
            AttachmentList: [],
            workTypeSelectedOption: {},
            prioritySelectedOption: {},
            backdrop: "static",
            modalClass: "modal-dialog-centered modal-xl r-modal r-newwork-modal"
        };
    }

    componentDidMount() {
        const { WorkInfo, SelectWorkTypeList, SelectPriorityList, GetAttachmentsByWorkIdlist } = this.props;
        SelectPriorityList();
        SelectWorkTypeList(workTypeParams);

    }
    CalendarChange = (value, name) => {
        thisSaveParams.data[[name]] = { [name]: value }
    }
    changeHandle = (e, val) => {
        if (val !== undefined) {
            const { name } = e;
            if (val.value !== 0) {
                if (name === "wt_id") {
                    this.setState({ workTypeSelectedOption: val.value });
                    this.setState({ SelectedWorkers: [] });
                    this.refs.Workers.value = this.context.t("unselected");
                    const { GetNewWorkDefaultInfo } = this.props;
                    DefaultInfoParams.wt_id = val.value;
                    thisSaveParams.data["sadere_ref"] = { "sadere_ref": val.value }
                    GetNewWorkDefaultInfo(DefaultInfoParams).then(data => {
                        if (data.status) {
                            if (data.data.DefaultValue !== null) {
                                this.refs.flow.checked = data.data.DefaultValue.flow;
                                thisSaveParams.data["flow_id"] = { "flow_id": null };
                                thisSaveParams.data["erja"] = { "erja": data.data.DefaultValue.flow ? 1 : 0 };
                                this.refs.ronevesht.checked = data.data.DefaultValue.ronevesht;
                                this.refs.emailToWorker.checked = data.data.DefaultValue.web_emailtokarbar;
                                this.refs.smsToWorker.checked = data.data.DefaultValue.web_smstokarbar;
                                thisSaveParams["emailToWorker"] = data.data.DefaultValue.web_emailtokarbar ? 1 : 0;
                                thisSaveParams["smsToWorker"] = data.data.DefaultValue.web_smstokarbar ? 1 : 0;
                                if (data.data.WorkerId !== undefined && data.data.WorkerId !== 0) {
                                    this.setState({ SelectedWorkers: [{ id_user: data.data.WorkerId, username: data.data.WorkerUserName, id_role: data.data.WorkerId_Role, rolename: data.data.WorkerRoleName }] });
                                    this.refs.Workers.value = this.state.SelectedWorkers[0].username;
                                    thisSaveParams.workers = [{ worker: data.data.WorkerId, manager: 0 }];
                                }
                                this.setState({ setDefaultDate: data.data.ActionDate });
                            }
                        }
                        else {
                            toast.error(data.error)
                        }
                    });
                }

                thisSaveParams.data[[name]] = { [name]: val.value }

            } else
                thisSaveParams.data[[name]] = { [name]: null }
        }
        else {
            const { name, value } = e.target;
            thisSaveParams.data[[name]] = { [name]: value };
        }
    }
    OpenReferralTo() {
        if (this.state.workTypeSelectedOption !== 0 && this.state.workTypeSelectedOption !== undefined) {
            this.setState(prevState => ({
                ReferralTomodal: !prevState.ReferralTomodal,
            }));
        }
        else
            toast.error(this.context.t("msg_No_Select_ReferralType"));
    }
    ConfirmWorkers(Workers) {
        this.setState({
            ReferralTomodal: false
        });
        this.setState({ SelectedWorkers: Workers });
        if (Workers.length > 1)
            this.refs.Workers.value = Workers.length + " " + this.context.t("Items") + " " + this.context.t("selected");
        else if (Workers.length == 1)
            this.refs.Workers.value = Workers[0].username;
        else
            this.refs.Workers.value = this.context.t("unselected");
        var newWorkers = Object.keys(Workers).map((item, index) => {
            return { worker: Workers[item].id_user, manager: 0 };
        })
        thisSaveParams.workers = newWorkers;
    }
    OpenSelectDefaultText = (e) => {
        const { name } = e.target;
        this.setState({
            SubjectSelectmodal: !this.state.SubjectSelectmodal,
            type: name,
        });

    }
    SuccessSelectDescription = (row, e) => {
        if (row !== undefined && row !== null) {
            if (this.state.SubjectSelectmodal) {
                this.refs.DescriptionInput.value += " " + (row !== undefined ? row.sharh !== undefined ? row.sharh : "" : "");
                thisSaveParams.data["tozihat"] = { "tozihat": this.refs.DescriptionInput.value };
            }
            this.setState({
                SubjectSelectmodal: !this.state.SubjectSelectmodal,
                type: "",
            });
        }
        else
            toast.warn(this.context.t("msg_No_Select_Row"));
    }
    checkBoxChangeHandler = (e) => {
        const { WorkInfo, AttachmentOnWork } = this.props;
        const { name, checked } = e.target;
        const value = checked ? 1 : 0;
        if (name === "withoutFlow") {
            thisSaveParams.data["flow_id"] = { "flow_id": null };
            thisSaveParams.data["erja"] = { "erja": value };
        }
        else if (name === "emailToWorker")
            thisSaveParams["emailToWorker"] = value;
        else if (name === "smsToWorker")
            thisSaveParams["smsToWorker"] = value;
        else if (name === "attachFromParent") {
            thisSaveParams["attachFromParent"] = value;
            if (value === 1) {
                let SelectedArchiveRows = this.state.AttachmentList.filter(function (item) { return !item.fromParent });
                this.setState({
                    AttachmentList: [...Object.keys(AttachmentOnWork).map((item, index) => {
                        return { archiveId: AttachmentOnWork[item].id, fromParent: true, fileName: AttachmentOnWork[item].filename };
                    }), ...SelectedArchiveRows]
                });
            }
            else {
                let SelectedArchiveRows = this.state.AttachmentList.filter(function (item) { return !item.fromParent });
                this.setState({
                    AttachmentList: SelectedArchiveRows
                });
            }
        }

        else if (name === "infoFromParent")
            thisSaveParams["infoFromParent"] = value;
        else if (name === "cpy_form_kar")
            if (checked) thisSaveParams.data["cpy_form_kar"] = { "cpy_form_kar": WorkInfo.showtree_id };
            else thisSaveParams.data["cpy_form_kar"] = { "cpy_form_kar": 0 };

    }
    saveWorkHandle = () => {

    }
    OpenSelectFile = () => {

    }
    OpenProject = () => {

    }
    OpenFollowing = () => {

    }
    render() {
        const { modal, toggle, SelectWorkTypeList_rows, SelectPriorityList_rows, WorkInfo,
            SelectWorkFlowList_rows, SelectWorkGroupList_rows, SelectProjectList_rows,
            SelectUserRollList_rows, SelectAdminRollList_rows, SelectUserFullNameList_rows,
            SelectAdminFullNameList_rows } = this.props;
        var None = [{ value: 0, label: this.context.t("NoSelection") }]
        var PriorityList = None;
        var WorkFlowList = None;
        var WorkGroupList = None;
        var WorkTypeList = None;
        var ProjectList = None;
        var UserRollList = None;
        var AdminRollList = None;
        var UserFullNameList = None;
        var AdminFullNameList = None;

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
                    <ModalHeader toggle={toggle}>{this.context.t("frm_New_Work")}</ModalHeader>
                    <ModalBody>
                        <div className="r-main-box__ribbon">
                            <RibbonNewWork saveWorkHandle={this.saveWorkHandle.bind(this)} />
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
                                                <label className="col-2 col-form-label">{this.context.t("WorkFlow")}</label>
                                                <div className="col-10">
                                                    {/* {SelectWorkFlowList_rows !== undefined && */}
                                                    <ComboSelectList options={WorkFlowList} classname="mt-2 mb-1" name="wf_id" onChange={this.changeHandle.bind(this)} />
                                                    {/* } */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group row">
                                                <label className="col-2 col-form-label">{this.context.t("WorkGroup")}</label>
                                                <div className="col-10">
                                                    <div className="input-group mt-2 mb-1">
                                                        {/* {SelectWorkGroupList_rows !== undefined && */}
                                                        <ComboSelectList options={WorkGroupList} name="wg_id" onChange={this.changeHandle.bind(this)} />
                                                        {/* } */}
                                                        <div className="input-group-append pl-5 pt-2 text-space-nowrap">
                                                            <div className="checkbox">
                                                                <input id="formbuilder0" ref="hasFormBuilder" onChange={this.checkBoxChangeHandler.bind(this)} type="checkbox" name="hasFormBuilder" />
                                                                <label htmlFor="formbuilder0" className="m-0">{this.context.t("HasFormBuilder")}</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="form-group row">
                                                <label className="col-2 col-form-label">{this.context.t("WorkType")}</label>
                                                <div className="col-10">
                                                    {/* {SelectWorkTypeList_rows !== undefined && */}
                                                    <ComboSelectList options={WorkTypeList} name="wt_id" classname="mt-1 mb-2" onChange={this.changeHandle.bind(this)} />
                                                    {/* } */}
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
                                                <label className="col-2 col-form-label">{this.context.t("File")}</label>
                                                <div className="col-10">
                                                    <div className="input-group mt-2 mb-1">
                                                        <div className="input-group-prepend">
                                                            <Button color="primary"
                                                                onClick={this.OpenSelectFile.bind(this)}>{this.context.t("SelectPopup")}</Button>
                                                        </div>
                                                        <input type="text" autoComplete="off" className="form-control" onChange={this.changeHandle.bind(this)} name="file_id" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group row">
                                                <label className="col-2 col-form-label">{this.context.t("Audience")}</label>
                                                <div className="col-10">
                                                    <input type="text" autoComplete="off" className="form-control mt-2 mb-1" readOnly={true} disabled={true}
                                                        name="audience_id" id="audience_id" />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="form-group row">
                                                <label className="col-2 col-form-label">{this.context.t("Project")}</label>
                                                <div className="col-10">
                                                    <div className="input-group mt-1 mb-2">
                                                        <div className="input-group-prepend">
                                                            <Button color="primary"
                                                                onClick={this.OpenProject.bind(this)}>{this.context.t("SelectPopup")}</Button>
                                                        </div>
                                                        <input type="text" autoComplete="off" className="form-control wd-100 flex-0 bd-l-1" name="project_code_id" placeholder="کد پروژه" />
                                                        {/* {SelectProjectList_rows !== undefined && */}
                                                        <ComboSelectList options={ProjectList} name="p_id" onChange={this.changeHandle.bind(this)} />
                                                        {/* } */}
                                                        <div className="input-group-append">
                                                            <Button color="primary">{this.context.t("Delete")}</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group row">
                                                <label className="col-2 col-form-label">{this.context.t("Following")}</label>
                                                <div className="col-10">
                                                    <div className="input-group mt-1 mb-2">
                                                        <div className="input-group-prepend">
                                                            <Button color="primary"
                                                                onClick={this.OpenFollowing.bind(this)}>{this.context.t("SelectPopup")}</Button>
                                                        </div>
                                                        <input type="text" autoComplete="off" className="form-control" readOnly={true} disabled={true} name="peyro_id" />
                                                        <div className="input-group-append">
                                                            <Button color="primary">{this.context.t("Delete")}</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row bg-gray mg-b-5">
                                <div className="col-1 d-flex">
                                    <span className="row-icon clock"></span>
                                </div>
                                <div className="col-11">
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="form-group row">
                                                <label className="col-2 col-form-label">{this.context.t("ActionDate")}</label>
                                                <div className="col-10">
                                                    <CalendarDatePicker fieldname="actiondate" className="form-control my-2  ltr" id="actiondate" setDate={this.state.setDefaultActionDate} CalendarChange={this.CalendarChange.bind(this)} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group row">
                                                <label className="col-2 col-form-label">{this.context.t("DeadTime")}</label>
                                                <div className="col-10">
                                                    <InputMask type="text" name="actiontime" autoComplete="off" className="form-control my-2  ltr" mask="99:99" onChange={this.changeHandle.bind(this)} />
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
                                                <label className="col-2 col-form-label">{this.context.t("Roll")}</label>
                                                <div className="col-10">
                                                    {/* {SelectUserRollList_rows !== undefined && */}
                                                    <ComboSelectList options={UserRollList} classname="mt-2 mb-1" name="user_roll_id" onChange={this.changeHandle.bind(this)} />
                                                    {/* } */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group row">
                                                <label className="col-2 col-form-label">{this.context.t("UserFullName")}</label>
                                                <div className="col-10">
                                                    {/* {SelectUserFullNameList_rows !== undefined && */}
                                                    <ComboSelectList options={UserFullNameList} classname="mt-2 mb-1" name="user_fullname_id" onChange={this.changeHandle.bind(this)} />
                                                    {/* } */}
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="form-group row">
                                                <label className="col-2 col-form-label">{this.context.t("Roll")}</label>
                                                <div className="col-10">
                                                    {/* {SelectAdminRollList_rows !== undefined && */}
                                                    <ComboSelectList options={AdminRollList} classname="mt-1 mb-2" name="admin_roll_id" onChange={this.changeHandle.bind(this)} />
                                                    {/* } */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group row">
                                                <label className="col-2 col-form-label">{this.context.t("AdminFullName")}</label>
                                                <div className="col-10">
                                                    {/* {SelectAdminFullNameList_rows !== undefined && */}
                                                    <ComboSelectList options={AdminFullNameList} classname="mt-1 mb-2" name="admin_fullname_id" onChange={this.changeHandle.bind(this)} />
                                                    {/* } */}
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
                                                <label className="col-2 col-form-label">{this.context.t("Subject")}</label>
                                                <div className="col-10">
                                                    <div className="input-group mt-2 mb-1">
                                                        <div className="input-group-prepend">
                                                            <Button color="primary" name="subject"
                                                                onClick={this.OpenSelectDefaultText.bind(this)}>{this.context.t("SelectPopup")}</Button>
                                                        </div>
                                                        <input type="text" autoComplete="off" className="form-control" ref="SubjectInput" onChange={this.changeHandle.bind(this)}
                                                            name="mozo" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group row">
                                                <label className="col-2 col-form-label">{this.context.t("Code")}</label>
                                                <div className="col-10">
                                                    <input type="text" autoComplete="off" className="form-control mt-2 mb-1 ltr" onChange={this.changeHandle.bind(this)}
                                                        name="code" id="Code" />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="form-group row">
                                                <label className="col-2 col-form-label">{this.context.t("Priority")}</label>
                                                <div className="col-10">
                                                    {/* {SelectPriorityList_rows !== undefined && */}
                                                    <ComboSelectList options={PriorityList} name="olaviyat_id" classname="mt-1 mb-2" onChange={this.changeHandle.bind(this)} />
                                                    {/* } */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group row">
                                                <label className="col-2 col-form-label">{this.context.t("FileNumber")}</label>
                                                <div className="col-10">
                                                    <input type="text" autoComplete="off" className="form-control mt-1 mb-2 ltr" name="shomare"

                                                        onChange={this.changeHandle.bind(this)} />
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                            <div className="row bg-gray">
                                <div className="col-1 d-flex">
                                    <span className="row-icon result"></span>
                                </div>
                                <div className="col-11">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="form-group row">
                                                <label className="col-1 col-form-label">{this.context.t("WorkDescription")}</label>
                                                <div className="col-11">
                                                    <div className="input-group mt-2 mb-1">
                                                        <div className="input-group-prepend align-self-stretch">
                                                            <Button color="primary" name="result"
                                                                onClick={this.OpenSelectDefaultText.bind(this)}>{this.context.t("SelectPopup")}</Button>

                                                        </div>
                                                        <textarea type="text" className="form-control" rows="3"
                                                            name="natije" ref="DescriptionTextArea"
                                                            onChange={this.changeHandle.bind(this)}></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="form-group row">
                                                <label className="col-1 col-form-label">{this.context.t("WorkResult")}</label>
                                                <div className="col-11">
                                                    <div className="input-group mt-1 mb-2">
                                                        <div className="input-group-prepend align-self-stretch">
                                                            <Button color="primary" name="result"
                                                                onClick={this.OpenSelectDefaultText.bind(this)}>{this.context.t("SelectPopup")}</Button>

                                                        </div>
                                                        <textarea type="text" className="form-control" rows="3"
                                                            name="natije" ref="ResultTextArea"
                                                            onChange={this.changeHandle.bind(this)}></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                        <style>{modalBackDrop}</style>
                    </ModalBody>
                    <ModalFooter>
                        <h4>{this.context.t("Authority")}</h4>
                        <div className="row authority">
                            <div className="col-6">
                                <div className="row">
                                    <div className="col-4">
                                        <div className="card ">
                                            <div className="card-header">
                                                <i className="workform-authority">
                                                </i>
                                            </div>
                                            <div className="card-body">
                                                <div className="checkbox-group">
                                                    <div className="checkbox">
                                                        <input id="workform0" name="cpy_form_kar" onChange={this.checkBoxChangeHandler.bind(this)} type="checkbox" />
                                                        <label htmlFor="workform0">{this.context.t("CopyWorkForm")}</label>
                                                    </div>
                                                    <div className="checkbox">
                                                        <input id="workform1" name="withoutFlow" onChange={this.checkBoxChangeHandler.bind(this)} defaultChecked={true} ref="flow" type="checkbox" />
                                                        <label htmlFor="workform1">{this.context.t("NoWorkFlow")}</label>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-4">
                                        <div className="card ">
                                            <div className="card-header">
                                                <i className="attach-authority">
                                                </i>
                                            </div>
                                            <div className="card-body">
                                                <div className="checkbox-group">
                                                    <div className="checkbox">
                                                        <input id="attach0" defaultChecked={true} type="checkbox" name="allowAttachment" onChange={this.checkBoxChangeHandler.bind(this)} />
                                                        <label htmlFor="attach0">{this.context.t("AllowAttachment")}</label>
                                                    </div>
                                                    <div className="checkbox">
                                                        <input id="attach1" defaultChecked={true} type="checkbox" onChange={this.checkBoxChangeHandler.bind(this)} name="lockedAttachment" />
                                                        <label htmlFor="attach1">{this.context.t("LockedAttachment")}</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="card ">
                                            <div className="card-header border-0">
                                                <i className="send-authority">
                                                </i>
                                            </div>
                                            <div className="card-body">
                                                <div className="checkbox-group">
                                                    <div className="checkbox">
                                                        <input id="send0" ref="emailToWorker" onChange={this.checkBoxChangeHandler.bind(this)} type="checkbox" name="emailToWorker" />
                                                        <label htmlFor="send0">{this.context.t("SendEmailToUser")}</label>
                                                    </div>
                                                    <div className="checkbox">
                                                        <input id="send1" ref="emailToAudience" onChange={this.checkBoxChangeHandler.bind(this)} type="checkbox" name="emailToAudience" />
                                                        <label htmlFor="send1">{this.context.t("SendSmsToAudience")}</label>
                                                    </div>
                                                    <div className="checkbox">
                                                        <input id="send2" ref="smsToWorker" onChange={this.checkBoxChangeHandler.bind(this)} type="checkbox" name="smsToWorker" />
                                                        <label htmlFor="send2">{this.context.t("SendSmsToUser")}</label>
                                                    </div>
                                                   
                                                    <div className="checkbox">
                                                        <input id="send3" ref="smsToAudience" onChange={this.checkBoxChangeHandler.bind(this)} type="checkbox" name="smsToAudience" />
                                                        <label htmlFor="send3">{this.context.t("SendSmsToAudience")}</label>
                                                    </div>

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ModalFooter>
                    <div className="authority-toggle">
                        <button type="button" className="js-authority-toggle-btn active" title={this.context.t("Authority")}></button>
                    </div>
                </Modal>
            </div >
        );
    }
}

const mapDispatchToProps = dispatch => ({

    SelectWorkTypeList: (Params) => {
        dispatch(AutoBasicInfo_action.SelectWorkTypeList(Params))
    },
    SelectPriorityList: (Params) => {
        dispatch(AutoBasicInfo_action.SelectPriorityList(Params))
    },
    SelectRoleList: (Params) => {
        dispatch(AutoBasicInfo_action.SelectRoleList(Params))
    },
    GetNewWorkDefaultInfo: (Params) => {
        return dispatch(AutoBasicInfo_action.GetNewWorkDefaultInfo(Params))
    },
    InsertNewWorkInfo: (Params, msg) => {
        return dispatch(WorkActions_action.InsertNewWorkInfo(Params, msg))
    },
    GetAttachmentsByWorkIdlist: (Params) => {
        return dispatch(ArchiveBasic_action.GetAttachmentsByWorkIdlist(Params));
    },
});
NewWork.contextTypes = {
    t: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { alert } = state;
    const { loading } = state.loading;
    const { lang } = state.i18nState
    const { WorkInfo } = state.Auto_WorkBasic;
    const { SelectWorkTypeList_rows, SelectPriorityList_rows } = state.Auto_BasicInfo
    const { AttachmentOnWork } = state.ArchiveBasic

    return {
        alert,
        loading,
        lang,
        WorkInfo,
        SelectWorkTypeList_rows,
        SelectPriorityList_rows,
        AttachmentOnWork
    };
}


const connectedNewWork = connect(mapStateToProps, mapDispatchToProps)(NewWork);
export { connectedNewWork as NewWork };

