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
            modalClass: "modal-dialog-centered r-modal"
        };

    }

    SetSelectDefaultTextRowData=(row)=>{
        this.setState({
            row:row
        })
    }
    render() {  const columns = [
        {name: 'id', title: this.context.t("RowId")},
        {name: 'sharh', title: this.context.t("Description")},

    ];
        const {modal, toggle, id_tel,GetDefaultText
            ,SelectDefaultText_rows,SelectDefaultText_totalCount,Successtoggle} = this.props;
       
        return (
            <div>

               <div>
                    <Modal isOpen={modal} toggle={toggle}
                 
                 className={this.state.modalClass}
                         >
                        <ModalHeader>{this.context.t("frm_Text_Defaults")}</ModalHeader>
                        <ModalBody>
                            <GridComponent columns={columns} booleanColumns={booleanColumns}
                                           rows={SelectDefaultText_rows} totalCount={SelectDefaultText_totalCount}
                                           UrlParams={Params} fetchData={GetDefaultText.bind(this)}
                                           GetRowInfo={this.SetSelectDefaultTextRowData} columnwidth={235}
                                           currencyColumns={currencyColumns} hiddenColumnNames={hiddenColumnNames}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={Successtoggle.bind(this,this.state.row)}>{this.context.t("Select")}</Button>{' '}
                            <Button color="secondary" onClick={toggle}>{this.context.t("Cancel")}</Button>
                        </ModalFooter>
                    </Modal>
                </div>

            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    GetDefaultText: (Params) => {
        dispatch(AutoBasicInfo_action.GetDefaultText(Params))
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
