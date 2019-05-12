import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import PropTypes from "prop-types"
import InputMask from 'react-input-mask';
import { AttachmentsReview } from "../../Archives";
import { SelectDefaultTextModal, SelectFileAudienceList, SelectFollowerList } from "../../Basic/";
import { SelectProjectModal } from "../../Project/";
import { FormInfo } from "../../../locales";

import {
    AutoBasicInfo_action,
    ArchiveBasic_action, WorkActions_action,
    ProjectsInfo_action
} from "../../../_actions";
import { toast } from 'react-toastify';
import { RibbonNewWork } from '../Ribbon/Ribbon.NewWork';
import { ComboSelectList, CalendarDatePicker, ApiComboMultiSelectList } from "../../Config";
var finalSaveParams = {}
// var fileShowField = ["id_taraf", "name", "coname", "mokhatab_name", "mokhatab_id"];
var thisSaveParams = {
    form: "",
    type: "new",
    data: [],
    workers: [],
    peygir_id: 0,
    attachFromParent: 0,
    infoFromParent: 0,
    replication: "",
    emailToWorker: 0,
    emailToAudience: 0,
    smsToWorker: 0,
    smsToAudience: 0,
    archivesList: []

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
            modalClass: "modal-dialog-centered modal-xl r-modal r-automation-modal r-newwork-modal"
        };
    }

    componentDidMount() {
         finalSaveParams = {}
         thisSaveParams = {
            form: "",
            type: "new",
            data: [],
            workers: [],
            peygir_id: 0,
            attachFromParent: 0,
            infoFromParent: 0,
            replication: "",
            emailToWorker: 0,
            emailToAudience: 0,
            smsToWorker: 0,
            smsToAudience: 0,
            archivesList: []
        
        };
         projectParams = {
            "Id_Taraf": 0
        };
        
         WorkerParams = {
            "page": 0,
            "pagesize": 10,
            "id_role": 0,
            "wt_id": 0,
            "orderby": "id_user",
            "direction": "desc",
            "filter": []
        };
         workTypeParams = { FlowId: 0, WorkGroupId: 0, HasFormGen: 0 }
         DefaultInfoParams = { form: "referrals", wt_id: 0, flow_id: 0, isInternal: 0 }
        
        

        const { SelectWorkTypeList, SelectPriorityList, SelectFlowList,
            SelectWorkGroupList, SelectRoleList, SelectWorkerList
            , SelectManagerList, GetSelectComboProject, GetSelectFileAudienceList } = this.props;
        SelectPriorityList();
        SelectFlowList();
        SelectWorkGroupList();
        SelectRoleList();
        SelectRoleList();
        SelectManagerList(0, 0);
        SelectWorkerList(WorkerParams);
        SelectWorkTypeList(workTypeParams);
    }
    CalendarChange = (value, name) => {
        thisSaveParams.data[[name]] = { [name]: value }
    }
    changeHandle = (e, val) => {
        if (val !== undefined) {
            const { name } = e;
            if (name === "flow_id")
                this.flowChange(val.value);
            else if (name === "workgroup_id")
                this.workgroupChange(val.value);
            else if (name === "wt_id")
                this.reloadWorkType(val.value);
            else if (name === "worker_id") {
                thisSaveParams.workers[0].worker = val.value;
                const { SayManagerOnWorkerWtype } = this.props;
                SayManagerOnWorkerWtype(val.value, WorkerParams.wt_id).then(data => {
                    if (data.status) {
                        this.setState({ managerSelectedOption: { value: data.data.managerId, label: data.data.managerUName } });
                        thisSaveParams.workers[0].manager = data.data.managerId;
                    }
                });
            }
            else if (name === "defmodir_id" ) {
                thisSaveParams.workers[0].manager = val.value;
            }    
            else if (name === "p_type_id" && val.value === 0) {
                this.setState({ ProjectSelectedOption: { value: 0, label: this.context.t("NoSelection") } });
                thisSaveParams.data["p_type_id"] = { "p_type_id": null };
                this.refs.project_code.value = "";
            }
            console.log(val.value)
            console.log(name)
            if (name !== "worker_id" && name !== "defmodir_id")
                thisSaveParams.data[[name]] = { [name]: val.value === 0 ? null : val.value }
        }
        else {
            const { name, value } = e.target;
            thisSaveParams.data[[name]] = { [name]: value };
        }
    }
    workgroupChange = (workgroup_id) => {
        const { SelectWorkTypeList } = this.props;
        if (workgroup_id !== 0) {
            workTypeParams.WorkGroupId = workgroup_id;
            this.setState({ flow_id_disabled: true });
            SelectWorkTypeList(workTypeParams);
            this.setState({ workTypeSelectedOption: { value: 0, label: this.context.t("NoSelection") } });
        }
        else {
            this.setState({ flow_id_disabled: false });
            workTypeParams.WorkGroupId = 0;
            SelectWorkTypeList(workTypeParams);
            this.setState({ workTypeSelectedOption: { value: 0, label: this.context.t("NoSelection") } });
            this.setState({ workerSelectedOption: { value: 0, label: this.context.t("NoSelection") } });
            this.setState({ managerSelectedOption: { value: 0, label: this.context.t("NoSelection") } });
        }
    }
    flowChange = (flowId) => {
        const { SelectWorkTypeList, FirstWorkOnFlow } = this.props;
        if (flowId !== 0) {
            workTypeParams.FlowId = flowId;
            thisSaveParams.data["erja"] = { "erja": 1 };
            thisSaveParams.data["flow_id"] = { "flow_id": flowId };
            DefaultInfoParams.flow_id = flowId;
            this.setState({ workgroup_id_disabled: true });
            SelectWorkTypeList(workTypeParams).then(Response1 => {
                if (Response1.status) {
                    FirstWorkOnFlow(flowId).then(Response2 => {
                        if (Response2.status) {
                            const found = Response1.data.rows.some(el => el.id === Response2.data.workTypeId);
                            if (Response2.data.workTypeId !== 0 && found) {
                                this.setState({ workTypeSelectedOption: { value: Response2.data.workTypeId, label: Response2.data.workType } });
                                workTypeParams.FlowId = flowId;
                                this.reloadWorkType(Response2.data.workTypeId);
                            } else {
                                this.setState({ workTypeSelectedOption: { value: 0, label: this.context.t("NoSelection") } });
                                this.refs.flow.checked = false;
                            }
                        }
                    });
                }
            });
        }
        else {
            thisSaveParams.data["flow_id"] = { "flow_id": null };
            workTypeParams.FlowId = 0;
            DefaultInfoParams.flow_id = 0;
            this.setState({ workgroup_id_disabled: false });
            SelectWorkTypeList(workTypeParams);
            this.setState({ workTypeSelectedOption: { value: 0, label: this.context.t("NoSelection") } });
            this.setState({ workerSelectedOption: { value: 0, label: this.context.t("NoSelection") } });
            this.setState({ managerSelectedOption: { value: 0, label: this.context.t("NoSelection") } });
            this.refs.flow.checked = true;
            thisSaveParams.data["erja"] = { "erja": 1 };
        }
    }
    reloadWorkType = (selectedWtId) => {
        const { SelectWorkTypeList, SelectWorkerList } = this.props;
        if (selectedWtId == 0) {
            WorkerParams.wt_id = 0;
            thisSaveParams.data["wt_id"] = { "wt_id": null };
        }
        else
            thisSaveParams.data["wt_id"] = { "wt_id": selectedWtId };
        WorkerParams.wt_id = selectedWtId;
        SelectWorkerList(WorkerParams);
        thisSaveParams.data["sadere_ref"] = { "sadere_ref": selectedWtId }
        const { GetNewWorkDefaultInfo } = this.props;
        DefaultInfoParams.wt_id = selectedWtId;
        thisSaveParams.data["p_id"] = { "p_id": 0 };
        thisSaveParams.data["showtree_id"] = { "showtree_id": 0 };
        thisSaveParams.data["arshiv_id"] = { "arshiv_id": 0 };
        thisSaveParams.data["cpy_form_kar"] = { "cpy_form_kar": 0 };

        this.refs.Follower.value = "";
        thisSaveParams.data["p_id"] = { "p_id": 0 };
        this.setState({ SelectedFollowerId: 0 });
        this.setState({ SelectedShowtreeFollowerId: 0 });

        GetNewWorkDefaultInfo(DefaultInfoParams).then(data => {
            if (data.status) {
                if (data.data.DefaultValue !== null) {
                    if (workTypeParams.FlowId === 0 || workTypeParams.FlowId === undefined || workTypeParams.FlowId === null) {
                        this.refs.flow.checked = data.data.DefaultValue.flow;
                        thisSaveParams.data["flow_id"] = { "flow_id": null };
                        thisSaveParams.data["erja"] = { "erja": data.data.DefaultValue.flow ? 1 : 0 };
                    }
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
                            thisSaveParams.data["id_tel"] = { "id_tel": data.data.FileInfo.id };
                            this.setState({ SelectedFileId: data.data.FileInfo.id });
                            thisSaveParams.data["ashkhas_id"] = { "ashkhas_id": null };
                            this.refs.fileInfo.value = data.data.FileInfo.coname;
                            if (data.data.FileInfo.ptype_id !== null || data.data.FileInfo.ptype_id !== 0) {
                                this.setState({ ProjectSelectedOption: { value: data.data.FileInfo.ptype_id, label: data.data.FileInfo.ptype } });
                                this.refs.project_code.value = data.data.FileInfo.ptypecode;
                                thisSaveParams.data["p_type_id"] = { "p_type_id": data.data.FileInfo.ptype_id };
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
        const { SelectWorkTypeList } = this.props;
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
        else if (name === "emailToAudience")
            thisSaveParams["emailToAudience"] = value;
        else if (name === "smsToAudience")
            thisSaveParams["smsToAudience"] = value;

        else if (name === "cpy_form_kar") {
            if (checked && this.state.SelectedShowtreeFollowerId !== undefined && this.state.SelectedShowtreeFollowerId !== 0)
                thisSaveParams.data["cpy_form_kar"] = { "cpy_form_kar": this.state.SelectedShowtreeFollowerId };
            else
                thisSaveParams.data["cpy_form_kar"] = { "cpy_form_kar": 0 };
            // this.setState({ "cpy_form_kar": checked });
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
        const { lang, toggle, InsertNewWorkInfo } = this.props;
        var formname = lang == "fa" ? FormInfo.fm_pub_sabt_kar.form_name : FormInfo.fm_pub_sabt_kar.en_form_name;

        if (thisSaveParams.data["wt_id"] === undefined) {
            toast.error(this.context.t("msg_No_Select_WorkType"));
            return false;
        }
        if (thisSaveParams.workers.length == 0) {
            toast.error(this.context.t("msg_No_Select_Worker"));
            return false;
        }
        if (thisSaveParams.workers[0].worker_id ===undefined || thisSaveParams.workers[0].worker_id ==0) {
            toast.error(this.context.t("msg_No_Select_Worker"));
            return false;
        } 
        if (thisSaveParams.workers[0].manager_id ===undefined || thisSaveParams.workers[0].manager_id ==0) {
            toast.error(this.context.t("msg_No_Select_Manager"));
            return false;
        }
        if (thisSaveParams.data["tarikhaction"] === undefined) {
            toast.error(this.context.t("msg_ActionDate_Not_Valid"));
            return false;
        }
        if (thisSaveParams.data["tarikhaction"].tarikhaction.length < 10) {
            toast.error(this.context.t("msg_ActionDate_Not_Valid"));
            return false;
        }
        thisSaveParams.form = formname;

        thisSaveParams.archivesList = this.state.AttachmentList;
        finalSaveParams = Object.assign({}, thisSaveParams);
        let obj = [];
        Object.keys(finalSaveParams.data).map((item, index) => {
            return obj[index++] = finalSaveParams.data[item];
        })
        finalSaveParams.data = obj;
        console.log(finalSaveParams)
        return false;
        if (finalSaveParams.peygir_id === 0) {
            InsertNewWorkInfo(finalSaveParams, this.context.t("msg_Operation_Success")).then(data => {
                if (data.status) {
                    thisSaveParams.peygir_id = data.data.peygir_id0;
                    console.log(thisSaveParams)
                }
            });
        }
        else if (finalSaveParams.peygir_id !== 0) {
            console.log(thisSaveParams)
            console.log(finalSaveParams)
            //update
        }
    }
    attachmentsToggle() {
        this.setState({
            AttachmentReviewmodal: !this.state.AttachmentReviewmodal
        });

    }
    ChangeAttachments(NewAttchments) {
        this.setState({ AttachmentList: NewAttchments });
    }
    ToggleSelectFileAudience = () => {
        this.setState({
            SelectFileAudiencemodal: !this.state.SelectFileAudiencemodal,
        });
    }
    SelectFileAudienceRow(row) {
        const { GetSelectComboProject } = this.props;
        this.refs.fileInfo.value = row.coname + " - " + row.name;
        this.refs.Audience.value = row.mokhatab_name;
        this.setState({ SelectedFileId: row.id_taraf });
        this.setState({ SelectedAudienceId: row.mokhatab_id });
        thisSaveParams.data["id_tel"] = { "id_tel": row.id_taraf };
        thisSaveParams.data["ashkhas_id"] = { "ashkhas_id": row.mokhatab_id };
        this.setState({
            SelectFileAudiencemodal: !this.state.SelectFileAudiencemodal,
        });
        this.setState({ ProjectSelectedOption: { value: 0, label: this.context.t("NoSelection") } });
        this.refs.project_code.value = "";
        projectParams.Id_Taraf = row.id_taraf;
        GetSelectComboProject(projectParams);
        this.refs.Follower.value = "";
        thisSaveParams.data["p_id"] = { "p_id": 0 };
        this.setState({ SelectedFollowerId: 0 });
        this.setState({ SelectedShowtreeFollowerId: 0 });

    }

    ToggleSelectFollower = () => {

        if (this.state.SelectedFileId !== 0)
            this.setState({
                SelectFollowermodal: !this.state.SelectFollowermodal,
            });
        else
            toast.warn(this.context.t("msg_No_Select_File_Audience"));
    }
    SelectFollowerRow(row) {
        if ((row.flow_id === null || row.flow_id == 0) && row.flow_id !== undefined) {
            this.refs.Follower.value = row.peygir_id + " - " + row.wtype + " - " + this.context.t("Serial") + " : " + row.nos_id;
            thisSaveParams.data["p_id"] = { "p_id": row.peygir_id };
            this.setState({ SelectedFollowerId: row.peygir_id });
            this.setState({ SelectedShowtreeFollowerId: row.showtree_id });
            if (this.refs.cpy_form_kar.checked)
                thisSaveParams.data["cpy_form_kar"] = { "cpy_form_kar": row.showtree_id };
            else
                thisSaveParams.data["cpy_form_kar"] = { "cpy_form_kar": 0 };
            this.setState({
                SelectFollowermodal: !this.state.SelectFollowermodal,
            });
        }
        else
            toast.error(this.context.t("msg_No_Select_Is_In_Flow"));
    }
    deleteFollower = () => {
        this.refs.Follower.value = "";
        thisSaveParams.data["p_id"] = { "p_id": 0 };
        this.setState({ SelectedFollowerId: 0 });
    }
    ToggleSelectProject = () => {
        if (this.state.SelectedFileId !== 0)
            this.setState({
                ProjectSelectmodal: !this.state.ProjectSelectmodal,
            });
        else
            toast.warn(this.context.t("msg_No_Select_File_Audience"));
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
    deleteProject = () => {
        this.setState({ ProjectSelectedOption: { value: 0, label: this.context.t("NoSelection") } });
        this.refs.project_code.value = "";
    }
    render() {
        const { modal, toggle, SelectWorkTypeList_rows, SelectPriorityList_rows,
            SelectWorkFlowList_rows, SelectWorkGroupList_rows, SelectRoleList_rows,
            SelectProjectComboList_rows, SelectWorkerList_rows, SelectFileAudience_rows,
            SelectManagerList_rows, GetSelectFileAudienceList } = this.props;
        var None = [{ value: 0, label: this.context.t("NoSelection") }]
        var PriorityList = None.concat(SelectPriorityList_rows);
        var WorkFlowList = None.concat(SelectWorkFlowList_rows);
        var WorkGroupList = None.concat(SelectWorkGroupList_rows);
        var WorkTypeList = None.concat(SelectWorkTypeList_rows);
        var UserRollList = None.concat(SelectRoleList_rows);
        var WorkerList = None.concat(SelectWorkerList_rows);
        var ManagerList = None.concat(SelectManagerList_rows);
        var ProjectList = None.concat(SelectProjectComboList_rows);
        var FileList = None.concat(SelectFileAudience_rows);

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
                            <RibbonNewWork saveWorkHandle={this.saveWorkHandle.bind(this)} attachmentsToggle={this.attachmentsToggle.bind(this)} />
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
                                                        <input type="text" autoComplete="off" className="form-control" readOnly={true} disabled={true}
                                                            name="id_tel" id="id_tel" ref="fileInfo" />

                                                        {/* {SelectFileAudience_rows !== undefined &&
                                                     <ApiComboMultiSelectList keyField="mokhatab_id" showField={fileShowField} options={FileList} ref="fileInfo" 
                                                     fetchData={GetSelectFileAudienceList.bind(this)} Params={FileAudienceParams}
                                                      name="id_tel" onChange={this.changeHandle.bind(this)} 
                                                      selectedOption={this.state.FileAudienceSelectedOption} />
                                                     } */}
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
                                                            {/* <Button className="rounded-0" color="danger" onClick={this.deleteProject.bind(this)}>{this.context.t("Delete")}</Button> */}
                                                        </div>
                                                        <input type="text" autoComplete="off" className="form-control wd-100 flex-0 bd-l-1" readOnly={true} disabled={true} name="project_code" ref="project_code" placeholder={this.context.t("ProjectCode")} />
                                                        {SelectProjectComboList_rows !== undefined &&
                                                            <ComboSelectList options={ProjectList} ref="p_type_id" name="p_type_id" onChange={this.changeHandle.bind(this)} selectedOption={this.state.ProjectSelectedOption} />
                                                        }
                                                        {
                                                            SelectProjectComboList_rows == undefined &&
                                                            <input type="text" autoComplete="off" className="form-control" readOnly={true} disabled={true} name="p_type_id"
                                                                name="p_type_id" id="p_type_id" ref="Project" placeholder={this.context.t("Project")} />
                                                        }
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
                                                                onClick={this.ToggleSelectFollower.bind(this)}>{this.context.t("SelectPopup")}</Button>
                                                            <Button className="rounded-0" color="danger" onClick={this.deleteFollower.bind(this)}>{this.context.t("Delete")}</Button>
                                                        </div>
                                                        <input type="text" autoComplete="off" className="form-control" readOnly={true} disabled={true} name="atf_id"
                                                            name="p_id" id="atf_id" ref="Follower" />
                                                        {/* <div className="input-group-append">
                                                        </div> */}
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
                                                        <ComboSelectList options={UserRollList} classname="mt-1 mb-2" name="manager_role_id" onChange={this.changeRoleHandle.bind(this)} />
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
                                                        <input id="workform0" name="cpy_form_kar" ref="cpy_form_kar" onChange={this.checkBoxChangeHandler.bind(this)} type="checkbox" />
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

                {this.state.SelectFollowermodal &&
                    <SelectFollowerList modal={this.state.SelectFollowermodal}
                        toggle={this.ToggleSelectFollower.bind(this)}
                        Successtoggle={this.SelectFollowerRow.bind(this)}
                        id_tel={this.state.SelectedFileId}
                    />}
                {this.state.AttachmentReviewmodal &&
                    <AttachmentsReview modal={this.state.AttachmentReviewmodal}
                        AttachmentList={this.state.AttachmentList}
                        ChangeAttachments={this.ChangeAttachments.bind(this)}
                        toggle={this.attachmentsToggle.bind(this)}
                        parentPeygirId={0} peygir_id={0} />}
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
        return dispatch(AutoBasicInfo_action.SelectWorkTypeList(Params))
    },
    FirstWorkOnFlow: (Params) => {
        return dispatch(AutoBasicInfo_action.FirstWorkOnFlow(Params))
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
        return dispatch(AutoBasicInfo_action.SelectFileAudienceList(Params))
    }, SayManagerOnWorkerWtype: (worker_id, wt_id) => {
        return dispatch(AutoBasicInfo_action.SayManagerOnWorkerWtype(worker_id, wt_id))
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
    const { SelectWorkTypeList_rows, SelectPriorityList_rows, SelectWorkFlowList_rows,
        SelectWorkGroupList_rows, SelectRoleList_rows, SelectWorkerList_rows,
        SelectManagerList_rows, SelectFileAudience_totalCount,
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

