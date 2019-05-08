import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import PropTypes from "prop-types"
import InputMask from 'react-input-mask';
import { AttachmentsReview } from "../../Archives";
import { SelectDefaultTextModal, SelectFileAudienceList } from "../../Basic/";
import { SelectProjectModal } from "../../Project/";

import {
    AutoBasicInfo_action,
    ArchiveBasic_action, WorkActions_action,
    ProjectsInfo_action
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
var projectParams = {
    "Id_Taraf": 0
};

var WorkerParams = {
    "page": 0,
    "pagesize": 10,
    "id_role": 0,
    "wt_id": 0,
    "orderby": "id_user",
    "direction": "desc",
    "filter": []
};
var FileAudienceParams = {
    "page": 0,
    "pagesize": 10,
    "orderby": "id_taraf",
    "direction": "desc",
    "filter": []
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
            SelectedAudienceId: 0,
            SelectedFileId: 0,
            manager_role_id: 0,
            user_role_id: 0,
            backdrop: "static",
            modalClass: "modal-dialog-centered modal-xl r-modal r-newwork-modal"
        };
    }

    componentDidMount() {
        const { SelectWorkTypeList, SelectPriorityList, SelectFlowList,
            SelectWorkGroupList, SelectRoleList, SelectWorkerList
            , SelectManagerList, GetSelectComboProject,GetSelectFileAudienceList } = this.props;
        SelectPriorityList();
        SelectFlowList();
        SelectWorkGroupList();
        SelectRoleList();
        SelectRoleList();
        SelectManagerList(0, 0);
        SelectWorkerList(WorkerParams);
        SelectWorkTypeList(workTypeParams);
        GetSelectComboProject(projectParams);
        GetSelectFileAudienceList(FileAudienceParams);
    }
    CalendarChange = (value, name) => {
        thisSaveParams.data[[name]] = { [name]: value }
    }
    changeHandle = (e, val) => {
        if (val !== undefined) {
            const { name } = e;

            const { SelectWorkTypeList, SelectWorkerList } = this.props;
            if (val.value !== 0) {
                if (name === "flow_id") {
                    workTypeParams.FlowId = val.value;
                    this.setState({ workgroup_id_disabled: true });
                    SelectWorkTypeList(workTypeParams);
                    this.setState({ workTypeSelectedOption: { value: 0, label: this.context.t("NoSelection") } });
                }
                else if (name === "workgroup_id") {
                    workTypeParams.WorkGroupId = val.value;
                    this.setState({ flow_id_disabled: true });
                    SelectWorkTypeList(workTypeParams);
                    this.setState({ workTypeSelectedOption: { value: 0, label: this.context.t("NoSelection") } });
                }
                else if (name === "wt_id") {
                    this.reloadWorkType(val.value);

                }
                thisSaveParams.data[[name]] = { [name]: val.value }

            } else {
                if (name === "wt_id") {
                    WorkerParams.wt_id = 0;
                    SelectWorkerList(WorkerParams);
                    //SelectManagerList(this.state.manager_role_id, 0);
                }
                if (name === "flow_id") {
                    workTypeParams.FlowId = 0;
                    this.setState({ workgroup_id_disabled: false });
                    SelectWorkTypeList(workTypeParams);
                    this.setState({ workTypeSelectedOption: { value: 0, label: this.context.t("NoSelection") } });
                    this.setState({ workerSelectedOption: { value: 0, label: this.context.t("NoSelection") } });
                    this.setState({ managerSelectedOption: { value: 0, label: this.context.t("NoSelection") } });
                }
                else if (name === "workgroup_id") {
                    this.setState({ flow_id_disabled: false });
                    workTypeParams.WorkGroupId = 0;
                    SelectWorkTypeList(workTypeParams);
                    this.setState({ workTypeSelectedOption: { value: 0, label: this.context.t("NoSelection") } });
                    this.setState({ workerSelectedOption: { value: 0, label: this.context.t("NoSelection") } });
                    this.setState({ managerSelectedOption: { value: 0, label: this.context.t("NoSelection") } });
                }
                thisSaveParams.data[[name]] = { [name]: null }
            }
        }
        else {
            const { name, value } = e.target;
            thisSaveParams.data[[name]] = { [name]: value };
        }
    }
    reloadWorkType = (selectedWtId) => {
        const { SelectWorkTypeList, SelectWorkerList } = this.props;
        WorkerParams.wt_id = selectedWtId;
        SelectWorkerList(WorkerParams);
        thisSaveParams.data["sadere_ref"] = { "sadere_ref": selectedWtId }
        const { GetNewWorkDefaultInfo } = this.props;
        DefaultInfoParams.wt_id = selectedWtId;
        GetNewWorkDefaultInfo(DefaultInfoParams).then(data => {
            if (data.status) {
                if (data.data.DefaultValue !== null) {
                    this.refs.flow.checked = data.data.DefaultValue.flow;
                    thisSaveParams.data["flow_id"] = { "flow_id": null };
                    thisSaveParams.data["erja"] = { "erja": data.data.DefaultValue.flow ? 1 : 0 };

                    this.refs.alowatt.checked = data.data.DefaultValue.alowatt;
                    thisSaveParams["alowatt"] = data.data.DefaultValue.alowatt ? 1 : 0;

                    this.refs.emailToWorker.checked = data.data.DefaultValue.web_emailtokarbar;
                    this.refs.smsToWorker.checked = data.data.DefaultValue.web_smstokarbar;
                    thisSaveParams["emailToWorker"] = data.data.DefaultValue.web_emailtokarbar ? 1 : 0;
                    thisSaveParams["smsToWorker"] = data.data.DefaultValue.web_smstokarbar ? 1 : 0;

                    this.refs.emailToAudience.checked = data.data.DefaultValue.web_emailtomokhatab;
                    this.refs.smsToAudience.checked = data.data.DefaultValue.web_smstomokhatab;
                    thisSaveParams["emailToAudience"] = data.data.DefaultValue.web_emailtomokhatab ? 1 : 0;
                    thisSaveParams["smsToAudience"] = data.data.DefaultValue.web_smstomokhatab ? 1 : 0;

                    if (data.data.WorkerId !== undefined && data.data.WorkerId !== 0)
                        this.setState({ workerSelectedOption: { value: data.data.WorkerId, label: data.data.WorkerUserName } });
                    if (data.data.ManagerId !== undefined && data.data.ManagerId !== 0)
                        this.setState({ managerSelectedOption: { value: data.data.ManagerId, label: data.data.ManagerUserName } });
                    thisSaveParams.workers = [{ worker: data.data.WorkerId, manager: data.data.ManagerId }];
                    if (data.data.FileInfo !== null) {
                        if (data.data.FileInfo.id !== 0) {
                            this.setState({ FileAudienceSelectedOption: { value: data.data.FileInfo.id, label: data.data.FileInfo.coname } });
                            this.setState({ SelectedFileId: data.data.FileInfo.id });
                            if (data.data.FileInfo.ptype_id !== null || data.data.FileInfo.ptype_id !== 0) {
                                this.setState({ ProjectSelectedOption: { value: data.data.FileInfo.ptype_id, label: data.data.FileInfo.ptype } });
                                this.refs.project_code.value = data.data.FileInfo.ptypecode;
                            }
                            projectParams.Id_Taraf = data.data.FileInfo.id
                            const { GetSelectComboProject } = this.props;
                            GetSelectComboProject(projectParams);
                        }
                    }
                    this.setState({ setDefaultActionDate: data.data.ActionDate });
                }
            }
            else {
                toast.error(data.error)
            }
        });
    }

    OpenSelectDefaultText = (e) => {
        const { name } = e.target;
        this.setState({
            SubjectSelectmodal: !this.state.SubjectSelectmodal,
            type: name,
        });

    }

    checkBoxChangeHandler = (e) => {
        const { WorkInfo, AttachmentOnWork, SelectWorkTypeList } = this.props;
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
        else if (name === "cpy_form_kar") {
            if (checked) thisSaveParams.data["cpy_form_kar"] = { "cpy_form_kar": WorkInfo.showtree_id };
            else thisSaveParams.data["cpy_form_kar"] = { "cpy_form_kar": 0 };
        }
        else if (name === "hasformsaz") {
            workTypeParams.HasFormGen = value;
            SelectWorkTypeList(workTypeParams);
            this.setState({ workTypeSelectedOption: { value: 0, label: this.context.t("NoSelection") } });
            this.setState({ workerSelectedOption: { value: 0, label: this.context.t("NoSelection") } });
            this.setState({ managerSelectedOption: { value: 0, label: this.context.t("NoSelection") } });
        }
    }
    CloseSelectDefaultText = (e) => {
        this.setState({
            SubjectSelectmodal: !this.state.SubjectSelectmodal,
        });
    }

    SuccessSelectSubject = (row, e) => {
        if (row !== undefined && row !== null) {
            if (this.state.SubjectSelectmodal)
                if (this.state.type === "subject") {
                    this.refs.SubjectInput.value += " " + (row !== undefined ? row.sharh !== undefined ? row.sharh : "" : "");
                    thisSaveParams.data["mozo"] = { "mozo": this.refs.SubjectInput.value };
                } else if (this.state.type === "result") {
                    this.refs.ResultTextArea.value += " " + (row !== undefined ? row.sharh !== undefined ? row.sharh : "" : "");
                    thisSaveParams.data["natije"] = { "natije": this.refs.ResultTextArea.value };
                }
                else {
                    this.refs.DescriptionTextArea.value += " " + (row !== undefined ? row.sharh !== undefined ? row.sharh : "" : "");
                    thisSaveParams.data["tozihat"] = { "tozihat": this.refs.DescriptionTextArea.value };
                }
            this.setState({
                SubjectSelectmodal: !this.state.SubjectSelectmodal,
                type: "",
            });
        }
        else
            toast.warn(this.context.t("msg_No_Select_Row"));

    }
    saveWorkHandle = () => {

    }
    ToggleSelectFileAudience = () => {
        this.setState({
            SelectFileAudiencemodal: !this.state.SelectFileAudiencemodal,
        });
    }
    SelectFileAudienceRow(row) {
        const { GetSelectComboProject } = this.props;
        this.setState({ FileAudienceSelectedOption: { value: row.mokhatab_id, label: row.coname + " - " + row.name } });
        this.refs.fileInfo.value = row.coname + " - " + row.name;
        this.refs.Audience.value = row.mokhatab_name;
        this.setState({ SelectedFileId: row.id_taraf });
        this.setState({ SelectedAudienceId: row.mokhatab_id });
        this.setState({
            SelectFileAudiencemodal: !this.state.SelectFileAudiencemodal,
        });
        this.setState({ ProjectSelectedOption: { value: 0, label: this.context.t("NoSelection") } });
        this.refs.project_code.value = "";
        projectParams.Id_Taraf = row.id_taraf;
        GetSelectComboProject(projectParams);

    }
    ToggleSelectProject = () => {
        if (this.state.SelectedFileId !== 0)
            this.setState({
                ProjectSelectmodal: !this.state.ProjectSelectmodal,
            });
        else
            toast.warn(this.context.t("msg_No_Select_File_Audience"));
    }
    deleteProject = () => {
        this.setState({ ProjectSelectedOption: { value: 0, label: this.context.t("NoSelection") } });
        this.refs.project_code.value = "";
    }
    SuccessSelectProject(row, e) {
        if (row !== undefined && row !== null) {
            if (this.state.ProjectSelectmodal) {
                let Ptype = row !== undefined ? row.ptype !== undefined ? row.ptype : "" : "";
                let PtypeId = row !== undefined ? row.id !== undefined ? row.id : "" : "";
                let Code = row !== undefined ? row.code !== undefined ? row.code : "" : "";
                this.setState({ ProjectSelectedOption: { value: PtypeId, label: Ptype } });
                this.refs.project_code.value = Code;
            }
            thisSaveParams.data["p_type_id"] = { "p_type_id": row.id };
            this.setState({
                ProjectSelectmodal: !this.state.ProjectSelectmodal,
            });
        }
        else
            toast.warn(this.context.t("msg_No_Select_Row"));

    }
    changeRoleHandle = (e, val) => {
        const { SelectWorkerList, SelectManagerList } = this.props;
        if (val !== undefined) {
            const { name } = e;
            if (name === "user_role_id") {
                WorkerParams.id_role = val.value;
                SelectWorkerList(WorkerParams);
                this.setState({
                    user_role_id: val.value,
                });
                this.setState({ workerSelectedOption: { value: 0, label: this.context.t("NoSelection") } });
            }
            else if (name === "manager_role_id") {
                SelectManagerList(val.value, 0);
                this.setState({
                    manager_role_id: val.value,
                });
                this.setState({ managerSelectedOption: { value: 0, label: this.context.t("NoSelection") } });
            }
        }
    }
    OpenFollowing = () => {

    }
    render() {
        const { modal, toggle, SelectWorkTypeList_rows, SelectPriorityList_rows,
            SelectWorkFlowList_rows, SelectWorkGroupList_rows, SelectRoleList_rows,
            SelectProjectComboList_rows, SelectWorkerList_rows,
            SelectManagerList_rows } = this.props;
        var None = [{ value: 0, label: this.context.t("NoSelection") }]
        var PriorityList = None.concat(SelectPriorityList_rows);
        var WorkFlowList = None.concat(SelectWorkFlowList_rows);
        var WorkGroupList = None.concat(SelectWorkGroupList_rows);
        var WorkTypeList = None.concat(SelectWorkTypeList_rows);
        var UserRollList = None.concat(SelectRoleList_rows);
        var WorkerList = None.concat(SelectWorkerList_rows);
        var ManagerList = None.concat(SelectManagerList_rows);
        var ProjectList = None.concat(SelectProjectComboList_rows);
        var FileList = None;

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
                                                    {SelectWorkFlowList_rows !== undefined &&
                                                        <ComboSelectList isDisabled={this.state.flow_id_disabled} options={WorkFlowList} classname="mt-2 mb-1" name="flow_id" ref="flow_id" onChange={this.changeHandle.bind(this)} />
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group row">
                                                <label className="col-2 col-form-label">{this.context.t("WorkGroup")}</label>
                                                <div className="col-10">
                                                    <div className="input-group mt-2 mb-1">
                                                        {SelectWorkGroupList_rows !== undefined &&
                                                            <ComboSelectList isDisabled={this.state.workgroup_id_disabled} options={WorkGroupList} name="workgroup_id" ref="workgroup_id" onChange={this.changeHandle.bind(this)} />
                                                        }
                                                        <div className="input-group-append pl-5 pt-2 text-space-nowrap">
                                                            <div className="checkbox">
                                                                <input id="formbuilder0" ref="hasFormBuilder" onChange={this.checkBoxChangeHandler.bind(this)} type="checkbox" name="hasformsaz" />
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
                                                    {SelectWorkTypeList_rows !== undefined &&
                                                        <ComboSelectList options={WorkTypeList} name="wt_id" classname="mt-1 mb-2" onChange={this.changeHandle.bind(this)} selectedOption={this.state.workTypeSelectedOption} />
                                                    }
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
                                                                onClick={this.ToggleSelectFileAudience.bind(this)}>{this.context.t("SelectPopup")}</Button>
                                                        </div>
                                                        <ComboSelectList options={FileList} ref="fileInfo" name="id_tel" onChange={this.changeHandle.bind(this)} selectedOption={this.state.FileAudienceSelectedOption} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group row">
                                                <label className="col-2 col-form-label">{this.context.t("Audience")}</label>
                                                <div className="col-10">
                                                    <input type="text" autoComplete="off" className="form-control mt-2 mb-1" readOnly={true} disabled={true}
                                                        name="audience_id" id="ashkhas_id" ref="Audience" />
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
                                                                onClick={this.ToggleSelectProject.bind(this)}>{this.context.t("SelectPopup")}</Button>
                                                        </div>
                                                        <input type="text" autoComplete="off" className="form-control wd-100 flex-0 bd-l-1" readOnly={true} disabled={true} name="project_code" ref="project_code" placeholder="کد پروژه" />
                                                        {SelectProjectComboList_rows !== undefined &&
                                                            <ComboSelectList options={ProjectList} ref="p_type_id" name="p_type_id" onChange={this.changeHandle.bind(this)} selectedOption={this.state.ProjectSelectedOption} />
                                                        }
                                                        <div className="input-group-append">
                                                            <Button color="primary" onClick={this.deleteProject.bind(this)}>{this.context.t("Delete")}</Button>
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
                                                        <input type="text" autoComplete="off" className="form-control" readOnly={true} disabled={true} name="atf_id" />
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
                                                    <CalendarDatePicker fieldname="tarikhaction" className="form-control my-2  ltr" id="actiondate" setDate={this.state.setDefaultActionDate} CalendarChange={this.CalendarChange.bind(this)} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group row">
                                                <label className="col-2 col-form-label">{this.context.t("DeadTime")}</label>
                                                <div className="col-10">
                                                    <InputMask type="text" name="deadtime" autoComplete="off" className="form-control my-2  ltr" mask="99:99" onChange={this.changeHandle.bind(this)} />
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
                                                    {SelectRoleList_rows !== undefined &&
                                                        <ComboSelectList options={UserRollList} classname="mt-2 mb-1" name="user_role_id" onChange={this.changeRoleHandle.bind(this)} />
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group row">
                                                <label className="col-2 col-form-label">{this.context.t("UserFullName")}</label>
                                                <div className="col-10">

                                                    {SelectWorkerList_rows !== undefined &&
                                                        <ComboSelectList options={WorkerList} classname="mt-2 mb-1" name="worker_id" onChange={this.changeHandle.bind(this)} selectedOption={this.state.workerSelectedOption} />
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="form-group row">
                                                <label className="col-2 col-form-label">{this.context.t("Roll")}</label>
                                                <div className="col-10">
                                                    {SelectRoleList_rows !== undefined &&
                                                        <ComboSelectList options={UserRollList} classname="mt-2 mb-1" name="manager_role_id" onChange={this.changeRoleHandle.bind(this)} />
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group row">
                                                <label className="col-2 col-form-label">{this.context.t("AdminFullName")}</label>
                                                <div className="col-10">

                                                    {SelectManagerList_rows !== undefined &&
                                                        <ComboSelectList options={ManagerList} classname="mt-1 mb-2" name="defmodir_id" onChange={this.changeHandle.bind(this)} selectedOption={this.state.managerSelectedOption} />
                                                    }
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
                                                    {SelectPriorityList_rows !== undefined &&
                                                        <ComboSelectList options={PriorityList} name="olaviyat_id" classname="mt-1 mb-2" onChange={this.changeHandle.bind(this)} />
                                                    }
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
                                                            <Button color="primary" name="description"
                                                                onClick={this.OpenSelectDefaultText.bind(this)}>{this.context.t("SelectPopup")}</Button>

                                                        </div>
                                                        <textarea type="text" className="form-control" rows="3"
                                                            name="tozihat" ref="DescriptionTextArea"
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
                                                        <input id="attach0" ref="alowatt" onChange={this.checkBoxChangeHandler.bind(this)} type="checkbox" name="alowatt" />
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
                {this.state.SubjectSelectmodal &&
                    <SelectDefaultTextModal modal={this.state.SubjectSelectmodal}
                        toggle={this.CloseSelectDefaultText.bind(this)}
                        Successtoggle={this.SuccessSelectSubject.bind(this)}
                    />}
                {this.state.SelectFileAudiencemodal &&
                    <SelectFileAudienceList modal={this.state.SelectFileAudiencemodal}
                        toggle={this.ToggleSelectFileAudience.bind(this)}
                        Successtoggle={this.SelectFileAudienceRow.bind(this)}
                    />}

                {this.state.ProjectSelectmodal &&
                    <SelectProjectModal modal={this.state.ProjectSelectmodal}
                        toggle={this.ToggleSelectProject.bind(this)}
                        Successtoggle={this.SuccessSelectProject.bind(this)}
                        id_tel={this.state.SelectedFileId}
                    />}
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
    SelectRoleList: () => {
        dispatch(AutoBasicInfo_action.SelectRoleList())
    },
    SelectFlowList: () => {
        dispatch(AutoBasicInfo_action.SelectFlowList())
    },
    SelectWorkGroupList: () => {
        dispatch(AutoBasicInfo_action.SelectWorkGroupList())
    },
    SelectWorkGroupList: () => {
        dispatch(AutoBasicInfo_action.SelectWorkGroupList())
    },
    SelectWorkerList: (Params) => {
        return dispatch(AutoBasicInfo_action.SelectWorkerList(Params))
    },
    SelectManagerList: (wt_id, id_role) => {
        return dispatch(AutoBasicInfo_action.SelectManagerList(wt_id, id_role))
    },
    InsertNewWorkInfo: (Params, msg) => {
        return dispatch(WorkActions_action.InsertNewWorkInfo(Params, msg))
    },
    GetAttachmentsByWorkIdlist: (Params) => {
        return dispatch(ArchiveBasic_action.GetAttachmentsByWorkIdlist(Params));
    }, GetNewWorkDefaultInfo: (Params) => {
        return dispatch(AutoBasicInfo_action.GetNewWorkDefaultInfo(Params))
    },
    GetSelectComboProject: (Params) => {
        dispatch(ProjectsInfo_action.GetSelectComboProject(Params))
    },  
    GetSelectFileAudienceList: (Params) => {
        dispatch(AutoBasicInfo_action.SelectFileAudienceList(Params))
    }
});
NewWork.contextTypes = {
    t: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { alert } = state;
    const { loading } = state.loading;
    const { lang } = state.i18nState
    const { WorkInfo } = state.Auto_WorkBasic;
    const { SelectWorkTypeList_rows, SelectPriorityList_rows, SelectWorkFlowList_rows,
        SelectWorkGroupList_rows, SelectRoleList_rows, SelectWorkerList_rows,
        SelectManagerList_rows,SelectFileAudience_totalCount,
        SelectFileAudience_rows } = state.Auto_BasicInfo
    const { AttachmentOnWork } = state.ArchiveBasic
    const { SelectProjectComboList_rows } = state.projects

    return {
        alert,
        loading,
        lang,
        WorkInfo,
        SelectWorkTypeList_rows,
        SelectPriorityList_rows,
        AttachmentOnWork,
        SelectWorkFlowList_rows,
        SelectWorkGroupList_rows,
        SelectRoleList_rows,
        SelectManagerList_rows,
        SelectWorkerList_rows,
        SelectProjectComboList_rows,
        SelectFileAudience_totalCount,
        SelectFileAudience_rows
    };
}


const connectedNewWork = connect(mapStateToProps, mapDispatchToProps)(NewWork);
export { connectedNewWork as NewWork };

