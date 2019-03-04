import React, {Component} from 'react';
import {connect} from "react-redux"
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {WorkBasic_action} from "../../_actions";
import PropTypes from "prop-types"
import {GridComponent} from "../Config/GridComponent";
import {ApiGridComponent} from "../Config/ApiGridComponent";

var currencyColumns = [];
var hiddenColumnNames = ["p_count"];
var booleanColumns = [];
var Params = {
    "page": 0,
    "pagesize": 10,
    "peygir_id": "0",
    "orderby": "id",
    "direction": "desc",
    "filter": []
};
class SelectFlowResultModal extends Component {
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
    SetSelectResultRowData=(row)=>{
        this.setState({
            row:row
        })
    }
    render() {  const columns = [
        {name: 'id', title: this.context.t("RowId")},
        {name: 'natije', title: this.context.t("Result")},
        {name: 'p_count', title: this.context.t("p_count")},

    ];
        const {modal, toggle, peygir_id,FlowResultListOnWork
            ,SelectFlowList_rows,SelectFlowList_totalCount,Successtoggle} = this.props;
        Params.peygir_id=peygir_id;
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
                    <Modal isOpen={modal} toggle={toggle}
                         >
                        <ModalHeader>{this.context.t("frm_Select_Project")}</ModalHeader>
                        <ModalBody>
                            <GridComponent columns={columns} booleanColumns={booleanColumns}
                                           rows={SelectFlowList_rows} totalCount={SelectFlowList_totalCount}
                                           UrlParams={Params} fetchData={FlowResultListOnWork.bind(this)}
                                           GetRowInfo={this.SetSelectResultRowData}
                                           currencyColumns={currencyColumns} hiddenColumnNames={hiddenColumnNames}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={Successtoggle.bind(this,this.state.row)}>{this.context.t("Select")}</Button>{' '}
                            <Button color="secondary" onClick={toggle}>{this.context.t("Cancel")}</Button>
                        </ModalFooter>
                    </Modal>
                </div>
                <style>{modalBackDrop}</style>

            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    FlowResultListOnWork: (Params) => {
        dispatch(WorkBasic_action.FlowResultListOnWork(Params))
    },
    SetSelectProjectRowData: (Params) => {
     //   dispatch(ProjectsInfo_action.SetSelectProjectRowData(Params))
    }
});
SelectFlowResultModal.contextTypes = {
    t: PropTypes.func.isRequired
}

function mapStateToProps(state) {

    const {alert} = state;
    const {loading} = state.loading;
    const {lang} = state.i18nState
    const {SelectFlowList_rows} = 
    state.Auto_WorkBasic!==null && state.Auto_WorkBasic!==undefined?
    state.Auto_WorkBasic.SelectFlowList_rows!=null && state.Auto_WorkBasic.SelectFlowList_rows!=undefined
    ?state.Auto_WorkBasic:[]:[];
    const {SelectFlowList_totalCount} = state.Auto_WorkBasic
    return {
        alert,
        loading,
        lang,
        SelectFlowList_rows,
        SelectFlowList_totalCount,
    };
}


const connectedSelectFlowResultModal = connect(mapStateToProps, mapDispatchToProps)(SelectFlowResultModal);
export {connectedSelectFlowResultModal as SelectFlowResultModal};
