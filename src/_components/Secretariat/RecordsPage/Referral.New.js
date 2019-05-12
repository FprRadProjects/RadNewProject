import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import PropTypes from "prop-types"
import { SelectDefaultTextModal } from "../../Basic/";
import InputMask from 'react-input-mask';
import { AttachmentsReview } from "../../Archives";

import {
    AutoBasicInfo_action,
    ArchiveBasic_action, WorkActions_action
} from "../../../_actions";
import { toast } from 'react-toastify';
import { RibbonNewReferral } from '../Ribbon/Ribbon.NewReferral';
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


class NewReferral extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            modal: false,
            SelectedWorkers: [],
            AttachmentList: [],
            workTypeSelectedOption: 0,
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
                let SelectedArchiveRows =this.state.AttachmentList.filter(function (item) { return !item.fromParent });
                this.setState({
                    AttachmentList: [...Object.keys(AttachmentOnWork).map((item, index) => {
                        return { archiveId: AttachmentOnWork[item].id, fromParent: true, fileName: AttachmentOnWork[item].filename };
                    }), ...SelectedArchiveRows]
                });
            }
            else {
                let SelectedArchiveRows =this.state.AttachmentList.filter(function (item) { return !item.fromParent });
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
    saveReferralHandle = () => {
        const { WorkInfo, lang, FormInfo, toggle, RefreshParentForm, Params, InsertNewWorkInfo } = this.props;
        var formname = lang == "fa" ? FormInfo.form_name : FormInfo.en_form_name;


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
        const { modal, toggle, SelectWorkTypeList_rows, SelectPriorityList_rows, WorkInfo } = this.props;
        var None = [{ value: 0, label: this.context.t("NoSelection") }]
        var ReferralTypeList = None.concat(SelectWorkTypeList_rows)
        var PriorityList = None.concat(SelectPriorityList_rows);
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
                                                        <ComboSelectList options={ReferralTypeList} classname="my-2" name="wt_id" onChange={this.changeHandle.bind(this)} />
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
                                                <label className="col-2 col-form-label">{this.context.t("ReferralTo")}</label>
                                                <div className="col-10">
                                                    <div className="input-group my-2">
                                                        <div className="input-group-prepend">
                                                            <Button color="primary"
                                                                onClick={this.OpenReferralTo.bind(this)}>...</Button>
                                                        </div>
                                                        <input type="text" ref="Workers" autoComplete="off" className="form-control" readOnly={true} defaultValue={this.context.t("unselected")} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group row">
                                                <label className="col-2 col-form-label">{this.context.t("Priority")}</label>
                                                <div className="col-10">
                                                    {SelectPriorityList_rows !== undefined &&
                                                        <ComboSelectList options={PriorityList} name="olaviyat_id" classname="my-2" onChange={this.changeHandle.bind(this)} />
                                                    }
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
                                                <label className="col-2 col-form-label">{this.context.t("ReferralDurationDate")}</label>
                                                <div className="col-10">
                                                    <CalendarDatePicker fieldname="tarikhaction" className="form-control my-2  ltr" id="acfas" setDate={this.state.setDefaultDate} CalendarChange={this.CalendarChange.bind(this)} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group row">
                                                <label className="col-2 col-form-label">{this.context.t("ReferralDurationTime")}</label>
                                                <div className="col-10">
                                                    <InputMask type="text" name="deadtime" autoComplete="off" className="form-control my-2  ltr" mask="99:99" onChange={this.changeHandle.bind(this)} />
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
                                                    <div className="input-group my-2">
                                                        <div className="input-group-prepend align-self-stretch">
                                                            <Button color="primary" name="tozihat"
                                                                onClick={this.OpenSelectDefaultText.bind(this)}>{this.context.t("SelectPopup")}</Button>
                                                        </div>
                                                        <textarea type="text" className="form-control" rows="4"
                                                            ref="DescriptionInput" name="tozihat"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                                        <div className="card ">
                                            <div className="card-header">
                                                <i className="import-authority">
                                                </i>
                                            </div>
                                            <div className="card-body">
                                                <div className="checkbox-group">
                                                    <div class="checkbox">
                                                        <input id="import0" defaultChecked={true} type="checkbox" name="infoFromParent" onChange={this.checkBoxChangeHandler.bind(this)} />
                                                        <label htmlFor="import0">{this.context.t("ImportInformationFromLetter")}</label>
                                                    </div>
                                                    <div class="checkbox">
                                                        <input id="import1" defaultChecked={true} type="checkbox" onChange={this.checkBoxChangeHandler.bind(this)} name="attachFromParent" />
                                                        <label htmlFor="import1">{this.context.t("ImportAttachmentFromLetter")}</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="card ">
                                            <div className="card-header">
                                                <i className="workform-authority">
                                                </i>
                                            </div>
                                            <div className="card-body">
                                                <div className="checkbox-group">
                                                    <div class="checkbox">
                                                        <input id="workform0" name="cpy_form_kar" onChange={this.checkBoxChangeHandler.bind(this)} type="checkbox" />
                                                        <label htmlFor="workform0">{this.context.t("CopyWorkForm")}</label>
                                                    </div>
                                                    <div class="checkbox">
                                                        <input id="workform1" name="withoutFlow" onChange={this.checkBoxChangeHandler.bind(this)} defaultChecked={true} ref="flow" type="checkbox" />
                                                        <label htmlFor="workform1">{this.context.t("NoWorkFlow")}</label>
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
                                                    <div class="checkbox">
                                                        <input id="send0" ref="smsToWorker" onChange={this.checkBoxChangeHandler.bind(this)} type="checkbox" name="smsToWorker" />
                                                        <label htmlFor="send0">{this.context.t("SendSmsToUser")}</label>
                                                    </div>
                                                    <div class="checkbox">
                                                        <input id="send1" ref="emailToWorker" onChange={this.checkBoxChangeHandler.bind(this)} type="checkbox" name="emailToWorker" />
                                                        <label htmlFor="send1">{this.context.t("SendEmailToUser")}</label>
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


const connectedNewReferral = connect(mapStateToProps, mapDispatchToProps)(NewReferral);
export { connectedNewReferral as NewReferral };

