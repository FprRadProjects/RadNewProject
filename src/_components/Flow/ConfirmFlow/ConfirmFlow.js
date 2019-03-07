import React, { Component } from 'react';
import { connect } from "react-redux"
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import PropTypes from "prop-types"
import { SelectProjectModal } from "../../Project/";
import { SelectDefaultTextModal } from "../../Basic/";

import { WorkAccess_action, design_Actions, BasicInfo_action, WorkActions_action } from "../../../_actions";
import { FormInfo } from "../../../locales";
import { SelectFlowResultModal } from '../../Flow/ConfirmFlow/SelectFlowResultModal';
import { ReviewWorkModal } from '../../Flow/ConfirmFlow/ReviewWorkModal';
import { toast } from 'react-toastify';

var SaveParams = { form: "", data: [] };
var ConfirmParams = { form: "", page: 1, pagesize: 10, filter: [], Form: "" };

class ConfirmFlow extends Component {
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
            modalClass: "modal-dialog-centered modal-lg r-filter-modal"
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
        const { WorkInfo, InitConfirmWork, ParentForm, lang } = this.props;
        ConfirmParams["peygir_id"] = WorkInfo.peygir_id;
        var formname = lang == "fa" ? ParentForm.form_name : ParentForm.en_form_name;
        ConfirmParams["Form"] = formname;
        InitConfirmWork(ConfirmParams);
    }

    CloseleSelectFlowResult = (e) => {
        this.setState({
            FlowResultSelectmodal: !this.state.FlowResultSelectmodal,
        });
    }
   
    componentWillReceiveProps(nextProps) {
        const {  flowResultSelectModal, reviewWorkModal} = nextProps;
       
        if (flowResultSelectModal !== undefined) {
            this.setState({
                FlowResultSelectmodal: flowResultSelectModal,
            });
        }
        if (reviewWorkModal !== undefined) {
            this.setState({
                ReviewWorkModal: reviewWorkModal,
            });
        }
    }

    render() {
        const {  peygir_id, Params, RefreshFormAction } = this.props;
      
        return (
            <div>

                {this.state.FlowResultSelectmodal &&
                    <SelectFlowResultModal modal={this.state.FlowResultSelectmodal}
                        toggle={this.CloseleSelectFlowResult.bind(this)} Params={Params}
                        peygir_id={peygir_id} RefreshFormAction={RefreshFormAction} />}
                {this.state.ReviewWorkModal &&
                    <ReviewWorkModal modal={this.state.ReviewWorkModal}
                        toggle={this.CloseleSelectFlowResult.bind(this)} Params={Params}
                        peygir_id={peygir_id} RefreshFormAction={RefreshFormAction} />}

            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    GetTemplateForm: (Params) => {
        dispatch(design_Actions.GetTemplateForm(Params))
    },
    SaveWorkInfo: (SaveParams, peygir_id) => {
        dispatch(WorkActions_action.SaveWorkInfo(SaveParams, peygir_id))
    },
    RebuildWork: (Peygir_id) => {
        dispatch(WorkActions_action.RebuildWork(Peygir_id))
    },
    DeleteWork: (Peygir_id) => {
        dispatch(WorkActions_action.DeleteWork(Peygir_id))
    },
    InitConfirmWork: (Params) => {
        dispatch(WorkActions_action.InitConfirmWork(Params))
    },


});
ConfirmFlow.contextTypes = {
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


const connectedConfirmFlow = connect(mapStateToProps, mapDispatchToProps)(ConfirmFlow);
export { connectedConfirmFlow as ConfirmFlow };
