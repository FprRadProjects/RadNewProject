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

class ReviewWorkModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            modal: false,
            backdrop: "static",
            backdropClassName: "test",
            modalClass: "modal-dialog-centered modal-lg r-filter-modal"
        };

    }
    SetSelectResultRowData = (row) => {
        this.setState({
            row: row
        })
    }
    SuccesSelectFlowResult = (row, e) => {
        if (undefined !== row) {
            const { peygir_id, FinalFlowConfirmWork } = this.props;
            FinalConfirmParams["peygir_id"] = peygir_id;
            FinalConfirmParams["Results"] = [row.id];
            FinalFlowConfirmWork(FinalConfirmParams);
        }
    }
    render() {
        const columns = [
            { name: 'peygir_id', title: this.context.t("RowId") },
            { name: 'tarikhaction', title: this.context.t("ActionDate") },
            { name: 'worker', title: this.context.t("worker") },
            { name: 'modir', title: this.context.t("manager") },
            { name: 'deadtime', title: this.context.t("DeadTime") },
            { name: 'suggest_time', title: this.context.t("SuggestTime") },
            { name: 'tozihat', title: this.context.t("Description") },
            { name: 'flow_code', title: this.context.t("FlowCode") },
            { name: 'madrak_name', title: this.context.t("CertificateName") },
            { name: 'ashkhasname', title: this.context.t("Audience") },
            { name: 'mozo', title: this.context.t("Subject") },

        ];
        const { modal, toggle, peygir_id, FlowResultListOnWork
            , ReviewWorkList_rows, ReviewWorkList_totalCount } = this.props;
        Params.peygir_id = peygir_id;
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
                    <Modal isOpen={modal}  size="lg" >
                        <ModalHeader>{this.context.t("frm_Review_Confirm_Work")}</ModalHeader>
                        <ModalBody>
                            <GridComponent columns={columns} booleanColumns={booleanColumns}
                                rows={ReviewWorkList_rows} totalCount={ReviewWorkList_totalCount}
                                UrlParams={Params} 
                                GetRowInfo={this.SetSelectResultRowData} columnwidth={150}
                                currencyColumns={currencyColumns} hiddenColumnNames={hiddenColumnNames}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.SuccesSelectFlowResult.bind(this, this.state.row)}>{this.context.t("ConfirmAndClose")}</Button>{' '}
                        </ModalFooter>
                    </Modal>
                </div>
                <style>{modalBackDrop}</style>

            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    
    FinalFlowConfirmWork: (Params) => {
        dispatch(WorkActions_action.FinalFlowConfirmWork(Params))
    },

});
ReviewWorkModal.contextTypes = {
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


const connectedReviewWorkModal = connect(mapStateToProps, mapDispatchToProps)(ReviewWorkModal);
export { connectedReviewWorkModal as ReviewWorkModal };
