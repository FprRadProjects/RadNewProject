import React, {Component} from 'react';
import {connect} from "react-redux"
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {AutoBasicInfo_action} from "../../_actions";
import PropTypes from "prop-types"
import {GridComponent} from "../Config/GridComponent";

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
            modalClass: "modal-dialog-centered r-modal"
        };

    }

    SetReferralToRowData=(row)=>{
        this.setState({
            row:row
        })
    }
    AddNewWorker=(row, e)=>{
        
    }
    render() {  
        const columns = [
        {name: 'id_user', title: this.context.t("RowId")},
        {name: 'username', title: this.context.t("worker")},

    ];
        const {modal, toggle, id_roleSelected,SelectWorkerGridList,SelectWorkerGridList_rows,
            worktypeSelected} = this.props;
            Params.wt_id=worktypeSelected;
            Params.id_role=id_roleSelected;
            
        return (
            <div>

               <div>
                    <Modal isOpen={modal} toggle={toggle}
                 
                 className={this.state.modalClass}
                         >
                        <ModalHeader>{this.context.t("frm_Text_Defaults")}</ModalHeader>
                        <ModalBody>
                            <GridComponent columns={columns} booleanColumns={booleanColumns}
                                           rows={SelectWorkerGridList_rows} totalCount={0}
                                           UrlParams={Params} fetchData={SelectWorkerGridList.bind(this)}
                                           GetRowInfo={this.SetReferralToRowData} columnwidth={235}
                                           currencyColumns={currencyColumns} hiddenColumnNames={hiddenColumnNames}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.AddNewWorker.bind(this,this.state.row)}>{this.context.t("Select")}</Button>{' '}
                            <Button color="secondary" onClick={toggle}>{this.context.t("Cancel")}</Button>
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

    const {alert} = state;
    const {loading} = state.loading;
    const {lang} = state.i18nState
    const {SelectWorkerGridList_rows} = state.Auto_BasicInfo
    return {
        alert,
        loading,
        lang,
        SelectWorkerGridList_rows
    };
}


const connectedReferralToModal = connect(mapStateToProps, mapDispatchToProps)(ReferralToModal);
export {connectedReferralToModal as ReferralToModal};
