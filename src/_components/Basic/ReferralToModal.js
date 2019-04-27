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
    AddNewWorker=(row, e)=>{}
    render() {  const columns = [
        {name: 'id', title: this.context.t("RowId")},
        {name: 'sharh', title: this.context.t("Description")},

    ];
        const {modal, toggle, id_tel,GetDefaultText
            ,ReferralTo_rows,ReferralTo_totalCount,Successtoggle} = this.props;
        Params.Id_Taraf=id_tel;
       
        return (
            <div>

               <div>
                    <Modal isOpen={modal} toggle={toggle}
                 
                 className={this.state.modalClass}
                         >
                        <ModalHeader>{this.context.t("frm_Text_Defaults")}</ModalHeader>
                        <ModalBody>
                            <GridComponent columns={columns} booleanColumns={booleanColumns}
                                           rows={ReferralTo_rows} totalCount={ReferralTo_totalCount}
                                           UrlParams={Params} fetchData={GetDefaultText.bind(this)}
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
    GetDefaultText: (Params) => {
        dispatch(AutoBasicInfo_action.GetDefaultText(Params))
    }
});
ReferralToModal.contextTypes = {
    t: PropTypes.func.isRequired
}

function mapStateToProps(state) {

    const {alert} = state;
    const {loading} = state.loading;
    const {lang} = state.i18nState
    const {ReferralTo_totalCount} = state.Auto_BasicInfo;
    const {ReferralTo_rows} = state.Auto_BasicInfo
    return {
        alert,
        loading,
        lang,
        ReferralTo_totalCount,
        ReferralTo_rows,
    };
}


const connectedReferralToModal = connect(mapStateToProps, mapDispatchToProps)(ReferralToModal);
export {connectedReferralToModal as ReferralToModal};
