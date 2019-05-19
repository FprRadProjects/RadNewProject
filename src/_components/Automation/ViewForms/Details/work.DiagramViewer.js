import React, { Component } from 'react';
import { connect } from "react-redux"
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import PropTypes from "prop-types"
import { WorkBasic_action } from "../../../../_actions";
import { OrgChart } from "../../../Frameworks/orgChart";
import { RibbonWorkDiagram } from './Ribbon';
import { FormInfo } from "../../../../locales";
import {
    LabelInputText,LabelPopUpInputText, BoxGroup
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
    componentDidMount() {
        const { FetchLoadingWorkInfo, SelectedRow } = this.props;
        FetchLoadingWorkInfo(SelectedRow.peygir_id);
    }

    toggleDiagram() {
        this.setState(prevState => ({
            toggleDiagram: !prevState.toggleDiagram
        }));
    }

    clearSaveParams = (e) => {
        SaveParams = { form: "", data: [] };
    }

    changeHandle = (Id) => {
        const { FetchLoadingWorkInfo } = this.props;
        FetchLoadingWorkInfo(Id);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.WorkInfo !== this.props.WorkInfo) {
            this.setState({ PeygirIdText: nextProps.WorkInfo.peygir_id });
            this.setState({ SerialText: nextProps.WorkInfo.nos_id });
            this.setState({
                CreateText: nextProps.WorkInfo.cuser
                    + " - " + nextProps.WorkInfo.c_date + " - " + nextProps.WorkInfo.c_time
            });
            this.setState({
                ImplementText: nextProps.WorkInfo.done ? nextProps.WorkInfo.donuser
                    + " - " + nextProps.WorkInfo.tarikh + " - " + nextProps.WorkInfo.saat : ""
            });
            this.setState({
                SeenText: nextProps.WorkInfo.see_date !== null ?
                    nextProps.WorkInfo.see_date + " - " + nextProps.WorkInfo.see_time : ""
            });
            const FileInfo = (nextProps.WorkInfo.coname === null ? "" : nextProps.WorkInfo.coname) + " - " + (nextProps.WorkInfo.name === null ? "" : nextProps.WorkInfo.name);
            this.setState({ ManagerText: nextProps.WorkInfo.modir });
            this.setState({ WorkDeadlineText: nextProps.WorkInfo.tarikhaction });
            this.setState({ DeadTimeText: nextProps.WorkInfo.deadtime });
            this.setState({ FileText: FileInfo });
            this.setState({ AudienceText: nextProps.WorkInfo.ashkhasname !== null ? nextProps.WorkInfo.ashkhasname : "" });
            this.setState({ ProjectText: nextProps.WorkInfo.ptype !== null ? nextProps.WorkInfo.ptype : "" });
            this.setState({ SubjectText: nextProps.WorkInfo.mozo });
            this.setState({ CodeText: nextProps.WorkInfo.code !== null ? nextProps.WorkInfo.code : "" });
            this.setState({ FileNumberText: nextProps.WorkInfo.shomare !== null ? nextProps.WorkInfo.shomare : "" });
              this.setState({ FlowText: nextProps.WorkInfo.flow !== null ? nextProps.WorkInfo.flow : "" });
            this.setState({ FlowResultText: nextProps.WorkInfo.f_natije !== null ? nextProps.WorkInfo.f_natije : "" });
            this.setState({ FlowCodeText: nextProps.WorkInfo.flow_code !== null ? nextProps.WorkInfo.flow_code : "" });
            this.setState({ CertificateNameText: nextProps.WorkInfo.madrak_name !== null ? nextProps.WorkInfo.madrak_name : "" });
            this.setState({ DescriptionText: nextProps.WorkInfo.tozihat });
            this.setState({ ResultText: nextProps.WorkInfo.natije });
        }
    }
    render() {
        const { modal, toggle, Params, RefreshParentForm, ParentForm, WorkInfo_Diagram, SelectedRow
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
                                <div className="col-5" id="r-diagram-sidebar">
                                    <div class="toggle-diagram"><button type="button" class="toggle-diagram-sidebar" title=""></button></div>

                                    <BoxGroup 
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
                                                <LabelInputText 
                                                    LabelclassName="col-4 col-form-label"
                                                    Text={this.context.t("WorkID")} className2="col-8"
                                                    InputclassName="form-control mt-2 mb-1  ltr" name="peygir_id"
                                                    Id="PeygirId"
                                                    FormId={FormInfo.fm_par_diagram.id}
                                                    DeletedElements={DeletedElements}
                                                    EditedElements={EditedElements}
                                                    value={this.state.PeygirIdText}
                                                    isDisabled={true}
                                                ></LabelInputText>
                                                <LabelInputText 
                                                    LabelclassName="col-4 col-form-label"
                                                    Text={this.context.t("Serial")} className2="col-8"
                                                    InputclassName="form-control mt-2 mb-1 ltr" name="nos_id"
                                                    Id="Serial"
                                                    FormId={FormInfo.fm_par_diagram.id}
                                                    DeletedElements={DeletedElements}
                                                    EditedElements={EditedElements}
                                                    value={this.state.SerialText}
                                                    isDisabled={true}
                                                ></LabelInputText>
                                                <LabelInputText 
                                                    
                                                    ColClassName="col-12"
                                                    Text={this.context.t("Create")} 
                                                    InputclassName="form-control my-1" name="create_id"
                                                    Id="Create"
                                                    FormId={FormInfo.fm_par_diagram.id}
                                                    DeletedElements={DeletedElements}
                                                    EditedElements={EditedElements}
                                                    value={this.state.CreateText}
                                                    isDisabled={true}
                                                ></LabelInputText>
                                                <LabelInputText 
                                                    
                                                    ColClassName="col-12"
                                                    Text={this.context.t("Implement")} 
                                                    InputclassName="form-control my-1" name="doneuser"
                                                    Id="Implement"
                                                    FormId={FormInfo.fm_par_diagram.id}
                                                    DeletedElements={DeletedElements}
                                                    EditedElements={EditedElements}
                                                    value={this.state.ImplementText}
                                                    isDisabled={true}
                                                ></LabelInputText>
                                                <LabelInputText 
                                                    
                                                    ColClassName="col-12"
                                                    Text={this.context.t("Show")} 
                                                    InputclassName="form-control my-1" name="show_id"
                                                    Id="Show"
                                                    FormId={FormInfo.fm_par_diagram.id}
                                                    DeletedElements={DeletedElements}
                                                    EditedElements={EditedElements}
                                                    value={this.state.SeenText}
                                                    isDisabled={true}
                                                ></LabelInputText>
                                                <LabelInputText 
                                                    
                                                    ColClassName="col-12"
                                                    Text={this.context.t("manager")} 
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
                                    <BoxGroup 
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
                                                <LabelInputText 
                                                    LabelclassName="col-4 col-form-label"
                                                    
                                                    Text={this.context.t("WorkDeadline")} className2="col-8"
                                                    InputclassName="form-control my-2" name="workdeadline_id"
                                                    Id="WorkDeadline"
                                                    FormId={FormInfo.fm_par_diagram.id}
                                                    DeletedElements={DeletedElements}
                                                    EditedElements={EditedElements}
                                                    value={this.state.WorkDeadlineText}
                                                    isDisabled={true}
                                                ></LabelInputText>
                                                <LabelInputText 
                                                    LabelclassName="col-4 col-form-label"
                                                    
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
                                    <BoxGroup 
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
                                                <LabelInputText 
                                                    LabelclassName="col-4 col-form-label"
                                                    Text={this.context.t("File")} className2="col-8"
                                                    InputclassName="form-control my-2" name="file_id"
                                                    Id="File"
                                                    FormId={FormInfo.fm_par_diagram.id}
                                                    DeletedElements={DeletedElements}
                                                    EditedElements={EditedElements}
                                                    value={this.state.FileText}
                                                    isDisabled={true}
                                                ></LabelInputText>
                                                <LabelInputText 
                                                    LabelclassName="col-4 col-form-label"
                                                    
                                                    Text={this.context.t("Audience")} className2="col-8"
                                                    InputclassName="form-control my-2" name="audience_id"
                                                    Id="Audience"
                                                    FormId={FormInfo.fm_par_diagram.id}
                                                    DeletedElements={DeletedElements}
                                                    EditedElements={EditedElements}
                                                    value={this.state.AudienceText}
                                                    isDisabled={true}
                                                ></LabelInputText>
                                                <LabelInputText 
                                                    
                                                    ColClassName="col-12"
                                                    Text={this.context.t("Project")}
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
                                    <BoxGroup 
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
                                                <LabelInputText 
                                                    
                                                    ColClassName="col-12"
                                                    Text={this.context.t("Subject")} 
                                                    InputclassName="form-control my-2" name="subject_id"
                                                    Id="Subject"
                                                    FormId={FormInfo.fm_par_diagram.id}
                                                    DeletedElements={DeletedElements}
                                                    EditedElements={EditedElements}
                                                    value={this.state.SubjectText}
                                                    isDisabled={true}
                                                ></LabelInputText>
                                                <LabelInputText 
                                                    LabelclassName="col-4 col-form-label"
                                                    
                                                    Text={this.context.t("Code")} className2="col-8"
                                                    InputclassName="form-control mt-1 mb-2 ltr" name="code_id"
                                                    Id="Code"
                                                    FormId={FormInfo.fm_par_diagram.id}
                                                    DeletedElements={DeletedElements}
                                                    EditedElements={EditedElements}
                                                    value={this.state.CodeText}
                                                    isDisabled={true}
                                                ></LabelInputText>
                                                <LabelInputText 
                                                    LabelclassName="col-4 col-form-label"
                                                    Text={this.context.t("FileNumber")} className2="col-8"
                                                    InputclassName="form-control mt-1 mb-2 ltr" name="shomare"
                                                    Id="FileNumber"
                                                    FormId={FormInfo.fm_par_diagram.id}
                                                    DeletedElements={DeletedElements}
                                                    EditedElements={EditedElements}
                                                    value={this.state.FileNumberText}
                                                    isDisabled={true}
                                                ></LabelInputText>
                                            </div>
                                        </div>
                                    </BoxGroup>
                                    <BoxGroup 
                                        Text={this.context.t("WorkFlowInfoBox")}
                                        FormId={FormInfo.fm_par_diagram.id}
                                        Id="WorkFlowInfoBox"
                                        IconDivClassName="col-2 d-flex"
                                        IconClassName="row-icon flow"
                                        DeletedElements={DeletedElements}
                                        EditedElements={EditedElements}
                                    >
                                        <div className="col-10">
                                            <div className="row">
                                                <LabelInputText 
                                                    ColClassName="col-12"
                                                    Text={this.context.t("Flow")} 
                                                    InputclassName="form-control mt-2 mb-1" name="flow_id"
                                                    Id="Flow"
                                                    FormId={FormInfo.fm_par_diagram.id}
                                                    DeletedElements={DeletedElements}
                                                    EditedElements={EditedElements}
                                                    value={this.state.FlowText}
                                                    isDisabled={true}
                                                ></LabelInputText>
                                                <LabelInputText 
                                                    
                                                    ColClassName="col-12"
                                                    Text={this.context.t("FlowResult")}
                                                    InputclassName="form-control my-1" name="flowresult_id"
                                                    Id="FlowResult"

                                                    FormId={FormInfo.fm_par_diagram.id}
                                                    DeletedElements={DeletedElements}
                                                    EditedElements={EditedElements}
                                                    value={this.state.FlowResultText}
                                                    isDisabled={true}
                                                ></LabelInputText>
                                                <LabelInputText 
                                                    
                                                    ColClassName="col-12"
                                                    Text={this.context.t("FlowCode")}
                                                    InputclassName="form-control my-1" name="flowcode_id"
                                                    Id="FlowCode"
                                                    FormId={FormInfo.fm_par_diagram.id}
                                                    DeletedElements={DeletedElements}
                                                    EditedElements={EditedElements}
                                                    value={this.state.FlowCodeText}
                                                    isDisabled={true}
                                                ></LabelInputText>
                                                <LabelInputText 
                                                    
                                                    ColClassName="col-12"
                                                    Text={this.context.t("CertificateName")} 
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
                                    <BoxGroup 
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
                                                <LabelPopUpInputText 
                                                    ColClassName="col-12"
                                                    Text={this.context.t("Description")} 
                                                    InputclassName="form-control  rounded" name="tozihat"
                                                    Id="Description"
                                                    FormId={FormInfo.fm_par_diagram.id}
                                                    DeletedElements={DeletedElements}
                                                    EditedElements={EditedElements}
                                                    isDisabled={true}
                                                    value={this.state.DescriptionText}
                                                    Type="TextArea"
                                                ></LabelPopUpInputText>
                                                <LabelPopUpInputText 
                                                    
                                                    ColClassName="col-12"
                                                    Text={this.context.t("Result")}
                                                    InputclassName="form-control rounded" name="natije"
                                                    Id="Result"
                                                    FormId={FormInfo.fm_par_diagram.id}
                                                    DeletedElements={DeletedElements}
                                                    EditedElements={EditedElements}
                                                    isDisabled={true}
                                                    value={this.state.ResultText}
                                                    className3="input-group mt-1 mb-2"
                                                    Type="TextArea"
                                                ></LabelPopUpInputText>
                                            </div>
                                        </div>
                                    </BoxGroup>
                                </div>
                                <div className="col-7" id="r-diagram-content">
                                    <div className="row bg-gray">
                                        <div className="col-12">
                                            <OrgChart data={WorkInfo_Diagram} onNodeClickHandler={this.changeHandle.bind(this)} currentId={SelectedRow.peygir_id} />
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
    FetchLoadingWorkInfo: (peygir_id) => {
        dispatch(WorkBasic_action.FetchLoadingWorkInfo(peygir_id))
    }
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
    const { WorkInfo } = state.Auto_WorkBasic;

    return {
        alert,
        loading,
        lang,
        WorkInfo_Diagram,
        DeletedElements: DeletedElements217,
        EditedElements: EditedElements217,
        WorkInfo
    };

}


const connectedWorkDiagramViewer = connect(mapStateToProps, mapDispatchToProps)(WorkDiagramViewer);
export { connectedWorkDiagramViewer as WorkDiagramViewer };
