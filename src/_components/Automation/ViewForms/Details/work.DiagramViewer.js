import React, { Component } from 'react';
import { connect } from "react-redux"
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import PropTypes from "prop-types"

import { OrgChart } from "../../../Frameworks/orgChart";
import { RibbonWorkDiagram } from './Ribbon';
import { FormInfo } from "../../../../locales";
import {
    ComboSelectList, LabelCheckBox, LabelInputText,
    LabelCombobox, LabelCalendar, LabelPopUpInputText, BoxGroup
} from "../../../Frameworks";

var SaveParams = { form: "", data: [] };
class WorkDiagramViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            toggleDiagram: false,
            modalClass: "modal-dialog-centered modal-xl r-modal r-diagram-modal r-automation-modal"
        };

    }


    toggleDiagram() {
        this.setState(prevState => ({
            toggleDiagram: !prevState.toggleDiagram
        }));
    }

    clearSaveParams = (e) => {
        SaveParams = { form: "", data: [] };
    }

    changeHandle = (e, val) => {
    }
    render() {
        const { modal, toggle, FetchData, Params, RefreshParentForm, ParentForm, WorkInfo_Diagram, SelectedRow
            , DeletedElements, EditedElements } = this.props;

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
                    <ModalHeader toggle={toggle}>دیاگرام</ModalHeader>
                    <ModalBody>
                        <div className="r-main-box__ribbon">
                            <RibbonWorkDiagram clearSaveParams={this.clearSaveParams.bind(this)} RefreshParentForm={RefreshParentForm} ParentForm={ParentForm} SaveParams={SaveParams} Params={Params} />
                        </div>
                        <div className="r-diagram-modal-content">
                            <div className="row" id="r-diagram-row-main">
                                <div className="col-5 collapsed"  id="r-diagram-sidebar">
                                    <div class="toggle-diagram"><button type="button" class="toggle-diagram-sidebar" title=""></button></div>

                                    <BoxGroup className="row bg-gray mg-b-5"
                                        Text={this.context.t("BasicInfoBox")}
                                        FormId={FormInfo.fm_par_diagram.id}
                                        Id="BasicInfoBox"
                                        IconDivClassName="col-2 d-flex"
                                        IconClassName="row-icon flow"
                                        DeletedElements={DeletedElements}
                                        EditedElements={EditedElements}
                                    >
                                        <div className="col-10">
                                            <div className="row">
                                                <LabelInputText className1="form-group row"
                                                    LabelclassName="col-4 col-form-label"
                                                    ColClassName="col-6"
                                                    Text={this.context.t("WorkID")} className2="col-8"
                                                    InputclassName="form-control mt-2 mb-1" name="peygir_id"
                                                    Id="PeygirId"
                                                    
                                                    FormId={FormInfo.fm_par_diagram.id}
                                                    DeletedElements={DeletedElements}
                                                    EditedElements={EditedElements}
                                                    value={this.state.PeygirIdText}
                                                    isDisabled={true}
                                                ></LabelInputText>
                                                <LabelInputText className1="form-group row"
                                                    LabelclassName="col-4 col-form-label"
                                                    ColClassName="col-6"
                                                    Text={this.context.t("Serial")} className2="col-8"
                                                    InputclassName="form-control mt-2 mb-1" name="nos_id"
                                                    Id="Serial"
                                                    
                                                    FormId={FormInfo.fm_par_diagram.id}
                                                    DeletedElements={DeletedElements}
                                                    EditedElements={EditedElements}
                                                    value={this.state.SerialText}
                                                    isDisabled={true}
                                                ></LabelInputText>
                                                <LabelInputText className1="form-group row"
                                                    LabelclassName="col-2 col-form-label"
                                                    ColClassName="col-12"
                                                    Text={this.context.t("Create")} className2="col-10"
                                                    InputclassName="form-control my-1" name="create_id"
                                                    Id="Create"
                                                    
                                                    FormId={FormInfo.fm_par_diagram.id}
                                                    DeletedElements={DeletedElements}
                                                    EditedElements={EditedElements}
                                                    value={this.state.CreateText}
                                                    isDisabled={true}
                                                ></LabelInputText>
                                                <LabelInputText className1="form-group row"
                                                    LabelclassName="col-2 col-form-label"
                                                    ColClassName="col-12"
                                                    Text={this.context.t("Implement")} className2="col-10"
                                                    InputclassName="form-control my-1" name="implement_id"
                                                    Id="Implement"
                                                    
                                                    FormId={FormInfo.fm_par_diagram.id}
                                                    DeletedElements={DeletedElements}
                                                    EditedElements={EditedElements}
                                                    value={this.state.ImplementText}
                                                    isDisabled={true}
                                                ></LabelInputText>
                                                <LabelInputText className1="form-group row"
                                                    LabelclassName="col-2 col-form-label"
                                                    ColClassName="col-12"
                                                    Text={this.context.t("Show")} className2="col-10"
                                                    InputclassName="form-control my-1" name="show_id"
                                                    Id="Show"
                                                    FormId={FormInfo.fm_par_diagram.id}
                                                    DeletedElements={DeletedElements}
                                                    EditedElements={EditedElements}
                                                    value={this.state.ShowText}
                                                    isDisabled={true}
                                                ></LabelInputText>
                                                <LabelInputText className1="form-group row"
                                                    LabelclassName="col-2 col-form-label"
                                                    ColClassName="col-12"
                                                    Text={this.context.t("manager")} className2="col-10"
                                                    InputclassName="form-control mt-1 mb-2" name="manager_id"
                                                    Id="Manager"
                                                    FormId={FormInfo.fm_par_diagram.id}
                                                    DeletedElements={DeletedElements}
                                                    EditedElements={EditedElements}
                                                    value={this.state.ManagerText}
                                                    isDisabled={true}
                                                ></LabelInputText>
                                            </div>
                                        </div>
                                    </BoxGroup>
                                    <BoxGroup className="row bg-gray mg-b-5"
                                        Text={this.context.t("DateTimeInfoBox")}
                                        FormId={FormInfo.fm_par_diagram.id}
                                        Id="DateTimeInfoBox"
                                        IconDivClassName="col-2 d-flex"
                                        IconClassName="row-icon flow"
                                        DeletedElements={DeletedElements}
                                        EditedElements={EditedElements}
                                    >
                                        <div className="col-10">
                                            <div className="row">
                                                <LabelInputText className1="form-group row"
                                                    LabelclassName="col-4 col-form-label"
                                                    ColClassName="col-6"
                                                    Text={this.context.t("WorkDeadline")} className2="col-8"
                                                    InputclassName="form-control my-2" name="workdeadline_id"
                                                    Id="WorkDeadline"
                                                    FormId={FormInfo.fm_par_diagram.id}
                                                    DeletedElements={DeletedElements}
                                                    EditedElements={EditedElements}
                                                    value={this.state.WorkDeadlineText}
                                                    isDisabled={true}
                                                ></LabelInputText>
                                                <LabelInputText className1="form-group row"
                                                    LabelclassName="col-4 col-form-label"
                                                    ColClassName="col-6"
                                                    Text={this.context.t("DeadTime")} className2="col-8"
                                                    InputclassName="form-control my-2" name="deadtime_id"
                                                    Id="DeadTime"
                                                    FormId={FormInfo.fm_par_diagram.id}
                                                    DeletedElements={DeletedElements}
                                                    EditedElements={EditedElements}
                                                    value={this.state.DeadTimeText}
                                                    isDisabled={true}
                                                ></LabelInputText>
                                            </div>
                                        </div>
                                    </BoxGroup>
                                    <BoxGroup className="row bg-gray mg-b-5"
                                        Text={this.context.t("FileInfoBox")}
                                        FormId={FormInfo.fm_par_diagram.id}
                                        Id="FileInfoBox"
                                        IconDivClassName="col-2 d-flex"
                                        IconClassName="row-icon flow"
                                        DeletedElements={DeletedElements}
                                        EditedElements={EditedElements}
                                    >
                                        <div className="col-10">
                                            <div className="row">
                                                <LabelInputText className1="form-group row"
                                                    LabelclassName="col-4 col-form-label"
                                                    ColClassName="col-6"
                                                    Text={this.context.t("File")} className2="col-8"
                                                    InputclassName="form-control mt-2 mb-1" name="file_id"
                                                    Id="File"
                                                    FormId={FormInfo.fm_par_diagram.id}
                                                    DeletedElements={DeletedElements}
                                                    EditedElements={EditedElements}
                                                    value={this.state.FileText}
                                                    isDisabled={true}
                                                ></LabelInputText>
                                                <LabelInputText className1="form-group row"
                                                    LabelclassName="col-4 col-form-label"
                                                    ColClassName="col-6"
                                                    Text={this.context.t("Audience")} className2="col-8"
                                                    InputclassName="form-control mt-2 mb-1" name="audience_id"
                                                    Id="Audience"
                                                    FormId={FormInfo.fm_par_diagram.id}
                                                    DeletedElements={DeletedElements}
                                                    EditedElements={EditedElements}
                                                    value={this.state.AudienceText}
                                                    isDisabled={true}
                                                ></LabelInputText>
                                                <LabelInputText className1="form-group row"
                                                    LabelclassName="col-4 col-form-label"
                                                    ColClassName="col-6"
                                                    Text={this.context.t("Project")} className2="col-8"
                                                    InputclassName="form-control mt-1 mb-2" name="project_id"
                                                    Id="Project"
                                                    FormId={FormInfo.fm_par_diagram.id}
                                                    DeletedElements={DeletedElements}
                                                    EditedElements={EditedElements}
                                                    value={this.state.ProjectText}
                                                    isDisabled={true}
                                                ></LabelInputText>
                                            </div>
                                        </div>
                                    </BoxGroup>
                                    <BoxGroup className="row bg-gray mg-b-5"
                                        Text={this.context.t("DetailsInfoBox")}
                                        FormId={FormInfo.fm_par_diagram.id}
                                        Id="DetailsInfoBox"
                                        IconDivClassName="col-2 d-flex"
                                        IconClassName="row-icon flow"
                                        DeletedElements={DeletedElements}
                                        EditedElements={EditedElements}
                                    >
                                        <div className="col-10">
                                            <div className="row">
                                                <LabelInputText className1="form-group row"
                                                    LabelclassName="col-4 col-form-label"
                                                    ColClassName="col-6"
                                                    Text={this.context.t("Subject")} className2="col-8"
                                                    InputclassName="form-control my-2" name="subject_id"
                                                    Id="Subject"
                                                    FormId={FormInfo.fm_par_diagram.id}
                                                    DeletedElements={DeletedElements}
                                                    EditedElements={EditedElements}
                                                    value={this.state.SubjectText}
                                                    isDisabled={true}
                                                ></LabelInputText>
                                                <LabelInputText className1="form-group row"
                                                    LabelclassName="col-4 col-form-label"
                                                    ColClassName="col-6"
                                                    Text={this.context.t("Code")} className2="col-8"
                                                    InputclassName="form-control my-2" name="code_id"
                                                    Id="Code"
                                                    FormId={FormInfo.fm_par_diagram.id}
                                                    DeletedElements={DeletedElements}
                                                    EditedElements={EditedElements}
                                                    value={this.state.CodeText}
                                                    isDisabled={true}
                                                ></LabelInputText>
                                            </div>
                                        </div>
                                    </BoxGroup>
                                    <BoxGroup className="row bg-gray mg-b-5"
                                        Text={this.context.t("WorkFlowSettingBox")}
                                        FormId={FormInfo.fm_par_diagram.id}
                                        Id="WorkFlowSettingBox"
                                        IconDivClassName="col-2 d-flex"
                                        IconClassName="row-icon flow"
                                        DeletedElements={DeletedElements}
                                        EditedElements={EditedElements}
                                    >
                                        <div className="col-10">
                                            <div className="row">
                                                <LabelInputText className1="form-group row"
                                                    LabelclassName="col-2 col-form-label"
                                                    ColClassName="col-12"
                                                    Text={this.context.t("Flow")} className2="col-10"
                                                    InputclassName="form-control mt-2 mb-1" name="flow_id"
                                                    Id="Flow"
                                                    FormId={FormInfo.fm_par_diagram.id}
                                                    DeletedElements={DeletedElements}
                                                    EditedElements={EditedElements}
                                                    value={this.state.FlowText}
                                                    isDisabled={true}
                                                ></LabelInputText>
                                                <LabelInputText className1="form-group row"
                                                    LabelclassName="col-2 col-form-label"
                                                    ColClassName="col-12"
                                                    Text={this.context.t("FlowResult")} className2="col-10"
                                                    InputclassName="form-control my-1" name="flowresult_id"
                                                    Id="FlowResult"
                                                    
                                                    FormId={FormInfo.fm_par_diagram.id}
                                                    DeletedElements={DeletedElements}
                                                    EditedElements={EditedElements}
                                                    value={this.state.FlowResultText}
                                                    isDisabled={true}
                                                ></LabelInputText>
                                                <LabelInputText className1="form-group row"
                                                    LabelclassName="col-2 col-form-label"
                                                    ColClassName="col-12"
                                                    Text={this.context.t("FlowCode")} className2="col-10"
                                                    InputclassName="form-control my-1" name="flowcode_id"
                                                    Id="FlowCode"
                                                    FormId={FormInfo.fm_par_diagram.id}
                                                    DeletedElements={DeletedElements}
                                                    EditedElements={EditedElements}
                                                    value={this.state.FlowCodeText}
                                                    isDisabled={true}
                                                ></LabelInputText>
                                                <LabelInputText className1="form-group row"
                                                    LabelclassName="col-2 col-form-label"
                                                    ColClassName="col-12"
                                                    Text={this.context.t("CertificateName")} className2="col-10"
                                                    InputclassName="form-control mt-1 mb-2" name="certificatename_id"
                                                    Id="CertificateName"
                                                    FormId={FormInfo.fm_par_diagram.id}
                                                    DeletedElements={DeletedElements}
                                                    EditedElements={EditedElements}
                                                    value={this.state.CertificateNameText}
                                                    isDisabled={true}
                                                ></LabelInputText>
                                            </div>
                                        </div>
                                    </BoxGroup>
                                    <BoxGroup className="row bg-gray mg-b-5"
                                        Text={this.context.t("DescriptionsInfoBox")}
                                        FormId={FormInfo.fm_par_diagram.id}
                                        Id="DescriptionsInfoBox"
                                        IconDivClassName="col-2 d-flex"
                                        IconClassName="row-icon flow"
                                        DeletedElements={DeletedElements}
                                        EditedElements={EditedElements}
                                    >
                                        <div className="col-10">
                                            <div className="row">
                                                <LabelPopUpInputText className1="form-group row" 
                                                    LabelclassName="col-2 col-form-label"
                                                    ColClassName="col-12"
                                                    Text={this.context.t("Description")} className2="col-10"
                                                    InputclassName="form-control  rounded" name="tozihat"
                                                    Id="Description" 
                                                    FormId={FormInfo.fm_par_diagram.id}
                                                    DeletedElements={DeletedElements}
                                                    EditedElements={EditedElements}
                                                    isDisabled={true}
                                                    value={this.state.DescriptionText}
                                                    color="primary" color="primary"
                                                    className3="input-group mt-2 mb-1"
                                                    Type="TextArea"
                                                ></LabelPopUpInputText>
                                                 <LabelPopUpInputText className1="form-group row" 
                                                 LabelclassName="col-2 col-form-label"
                                                    ColClassName="col-12"
                                                    Text={this.context.t("Result")} className2="col-10"
                                                    InputclassName="form-control rounded" name="natije"
                                                    Id="Result" 
                                                    FormId={FormInfo.fm_par_diagram.id}
                                                    DeletedElements={DeletedElements}
                                                    EditedElements={EditedElements}
                                                    isDisabled={true}
                                                    value={this.state.ResultText}
                                                    color="primary" color="primary"
                                                    className3="input-group mt-1 mb-2"
                                                    Type="TextArea"
                                                ></LabelPopUpInputText>
                                            </div>
                                        </div>
                                    </BoxGroup>
                                </div>
                                <div className="col-12" id="r-diagram-content">
                                    <div className="row bg-gray">
                                        <div className="col-12">
                                            <OrgChart data={WorkInfo_Diagram} currentId={SelectedRow.peygir_id} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                </Modal>
                <style>{modalBackDrop}</style>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({

});
WorkDiagramViewer.contextTypes = {
    t: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { alert } = state;
    const { loading } = state.loading;
    const { lang } = state.i18nState;
    const { WorkInfo_Diagram } = state.Auto_WorkBasic;
    const { DeletedElements217 } = state.Design !== undefined ? state.Design : {};
    const { EditedElements217 } = state.Design !== undefined ? state.Design : {};
    console.log(DeletedElements217)

    return {
        alert,
        loading,
        lang,
        WorkInfo_Diagram,
        DeletedElements: DeletedElements217,
        EditedElements: EditedElements217,
    };

}


const connectedWorkDiagramViewer = connect(mapStateToProps, mapDispatchToProps)(WorkDiagramViewer);
export { connectedWorkDiagramViewer as WorkDiagramViewer };
