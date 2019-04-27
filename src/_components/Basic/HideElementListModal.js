import React, { Component } from 'react';
import { connect } from "react-redux"
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { design_Actions } from "../../_actions";
import PropTypes from "prop-types"
import { GridComponent } from "../Config/GridComponent";
import { toast } from 'react-toastify';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

var currencyColumns = [];
var hiddenColumnNames = [];
var booleanColumns = ["IsPublic"];
var Params = {
    "page": 0,
    "pagesize": 10,
    "FormId": "0",
    "orderby": "id",
    "direction": "desc",
    "filter": []
};
class HideElementListModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            backdrop: "static",
            modal: false,
            modalClass: "modal-dialog-centered  r-modal"
        };

    }

    SetSelectHideRowData = (row) => {
        this.setState({
            row: row
        })
    }
    DeleteRow = () => {
        const { FormId, Delete_HideElements_Template, GetHideElementsList } = this.props;
        let row = this.state.row;
        if (row !== undefined) {
            confirmAlert({
                title: this.context.t("Return_Control_To_Page"),
                message: this.context.t("AreSureOperations"),
                buttons: [
                    {
                        label:this.context.t("Yes"),
                        onClick: () => {
                            Delete_HideElements_Template(FormId, row.Id).then(data => {
                                if (data.status) {
                                    GetHideElementsList(Params);
                                }
                            });
                        }
                    },
                    {
                        label: this.context.t("No"),
                        // onClick: () => alert('Click No')
                    }
                ]
            });
        }
        else
            toast.warn(this.context.t("msg_No_Select_Row"));
    }

    render() {
        const columns = [
            { name: 'Id', title: this.context.t("RowId") },
            { name: 'Description', title: this.context.t("Description") },
            { name: 'IsPublic', title: this.context.t("IsPublic") },
        ];
        const { modal, toggle, GetHideElementsList, SelectHideElements_rows, FormId } = this.props;
        Params.FormId = FormId;
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
                    <Modal isOpen={modal} toggle={toggle} backdrop={this.state.backdrop} className={this.state.modalClass} >
                        <ModalHeader>{this.context.t("frm_HideElements_Template")}</ModalHeader>
                        <ModalBody>
                            <GridComponent columns={columns} booleanColumns={booleanColumns}
                                rows={SelectHideElements_rows} totalCount={0}
                                UrlParams={Params} fetchData={GetHideElementsList.bind(this)}
                                GetRowInfo={this.SetSelectHideRowData} columnwidth={155}
                                currencyColumns={currencyColumns} hiddenColumnNames={hiddenColumnNames}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.DeleteRow.bind(this)}>{this.context.t("Delete")}</Button>{' '}
                            <Button color="secondary" onClick={toggle}>{this.context.t("Cancel")}</Button>
                        </ModalFooter>
                    </Modal>
                    <style>{modalBackDrop}</style>
                </div>

            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    GetHideElementsList: (Params) => {
        dispatch(design_Actions.GetHideElementsList(Params))
    }
    ,
    Delete_HideElements_Template: (rowId, FormId) => {
        return dispatch(design_Actions.Delete_HideElements_Template(rowId, FormId))
    }
});
HideElementListModal.contextTypes = {
    t: PropTypes.func.isRequired
}

function mapStateToProps(state) {

    const { alert } = state;
    const { loading } = state.loading;
    const { lang } = state.i18nState
    const { SelectHideElements_rows } = state.Design;
    return {
        alert,
        loading,
        lang,
        SelectHideElements_rows,
    };
}

const connectedHideElementListModal = connect(mapStateToProps, mapDispatchToProps)(HideElementListModal);
export { connectedHideElementListModal as HideElementListModal };
