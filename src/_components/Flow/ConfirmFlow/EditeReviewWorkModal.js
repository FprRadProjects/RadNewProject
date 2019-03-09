import React, { Component } from 'react';
import { connect } from "react-redux"
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import PropTypes from "prop-types"
import { GridComponent } from "../../Config/GridComponent";
import { WorkActions_action, WorkBasic_action } from "../../../_actions";

var currencyColumns = [];
var hiddenColumnNames = [];
var booleanColumns = [];
var Params = {
    "page": 0,
    "pagesize": 10,
    "peygir_id": "0",
    "orderby": "id",
    "direction": "desc",
    "filter": []
};
var FinalConfirmParams = { form: "", page: 1, pagesize: 10, filter: [], Results: [] };

class EditeReviewWorkModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            EditReviewModal: false,
            backdrop: "static",
            backdropClassName: "test",
            modalClass: "modal-dialog-centered modal-lg r-filter-modal"
        };

        this.SetReviewWorkRowData = this.SetReviewWorkRowData.bind(this);
        this.SuccesEditReviewWork = this.SuccesEditReviewWork.bind(this);
    }
    SetReviewWorkRowData = (row) => {
        this.setState({
            row: row
        })
    }
    SuccesEditReviewWork = (row, e) => {
        // if (undefined !== row) {
        const { peygir_id, ConfirmReviewWork } = this.props;
        ConfirmReviewWork(peygir_id);
        //}
    }

    render() {

        const { modal, rowData, toggle } = this.props;
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
                                    <label>{this.context.t("WorkType")}: </label>
                                    <label>{rowData.wtype} </label>
                                    <br />
                                    <label>{this.context.t("ActionDate")}: </label>
                                    <input type="text" defaultValue={rowData.tarikhaction}/>
                                    <br />
                                    <label>{this.context.t("DeadTime")}: </label>
                                    <input type="text" defaultValue={rowData.deadtime}/>
                                    <br />
                                    <label>{this.context.t("SuggestTime")}: </label>
                                    <input type="text" defaultValue={rowData.suggest_time}/>
                                    <br />
                                    <label>{this.context.t("Description")}: </label>
                                    <input type="text" defaultValue={rowData.tozihat}/>
                                    <br />
                                    <label>{this.context.t("Subject")}: </label>
                                    <input type="text" defaultValue={rowData.mozo}/>
                                    
                                </div>
                            }
                        </ModalBody>
                        <ModalFooter>

                            <Button color="primary" onClick={this.SuccesEditReviewWork.bind(this, this.state.row)}>{this.context.t("Edit")}</Button>{' '}
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
    },

});
EditeReviewWorkModal.contextTypes = {
    t: PropTypes.func.isRequired
}

function mapStateToProps(state) {

    const { alert } = state;
    const { loading } = state.loading;
    const { lang } = state.i18nState
    const { ReviewWorkList_rows } =
        state.Auto_WorkBasic !== null && state.Auto_WorkBasic !== undefined ?
            state.Auto_WorkBasic.ReviewWorkList_rows != null && state.Auto_WorkBasic.ReviewWorkList_rows != undefined
                ? state.Auto_WorkBasic : [] : [];
    const { ReviewWorkList_totalCount } = state.Auto_WorkBasic
    return {
        alert,
        loading,
        lang,
        ReviewWorkList_rows,
        ReviewWorkList_totalCount,
    };
}


const connectedEditeReviewWorkModal = connect(mapStateToProps, mapDispatchToProps)(EditeReviewWorkModal);
export { connectedEditeReviewWorkModal as EditeReviewWorkModal };
