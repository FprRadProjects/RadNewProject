import React, { Component } from 'react';
import { connect } from "react-redux"
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { AutoBasicInfo_action } from "../../_actions";
import PropTypes from "prop-types"
import { GridComponent, MultiSelectGridComponent } from "../Config";
import { toast } from 'react-toastify';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
var currencyColumns = [];
var hiddenColumnNames = [];
var booleanColumns = [];
var Params = {
    "page": 0,
    "pagesize": 10,
    "id_role": 0,
    "wt_id": 0,
    "orderby": "id_user",
    "direction": "desc",
    "filter": []
};
class ReferralToModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            modal: false,
            SelectedWorkerRows: [],
            modalClass: "modal-dialog-centered modal-xl r-modal r-referral-modal"
        };

    }

    SetReferralToRowData = (row) => {
        this.setState({
            row: row
        });

    }
    GetSelectedReferral = (row) => {
        this.setState({
            addrow: row
        });

    }
    DeleteOne = (row) => {
        console.log(row)
        if (row !== undefined && row !== null) {
            confirmAlert({
                title: this.context.t("Delete"),
                message: this.context.t("AreSureOperations"),
                buttons: [
                    {
                        label: this.context.t("Yes"),
                        onClick: () => {
                            var SelectedWorkerRows = this.state.SelectedWorkerRows.filter(function (item) { return item.id_user != row.id_user });
                            this.setState({ SelectedWorkerRows: SelectedWorkerRows });
                        }
                    },
                    {
                        label: this.context.t("No"),
                    }
                ]
            });
        }
        else
            toast.warn(this.context.t("msg_No_Select_Row"));
    }
    DeleteAll = () => {
        if (this.state.SelectedWorkerRows.length === 0) {
            toast.warn(this.context.t("NoData"));
            return;
        }
        confirmAlert({
            title: this.context.t("Delete"),
            message: this.context.t("AreSureOperations"),
            buttons: [
                {
                    label: this.context.t("Yes"),
                    onClick: () => { this.setState({ SelectedWorkerRows: [] });
                    this.setState({ addrow: null });
                }
                },
                {
                    label: this.context.t("No"),
                }
            ]
        });
    }
    AddNewWorkers = (row, e) => {
        if (row === undefined || row === null)
            return;
        var array3 = [...this.state.SelectedWorkerRows, ...row];
        var SelectedWorkerRows = array3.filter((array3, index, self) =>
            index === self.findIndex((t) => (t.id_user === array3.id_user)))
        this.setState({
            SelectedWorkerRows: SelectedWorkerRows
        })
    }
    render() {
        const columns = [
            { name: 'id_user', title: this.context.t("RowId") },
            { name: 'username', title: this.context.t("worker") },
            { name: 'rolename', title: this.context.t("Roll") },

        ];
        const { modal, ConfirmWorkers, id_roleSelected, SelectWorkerGridList, SelectWorkerGridList_rows,
            worktypeSelected } = this.props;
        Params.wt_id = worktypeSelected;
        Params.id_role = id_roleSelected;

        return (
            <div>

                <div>
                    <Modal isOpen={modal} 

                        className={this.state.modalClass}
                    >
                        <ModalHeader>{this.context.t("frm_Text_Defaults")}</ModalHeader>
                        <ModalBody>
                            <Button color="primary" onClick={this.AddNewWorkers.bind(this, this.state.row)}>{this.context.t("Select")}</Button>{' '}
                            <MultiSelectGridComponent columns={columns} booleanColumns={booleanColumns}
                                rows={SelectWorkerGridList_rows} totalCount={0}
                                UrlParams={Params} fetchData={SelectWorkerGridList.bind(this)}
                                GetRowInfo={this.SetReferralToRowData} columnwidth={150}
                                rowId="id_user"
                                currencyColumns={currencyColumns} hiddenColumnNames={hiddenColumnNames}
                            />
                            <GridComponent columns={columns} booleanColumns={booleanColumns}
                                rows={this.state.SelectedWorkerRows} totalCount={0}
                                UrlParams={Params}
                                GetRowInfo={this.GetSelectedReferral.bind(this)} columnwidth={150}
                                currencyColumns={currencyColumns} hiddenColumnNames={hiddenColumnNames}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.DeleteOne.bind(this, this.state.addrow)}>{this.context.t("Delete")}</Button>
                            <Button color="secondary" onClick={this.DeleteAll.bind(this)}>{this.context.t("DeleteAll")}</Button>
                            <Button color="secondary" onClick={ConfirmWorkers.bind(this, this.state.SelectedWorkerRows)}>{this.context.t("ConfirmAndClose")}</Button>
                        </ModalFooter>
                    </Modal>
                </div>

            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    SelectWorkerGridList: (Params) => {
        dispatch(AutoBasicInfo_action.SelectWorkerGridList(Params))
    }
});
ReferralToModal.contextTypes = {
    t: PropTypes.func.isRequired
}

function mapStateToProps(state) {

    const { alert } = state;
    const { loading } = state.loading;
    const { lang } = state.i18nState
    const { SelectWorkerGridList_rows } = state.Auto_BasicInfo
    return {
        alert,
        loading,
        lang,
        SelectWorkerGridList_rows
    };
}


const connectedReferralToModal = connect(mapStateToProps, mapDispatchToProps)(ReferralToModal);
export { connectedReferralToModal as ReferralToModal };
