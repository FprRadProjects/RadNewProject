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
    "Id_Taraf": "0",
    "orderby": "id",
    "direction": "desc",
    "filter": []
};
class SelectDefaultTextModal extends Component {
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

    render() {  const columns = [
        {name: 'id', title: this.context.t("RowId")},
        {name: 'sharh', title: this.context.t("Description")},

    ];
        const {modal, toggle, id_tel,GetDefaultText,SetSelectDefaultTextRowData
            ,SelectDefaultText_rows,SelectDefaultText_totalCount,Successtoggle} = this.props;
        Params.Id_Taraf=id_tel;
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
                                           rows={SelectDefaultText_rows} totalCount={SelectDefaultText_totalCount}
                                           UrlParams={Params} fetchData={GetDefaultText.bind(this)}
                                           GetRowInfo={SetSelectDefaultTextRowData}
                                           currencyColumns={currencyColumns} hiddenColumnNames={hiddenColumnNames}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={Successtoggle}>{this.context.t("Select")}</Button>{' '}
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
    GetDefaultText: (Params) => {
        dispatch(AutoBasicInfo_action.GetDefaultText(Params))
    },
    SetSelectDefaultTextRowData: (Data) => {
        dispatch(AutoBasicInfo_action.SetSelectDefaultTextRowData(Data))
    }
});
SelectDefaultTextModal.contextTypes = {
    t: PropTypes.func.isRequired
}

function mapStateToProps(state) {

    const {alert} = state;
    const {loading} = state.loading;
    const {lang} = state.i18nState
    const {SelectDefaultText_totalCount} = state.Auto_BasicInfo;
    const {SelectDefaultText_rows} = state.Auto_BasicInfo
    return {
        alert,
        loading,
        lang,
        SelectDefaultText_totalCount,
        SelectDefaultText_rows,
    };
}


const connectedSelectDefaultTextModal = connect(mapStateToProps, mapDispatchToProps)(SelectDefaultTextModal);
export {connectedSelectDefaultTextModal as SelectDefaultTextModal};
