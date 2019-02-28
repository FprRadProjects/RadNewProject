import React, {Component} from 'react';
import {connect} from "react-redux"
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {design_Actions} from "../../../_actions/Design";
import PropTypes from "prop-types"
import {SelectProjectModal} from "../../Project/";

class ReferenceViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            modal: false,
            ProjectSelectmodal: false,
            backdrop: "static",
            modalClass: "modal-dialog-centered modal-lg r-filter-modal"
        };

        this.toggleSelectProject = this.toggleSelectProject.bind(this);
    }

    toggleSelectProject() {
        this.setState({
            ProjectSelectmodal: !this.state.ProjectSelectmodal,
        });
    }

    render() {
        const {modal, toggle, WorkInfo} = this.props;
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
                    <ModalHeader toggle={toggle}></ModalHeader>
                    <ModalBody>
                        {WorkInfo !== undefined && <div>
                            <label>{this.context.t("WorkID")}: </label>
                            <input type="text" disabled={true} defaultValue={WorkInfo.peygir_id}/><br/>
                            <label>{this.context.t("PartyAccountName")}: </label>
                            <input type="text" disabled={true} defaultValue={WorkInfo.name}/><br/>
                            <label>{this.context.t("CompanyName")}: </label>
                            <input type="text" disabled={true} defaultValue={WorkInfo.coname}/><br/>
                            <label>{this.context.t("Flow")}: </label>
                            <input type="text" disabled={true} defaultValue={WorkInfo.flow}/><br/>
                            <label>{this.context.t("WorkType")}: </label>
                            <input type="text" disabled={true} defaultValue={WorkInfo.wtype}/><br/>
                            <label>{this.context.t("creator")}: </label>
                            <input type="text" disabled={true} defaultValue={WorkInfo.cuser}/>
                            <input type="text" disabled={true} defaultValue={WorkInfo.c_date}/>
                            <input type="text" disabled={true} defaultValue={WorkInfo.c_time}/><br/>
                            <label>{this.context.t("Audience")}: </label>
                            <input type="text" disabled={true} defaultValue={WorkInfo.ashkhas}/><br/>
                            <label>{this.context.t("Description")}: </label>
                            <textarea type="text" disabled={true} defaultValue={WorkInfo.tozihat}></textarea><br/>
                            <label>{this.context.t("FileNumber")}: </label>
                            <input type="text" defaultValue={WorkInfo.shomare}/><br/>
                            <label>{this.context.t("Code")}: </label>
                            <input type="text" defaultValue={WorkInfo.code}/><br/>
                            <label>{this.context.t("Subject")}: </label>
                            <input type="text" defaultValue={WorkInfo.mozo}/><br/>
                            <label>{this.context.t("Project")}: </label>
                            <Button color="success"
                                    onClick={this.toggleSelectProject.bind(this)}>{this.context.t("SelectPopup")}</Button>
                            <input type="text" defaultValue={WorkInfo.ptype}/><br/>
                            <label>{this.context.t("Duration_Of_Work_Short")}: </label>
                            <input type="text" defaultValue={WorkInfo.modat_anjam_w}/><br/>
                            <label>{this.context.t("Result")}: </label>
                            <textarea type="text" disabled={true} defaultValue={WorkInfo.natije}></textarea><br/>

                            {this.state.ProjectSelectmodal && <SelectProjectModal modal={this.state.ProjectSelectmodal}
                                                                                  toggle={this.toggleSelectProject.bind(this)}
                                                                                  id_tel={WorkInfo.id_tel}/>}
                        </div>}
                        <style>{modalBackDrop}</style>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={toggle}></Button>
                    </ModalFooter>
                </Modal>

            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    GetTemplateForm: (Params) => {
        dispatch(design_Actions.GetTemplateForm(Params))
    }
});
ReferenceViewer.contextTypes = {
    t: PropTypes.func.isRequired
}

function mapStateToProps(state) {

    const {alert} = state;
    const {loading} = state.loading;
    const {lang} = state.i18nState
    const {GridRowData} = state.BasicInfo
    return {
        alert,
        loading,
        lang,
    };
}


const connectedReferenceViewer = connect(mapStateToProps, mapDispatchToProps)(ReferenceViewer);
export {connectedReferenceViewer as ReferenceViewer};
