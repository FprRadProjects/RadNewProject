import React, { Component } from 'react';
import { connect } from "react-redux"
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import PropTypes from "prop-types"
import { GridComponent } from "../../Frameworks";
import { toast } from 'react-toastify';

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
        const { modal} = this.props;
    
        this.state = {
            ...this.state,
            FlowResultSelectmodal: modal,
            modalClass: "modal-dialog-centered r-modal"
        };

        this.SetSelectResultRowData = this.SetSelectResultRowData.bind(this);
        this.SetSelectResultRowData = this.SetSelectResultRowData.bind(this);
    }
    SetSelectResultRowData = (row) => {
        this.setState({
            row: row
        })
    }
    componentWillReceiveProps(nextProps){
        this.setState({FlowResultSelectmodal:nextProps.modal });
    }
    render() {
        const columns = [
            { name: 'id', title: this.context.t("RowId") },
            { name: 'natije', title: this.context.t("Result") },
            { name: 'p_count', title: this.context.t("p_count") },

        ];
        const {  toggle, peygir_id
            , SelectFlowResultList_rows, SelectFlowResultList_totalCount,
            SuccesSelectFlowResult } = this.props;
        Params.peygir_id = peygir_id;
        
        return (
            <div>

                <div>
                    <Modal isOpen={this.state.FlowResultSelectmodal} toggle={toggle}
                    className={this.state.modalClass}
                    >
                        <ModalHeader>{this.context.t("frm_Flow_Results")}</ModalHeader>
                        <ModalBody>
                            <GridComponent columns={columns} booleanColumns={booleanColumns}
                                rows={SelectFlowResultList_rows} totalCount={SelectFlowResultList_totalCount}
                                rowId="id"
                                UrlParams={Params} 
                                GetRowInfo={this.SetSelectResultRowData} columnwidth={235}
                                currencyColumns={currencyColumns} hiddenColumnNames={hiddenColumnNames}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={SuccesSelectFlowResult.bind(this, this.state.row)}>{this.context.t("Select")}</Button>{' '}
                            <Button color="secondary" onClick={toggle}>{this.context.t("Cancel")}</Button>
                        </ModalFooter>
                    </Modal>
                </div>

            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({

 
});
SelectFlowResultModal.contextTypes = {
    t: PropTypes.func.isRequired
}

function mapStateToProps(state) {

    const { alert } = state;
    const { loading } = state.loading;
    const { lang } = state.i18nState
    const { SelectFlowResultList_rows } =
        state.Auto_WorkBasic !== null && state.Auto_WorkBasic !== undefined ?
            state.Auto_WorkBasic.SelectFlowResultList_rows != null && state.Auto_WorkBasic.SelectFlowResultList_rows != undefined
                ? state.Auto_WorkBasic : [] : [];
    const { SelectFlowResultList_totalCount } = state.Auto_WorkBasic
    return {
        alert,
        loading,
        lang,
        SelectFlowResultList_rows,
        SelectFlowResultList_totalCount,
    };
}


const connectedSelectFlowResultModal = connect(mapStateToProps, mapDispatchToProps)(SelectFlowResultModal);
export { connectedSelectFlowResultModal as SelectFlowResultModal };
