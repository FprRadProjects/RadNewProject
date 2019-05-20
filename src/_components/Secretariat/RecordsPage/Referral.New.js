import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import PropTypes from "prop-types"
import { SelectDefaultTextModal } from "../../Basic/";
import InputMask from 'react-input-mask';
import { AttachmentsReview } from "../../Archives";
import { FormInfo } from "../../../locales";

import {
    LabelCombobox, LabelCalendar, LabelInputText, LabelPopUpInputText, BoxGroup,
    LabelCheckBox
} from "../../Frameworks";
import {
    AutoBasicInfo_action,
    ArchiveBasic_action, WorkActions_action
} from "../../../_actions";
import { toast } from 'react-toastify';
import { RibbonNewReferral } from '../Ribbon/Ribbon.NewReferral';
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


class NewReferral extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            modal: false,
            DescriptionTextArea: "",
            SelectedWorkers: [],
            AttachmentList: [],
            attachFromParentCheckBox:1,
            infoFromParentCheckBox:1,
            backdrop: "static",
            modalClass: "modal-dialog-centered modal-xl r-modal r-referral-modal"
        };
    }

    componentDidMount() {
        const { WorkInfo, SelectWorkTypeList, SelectPriorityList, GetAttachmentsByWorkIdlist } = this.props;
        SelectPriorityList();
        SelectWorkTypeList(workTypeParams);
        AttachmentParams.peygir_id = WorkInfo.peygir_id;
        GetAttachmentsByWorkIdlist(AttachmentParams).then(
            data => {
                if (data.status) {
                    const { AttachmentOnWork } = this.props;
                    if (AttachmentOnWork !== undefined)
                        this.setState({
                            AttachmentList: Object.keys(AttachmentOnWork).map((item, index) => {
                                return { archiveId: AttachmentOnWork[item].id, fromParent: true, fileName: AttachmentOnWork[item].filename };
                            })
                        });
                } else {
                    toast.error(data.error)
                }
            });
    }
    CalendarChange = (value, name) => {
        thisSaveParams.data[[name]] = { [name]: value }
    }
    changeHandle = (e, val) => {
        if (val !== undefined) {
            const { name } = e;
            if (val.value !== 0) {
                if (name === "wt_id") {
                    this.setState({ workTypeSelectedOption: { value: val.value, label: val.label } });
                    this.setState({ SelectedWorkers: [] });
                    this.setState({ SelectedWorkerText: this.context.t("unselected") });
                    const { GetNewWorkDefaultInfo } = this.props;
                    DefaultInfoParams.wt_id = val.value;
                    thisSaveParams.data["sadere_ref"] = { "sadere_ref": val.value }
                    GetNewWorkDefaultInfo(DefaultInfoParams).then(data => {
                        if (data.status) {
                            if (data.data.DefaultValue !== null) {

                                this.setState({ flowCheckBox: data.data.DefaultValue.flow });
                                // this.refs.flow.checked = data.data.DefaultValue.flow;
                                thisSaveParams.data["flow_id"] = { "flow_id": null };
                                thisSaveParams.data["erja"] = { "erja": data.data.DefaultValue.flow ? 1 : 0 };
                                // this.refs.emailToWorker.checked = data.data.DefaultValue.web_emailtokarbar;
                                // this.refs.smsToWorker.checked = data.data.DefaultValue.web_smstokarbar;
                                this.setState({ emailToWorkerCheckBox: data.data.DefaultValue.web_emailtokarbar });
                                this.setState({ smsToWorkerCheckBox: data.data.DefaultValue.web_smstokarbar });

                                thisSaveParams["emailToWorker"] = data.data.DefaultValue.web_emailtokarbar ? 1 : 0;
                                thisSaveParams["smsToWorker"] = data.data.DefaultValue.web_smstokarbar ? 1 : 0;
                                if (data.data.WorkerId !== undefined && data.data.WorkerId !== 0) {
                                    this.setState({ SelectedWorkers: [{ id_user: data.data.WorkerId, username: data.data.WorkerUserName, id_role: data.data.WorkerId_Role, rolename: data.data.WorkerRoleName }] });
                                    //  this.refs.Workers.value = this.state.SelectedWorkers[0].username;
                                    this.setState({ SelectedWorkerText: this.state.SelectedWorkers[0].username });
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
                if (name === "olaviyat_id")
                    this.setState({ prioritySelectedOption: { value: val.value, label: val.label } });
                thisSaveParams.data[[name]] = { [name]: val.value }

            } else
                thisSaveParams.data[[name]] = { [name]: null }
        }
        else {
            const { name, value } = e.target;
            if (name === "tozihat")
                this.setState({ DescriptionTextArea: value });
            if (name === "deadtime")
                this.setState({ deadtimeText: value });
            thisSaveParams.data[[name]] = { [name]: value };
        }
    }
    OpenReferralTo() {
        if (this.state.workTypeSelectedOption !== undefined)
            if (this.state.workTypeSelectedOption.value !== undefined && this.state.workTypeSelectedOption.value !== 0 && this.state.workTypeSelectedOption !== undefined) {
                this.setState(prevState => ({
                    ReferralTomodal: !prevState.ReferralTomodal,
                }));
            }
            else
                toast.error(this.context.t("msg_No_Select_ReferralType"));
        else
            toast.error(this.context.t("msg_No_Select_ReferralType"));
    }
    ConfirmWorkers(Workers) {
        this.setState({
            ReferralTomodal: false
        });
        this.setState({ SelectedWorkers: Workers });
        if (Workers.length > 1)
            this.setState({ SelectedWorkerText: Workers.length + " " + this.context.t("Items") + " " + this.context.t("selected") });
        else if (Workers.length == 1)
            this.setState({ SelectedWorkerText: Workers[0].username });
        else
            this.setState({ SelectedWorkerText: this.context.t("unselected") });
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
                console.log(this.state.DescriptionTextArea)
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
    checkBoxChangeHandler = (e) => {
        const { WorkInfo, AttachmentOnWork } = this.props;
        const { name, checked } = e.target;
        const value = checked ? 1 : 0;
        if (name === "withoutFlow") {
            thisSaveParams.data["flow_id"] = { "flow_id": null };
            thisSaveParams.data["erja"] = { "erja": value };
            this.setState({ flowCheckBox: checked });
        }
        else if (name === "emailToWorker") {
            thisSaveParams["emailToWorker"] = value;
            this.setState({ emailToWorkerCheckBox: checked });
        }
        else if (name === "smsToWorker") {
            thisSaveParams["smsToWorker"] = value;
            this.setState({ smsToWorkerCheckBox: checked });
        } else if (name === "attachFromParent") {
            thisSaveParams["attachFromParent"] = value;
            this.setState({ attachFromParentCheckBox: checked });
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

        else if (name === "infoFromParent") {
            thisSaveParams["infoFromParent"] = value;
            this.setState({ infoFromParentCheckBox: checked });
        } else if (name === "cpy_form_kar") {
            if (checked) thisSaveParams.data["cpy_form_kar"] = { "cpy_form_kar": WorkInfo.showtree_id };
            else thisSaveParams.data["cpy_form_kar"] = { "cpy_form_kar": 0 };
            this.setState({ cpy_form_karCheckBox: checked });
        }
    }
    saveReferralHandle = () => {
        const { WorkInfo, lang, toggle, RefreshParentForm, Params, InsertNewWorkInfo } = this.props;

        var formname = lang == "fa" ? FormInfo.fm_dabir_eghdam.form_name : FormInfo.fm_dabir_eghdam.en_form_name;

        if (thisSaveParams.data["wt_id"] === undefined) {
            toast.error(this.context.t("msg_No_Select_ReferralType"));
            return false;
        }
        if (thisSaveParams.workers.length == 0) {
            toast.error(this.context.t("msg_No_Select_ReferralWorkers"));
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
        thisSaveParams.data["p_id"] = { "p_id": WorkInfo.peygir_id };
        thisSaveParams.data["id_tel"] = { "id_tel": WorkInfo.id_tel };
        thisSaveParams.data["showtree_id"] = { "showtree_id": WorkInfo.showtree_id };
        thisSaveParams.data["arshiv_id"] = { "arshiv_id": WorkInfo.showtree_id };
        thisSaveParams.form = formname;

        thisSaveParams.archivesListy = this.state.AttachmentList;
        finalSaveParams = Object.assign({}, thisSaveParams);
        let obj = [];
        Object.keys(finalSaveParams.data).map((item, index) => {
            return obj[index++] = finalSaveParams.data[item];
        })
        finalSaveParams.data = obj;
        InsertNewWorkInfo(finalSaveParams, this.context.t("msg_Operation_Success")).then(data => {
            if (data.status) {
                if(RefreshParentForm!==undefined)
                RefreshParentForm(Params);
                toggle();
                thisSaveParams = {
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
                }; finalSaveParams = {};
            }
        });

    }
    attachmentsToggle() {
        this.setState({
            AttachmentReviewmodal: !this.state.AttachmentReviewmodal
        });

    }
    ChangeAttachments(NewAttchments) {
        this.setState({ AttachmentList: NewAttchments });
    }

    render() {
        const { modal, toggle, SelectWorkTypeList_rows, SelectPriorityList_rows, WorkInfo,
            DeletedElements, EditedElements } = this.props;
        var None = [{ value: 0, label: this.context.t("NoSelection") }]
        var ReferralTypeList = SelectWorkTypeList_rows !== undefined ? None.concat(SelectWorkTypeList_rows) : None
        var PriorityList = SelectPriorityList_rows !== undefined ? None.concat(SelectPriorityList_rows) : None
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
                    <ModalHeader toggle={toggle}>{this.context.t("frm_New_Referral")}</ModalHeader>
                    <ModalBody>
                        <div className="r-main-box__ribbon">
                            <RibbonNewReferral saveReferralHandle={this.saveReferralHandle.bind(this)} attachmentsToggle={this.attachmentsToggle.bind(this)} />
                        </div>
                        <div className="referral-modal">
                            <BoxGroup 
                                Text={this.context.t("WorkInfoBox")}
                                FormId={FormInfo.fm_dabir_eghdam.id}
                                Id="WorkInfoBox"
                                IconClassName="row-icon flow"
                                DeletedElements={DeletedElements}
                                EditedElements={EditedElements}
                            >
                                <div className="col-11">
                                    <div className="row">

                                        <LabelCombobox
                                            Text={this.context.t("ReferralType")} 
                                            name="wt_id"
                                            Id="ReferralType" changeHandle={this.changeHandle.bind(this)}
                                            FormId={FormInfo.fm_dabir_eghdam.id}
                                            DeletedElements={DeletedElements}
                                            EditedElements={EditedElements}
                                            selectedOption={this.state.workTypeSelectedOption}
                                            options={ReferralTypeList}
                                        ></LabelCombobox>
                                    </div>

                                </div>
                            </BoxGroup>
                            <BoxGroup 
                                Text={this.context.t("UsersInfoBox")}
                                FormId={FormInfo.fm_dabir_eghdam.id}
                                Id="UsersInfoBox"
                                IconClassName="row-icon creator"
                                DeletedElements={DeletedElements}
                                EditedElements={EditedElements}
                            >
                                <div className="col-11">
                                    <div className="row">
                                        <LabelPopUpInputText
                                            Text={this.context.t("ReferralTo")} 
                                             name="Workers"
                                            Id="ReferralTo" ButtonClick={this.OpenReferralTo.bind(this)}
                                            FormId={FormInfo.fm_dabir_eghdam.id}
                                            DeletedElements={DeletedElements}
                                            EditedElements={EditedElements}
                                            isDisabled={true}
                                            value={this.state.SelectedWorkerText}
                                            Type="Input"
                                            changeHandle={this.changeHandle.bind(this)}
                                            ButtonText={this.context.t("SelectPopup")}
                                        ></LabelPopUpInputText>
                                        <LabelCombobox  LabelclassName="col-2 col-form-label"
                                            ColClassName="col-6"
                                            Text={this.context.t("Priority")} 
                                            ComboclassName="my-2" name="olaviyat_id"
                                            Id="Priority" changeHandle={this.changeHandle.bind(this)}
                                            FormId={FormInfo.fm_dabir_eghdam.id}
                                            DeletedElements={DeletedElements}
                                            EditedElements={EditedElements}
                                            selectedOption={this.state.prioritySelectedOption}
                                            options={PriorityList}
                                        ></LabelCombobox>
                                    </div>
                                </div>
                            </BoxGroup>

                            <BoxGroup 
                                Text={this.context.t("DateTimeInfoBox")}
                                FormId={FormInfo.fm_dabir_eghdam.id}
                                Id="DateTimeInfoBox"
                                IconClassName="row-icon clock"
                                DeletedElements={DeletedElements}
                                EditedElements={EditedElements}
                            >
                                <div className="col-11">
                                    <div className="row">
                                        <LabelCalendar  LabelclassName="col-2 col-form-label"
                                            ColClassName="col-6"
                                            Text={this.context.t("ReferralDurationDate")} 
                                            InputclassName="form-control my-2  ltr" name="tarikhaction"
                                            Id="ReferralDurationDate" CalendarChange={this.CalendarChange.bind(this)}
                                            FormId={FormInfo.fm_dabir_eghdam.id}
                                            DeletedElements={DeletedElements}
                                            EditedElements={EditedElements}
                                            setDate={this.state.setDefaultDate}
                                        ></LabelCalendar>
                                        <LabelInputText  LabelclassName="col-2 col-form-label"
                                            ColClassName="col-6"
                                            Text={this.context.t("ReferralDurationTime")} 
                                            InputclassName="form-control my-2  ltr" name="deadtime"
                                            Id="ReferralDurationTime" changeHandle={this.changeHandle.bind(this)}
                                            FormId={FormInfo.fm_dabir_eghdam.id}
                                            DeletedElements={DeletedElements}
                                            EditedElements={EditedElements}
                                            value={this.state.deadtimeText}
                                            mask="99:99"
                                        ></LabelInputText>

                                    </div>

                                </div>
                            </BoxGroup>
                            <BoxGroup className="row bg-gray"
                                Text={this.context.t("DescriptionsInfoBox")}
                                FormId={FormInfo.fm_dabir_eghdam.id}
                                Id="DescriptionsInfoBox"
                                IconClassName="row-icon description"
                                DeletedElements={DeletedElements}
                                EditedElements={EditedElements}
                            >
                                <div className="col-11">
                                    <div className="row">
                                        <LabelPopUpInputText  LabelclassName="col-1 col-form-label"
                                            ColClassName="col-12"
                                            Text={this.context.t("WorkDescription")} 
                                            className2="col-11"
                                            className3="input-group my-2"
                                             name="tozihat"
                                            Id="Description" ButtonClick={this.OpenSelectDefaultText.bind(this)}
                                            FormId={FormInfo.fm_dabir_eghdam.id}
                                            DeletedElements={DeletedElements}
                                            EditedElements={EditedElements}
                                            value={this.state.DescriptionTextArea}
                                            Type="TextArea"
                                            changeHandle={this.changeHandle.bind(this)}
                                            ButtonText={this.context.t("SelectPopup")}
                                        ></LabelPopUpInputText>
                                    </div>
                                </div>
                            </BoxGroup>

                            {this.state.ReferralTomodal &&
                                <ReferralToModal modal={this.state.ReferralTomodal}
                                    ConfirmWorkers={this.ConfirmWorkers.bind(this)}
                                    worktypeSelected={this.state.workTypeSelectedOption}
                                    SelectedWorkers={this.state.SelectedWorkers}
                                />}
                            {this.state.SubjectSelectmodal &&
                                <SelectDefaultTextModal modal={this.state.SubjectSelectmodal}
                                    toggle={this.OpenSelectDefaultText.bind(this)}
                                    Successtoggle={this.SuccessSelectDescription.bind(this)}
                                    id_tel={WorkInfo.id_tel} />}
                            {this.state.AttachmentReviewmodal &&
                                <AttachmentsReview modal={this.state.AttachmentReviewmodal}
                                    AttachmentList={this.state.AttachmentList}
                                    ChangeAttachments={this.ChangeAttachments.bind(this)}
                                    toggle={this.attachmentsToggle.bind(this)}
                                    parentPeygirId={WorkInfo.peygir_id} peygir_id={0} />}
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
                                            Text={this.context.t("AttachmentSettingBox")}
                                            FormId={FormInfo.fm_dabir_eghdam.id}
                                            Id="AttachmentSettingBox"
                                            IconDivClassName="card-header"
                                            IconClassName="import-authority"
                                            DeletedElements={DeletedElements}
                                            EditedElements={EditedElements}
                                        >
                                            <div className="card-body">
                                                <div className="checkbox-group">
                                                    <LabelCheckBox 
                                                        Text={this.context.t("ImportInformationFromLetter")}
                                                        name="infoFromParent"
                                                        Id="ImportInformationFromLetter"
                                                        checkBoxChangeHandler={this.checkBoxChangeHandler.bind(this)}
                                                        FormId={FormInfo.fm_dabir_eghdam.id}
                                                        DeletedElements={DeletedElements}
                                                        EditedElements={EditedElements}
                                                        checked={this.state.infoFromParentCheckBox}
                                                    ></LabelCheckBox>

                                                    <LabelCheckBox 
                                                        Text={this.context.t("ImportAttachmentFromLetter")}
                                                        name="attachFromParent"
                                                        Id="ImportAttachmentFromLetter"
                                                        checkBoxChangeHandler={this.checkBoxChangeHandler.bind(this)}
                                                        FormId={FormInfo.fm_dabir_eghdam.id}
                                                        DeletedElements={DeletedElements}
                                                        EditedElements={EditedElements}
                                                        checked={this.state.attachFromParentCheckBox}
                                                    ></LabelCheckBox>

                                                </div>
                                            </div>
                                        </BoxGroup>
                                    </div>

                                    <div className="col-4">
                                        <BoxGroup className="card"
                                            Text={this.context.t("WorkFlowSettingBox")}
                                            FormId={FormInfo.fm_dabir_eghdam.id}
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
                                                        FormId={FormInfo.fm_dabir_eghdam.id}
                                                        DeletedElements={DeletedElements}
                                                        EditedElements={EditedElements}
                                                        checked={this.state.cpy_form_karCheckBox}
                                                    ></LabelCheckBox>

                                                    <LabelCheckBox 
                                                        Text={this.context.t("NoWorkFlow")}
                                                        name="withoutFlow"
                                                        Id="NoWorkFlow"
                                                        checkBoxChangeHandler={this.checkBoxChangeHandler.bind(this)}
                                                        FormId={FormInfo.fm_dabir_eghdam.id}
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
                                            Text={this.context.t("TerminalSettingBox")}
                                            FormId={FormInfo.fm_dabir_eghdam.id}
                                            Id="TerminalSettingBox"
                                            IconDivClassName="card-header"
                                            IconClassName="send-authority"
                                            DeletedElements={DeletedElements}
                                            EditedElements={EditedElements}
                                        >
                                            <div className="card-body">
                                                <div className="checkbox-group">
                                                    <LabelCheckBox 
                                                        Text={this.context.t("SendSmsToUser")}
                                                        name="smsToWorker"
                                                        Id="SendSmsToUser"
                                                        checkBoxChangeHandler={this.checkBoxChangeHandler.bind(this)}
                                                        FormId={FormInfo.fm_dabir_eghdam.id}
                                                        DeletedElements={DeletedElements}
                                                        EditedElements={EditedElements}
                                                        checked={this.state.smsToWorkerCheckBox}
                                                    ></LabelCheckBox>
                                                    <LabelCheckBox 
                                                        Text={this.context.t("SendEmailToUser")}
                                                        name="emailToWorker"
                                                        Id="SendEmailToUser" checkBoxChangeHandler={this.checkBoxChangeHandler.bind(this)}
                                                        FormId={FormInfo.fm_dabir_eghdam.id}
                                                        DeletedElements={DeletedElements}
                                                        EditedElements={EditedElements}
                                                        checked={this.state.emailToWorkerCheckBox}
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
NewReferral.contextTypes = {
    t: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { alert } = state;
    const { loading } = state.loading;
    const { lang } = state.i18nState
    const { WorkInfo } = state.Auto_WorkBasic;
    const { SelectWorkTypeList_rows, SelectPriorityList_rows } = state.Auto_BasicInfo
    const { AttachmentOnWork } = state.ArchiveBasic

    const { DeletedElements310 } = state.Design !== undefined ? state.Design : {};
    const { EditedElements310 } = state.Design !== undefined ? state.Design : {};
    return {
        alert,
        loading,
        lang,
        WorkInfo,
        SelectWorkTypeList_rows,
        SelectPriorityList_rows,
        AttachmentOnWork,
        DeletedElements: DeletedElements310,
        EditedElements: EditedElements310,
    };
}


const connectedNewReferral = connect(mapStateToProps, mapDispatchToProps)(NewReferral);
export { connectedNewReferral as NewReferral };

