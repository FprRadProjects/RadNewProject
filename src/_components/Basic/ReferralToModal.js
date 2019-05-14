import React, { Component } from 'react';
import { connect } from "react-redux"
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { AutoBasicInfo_action } from "../../_actions";
import PropTypes from "prop-types"
import { GridComponent, MultiSelectGridComponent } from "../Frameworks";
import { toast } from 'react-toastify';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
var currencyColumns = [];
var hiddenColumnNames = ['id_user'];
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
            modalClass: "modal-dialog-centered modal-lg r-modal"
        };

    }
    componentDidMount() {
        const { SelectedWorkers } = this.props;
        if (SelectedWorkers.length > 0)
            this.setState({ SelectedWorkerRows: SelectedWorkers })

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
        if (row !== undefined && row !== null) {
            var SelectedWorkerRows = this.state.SelectedWorkerRows.filter(function (item) { return item.id_user != row.id_user });
            this.setState({ SelectedWorkerRows: SelectedWorkerRows });
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
                    onClick: () => {
                        this.setState({ SelectedWorkerRows: [] });
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
        const { modal, ConfirmWorkers,  SelectWorkerGridList, SelectWorkerGridList_rows,
            worktypeSelected } = this.props;
        Params.wt_id = worktypeSelected;
        console.log(Params)
        return (
            <Modal isOpen={modal}
                className={this.state.modalClass}>
                <ModalHeader>{this.context.t("ReferralTo")}</ModalHeader>
                <ModalBody>
                    <div className="referral-to-modal">
                        <div className="row ">
                            <div className="col-6 ">
                                <Button color="primary" className="mb-2 mr-2" onClick={this.AddNewWorkers.bind(this, this.state.row)}>{this.context.t("Select")}</Button>{' '}

                                <MultiSelectGridComponent columns={columns} booleanColumns={booleanColumns}
                                    rows={SelectWorkerGridList_rows} totalCount={0}
                                    UrlParams={Params} fetchData={SelectWorkerGridList.bind(this)}
                                    GetRowInfo={this.SetReferralToRowData} columnwidth={141}
                                    rowId="id_user"
                                    currencyColumns={currencyColumns} hiddenColumnNames={hiddenColumnNames}
                                />
                            </div>
                            <div className="col-6 ">
                                <Button color="danger" className="mb-2 mr-2" onClick={this.DeleteOne.bind(this, this.state.addrow)}>{this.context.t("Delete")}</Button>
                                <Button color="danger" className="mb-2 mr-2" onClick={this.DeleteAll.bind(this)}>{this.context.t("DeleteAll")}</Button>
                                <Button color="secondary" className="mb-2 mr-2" onClick={ConfirmWorkers.bind(this, this.state.SelectedWorkerRows)}>{this.context.t("ConfirmAndClose")}</Button>
                                <GridComponent columns={columns} booleanColumns={booleanColumns}
                                    rows={this.state.SelectedWorkerRows} totalCount={0}
                                    UrlParams={Params}
                                    GetRowInfo={this.GetSelectedReferral.bind(this)} columnwidth={154}
                                    currencyColumns={currencyColumns} hiddenColumnNames={hiddenColumnNames}
                                />
                            </div>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
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
