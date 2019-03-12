import React, { Component } from 'react';
import { connect } from "react-redux"
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import PropTypes from "prop-types"
import { SelectProjectModal } from "../../Project/";
import { SelectDefaultTextModal } from "../../Basic/";

import { WorkAccess_action, design_Actions, common_Actions, WorkBasic_action, WorkActions_action } from "../../../_actions";
import { FormInfo } from "../../../locales";
import { ConfirmFlow } from '../../Flow/ConfirmFlow';
import { toast } from 'react-toastify';

var SaveParams = { form: "", data: [] };
var ConfirmParams = { form: "", page: 1, pagesize: 10, filter: [], Form: "", SaveParams: {} };

class ReferenceViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            modal: false,
            ProjectSelectmodal: false,
            SubjectSelectmodal: false,
            FlowResultSelectmodal: false,
            ReviewWorkModal: false,
            backdrop: "static",
            modalClass: "modal-dialog-centered modal-lg r-modal"
        };
        this.SuccessSelectProject = this.SuccessSelectProject.bind(this);

    }

    OpenSelectProject = () => {
        const { WorkInfo, showError } = this.props;
        WorkAccess_action.CanSetProjectOnWork(WorkInfo.peygir_id).then(
            data => {
                if (data.status) {
                    this.setState({
                        ProjectSelectmodal: !this.state.ProjectSelectmodal,
                    });
                } else {
                    toast.error(data.error)
                }
            },
            error => {
                toast.error(error)
            }
        );

    }

    CloseSelectProject = (e) => {
        this.setState({
            ProjectSelectmodal: !this.state.ProjectSelectmodal,
        });
    }
    SuccessSelectProject(row, e) {
        const { WorkInfo } = this.props;
        if (this.state.ProjectSelectmodal)
            this.refs.ProjectInput.value = row !== undefined ? row.ptype !== undefined ? row.ptype : WorkInfo.ptype : WorkInfo.ptype;
        SaveParams.data["p_type_id"] = { "p_type_id": row.id };
        this.setState({
            ProjectSelectmodal: !this.state.ProjectSelectmodal,
        });
    }

    OpenSelectDefaultText = (e) => {
        const { name } = e.target;
        const { WorkInfo, showError } = this.props;
        WorkAccess_action.CanSetInfoOnWork(WorkInfo.peygir_id).then(data => {
            if (data.status)
                this.setState({
                    SubjectSelectmodal: !this.state.SubjectSelectmodal,
                    type: name,
                });
            else {
                toast.error(data.error)
            }
        },
            error => {
                toast.error(error)
            }
        );
    }
    CloseSelectDefaultText = (e) => {
        this.setState({
            SubjectSelectmodal: !this.state.SubjectSelectmodal,
        });
    }


    SuccessSelectSubject = (row, e) => {
        if (this.state.SubjectSelectmodal)
            if (this.state.type === "subject") {
                this.refs.SubjectInput.value += " " + (row !== undefined ? row.sharh !== undefined ? row.sharh : "" : "");
                SaveParams.data["mozo"] = { "mozo": this.refs.SubjectInput.value };
            } else {
                this.refs.ResultTextArea.value += " " + (row !== undefined ? row.sharh !== undefined ? row.sharh : "" : "");
                SaveParams.data["natije"] = { "natije": this.refs.ResultTextArea.value };
            }
        this.setState({
            SubjectSelectmodal: !this.state.SubjectSelectmodal,
            type: "",
        });
    }
    ConfirmationHandle = (e) => {
        const { WorkInfo, InitConfirmWork, ParentForm, lang, FetchWorkInfo, Params, RefreshParentForm } = this.props;
        ConfirmParams["peygir_id"] = WorkInfo.peygir_id;
        var formname = lang == "fa" ? ParentForm.form_name : ParentForm.en_form_name;
        ConfirmParams["Form"] = formname;
        SaveParams.data["peygir_id"] = { "peygir_id": WorkInfo.peygir_id };
        SaveParams.form = formname;
        let obj = [];
        Object.keys(SaveParams.data).map((item, index) => {
            return obj[index++] = SaveParams.data[item];
        })
        SaveParams.data = obj;
        ConfirmParams.SaveParams = SaveParams;
        console.log(ConfirmParams.SaveParams)
        //this.saveHandle("");
        InitConfirmWork(ConfirmParams, this.context.t("msg_Operation_Success")).then(data => {
            if (data.status) {
                if (data.code === 2 && data.data !== null) {
                    this.setState({
                        FlowResultSelectmodal: true,
                    });
                }
                else {
                    FetchWorkInfo(WorkInfo.peygir_id);
                    RefreshParentForm(Params);

                }
            }
        });
        SaveParams = { form: "", data: [] };
    }

    CloseleSelectFlowResult = (e) => {
        this.setState({
            FlowResultSelectmodal: !this.state.FlowResultSelectmodal,
        });
    }
    saveHandle = (msg) => {
        const { ParentForm, WorkInfo, SaveWorkInfo, lang, FetchWorkInfo,
            RefreshParentForm, Params
        } = this.props;
        var formname = lang == "fa" ? ParentForm.form_name : ParentForm.en_form_name;
        SaveParams.data["peygir_id"] = { "peygir_id": WorkInfo.peygir_id };
        SaveParams.form = formname;
        let obj = [];
        Object.keys(SaveParams.data).map((item, index) => {
            return obj[index++] = SaveParams.data[item];
        })
        SaveParams.data = obj;
        SaveWorkInfo(SaveParams, msg).then(data => {
            if (data.status) {
                RefreshParentForm(Params);
                FetchWorkInfo(WorkInfo.peygir_id);
            }
        });
        SaveParams = { form: "", data: [] };
    }

    changeHandle = (e) => {
        const { WorkInfo } = this.props;
        const { name, value } = e.target;
        if (!WorkInfo.done)
            SaveParams.data[[name]] = { [name]: value };
    }

    rebuildHandle() {
        const { RebuildWork, WorkInfo, RefreshParentForm, FetchWorkInfo, Params } = this.props;
        RebuildWork(WorkInfo.peygir_id, this.context.t("msg_Operation_Success")).then(data => {
            if (data.status) {
                RefreshParentForm(Params);
                FetchWorkInfo(WorkInfo.peygir_id);
            }
        });
    }


    render() {
        const { modal, toggle, WorkInfo, Params, RefreshParentForm, ParentForm } = this.props;
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
                <Modal isOpen={modal} toggle={toggle}
                    className={this.state.modalClass} backdrop={this.state.backdrop}>
                    <ModalHeader toggle={toggle}>نتیجه ارجاع</ModalHeader>
                    <ModalBody>

                        {/*<Button color="success"
                                onClick={this.deleteHandle.bind(this)}>{this.context.t("Delete")}</Button>*/}

                        {WorkInfo !== undefined &&
                            <div >
                                <div className="row">
                                    <div className="col-md-3">
                                        <div class="form-group">
                                            <label>{this.context.t("WorkID")}</label>
                                            <input type="text" className="form-control" disabled={true} defaultValue={WorkInfo.peygir_id} />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div class="form-group">
                                            <label>{this.context.t("PartyAccountName")}</label>
                                            <input type="text" className="form-control" disabled={true} defaultValue={WorkInfo.name} />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div class="form-group">
                                            <label>{this.context.t("CompanyName")}</label>
                                            <input type="text" className="form-control" disabled={true} defaultValue={WorkInfo.coname} />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div class="form-group">
                                            <label>{this.context.t("Flow")}</label>
                                            <input type="text" className="form-control" disabled={true} defaultValue={WorkInfo.flow} />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div class="form-group">
                                            <label>{this.context.t("WorkType")}</label>
                                            <input type="text" className="form-control" disabled={true} defaultValue={WorkInfo.wtype} />
                                        </div>
                                    </div>
                                    <div className="col-md-9">
                                        <div class="form-group">
                                            <label>{this.context.t("creator")}</label>
                                            <div className="row">
                                                <div className="col-4">
                                                    <input type="text" className="form-control" disabled={true} defaultValue={WorkInfo.c_date} />
                                                </div>
                                                <div className="col-4">
                                                    <input type="text" className="form-control" disabled={true} defaultValue={WorkInfo.c_date} />
                                                </div>
                                                <div className="col-4">
                                                    <input type="text" className="form-control" disabled={true} defaultValue={WorkInfo.c_time} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-3">
                                        <div class="form-group">
                                            <label>{this.context.t("Audience")}</label>
                                            <input type="text" className="form-control" disabled={true} defaultValue={WorkInfo.ashkhasname} />
                                        </div>
                                    </div>
                                    <div className="col-md-9">
                                        <div class="form-group">
                                            <label>{this.context.t("Description")}</label>
                                            <textarea type="text" className="form-control" disabled={true} defaultValue={WorkInfo.tozihat}></textarea>
                                        </div>
                                    </div>
                                </div>
                                <hr class="mt-4 mb-4" />
                                <div className="row">
                                    <div className="col-md-3">
                                        <div class="form-group">
                                            <label>{this.context.t("FileNumber")}</label>
                                            <input type="text" className="form-control" defaultValue={WorkInfo.shomare} name="shomare"
                                                readOnly={WorkInfo.done ? true : false}
                                                onChange={this.changeHandle.bind(this)} />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div class="form-group">
                                            <label>{this.context.t("Code")}</label>
                                            <input type="text" className="form-control" onChange={this.changeHandle.bind(this)}
                                                readOnly={WorkInfo.done ? true : false}
                                                defaultValue={WorkInfo.code} name="code" id="Code" />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div class="form-group">
                                            <label>{this.context.t("Subject")}</label>
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <Button color="primary" name="subject"
                                                        onClick={this.OpenSelectDefaultText.bind(this)}>{this.context.t("SelectPopup")}</Button>
                                                </div>
                                                <input type="text" className="form-control" ref="SubjectInput" onChange={this.changeHandle.bind(this)}
                                                    name="mozo"
                                                    defaultValue={WorkInfo.mozo} readOnly={WorkInfo.done ? true : false} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-3">
                                        <div class="form-group">
                                            <label>{this.context.t("Project")}</label>
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <Button color="primary"
                                                        onClick={this.OpenSelectProject.bind(this)}>{this.context.t("SelectPopup")}</Button>
                                                </div>
                                                <input type="text" className="form-control" onChange={this.changeHandle.bind(this)} name="p_type_id"
                                                    ref="ProjectInput" readOnly={true}
                                                    defaultValue={WorkInfo.ptype} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-3">
                                        <div class="form-group">
                                            <label>{this.context.t("Duration_Of_Work_Short")}</label>
                                            <input type="text" className="form-control" name="modat_anjam_w" defaultValue={WorkInfo.modat_anjam_w}
                                                readOnly={WorkInfo.done ? true : false}
                                                onChange={this.changeHandle.bind(this)} />
                                        </div>
                                    </div>
                                    <div className="col-md-9">
                                        <div class="form-group">
                                            <label>{this.context.t("Result")}</label>
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend align-self-stretch">
                                                    <Button color="primary" name="result"
                                                        onClick={this.OpenSelectDefaultText.bind(this)}>{this.context.t("SelectPopup")}</Button>

                                                </div>
                                                <textarea type="text" className="form-control" defaultValue={WorkInfo.natije} readOnly={WorkInfo.done ? true : false}
                                                    name="natije" ref="ResultTextArea"
                                                    onChange={this.changeHandle.bind(this)}></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {this.state.ProjectSelectmodal &&
                                    <SelectProjectModal modal={this.state.ProjectSelectmodal}
                                        toggle={this.CloseSelectProject.bind(this)}
                                        Successtoggle={this.SuccessSelectProject.bind(this)}
                                        id_tel={WorkInfo.id_tel} />}
                                {this.state.SubjectSelectmodal &&
                                    <SelectDefaultTextModal modal={this.state.SubjectSelectmodal}
                                        toggle={this.CloseSelectDefaultText.bind(this)}
                                        Successtoggle={this.SuccessSelectSubject.bind(this)}
                                        id_tel={WorkInfo.id_tel} />}
                                {this.state.FlowResultSelectmodal &&
                                    <ConfirmFlow ParentForm={ParentForm}
                                        flowResultSelectModal={this.state.FlowResultSelectmodal}
                                        Params={Params} CloseleSelectFlowResult={this.CloseleSelectFlowResult.bind(this)}
                                        peygir_id={WorkInfo.peygir_id} RefreshParentForm={RefreshParentForm} />}
                            </div>}
                        <style>{modalBackDrop}</style>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className="ml-2"
                            onClick={this.saveHandle.bind(this, this.context.t("msg_Operation_Success"))}>{this.context.t("Save")}</Button>
                        <Button color="warning" className="ml-2"
                            onClick={this.rebuildHandle.bind(this)}>{this.context.t("Rebuild")}</Button>
                        <Button color="success" className="ml-2"
                            onClick={this.ConfirmationHandle.bind(this)}>{this.context.t("Confirmation")}</Button>
                    </ModalFooter>
                </Modal>

            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
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


});
ReferenceViewer.contextTypes = {
    t: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { alert } = state;
    const { loading } = state.loading;
    const { lang } = state.i18nState
    const { Refresh_Form } = state.Common;
    const { SelectFlowResultTogleModal } = state.Auto_WorkBasic;
    const { ReviewWorkTogleModal } = state.Auto_WorkBasic;

    return {
        alert,
        loading,
        lang,
        Refresh_Form,
        SelectFlowResultTogleModal,
        ReviewWorkTogleModal
    };
}


const connectedReferenceViewer = connect(mapStateToProps, mapDispatchToProps)(ReferenceViewer);
export { connectedReferenceViewer as ReferenceViewer };
