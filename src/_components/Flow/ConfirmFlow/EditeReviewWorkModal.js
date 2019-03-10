import React, { Component } from 'react';
import { connect } from "react-redux"
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import PropTypes from "prop-types"
import { WorkActions_action, AutoBasicInfo_action } from "../../../_actions";
import { ComboSelectList } from "../../Basic/";

var SaveParams = { form: "", data: [] };

class EditeReviewWorkModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            EditReviewModal: false,
            ashkhasList: [],
            workerList: [],
            managerList: [],
            backdrop: "static",
            backdropClassName: "test",
            modalClass: "modal-dialog-centered modal-lg r-filter-modal"
        };

    }

    
    componentDidMount() {
        const { rowData, SelectWorkerList, SelectManagerList, SelectAshkhasList } = this.props;
        SelectWorkerList(0, rowData.wt_id)
        SelectManagerList(0, rowData.wt_id);
        SelectAshkhasList(rowData.id_tel);
    }
    changeHandle = (e, val) => {
        if (val !== undefined) {
            const { name } = e;
            SaveParams.data[[name]] = { [name]: val.value }
        }
        else {
            const { name, value } = e.target;
            SaveParams.data[[name]] = { [name]: value };
        }
    }

    render() {

        const { modal, rowData, toggle, SelectManagerList_rows, SelectWorkerList_rows, SelectAshkhasList_rows
        ,SuccesEditReviewWork } = this.props;
        let ashkhasSelectedOption = { value: rowData.ashkhas_id, label: rowData.ashkhasname }
        let workerSelectedOption = { value: rowData.worker_id, label: rowData.worker }
        let managerSelectedOption = { value: rowData.defmodir_id, label: rowData.modir }
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

                <div>
                    <Modal isOpen={modal} size="lg" >
                        <ModalHeader>{this.context.t("frm_Review_Confirm_Work")}</ModalHeader>
                        <ModalBody>
                            {rowData !== undefined && rowData != null &&
                                <div>
                                    <label>{this.context.t("WorkID")}: </label>
                                    <label>{rowData.peygir_id} </label>
                                    <br />
                                    <label>{this.context.t("FlowCode")}: </label>
                                    <label>{rowData.flow_code} </label>
                                    <br />

                                    <label>{this.context.t("CertificateName")}: </label>
                                    <label>{rowData.madrak_name} </label>
                                    <br />
                                    <label>{this.context.t("WorkID")}: </label>
                                    <label>{rowData.peygir_id} </label>
                                    <br />
                                    <label>{this.context.t("WorkType")}: </label>
                                    <label>{rowData.wtype} </label>
                                    <br />
                                    <label>{this.context.t("ActionDate")}: </label>
                                    <input type="text" name="tarikhaction" onChange={this.changeHandle.bind(this)} defaultValue={rowData.tarikhaction} />
                                    <br />
                                    <label>{this.context.t("DeadTime")}: </label>
                                    <input type="text" name="deadtime" onChange={this.changeHandle.bind(this)} defaultValue={rowData.deadtime} />
                                    <br />
                                    <label>{this.context.t("SuggestTime")}: </label>
                                    <input type="text" name="suggest_time" onChange={this.changeHandle.bind(this)} defaultValue={rowData.suggest_time} />
                                    <br />
                                    <label>{this.context.t("Description")}: </label>
                                    <textarea type="text" name="tozihat" onChange={this.changeHandle.bind(this)} defaultValue={rowData.tozihat}></textarea><br />

                                    <br />
                                    <label>{this.context.t("Subject")}: </label>
                                    <input type="text" name="mozo" onChange={this.changeHandle.bind(this)} defaultValue={rowData.mozo} />
                                    <br />
                                    <label>{this.context.t("worker")}: </label>
                                    {SelectWorkerList_rows !== undefined &&
                                        <ComboSelectList options={SelectWorkerList_rows} name="worker_id" onChange={this.changeHandle.bind(this)} selectedOption={workerSelectedOption} />
                                    }
                                    <label>{this.context.t("manager")}: </label>
                                    {SelectManagerList_rows !== undefined &&
                                        <ComboSelectList options={SelectManagerList_rows} name="defmodir_id" onChange={this.changeHandle.bind(this)} selectedOption={managerSelectedOption} />
                                    }
                                    <label>{this.context.t("Audience")}: </label>
                                    {SelectAshkhasList_rows !== undefined &&
                                        <ComboSelectList options={SelectAshkhasList_rows} name="ashkhas_id" onChange={this.changeHandle.bind(this)} selectedOption={ashkhasSelectedOption} />
                                    }

                                </div>
                            }
                        </ModalBody>
                        <ModalFooter>

                            <Button color="primary" onClick={SuccesEditReviewWork.bind(this,SaveParams)}>{this.context.t("Edit")}</Button>{' '}
                            <Button color="primary" onClick={toggle}>{this.context.t("Cancel")}</Button>{' '}
                        </ModalFooter>
                    </Modal>
                </div>
                <style>{modalBackDrop}</style>

            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({

    ConfirmReviewWork: (peygir_id) => {
        dispatch(WorkActions_action.ConfirmReviewWork(peygir_id))
    }, SelectManagerList: (id_role, wt_id) => {
        dispatch(AutoBasicInfo_action.SelectManagerList(id_role, wt_id))
    }, SelectWorkerList: (id_role, wt_id) => {
        dispatch(AutoBasicInfo_action.SelectWorkerList(id_role, wt_id))
    }, SelectAshkhasList: (id_taraf) => {
        dispatch(AutoBasicInfo_action.SelectAshkhasList(id_taraf))
    },
});
EditeReviewWorkModal.contextTypes = {
    t: PropTypes.func.isRequired
}

function mapStateToProps(state) {

    const { alert } = state;
    const { loading } = state.loading;
    const { lang } = state.i18nState

    const { SelectManagerList_rows, SelectWorkerList_rows, SelectAshkhasList_rows } = state.Auto_BasicInfo
    return {
        alert,
        loading,
        lang,
        SelectManagerList_rows,
        SelectWorkerList_rows,
        SelectAshkhasList_rows,
    };
}


const connectedEditeReviewWorkModal = connect(mapStateToProps, mapDispatchToProps)(EditeReviewWorkModal);
export { connectedEditeReviewWorkModal as EditeReviewWorkModal };
