import React, { Component } from 'react';
import { connect } from "react-redux"
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import PropTypes from "prop-types"
import { SelectProjectModal } from "../../Project/";
import { SelectDefaultTextModal } from "../../Basic/";
import { FormInfo } from "../../../locales";

import {
    Act_Reference, WorkAccess_action, WorkBasic_action, design_Actions, WorkActions_action,
    ProjectsInfo_action
} from "../../../_actions";
import { toast } from 'react-toastify';
import { RibbonReferenceViewer } from '../Ribbon/Ribbon.ReferenceViewer';

import {
    LabelInputText, LabelPopUpInputText, BoxGroup
} from "../../Frameworks";
var SaveParams = { form: "", data: [] };
var projectParams = {
    "Id_Taraf": 0
};
var ConfirmParams = { form: "", page: 1, pagesize: 10, filter: [], Form: "", SaveParams: {} };
var finalSaveParams = {}
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
            SubjectInputText: "",
            ResultTextArea: "",
            DescriptionTextArea: "",
            backdrop: "static",
            modalClass: "modal-dialog-centered modal-xl r-modal"
        };
        this.SuccessSelectProject = this.SuccessSelectProject.bind(this);

    }

    componentDidMount() {
        SaveParams = { form: "", data: [] };
        finalSaveParams = {};
        const { WorkInfo, GetSelectComboProject } = this.props;
        projectParams = {
            "Id_Taraf": WorkInfo.id_tel
        };
        GetSelectComboProject(projectParams);

    }
    componentWillReceiveProps(nextProps) {
        const { WorkInfo } = nextProps;
        this.setState({ ProjectSelectedOption: { value: WorkInfo.p_type_id, label: WorkInfo.ptype } });
        this.setState({ SubjectInputText: WorkInfo.mozo !== null ? WorkInfo.mozo : "" });
        this.setState({ ResultTextArea: WorkInfo.natije !== null ? WorkInfo.natije : "" });
        this.setState({ CodeText: WorkInfo.code !== null ? WorkInfo.code : "" });
        this.setState({ FileNumberText: WorkInfo.shomare !== null ? WorkInfo.shomare : "" });
        this.setState({ DurationDoneText: WorkInfo.modat_anjam_w !== null ? WorkInfo.modat_anjam_w : "" });

    }

    OpenSelectProject = () => {
        const { WorkInfo } = this.props;
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
        if (row !== undefined && row !== null) {
            if (this.state.ProjectSelectmodal) {  // this.refs.ProjectInput.value = row !== undefined ? row.ptype !== undefined ? row.ptype : WorkInfo.ptype : WorkInfo.ptype;
                let Ptype = row !== undefined ? row.ptype !== undefined ? row.ptype : "" : "";
                let PtypeId = row !== undefined ? row.id !== undefined ? row.id : "" : "";
                this.setState({ ProjectSelectedOption: { value: PtypeId, label: Ptype } });
            }
            SaveParams.data["p_type_id"] = { "p_type_id": row.id };
            this.setState({
                ProjectSelectmodal: !this.state.ProjectSelectmodal,
            });
        }
        else
            toast.warn(this.context.t("msg_No_Select_Row"));


    }

    OpenSelectDefaultText = (e) => {
        const { name } = e.target;
        const { WorkInfo } = this.props;
        WorkAccess_action.CanSetInfoOnWork(WorkInfo.peygir_id)
            .then(data => {
                if (data.status)
                    this.setState({
                        SubjectSelectmodal: !this.state.SubjectSelectmodal,
                        type: name,
                    });
                else {
                    toast.error(data.error)
                }
            }, error => {
                toast.error(error)
            });
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
                    // this.refs.SubjectInput.value += " " + (row !== undefined ? row.sharh !== undefined ? row.sharh : "" : "");
                    SaveParams.data["mozo"] = { "mozo": newSubject };
                } else {
                    // this.refs.ResultTextArea.value += " " + (row !== undefined ? row.sharh !== undefined ? row.sharh : "" : "");
                    const newResult = this.state.ResultTextArea + " " + (row !== undefined ? row.sharh !== undefined ? row.sharh : "" : "");
                    this.setState({ ResultTextArea: newResult });
                    SaveParams.data["natije"] = { "natije": newResult };
                }
            this.setState({
                SubjectSelectmodal: !this.state.SubjectSelectmodal,
                type: "",
            });
        }
        else
            toast.warn(this.context.t("msg_No_Select_Row"));

    }




    changeHandle = (e, val) => {
        const { WorkInfo } = this.props;
        if (!WorkInfo.done) {
            SaveParams.data["peygir_id"] = { "peygir_id": WorkInfo.peygir_id };
            if (val !== undefined) {
                const { name } = e;
                SaveParams.data[[name]] = { [name]: val.value };
            }
            else {
                const { name, value } = e.target;
                if (name === "mozo")
                    this.setState({ SubjectInputText: value });
                if (name === "natije")
                    this.setState({ ResultTextArea: value });
                if (name === "code")
                    this.setState({ CodeText: value });
                if (name === "shomare")
                    this.setState({ FileNumberText: value });
                if (name === "modat_anjam_w")
                    this.setState({ DurationDoneText: value });
                SaveParams.data[[name]] = { [name]: value };
            }
        }
    }
    clearSaveParams = (e) => {
        SaveParams = { form: "", data: [] };
    }

    saveWorkHandle = (msg) => {
        const { ParentForm, WorkInfo, SaveWorkInfo, lang, FetchWorkInfo,
            RefreshParentForm, Params
        } = this.props;
        var formname = lang == "fa" ? ParentForm.form_name : ParentForm.en_form_name;
        if (SaveParams.data["peygir_id"] === undefined) {
            toast.warn(this.context.t("Information_Not_Available_For_Editing"));
            return false;
        }
        SaveParams.form = formname;
        finalSaveParams = Object.assign({}, SaveParams);
        let obj = [];
        Object.keys(finalSaveParams.data).map((item, index) => {
            return obj[index++] = finalSaveParams.data[item];
        })
        finalSaveParams.data = obj;
        SaveWorkInfo(finalSaveParams, msg).then(data => {
            if (data.status) {
                if(RefreshParentForm!==undefined)
                RefreshParentForm(Params);
                FetchWorkInfo(WorkInfo.peygir_id);
                this.clearSaveParams();
            }
        });
    }
    ConfirmationHandle = (e) => {
        const { WorkInfo, InitConfirmWork, ParentForm, lang, FetchWorkInfo, Params,
            RefreshParentForm } = this.props;
        ConfirmParams["peygir_id"] = WorkInfo.peygir_id;
        var formname = lang == "fa" ? ParentForm.form_name : ParentForm.en_form_name;
        ConfirmParams["Form"] = formname;
        SaveParams.data["peygir_id"] = { "peygir_id": WorkInfo.peygir_id };
        SaveParams.form = formname;
        finalSaveParams = Object.assign({}, SaveParams);
        let obj = [];
        Object.keys(finalSaveParams.data).map((item, index) => {
            return obj[index++] = finalSaveParams.data[item];
        })
        finalSaveParams.data = obj;
        ConfirmParams.SaveParams = finalSaveParams;
        InitConfirmWork(ConfirmParams, this.context.t("msg_Operation_Success")).then(data => {
            if (data.status) {
                if (data.code === 2 && data.data !== null) {
                    this.setState({
                        FlowResultSelectmodal: true,
                    });
                }
                else {
                    FetchWorkInfo(WorkInfo.peygir_id);
                if(RefreshParentForm!==undefined)
                RefreshParentForm(Params);

                }
                this.clearSaveParams();
            }
        });
    }

    render() {
        const { FetchData, modal, toggle, WorkInfo, Params, RefreshParentForm, ParentForm, SelectProjectComboList_rows,
            DeletedElements, EditedElements } = this.props;
        const modalBackDrop = `
        .modal-backdrop {
            opacity:.98!important;
            background: rgb(210,210,210);
            background: -moz-linear-gradient(-45deg, rgba(210,210,210,1) 0%, rgba(229,235,238,1) 50%, rgba(216,216,216,1) 50.1%, rgba(216,216,216,1) 100%);
            background: -webkit-linear-gradient(-45deg, rgba(210,210,210,1) 0%,rgba(229,235,238,1) 50%,rgba(216,216,216,1) 50.1%,rgba(216,216,216,1) 100%);
            background: linear-gradient(135deg, rgba(210,210,210,1) 0%,rgba(229,235,238,1) 50%,rgba(216,216,216,1) 50.1%,rgba(216,216,216,1) 100%);
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#d2d2d2', endColorstr='#d8d8d8',GradientType=1 );
        }`;
        var None = [{ value: 0, label: this.context.t("NoSelection") }]
        var ProjectList = SelectProjectComboList_rows !== undefined ? None.concat(SelectProjectComboList_rows) : None

        return (
            <div>
                <Modal isOpen={modal} toggle={toggle} keyboard={false}
                    className={this.state.modalClass} backdrop={this.state.backdrop}>
                    <ModalHeader toggle={toggle}>{this.context.t("ReferralResult")}</ModalHeader>
                    <ModalBody>
                        <div className="r-main-box__ribbon">
                            <RibbonReferenceViewer saveWorkHandle={this.saveWorkHandle.bind(this)} ConfirmationHandle={this.ConfirmationHandle.bind(this)} RefreshParentForm={RefreshParentForm} ParentForm={ParentForm} SaveParams={SaveParams} FetchData={FetchData.bind(this)} Params={Params} />
                        </div>

                        {/*<Button color="success"
                                onClick={this.deleteHandle.bind(this)}>{this.context.t("Delete")}</Button>*/}

                        {WorkInfo !== undefined &&
                            <div className="referral-result-modal">
                                <BoxGroup 
                                    Text={this.context.t("FileInfoBox")}
                                    FormId={FormInfo.fm_dabir_natije_erja.id}
                                    Id="FileInfoBox"
                                    
                                    IconClassName="row-icon audience"
                                    DeletedElements={DeletedElements}
                                    EditedElements={EditedElements}
                                >
                                    <div className="col-11">
                                        <div className="row">
                                            <LabelInputText 
                                                LabelclassName="col-4 col-form-label" ColClassName="col-4"
                                                Text={this.context.t("PartyAccountName")} className2="col-8"
                                                InputclassName="form-control-plaintext" name="tarafname"
                                                Id="PartyAccountName" FormId={FormInfo.fm_dabir_natije_erja.id}
                                                DeletedElements={DeletedElements} isDisabled={true}
                                                EditedElements={EditedElements} value={WorkInfo.name}
                                            ></LabelInputText>
                                            <LabelInputText 
                                                LabelclassName="col-4 col-form-label" ColClassName="col-4"
                                                Text={this.context.t("CompanyName")} className2="col-8"
                                                InputclassName="form-control-plaintext" name="coname"
                                                Id="CompanyName" FormId={FormInfo.fm_dabir_natije_erja.id}
                                                DeletedElements={DeletedElements} isDisabled={true}
                                                EditedElements={EditedElements} value={WorkInfo.coname}
                                            ></LabelInputText>
                                            <LabelInputText 
                                                LabelclassName="col-4 col-form-label" ColClassName="col-4"
                                                Text={this.context.t("Audience")} className2="col-8"
                                                InputclassName="form-control-plaintext" name="ashkhasname"
                                                Id="Audience" FormId={FormInfo.fm_dabir_natije_erja.id}
                                                DeletedElements={DeletedElements} isDisabled={true}
                                                EditedElements={EditedElements} value={WorkInfo.ashkhasname}
                                            ></LabelInputText>

                                        </div>
                                    </div>

                                </BoxGroup>

                                <BoxGroup 
                                    Text={this.context.t("WorkInfoBox")}
                                    FormId={FormInfo.fm_dabir_natije_erja.id}
                                    Id="WorkInfoBox"
                                    
                                    IconClassName="row-icon flow"
                                    DeletedElements={DeletedElements}
                                    EditedElements={EditedElements}
                                >
                                    <div className="col-11">
                                        <div className="row">
                                            <LabelInputText 
                                                LabelclassName="col-4 col-form-label" ColClassName="col-4"
                                                Text={this.context.t("WorkID")} className2="col-8"
                                                InputclassName="form-control-plaintext" name="peygir_id"
                                                Id="WorkID" FormId={FormInfo.fm_dabir_natije_erja.id}
                                                DeletedElements={DeletedElements} isDisabled={true}
                                                EditedElements={EditedElements} value={WorkInfo.peygir_id}
                                            ></LabelInputText>
                                            <LabelInputText 
                                                LabelclassName="col-4 col-form-label" ColClassName="col-4"
                                                Text={this.context.t("Flow")} className2="col-8"
                                                InputclassName="form-control-plaintext" name="Flow"
                                                Id="Flow" FormId={FormInfo.fm_dabir_natije_erja.id}
                                                DeletedElements={DeletedElements} isDisabled={true}
                                                EditedElements={EditedElements} value={WorkInfo.flow}
                                            ></LabelInputText>
                                            <LabelInputText 
                                                LabelclassName="col-4 col-form-label" ColClassName="col-4"
                                                Text={this.context.t("WorkType")} className2="col-8"
                                                InputclassName="form-control-plaintext" name="wtype"
                                                Id="WorkType" FormId={FormInfo.fm_dabir_natije_erja.id}
                                                DeletedElements={DeletedElements} isDisabled={true}
                                                EditedElements={EditedElements} value={WorkInfo.wtype}
                                            ></LabelInputText>
                                        </div>
                                    </div>
                                </BoxGroup>
                                <BoxGroup 
                                    Text={this.context.t("UsersInfoBox")}
                                    FormId={FormInfo.fm_dabir_natije_erja.id}
                                    Id="UsersInfoBox"
                                    
                                    IconClassName="row-icon creator"
                                    DeletedElements={DeletedElements}
                                    EditedElements={EditedElements}
                                >
                                    <div className="col-11">
                                        <div className="row">
                                            <LabelInputText 
                                                LabelclassName="col-4 col-form-label" ColClassName="col-4"
                                                Text={this.context.t("creator")} className2="col-8"
                                                InputclassName="form-control-plaintext" name="cuser"
                                                Id="creator" FormId={FormInfo.fm_dabir_natije_erja.id}
                                                DeletedElements={DeletedElements} isDisabled={true}
                                                EditedElements={EditedElements} value={WorkInfo.cuser}
                                            ></LabelInputText>
                                            <LabelInputText 
                                                LabelclassName="col-4 col-form-label" ColClassName="col-4"
                                                Text={this.context.t("CreatedDate")} className2="col-8"
                                                InputclassName="form-control-plaintext" name="c_date"
                                                Id="CreatedDate" FormId={FormInfo.fm_dabir_natije_erja.id}
                                                DeletedElements={DeletedElements} isDisabled={true}
                                                EditedElements={EditedElements} value={WorkInfo.c_date}
                                            ></LabelInputText>
                                            <LabelInputText 
                                                LabelclassName="col-4 col-form-label" ColClassName="col-4"
                                                Text={this.context.t("CreatedTime")} className2="col-8"
                                                InputclassName="form-control-plaintext" name="c_time"
                                                Id="CreatedTime" FormId={FormInfo.fm_dabir_natije_erja.id}
                                                DeletedElements={DeletedElements} isDisabled={true}
                                                EditedElements={EditedElements} value={WorkInfo.c_time}
                                            ></LabelInputText>
                                        </div>
                                    </div>
                                </BoxGroup>
                                <BoxGroup 
                                    Text={this.context.t("DescriptionsInfoBox")}
                                    FormId={FormInfo.fm_dabir_natije_erja.id}
                                    Id="DescriptionsInfoBox"
                                    
                                    IconClassName="row-icon description"
                                    DeletedElements={DeletedElements}
                                    EditedElements={EditedElements}
                                >
                                    <div className="col-11">
                                        <div className="row">
                                            <LabelPopUpInputText 
                                                LabelclassName="col-1 col-form-label"
                                                ColClassName="col-12"
                                                Text={this.context.t("Description")} className2="col-11"
                                                className3="input-group  mt-2 mb-2"
                                                InputclassName="form-control" name="natije"
                                                Id="Description"
                                                FormId={FormInfo.fm_dabir_natije_erja.id}
                                                DeletedElements={DeletedElements}
                                                EditedElements={EditedElements}
                                                value={WorkInfo.tozihat}
                                                Type="TextArea"
                                                isDisabled={true}
                                            ></LabelPopUpInputText>
                                        </div>
                                    </div>
                                </BoxGroup>
                                <BoxGroup 
                                    Text={this.context.t("DetailsInfoBox")}
                                    FormId={FormInfo.fm_dabir_natije_erja.id}
                                    Id="DetailsInfoBox"
                                    IconClassName="row-icon project"
                                    DeletedElements={DeletedElements}
                                    EditedElements={EditedElements}
                                >
                                    <div className="col-11">
                                        <div className="row">
                                            <LabelPopUpInputText 
                                                LabelclassName="col-3 col-form-label"
                                                ColClassName="col-4"
                                                Text={this.context.t("Project")} className2="col-9"
                                                InputclassName="form-control" name="p_type_id"
                                                Id="Project" ButtonClick={this.OpenSelectProject.bind(this)}
                                                FormId={FormInfo.fm_dabir_natije_erja.id}
                                                DeletedElements={DeletedElements}
                                                EditedElements={EditedElements}
                                                value={this.state.ProjectSelectedOption}
                                                Type="ComboBox"
                                                options={ProjectList}
                                                isDisabled={WorkInfo.done ? true : false}
                                                isButtonDisabled={WorkInfo.done ? true : false}
                                                changeHandle={this.changeHandle.bind(this)}
                                                ButtonText={this.context.t("SelectPopup")}
                                            ></LabelPopUpInputText>
                                            <LabelInputText 
                                                LabelclassName="col-4 col-form-label"
                                                ColClassName="col-4"
                                                Text={this.context.t("FileNumber")} className2="col-8"
                                                InputclassName="form-control my-2 ltr" name="shomare"
                                                Id="FileNumber" changeHandle={this.changeHandle.bind(this)}
                                                FormId={FormInfo.fm_dabir_natije_erja.id}
                                                DeletedElements={DeletedElements}
                                                EditedElements={EditedElements}
                                                isDisabled={WorkInfo.done ? true : false}
                                                value={this.state.FileNumberText}
                                            ></LabelInputText>
                                            <LabelInputText 
                                                LabelclassName="col-4 col-form-label"
                                                ColClassName="col-4"
                                                Text={this.context.t("Code")} className2="col-8"
                                                InputclassName="form-control my-2 ltr" name="code"
                                                Id="Code" changeHandle={this.changeHandle.bind(this)}
                                                FormId={FormInfo.fm_dabir_natije_erja.id}
                                                DeletedElements={DeletedElements}
                                                isDisabled={WorkInfo.done ? true : false}
                                                EditedElements={EditedElements}
                                                value={this.state.CodeText}
                                            ></LabelInputText>
                                            <LabelInputText 
                                                LabelclassName="col-3 col-form-label"
                                                ColClassName="col-4"
                                                Text={this.context.t("Duration_Of_Work_Short")} className2="col-9"
                                                InputclassName="form-control mb-2 ltr" name="modat_anjam_w"
                                                Id="Duration_Of_Work_Short" changeHandle={this.changeHandle.bind(this)}
                                                FormId={FormInfo.fm_dabir_natije_erja.id}
                                                DeletedElements={DeletedElements}
                                                EditedElements={EditedElements} mask="99999999"
                                                maskChar=""
                                                isDisabled={WorkInfo.done ? true : false}
                                                value={this.state.DurationDoneText}
                                            ></LabelInputText>

                                            <LabelPopUpInputText 
                                                ColClassName="col-8"
                                                Text={this.context.t("Subject")} 
                                                className3="input-group mb-2"
                                                InputclassName="form-control" name="mozo"
                                                Id="Subject" ButtonClick={this.OpenSelectDefaultText.bind(this)}
                                                FormId={FormInfo.fm_dabir_natije_erja.id}
                                                DeletedElements={DeletedElements}
                                                EditedElements={EditedElements}
                                                value={this.state.SubjectInputText}
                                                
                                                Type="Input"
                                                isDisabled={WorkInfo.done ? true : false}
                                                isButtonDisabled={WorkInfo.done ? true : false}
                                                changeHandle={this.changeHandle.bind(this)}
                                                ButtonText={this.context.t("SelectPopup")}
                                            ></LabelPopUpInputText>
                                        </div>
                                    </div>
                                </BoxGroup>
                                <BoxGroup 
                                    Text={this.context.t("ResultInfoBox")}
                                    FormId={FormInfo.fm_dabir_natije_erja.id}
                                    Id="ResultInfoBox"
                                    
                                    IconClassName="row-icon result"
                                    DeletedElements={DeletedElements}
                                    EditedElements={EditedElements}
                                >
                                    <div className="col-11">
                                        <div className="row">

                                            <LabelPopUpInputText  LabelclassName="col-1 col-form-label"
                                                ColClassName="col-12"
                                                Text={this.context.t("WorkResult")} className2="col-11"
                                                className3="input-group mt-2 mb-2"
                                                InputclassName="form-control" name="natije"
                                                Id="Result" ButtonClick={this.OpenSelectDefaultText.bind(this)}
                                                FormId={FormInfo.fm_dabir_natije_erja.id}
                                                DeletedElements={DeletedElements}
                                                EditedElements={EditedElements}
                                                value={this.state.ResultTextArea}
                                                
                                                Type="TextArea"
                                                isDisabled={WorkInfo.done ? true : false}
                                                isButtonDisabled={WorkInfo.done ? true : false}
                                                changeHandle={this.changeHandle.bind(this)}
                                                ButtonText={this.context.t("SelectPopup")}
                                            ></LabelPopUpInputText>
                                        </div>
                                    </div>
                                </BoxGroup>


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

                            </div>}
                        <style>{modalBackDrop}</style>
                    </ModalBody>
                    {/* <ModalFooter>
                        <Button  className="ml-2"
                            onClick={this.saveHandle.bind(this, this.context.t("msg_Operation_Success"))}>{this.context.t("Save")}</Button>
                        <Button color="warning" className="ml-2"
                            onClick={this.rebuildHandle.bind(this)}>{this.context.t("Rebuild")}</Button>
                        <Button color="success" className="ml-2"
                            onClick={this.ConfirmationHandle.bind(this)}>{this.context.t("Confirmation")}</Button>
                    </ModalFooter> */}
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
    GetSelectComboProject: (Params) => {
        dispatch(ProjectsInfo_action.GetSelectComboProject(Params))
    },
    FetchWorkInfo: (peygir_id) => {
        dispatch(WorkBasic_action.FetchWorkInfo(peygir_id))
    },
    SaveWorkInfo: (SaveParams, msg) => {
        return dispatch(WorkActions_action.SaveWorkInfo(SaveParams, msg));
    },
    InitConfirmWork: (Params, msg) => {
        return dispatch(WorkActions_action.InitConfirmWork(Params, msg))
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
    const { WorkInfo } = state.Auto_WorkBasic;
    const { SelectProjectComboList_rows } = state.projects
    const { DeletedElements340 } = state.Design !== undefined ? state.Design : {};
    const { EditedElements340 } = state.Design !== undefined ? state.Design : {};
    return {
        alert,
        loading,
        WorkInfo,
        lang,
        Refresh_Form,
        SelectProjectComboList_rows,
        SelectFlowResultTogleModal,
        ReviewWorkTogleModal,
        DeletedElements: DeletedElements340,
        EditedElements: EditedElements340
    };
}


const connectedReferenceViewer = connect(mapStateToProps, mapDispatchToProps)(ReferenceViewer);
export { connectedReferenceViewer as ReferenceViewer };

