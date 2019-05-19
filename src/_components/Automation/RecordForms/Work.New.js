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
    ProjectsInfo_action, design_Actions
} from "../../../_actions";
import { toast } from 'react-toastify';
import { RibbonNewWork } from './Ribbon/Ribbon.NewWork';
import {
    LabelCheckBox, LabelInputText,
    LabelCombobox, LabelCalendar, LabelPopUpInputText, BoxGroup
} from "../../Frameworks";
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
var DefaultInfoParams = { form: "work", wt_id: 0, flow_id: 0, isInternal: 0 }


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
            hasformsazCheckBox: false,
            manager_role_id: 0,
            user_role_id: 0,
            SubjectInputText: "",
            ResultTextArea: "",
            DescriptionTextArea: "",
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
        DefaultInfoParams = { form: "work", wt_id: 0, flow_id: 0, isInternal: 0 }



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
        this.setState({ setDefaultActionDate: value });
    }
    changeHandle = (e, val) => {

        if (val !== undefined) {
            const { name } = e;
            if (name === "flow_id")
                this.flowChange(val);
            else if (name === "workgroup_id")
                this.workgroupChange(val);
            else if (name === "wt_id")
                this.reloadWorkType(val);
            else if (name === "worker_id") {
                let worker_id = val.value;
                let workerLabel = val.label;
                thisSaveParams.workers[0].worker = worker_id;
                const { SayManagerOnWorkerWtype } = this.props;
                thisSaveParams.workers[0].manager = val.value;
                this.setState({ workerSelectedOption: { value: worker_id, label: workerLabel } });

                SayManagerOnWorkerWtype(val.value, WorkerParams.wt_id).then(data => {
                    if (data.status) {
                        this.setState({ managerSelectedOption: { value: data.data.managerId, label: data.data.managerUName } });
                        thisSaveParams.workers[0].manager = data.data.managerId;
                    }
                });
            }
            else if (name === "defmodir_id") {
                const manager_id = val.value;
                const managerLabel = val.label;
                thisSaveParams.workers[0].manager = val.value;
                this.setState({ managerSelectedOption: { value: manager_id, label: managerLabel } });
            }
            else if (name === "p_type_id") {
                this.projectChange(val);
            }
            if (name !== "worker_id" && name !== "defmodir_id")
                thisSaveParams.data[[name]] = { [name]: val.value === 0 ? null : val.value }

        }
        else {
            const { name, value } = e.target;
            if (name === "mozo")
                this.setState({ SubjectInputText: value });
            if (name === "natije")
                this.setState({ ResultTextArea: value });
            if (name === "tozihat")
                this.setState({ DescriptionTextArea: value });
            if (name === "code")
                this.setState({ CodeText: value });
            if (name === "shomare")
                this.setState({ ShomareText: value });
            if (name === "deadtime")
                this.setState({ deadtimeText: value });
            thisSaveParams.data[[name]] = { [name]: value };
        }
    }
    projectChange = (Val) => {

        const project_id = Val.value;
        const projectLabel = Val.label;
        if (project_id !== 0)
            this.setState({ ProjectSelectedOption: { value: project_id, label: projectLabel } });
        else {

            this.setState({ ProjectSelectedOption: { value: 0, label: this.context.t("NoSelection") } });
            thisSaveParams.data["p_type_id"] = { "p_type_id": null };
        }
    }
    workgroupChange = (Val) => {
        const workgroup_id = Val.value;
        const workgrouLabel = Val.label;
        const { SelectWorkTypeList } = this.props;
        if (workgroup_id !== 0) {
            this.setState({ WorkgroupSelectedOption: { value: workgroup_id, label: workgrouLabel } });
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
            this.setState({ WorkgroupSelectedOption: { value: 0, label: this.context.t("NoSelection") } });
        }
    }
    flowChange = (Val) => {
        const flowId = Val.value;
        const flowLabel = Val.label;
        const { SelectWorkTypeList, FirstWorkOnFlow } = this.props;
        if (flowId !== 0) {
            workTypeParams.FlowId = flowId;
            thisSaveParams.data["erja"] = { "erja": 1 };
            thisSaveParams.data["flow_id"] = { "flow_id": flowId };
            DefaultInfoParams.flow_id = flowId;
            this.setState({ FlowSelectedOption: { value: flowId, label: flowLabel } });
            this.setState({ workgroup_id_disabled: true });
            SelectWorkTypeList(workTypeParams).then(Response1 => {
                if (Response1.status) {
                    FirstWorkOnFlow(flowId).then(Response2 => {
                        if (Response2.status) {
                            const found = Response1.data.rows.some(el => el.id === Response2.data.workTypeId);
                            if (Response2.data.workTypeId !== 0 && found) {
                                this.setState({ workTypeSelectedOption: { value: Response2.data.workTypeId, label: Response2.data.workType } });
                                workTypeParams.FlowId = flowId;
                                this.reloadWorkType({ value: Response2.data.workTypeId, label: Response2.data.workType });
                            } else {
                                this.setState({ workTypeSelectedOption: { value: 0, label: this.context.t("NoSelection") } });
                                this.setState({ flowCheckBox: false });
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
            this.setState({ FlowSelectedOption: { value: 0, label: this.context.t("NoSelection") } });
            this.setState({ workgroup_id_disabled: false });
            SelectWorkTypeList(workTypeParams);
            this.setState({ workTypeSelectedOption: { value: 0, label: this.context.t("NoSelection") } });
            this.setState({ workerSelectedOption: { value: 0, label: this.context.t("NoSelection") } });
            this.setState({ managerSelectedOption: { value: 0, label: this.context.t("NoSelection") } });
            this.setState({ flowCheckBox: true });
            thisSaveParams.data["erja"] = { "erja": 1 };
        }
    }
    reloadWorkType = (Val) => {
        const selectedWtId = Val.value;
        const selectedWtLabel = Val.label;
        this.setState({ workTypeSelectedOption: { value: selectedWtId, label: selectedWtLabel } });
        const { SelectWorkerList } = this.props;
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

        this.setState({ FollowerText: "" });
        thisSaveParams.data["p_id"] = { "p_id": 0 };
        this.setState({ SelectedFollowerId: 0 });
        this.setState({ SelectedShowtreeFollowerId: 0 });

        GetNewWorkDefaultInfo(DefaultInfoParams).then(data => {
            if (data.status) {
                if (data.data.DefaultValue !== null) {
                    if (workTypeParams.FlowId === 0 || workTypeParams.FlowId === undefined || workTypeParams.FlowId === null) {
                        this.setState({ flowCheckBox: data.data.DefaultValue.flow });
                        thisSaveParams.data["flow_id"] = { "flow_id": null };
                        thisSaveParams.data["erja"] = { "erja": data.data.DefaultValue.flow ? 1 : 0 };
                    }
                    this.setState({ alowattCheckBox: data.data.DefaultValue.alowatt });
                    thisSaveParams.data["alowatt"] = { "alowatt": data.data.DefaultValue.alowatt ? 1 : 0 };

                    this.setState({ emailToWorkerCheckBox: data.data.DefaultValue.web_emailtokarbar });
                    this.setState({ smsToWorkerCheckBox: data.data.DefaultValue.web_smstokarbar });
                    thisSaveParams["emailToWorker"] = data.data.DefaultValue.web_emailtokarbar ? 1 : 0;
                    thisSaveParams["smsToWorker"] = data.data.DefaultValue.web_smstokarbar ? 1 : 0;

                    this.setState({ emailToAudienceCheckBox: data.data.DefaultValue.web_emailtomokhatab });
                    this.setState({ smsToAudienceCheckBox: data.data.DefaultValue.web_smstomokhatab });
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
                            this.setState({ fileInfoText: data.data.FileInfo.coname });
                            if (data.data.FileInfo.ptype_id !== null || data.data.FileInfo.ptype_id !== 0) {
                                this.setState({ ProjectSelectedOption: { value: data.data.FileInfo.ptype_id, label: data.data.FileInfo.ptype } });
                                thisSaveParams.data["p_type_id"] = { "p_type_id": data.data.FileInfo.ptype_id };
                            }
                            projectParams.Id_Taraf = data.data.FileInfo.id
                            const { GetSelectComboProject } = this.props;
                            GetSelectComboProject(projectParams);
                        }
                    }
                    if (data.data.ActionDate !== "") {
                        this.setState({ setDefaultActionDate: data.data.ActionDate });
                        thisSaveParams.data["tarikhaction"] = { "tarikhaction": data.data.ActionDate };
                    }
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
            this.setState({ flowCheckBox: checked });
        } if (name === "alowatt") {
            thisSaveParams.data["alowatt"] = { "alowatt": value };
            this.setState({ alowattCheckBox: checked });
        } if (name === "lock") {
            thisSaveParams.data["lock"] = { "lock": value };
            this.setState({ lockCheckBox: checked });
        } else if (name === "emailToWorker") {
            thisSaveParams["emailToWorker"] = value;
            this.setState({ emailToWorkerCheckBox: checked });
        } else if (name === "smsToWorker") {
            thisSaveParams["smsToWorker"] = value;
            this.setState({ smsToWorkerCheckBox: checked });
        } else if (name === "emailToAudience") {
            thisSaveParams["emailToAudience"] = value;
            this.setState({ emailToAudienceCheckBox: checked });
        } else if (name === "smsToAudience") {
            thisSaveParams["smsToAudience"] = value;
            this.setState({ smsToAudienceCheckBox: checked });
        } else if (name === "cpy_form_kar") {
            if (checked && this.state.SelectedShowtreeFollowerId !== undefined && this.state.SelectedShowtreeFollowerId !== 0)
                thisSaveParams.data["cpy_form_kar"] = { "cpy_form_kar": this.state.SelectedShowtreeFollowerId };
            else
                thisSaveParams.data["cpy_form_kar"] = { "cpy_form_kar": 0 };
            this.setState({ "cpy_form_karCheckBox": checked });
        }
        else if (name === "hasformsaz") {
            this.setState({ hasformsazCheckBox: checked });
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
                if (this.state.type === "Subject") {
                    const newSubject = this.state.SubjectInputText + " " + (row !== undefined ? row.sharh !== undefined ? row.sharh : "" : "");
                    this.setState({ SubjectInputText: newSubject });
                    thisSaveParams.data["mozo"] = { "mozo": newSubject };
                } else if (this.state.type === "Result") {
                    const newResult = this.state.ResultTextArea + " " + (row !== undefined ? row.sharh !== undefined ? row.sharh : "" : "");
                    this.setState({ ResultTextArea: newResult });

                    thisSaveParams.data["natije"] = { "natije": newResult };
                }
                else {
                    const newDescription = this.state.DescriptionTextArea + " " + (row !== undefined ? row.sharh !== undefined ? row.sharh : "" : "");
                    this.setState({ DescriptionTextArea: newDescription });
                    thisSaveParams.data["tozihat"] = { "tozihat": newDescription };
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
        if (thisSaveParams.data["id_tel"] === undefined) {
            toast.error(this.context.t("msg_No_Select_File_Audience"));
            return false;
        }
        if (thisSaveParams.workers.length == 0) {
            toast.error(this.context.t("msg_No_Select_Worker"));
            return false;
        }
        if (thisSaveParams.workers[0].worker === undefined || thisSaveParams.workers[0].worker == 0) {
            toast.error(this.context.t("msg_No_Select_Worker"));
            return false;
        }
        if (thisSaveParams.workers[0].manager === undefined || thisSaveParams.workers[0].manager == 0) {
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
        if (finalSaveParams.peygir_id === 0) {
            InsertNewWorkInfo(finalSaveParams, this.context.t("msg_Operation_Success")).then(data => {
                if (data.status) {
                    thisSaveParams.peygir_id = data.data.peygir_id0;
                    console.log(thisSaveParams)
                }
            });
        }
        else if (finalSaveParams.peygir_id !== 0) {
            alert("updated")
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
        this.setState({ fileInfoText: row.coname + " - " + row.name });
        this.setState({ AudienceText: row.mokhatab_name });
        this.setState({ SelectedFileId: row.id_taraf });
        this.setState({ SelectedAudienceId: row.mokhatab_id });
        thisSaveParams.data["id_tel"] = { "id_tel": row.id_taraf };
        thisSaveParams.data["ashkhas_id"] = { "ashkhas_id": row.mokhatab_id };
        this.setState({
            SelectFileAudiencemodal: !this.state.SelectFileAudiencemodal,
        });
        this.setState({ ProjectSelectedOption: { value: 0, label: this.context.t("NoSelection") } });
        projectParams.Id_Taraf = row.id_taraf;
        GetSelectComboProject(projectParams);
        this.setState({ FollowerText: "" });
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
            this.setState({ FollowerText: row.peygir_id + " - " + row.wtype + " - " + this.context.t("Serial") + " : " + row.nos_id });
            thisSaveParams.data["p_id"] = { "p_id": row.peygir_id };
            this.setState({ SelectedFollowerId: row.peygir_id });
            this.setState({ SelectedShowtreeFollowerId: row.showtree_id });
            thisSaveParams.data["showtree_id"] = { "showtree_id": row.showtree_id };
            thisSaveParams.data["arshiv_id"] = { "arshiv_id": row.showtree_id };
            if (this.state.cpy_form_karCheckBox)
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
        this.setState({ FollowerText: "" });
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
                this.setState({ user_roleSelectedOption: { value: val.value, label: val.label } });
                this.setState({ workerSelectedOption: { value: 0, label: this.context.t("NoSelection") } });
            }
            else if (name === "manager_role_id") {
                SelectManagerList(val.value, 0);
                this.setState({ manager_roleSelectedOption: { value: val.value, label: val.label } });
                this.setState({ managerSelectedOption: { value: 0, label: this.context.t("NoSelection") } });
            }
        }
    }
    deleteProject = () => {
        this.setState({ ProjectSelectedOption: { value: 0, label: this.context.t("NoSelection") } });
    }
    render() {
        const { modal, toggle, SelectWorkTypeList_rows, SelectPriorityList_rows,
            SelectWorkFlowList_rows, SelectWorkGroupList_rows, SelectRoleList_rows,
            SelectProjectComboList_rows, SelectWorkerList_rows,
            SelectManagerList_rows, DeletedElements, EditedElements } = this.props;
        var None = [{ value: 0, label: this.context.t("NoSelection") }]
        var PriorityList = SelectPriorityList_rows !== undefined ? None.concat(SelectPriorityList_rows) : None
        var WorkFlowList = SelectWorkFlowList_rows !== undefined ? None.concat(SelectWorkFlowList_rows) : None
        var WorkGroupList = SelectWorkGroupList_rows !== undefined ? None.concat(SelectWorkGroupList_rows) : None
        var WorkTypeList = SelectWorkTypeList_rows !== undefined ? None.concat(SelectWorkTypeList_rows) : None
        var UserRollList = SelectRoleList_rows !== undefined ? None.concat(SelectRoleList_rows) : None
        var WorkerList = SelectWorkerList_rows !== undefined ? None.concat(SelectWorkerList_rows) : None
        var ManagerList = SelectManagerList_rows !== undefined ? None.concat(SelectManagerList_rows) : None
        var ProjectList = SelectProjectComboList_rows !== undefined ? None.concat(SelectProjectComboList_rows) : None

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
                    <ModalHeader toggle={toggle}>{this.context.t("frm_Create_Work")}</ModalHeader>
                    <ModalBody>
                        <div className="r-main-box__ribbon">
                            <RibbonNewWork saveWorkHandle={this.saveWorkHandle.bind(this)} attachmentsToggle={this.attachmentsToggle.bind(this)} />
                        </div>
                        <div className="referral-modal">
                            <BoxGroup 
                                Text={this.context.t("WorkInfoBox")}
                                FormId={FormInfo.fm_pub_sabt_kar.id}
                                Id="WorkInfoBox"
                                IconClassName="row-icon flow"
                                DeletedElements={DeletedElements}
                                EditedElements={EditedElements}
                            >
                                <div className="col-11">
                                    <div className="row">
                                        <LabelCombobox
                                            Text={this.context.t("WorkFlow")}
                                             name="flow_id"
                                            Id="WorkFlow"
                                            changeHandle={this.changeHandle.bind(this)}
                                            FormId={FormInfo.fm_pub_sabt_kar.id}
                                            DeletedElements={DeletedElements}
                                            EditedElements={EditedElements}
                                            isDisabled={this.state.flow_id_disabled}
                                            selectedOption={this.state.FlowSelectedOption}
                                            options={WorkFlowList}
                                        ></LabelCombobox>
                                        <LabelCombobox
                                            ColClassName="col-4"
                                            Text={this.context.t("WorkGroup")} 
                                             name="workgroup_id"
                                            Id="WorkGroup" changeHandle={this.changeHandle.bind(this)}
                                            FormId={FormInfo.fm_pub_sabt_kar.id}
                                            DeletedElements={DeletedElements}
                                            EditedElements={EditedElements}
                                            isDisabled={this.state.workgroup_id_disabled}
                                            selectedOption={this.state.WorkgroupSelectedOption}
                                            options={WorkGroupList}
                                        ></LabelCombobox>
                                        <div className="col-2">
                                            <div className="form-group row">
                                                <div className="col-12">
                                                    <div className="input-group mt-2 mb-1">
                                                        <div className="input-group-append pl-5 pt-1 text-space-nowrap">
                                                            <LabelCheckBox 
                                                                Text={this.context.t("HasFormBuilder")}
                                                                name="hasformsaz"
                                                                Id="HasFormBuilder" checkBoxChangeHandler={this.checkBoxChangeHandler.bind(this)}
                                                                FormId={FormInfo.fm_pub_sabt_kar.id}
                                                                DeletedElements={DeletedElements}
                                                                EditedElements={EditedElements}
                                                                checked={this.state.hasformsazCheckBox}
                                                            ></LabelCheckBox>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="row">
                                        <LabelCombobox
                                            Text={this.context.t("WorkType")} 
                                            ComboclassName="mt-1 mb-2" name="wt_id"
                                            Id="WorkType" changeHandle={this.changeHandle.bind(this)}
                                            FormId={FormInfo.fm_pub_sabt_kar.id}
                                            DeletedElements={DeletedElements}
                                            EditedElements={EditedElements}
                                            selectedOption={this.state.workTypeSelectedOption}
                                            options={WorkTypeList}
                                        ></LabelCombobox>
                                    </div>
                                </div>
                            </BoxGroup>

                            <BoxGroup 
                                Text={this.context.t("FileInfoBox")}
                                FormId={FormInfo.fm_pub_sabt_kar.id}
                                Id="FileInfoBox"
                                IconClassName="row-icon flow"
                                DeletedElements={DeletedElements}
                                EditedElements={EditedElements}
                            >
                                <div className="col-11">
                                    <div className="row">
                                        <LabelPopUpInputText
                                            Text={this.context.t("File")} 
                                             name="id_tel"
                                            Id="File" ButtonClick={this.ToggleSelectFileAudience.bind(this)}
                                            FormId={FormInfo.fm_pub_sabt_kar.id}
                                            DeletedElements={DeletedElements}
                                            EditedElements={EditedElements}
                                            isDisabled={true}
                                            value={this.state.fileInfoText}
                                            Type="Input"
                                            changeHandle={this.changeHandle.bind(this)}
                                            ButtonText={this.context.t("SelectPopup")}
                                        ></LabelPopUpInputText>
                                        <LabelInputText
                                            Text={this.context.t("Audience")} 
                                             name="ashkhas_id"
                                            Id="Audience"
                                            FormId={FormInfo.fm_pub_sabt_kar.id}
                                            DeletedElements={DeletedElements}
                                            EditedElements={EditedElements}
                                            value={this.state.AudienceText}
                                            isDisabled={true}
                                        ></LabelInputText>
                                    </div>
                                    <div className="row">
                                        <LabelPopUpInputText
                                            Text={this.context.t("Project")} 
                                             name="p_type_id"
                                            Id="Project" ButtonClick={this.ToggleSelectProject.bind(this)}
                                            FormId={FormInfo.fm_pub_sabt_kar.id}
                                            DeletedElements={DeletedElements}
                                            EditedElements={EditedElements}
                                            value={this.state.ProjectSelectedOption}
                                            className3="input-group mt-1 mb-2"
                                            Type="ComboBox"
                                            options={ProjectList}
                                            changeHandle={this.changeHandle.bind(this)}
                                            ButtonText={this.context.t("SelectPopup")}
                                        ></LabelPopUpInputText>
                                        <LabelPopUpInputText
                                            Text={this.context.t("Following")} 
                                             name="p_id"
                                            Id="Following" ButtonClick={this.ToggleSelectFollower.bind(this)}
                                            FormId={FormInfo.fm_pub_sabt_kar.id}
                                            DeletedElements={DeletedElements}
                                            EditedElements={EditedElements}
                                            isDisabled={true}
                                            value={this.state.FollowerText}
                                            className3="input-group mt-1 mb-2"
                                            Type="Input"
                                            hasDelete={true}
                                            deleteHandler={this.deleteFollower.bind(this)}
                                            ButtonText={this.context.t("SelectPopup")}
                                        ></LabelPopUpInputText>
                                    </div>
                                </div>
                            </BoxGroup>

                            <BoxGroup 
                                Text={this.context.t("DateTimeInfoBox")}
                                FormId={FormInfo.fm_pub_sabt_kar.id}
                                Id="DateTimeInfoBox"
                                IconClassName="row-icon clock"
                                DeletedElements={DeletedElements}
                                EditedElements={EditedElements}
                            >
                                <div className="col-11">
                                    <div className="row">
                                        <LabelCalendar
                                            Text={this.context.t("ActionDate")} 
                                             name="tarikhaction"
                                            Id="ActionDate" CalendarChange={this.CalendarChange.bind(this)}
                                            FormId={FormInfo.fm_pub_sabt_kar.id}
                                            DeletedElements={DeletedElements}
                                            EditedElements={EditedElements}
                                            setDate={this.state.setDefaultActionDate}
                                        ></LabelCalendar>

                                        <LabelInputText
                                            Text={this.context.t("DeadTime")} 
                                            InputclassName="form-control my-2  ltr" name="deadtime"
                                            Id="DeadTime" changeHandle={this.changeHandle.bind(this)}
                                            FormId={FormInfo.fm_pub_sabt_kar.id}
                                            DeletedElements={DeletedElements}
                                            EditedElements={EditedElements}
                                            value={this.state.deadtimeText}
                                            mask="99:99"
                                        ></LabelInputText>
                                    </div>

                                </div>
                            </BoxGroup>

                            <BoxGroup 
                                Text={this.context.t("UsersInfoBox")}
                                FormId={FormInfo.fm_pub_sabt_kar.id}
                                Id="UsersInfoBox"
                                IconClassName="row-icon flow"
                                DeletedElements={DeletedElements}
                                EditedElements={EditedElements}
                            >
                                <div className="col-11">
                                    <div className="row">
                                        <LabelCombobox
                                            Text={this.context.t("Roll")} 
                                             name="user_role_id"
                                            Id="WorkerRoll"
                                            changeHandle={this.changeRoleHandle.bind(this)}
                                            FormId={FormInfo.fm_pub_sabt_kar.id}
                                            DeletedElements={DeletedElements}
                                            EditedElements={EditedElements}
                                            selectedOption={this.state.user_roleSelectedOption}
                                            options={UserRollList}
                                        ></LabelCombobox>
                                        <LabelCombobox
                                            Text={this.context.t("UserFullName")} 
                                             name="worker_id"
                                            Id="UserFullName" changeHandle={this.changeHandle.bind(this)}
                                            FormId={FormInfo.fm_pub_sabt_kar.id}
                                            DeletedElements={DeletedElements}
                                            EditedElements={EditedElements}
                                            selectedOption={this.state.workerSelectedOption}
                                            options={WorkerList}
                                        ></LabelCombobox>
                                    </div>
                                    <div className="row">
                                        <LabelCombobox
                                            Text={this.context.t("Roll")} 
                                            ComboclassName="mt-1 mb-2" name="manager_role_id"
                                            Id="ManagerRoll" changeHandle={this.changeRoleHandle.bind(this)}
                                            FormId={FormInfo.fm_pub_sabt_kar.id}
                                            DeletedElements={DeletedElements}
                                            EditedElements={EditedElements}
                                            selectedOption={this.state.manager_roleSelectedOption}
                                            options={UserRollList}
                                        ></LabelCombobox>
                                        <LabelCombobox
                                            Text={this.context.t("AdminFullName")} 
                                            ComboclassName="mt-1 mb-2" name="defmodir_id"
                                            Id="AdminFullName" changeHandle={this.changeHandle.bind(this)}
                                            FormId={FormInfo.fm_pub_sabt_kar.id}
                                            DeletedElements={DeletedElements}
                                            EditedElements={EditedElements}
                                            selectedOption={this.state.managerSelectedOption}
                                            options={ManagerList}
                                        ></LabelCombobox>

                                    </div>

                                </div>
                            </BoxGroup>
                            <BoxGroup 
                                Text={this.context.t("DetailsInfoBox")}
                                FormId={FormInfo.fm_pub_sabt_kar.id}
                                Id="DetailsInfoBox"
                                IconClassName="row-icon flow"
                                DeletedElements={DeletedElements}
                                EditedElements={EditedElements}
                            >
                                <div className="col-11">
                                    <div className="row">
                                        <LabelPopUpInputText
                                            Text={this.context.t("Subject")} 
                                             name="mozo"
                                            Id="Subject" ButtonClick={this.OpenSelectDefaultText.bind(this)}
                                            FormId={FormInfo.fm_pub_sabt_kar.id}
                                            DeletedElements={DeletedElements}
                                            EditedElements={EditedElements}
                                            value={this.state.SubjectInputText}
                                            Type="Input"
                                            changeHandle={this.changeHandle.bind(this)}
                                            ButtonText={this.context.t("SelectPopup")}
                                        ></LabelPopUpInputText>
                                        <LabelInputText
                                            Text={this.context.t("Code")} 
                                            InputclassName="form-control mt-2 mb-1 ltr" name="code"
                                            Id="Code" changeHandle={this.changeHandle.bind(this)}
                                            FormId={FormInfo.fm_pub_sabt_kar.id}
                                            DeletedElements={DeletedElements}
                                            EditedElements={EditedElements}
                                            value={this.state.CodeText}
                                        ></LabelInputText>

                                    </div>
                                    <div className="row">

                                        <LabelCombobox
                                            Text={this.context.t("Priority")} 
                                            ComboclassName="mt-1 mb-2" name="olaviyat_id"
                                            Id="Priority" changeHandle={this.changeHandle.bind(this)}
                                            FormId={FormInfo.fm_pub_sabt_kar.id}
                                            DeletedElements={DeletedElements}
                                            EditedElements={EditedElements}
                                            selectedOption={this.state.prioritySelectedOption}
                                            options={PriorityList}
                                        ></LabelCombobox>

                                        <LabelInputText
                                            Text={this.context.t("FileNumber")} 
                                            InputclassName="form-control mt-1 mb-2 ltr" name="shomare"
                                            Id="FileNumber" changeHandle={this.changeHandle.bind(this)}
                                            FormId={FormInfo.fm_pub_sabt_kar.id}
                                            DeletedElements={DeletedElements}
                                            EditedElements={EditedElements}
                                            value={this.state.ShomareText}
                                        ></LabelInputText>

                                    </div>
                                </div>
                            </BoxGroup>
                            <BoxGroup className="row bg-gray"
                                Text={this.context.t("DescriptionsInfoBox")}
                                FormId={FormInfo.fm_pub_sabt_kar.id}
                                Id="DescriptionsInfoBox"
                                IconClassName="row-icon result"
                                DeletedElements={DeletedElements}
                                EditedElements={EditedElements}
                            >
                                <div className="col-11">
                                    <div className="row">
                                        <LabelPopUpInputText LabelclassName="col-1 col-form-label"
                                            ColClassName="col-12"
                                            Text={this.context.t("WorkDescription")} className2="col-11"
                                             name="tozihat"
                                            Id="Description" ButtonClick={this.OpenSelectDefaultText.bind(this)}
                                            FormId={FormInfo.fm_pub_sabt_kar.id}
                                            DeletedElements={DeletedElements}
                                            EditedElements={EditedElements}
                                            value={this.state.DescriptionTextArea}
                                            Type="TextArea"
                                            changeHandle={this.changeHandle.bind(this)}
                                            ButtonText={this.context.t("SelectPopup")}
                                        ></LabelPopUpInputText>

                                    </div>
                                    <div className="row">

                                        <LabelPopUpInputText LabelclassName="col-1 col-form-label"
                                            ColClassName="col-12"
                                            Text={this.context.t("WorkResult")} className2="col-11"
                                            className3="input-group mt-1 mb-2"
                                             name="natije"
                                            Id="Result" ButtonClick={this.OpenSelectDefaultText.bind(this)}
                                            FormId={FormInfo.fm_pub_sabt_kar.id}
                                            DeletedElements={DeletedElements}
                                            EditedElements={EditedElements}
                                            value={this.state.ResultTextArea}
                                            Type="TextArea"
                                            changeHandle={this.changeHandle.bind(this)}
                                            ButtonText={this.context.t("SelectPopup")}
                                        ></LabelPopUpInputText>
                                    </div>

                                </div>
                            </BoxGroup>


                        </div>
                        <style>{modalBackDrop}</style>
                    </ModalBody>
                    <ModalFooter>
                        <h4>{this.context.t("Authority")}</h4>
                        <div className="row authority">
                            <div className="col-6">
                                <div className="row">
                                    <div className="col-4">
                                        <BoxGroup className="card"
                                            Text={this.context.t("WorkFlowSettingBox")}
                                            FormId={FormInfo.fm_pub_sabt_kar.id}
                                            Id="WorkFlowSettingBox"
                                            IconDivClassName="card-header"
                                            IconClassName="workform-authority"
                                            DeletedElements={DeletedElements}
                                            EditedElements={EditedElements}
                                        >
                                            <div className="card-body">
                                                <div className="checkbox-group">
                                                    <LabelCheckBox 
                                                        Text={this.context.t("CopyWorkForm")}
                                                        name="cpy_form_kar"
                                                        Id="CopyWorkForm"
                                                        checkBoxChangeHandler={this.checkBoxChangeHandler.bind(this)}
                                                        FormId={FormInfo.fm_pub_sabt_kar.id}
                                                        DeletedElements={DeletedElements}
                                                        EditedElements={EditedElements}
                                                        checked={this.state.cpy_form_karCheckBox}
                                                    ></LabelCheckBox>

                                                    <LabelCheckBox 
                                                        Text={this.context.t("NoWorkFlow")}
                                                        name="withoutFlow"
                                                        Id="NoWorkFlow"
                                                        checkBoxChangeHandler={this.checkBoxChangeHandler.bind(this)}
                                                        FormId={FormInfo.fm_pub_sabt_kar.id}
                                                        DeletedElements={DeletedElements}
                                                        EditedElements={EditedElements}
                                                        checked={this.state.flowCheckBox}
                                                        defaultChecked={true}
                                                    ></LabelCheckBox>

                                                </div>

                                            </div>
                                        </BoxGroup>
                                    </div>

                                    <div className="col-4">

                                        <BoxGroup className="card"
                                            Text={this.context.t("AttachmentSettingBox")}
                                            FormId={FormInfo.fm_pub_sabt_kar.id}
                                            Id="AttachmentSettingBox"
                                            IconDivClassName="card-header"
                                            IconClassName="attach-authority"
                                            DeletedElements={DeletedElements}
                                            EditedElements={EditedElements}
                                        >
                                            <div className="card-body">
                                                <div className="checkbox-group">
                                                    <LabelCheckBox 
                                                        Text={this.context.t("AllowAttachment")}
                                                        name="alowatt"
                                                        Id="AllowAttachment" checkBoxChangeHandler={this.checkBoxChangeHandler.bind(this)}
                                                        FormId={FormInfo.fm_pub_sabt_kar.id}
                                                        DeletedElements={DeletedElements}
                                                        EditedElements={EditedElements}
                                                        checked={this.state.alowattCheckBox}
                                                        defaultChecked={true}
                                                    ></LabelCheckBox>

                                                    <LabelCheckBox 
                                                        Text={this.context.t("LockedAttachment")}
                                                        name="lock"
                                                        Id="LockedAttachment" checkBoxChangeHandler={this.checkBoxChangeHandler.bind(this)}
                                                        FormId={FormInfo.fm_pub_sabt_kar.id}
                                                        DeletedElements={DeletedElements}
                                                        EditedElements={EditedElements}
                                                        checked={this.state.lockCheckBox}
                                                    ></LabelCheckBox>

                                                </div>
                                            </div>
                                        </BoxGroup>

                                    </div>
                                    <div className="col-4">
                                        <BoxGroup className="card"
                                            Text={this.context.t("TerminalSettingBox")}
                                            FormId={FormInfo.fm_pub_sabt_kar.id}
                                            Id="TerminalSettingBox"
                                            IconDivClassName="card-header border-0"
                                            IconClassName="send-authority"
                                            DeletedElements={DeletedElements}
                                            EditedElements={EditedElements}
                                        >
                                            <div className="card-body">
                                                <div className="checkbox-group">
                                                    <LabelCheckBox 
                                                        Text={this.context.t("SendEmailToUser")}
                                                        name="emailToWorker"
                                                        Id="SendEmailToUser" checkBoxChangeHandler={this.checkBoxChangeHandler.bind(this)}
                                                        FormId={FormInfo.fm_pub_sabt_kar.id}
                                                        DeletedElements={DeletedElements}
                                                        EditedElements={EditedElements}
                                                        checked={this.state.emailToWorkerCheckBox}
                                                    ></LabelCheckBox>

                                                    <LabelCheckBox 
                                                        Text={this.context.t("SendEmailToAudience")}
                                                        name="emailToAudience"
                                                        Id="SendEmailToAudience" checkBoxChangeHandler={this.checkBoxChangeHandler.bind(this)}
                                                        FormId={FormInfo.fm_pub_sabt_kar.id}
                                                        DeletedElements={DeletedElements}
                                                        EditedElements={EditedElements}
                                                        checked={this.state.emailToAudienceCheckBox}
                                                    ></LabelCheckBox>

                                                    <LabelCheckBox 
                                                        Text={this.context.t("SendSmsToUser")}
                                                        name="smsToWorker"
                                                        Id="SendSmsToUser"
                                                        checkBoxChangeHandler={this.checkBoxChangeHandler.bind(this)}
                                                        FormId={FormInfo.fm_pub_sabt_kar.id}
                                                        DeletedElements={DeletedElements}
                                                        EditedElements={EditedElements}
                                                        checked={this.state.smsToWorkerCheckBox}
                                                    ></LabelCheckBox>


                                                    <LabelCheckBox 
                                                        Text={this.context.t("SendSmsToAudience")}
                                                        name="smsToAudience"
                                                        Id="SendSmsToAudience" checkBoxChangeHandler={this.checkBoxChangeHandler.bind(this)}
                                                        FormId={FormInfo.fm_pub_sabt_kar.id}
                                                        DeletedElements={DeletedElements}
                                                        EditedElements={EditedElements}
                                                        checked={this.state.smsToAudienceCheckBox}
                                                    ></LabelCheckBox>


                                                </div>

                                            </div>
                                        </BoxGroup>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </ModalFooter>
                    <div className="authority-toggle">
                        <button type="button" className="js-authority-toggle-btn active" title={this.context.t("Authority")}></button>
                    </div>
                </Modal>
                {
                    this.state.SubjectSelectmodal &&
                    <SelectDefaultTextModal modal={this.state.SubjectSelectmodal}
                        toggle={this.CloseSelectDefaultText.bind(this)}
                        Successtoggle={this.SuccessSelectSubject.bind(this)}
                    />
                }
                {
                    this.state.SelectFileAudiencemodal &&
                    <SelectFileAudienceList modal={this.state.SelectFileAudiencemodal}
                        toggle={this.ToggleSelectFileAudience.bind(this)}
                        Successtoggle={this.SelectFileAudienceRow.bind(this)}
                    />
                }

                {
                    this.state.SelectFollowermodal &&
                    <SelectFollowerList modal={this.state.SelectFollowermodal}
                        toggle={this.ToggleSelectFollower.bind(this)}
                        Successtoggle={this.SelectFollowerRow.bind(this)}
                        id_tel={this.state.SelectedFileId}
                    />
                }
                {
                    this.state.AttachmentReviewmodal &&
                    <AttachmentsReview modal={this.state.AttachmentReviewmodal}
                        AttachmentList={this.state.AttachmentList}
                        ChangeAttachments={this.ChangeAttachments.bind(this)}
                        toggle={this.attachmentsToggle.bind(this)}
                        parentPeygirId={0} peygir_id={0} />
                }
                {
                    this.state.ProjectSelectmodal &&
                    <SelectProjectModal modal={this.state.ProjectSelectmodal}
                        toggle={this.ToggleSelectProject.bind(this)}
                        Successtoggle={this.SuccessSelectProject.bind(this)}
                        id_tel={this.state.SelectedFileId}
                    />
                }
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

    const { DeletedElements344 } = state.Design !== undefined ? state.Design : {};
    const { EditedElements344 } = state.Design !== undefined ? state.Design : {};
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
        SelectFileAudience_rows,
        DeletedElements: DeletedElements344,
        EditedElements: EditedElements344,
    };
}


const connectedNewWork = connect(mapStateToProps, mapDispatchToProps)(NewWork);
export { connectedNewWork as NewWork };

