import React, {Component} from 'react';
import {connect} from "react-redux"
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {AutoBasicInfo_action} from "../../_actions";
import PropTypes from "prop-types"
import {ApiModalGridComponent} from "../Config/ApiModalGridComponent";
var currencyColumns = [];
var hiddenColumnNames = ['tel1','fax','add1','email','www','mokh_mob','vaziyat',];
var booleanColumns = [];
var FileAudienceParams = {
    "page": 0,
    "pagesize": 10,
    "orderby": "id_taraf",
    "direction": "desc",
    "filter": []
};

class SelectFileAudienceList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            modal: false,
            modalClass: "modal-dialog-centered modal-xl r-modal r-newwork-modal"
        };

    }
    SetSelectFileAudienceRowData=(row)=>{
        this.setState({
            row:row
        })
    }
    render() {  const columns = [
        {name: 'id_taraf', title: this.context.t("RowId")},
        {name: 'mokhatab_name', title: this.context.t("Audience")},
        {name: 'name', title: this.context.t("PartyAccountName")},
        {name: 'coname', title: this.context.t("CompanyName")},
        {name: 'tel1', title: this.context.t("Tel1")},
        {name: 'fax', title: this.context.t("Fax")},
        {name: 'add1', title: this.context.t("Address1")},
        {name: 'email', title: this.context.t("Email")},
        {name: 'www', title: this.context.t("WebSite")},
        {name: 'goroh_taraf', title: this.context.t("PartyAccountGroup")},
        {name: 'typ_taraf', title: this.context.t("PartyAccountType")},
        {name: 'jobname', title: this.context.t("Activity")},
        {name: 'ostan', title: this.context.t("State")},
        {name: 'vaziyat', title: this.context.t("Status")},
        {name: 'mokh_mob', title: this.context.t("AudienceMobile")},
        {name: 'mokh_tel', title: this.context.t("AudienceTel")},

    ];
 
        const {GetSelectFileAudienceList,modal, toggle
            ,SelectFileAudience_rows,SelectFileAudience_totalCount,Successtoggle} = this.props;
       
        return (
            <div>

               <div>
                    <Modal isOpen={modal} toggle={toggle}
                 
                 className={this.state.modalClass}
                         >
                        <ModalHeader>{this.context.t("frm_File_Audience")}</ModalHeader>
                        <ModalBody>
                        <ApiModalGridComponent columns={columns} booleanColumns={booleanColumns}
                                          rows={SelectFileAudience_rows} totalCount={SelectFileAudience_totalCount} columnwidth={135}
                                          UrlParams={FileAudienceParams} fetchData={GetSelectFileAudienceList.bind(this)} SelectRow ={this.SetSelectFileAudienceRowData.bind(this)}
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
    GetSelectFileAudienceList: (Params) => {
        dispatch(AutoBasicInfo_action.SelectFileAudienceList(Params))
    }
});
SelectFileAudienceList.contextTypes = {
    t: PropTypes.func.isRequired
}

function mapStateToProps(state) {

    const {alert} = state;
    const {loading} = state.loading;
    const {lang} = state.i18nState
    const {SelectFileAudience_totalCount} = state.Auto_BasicInfo;
    const {SelectFileAudience_rows} = state.Auto_BasicInfo
    return {
        alert,
        loading,
        lang,
        SelectFileAudience_totalCount,
        SelectFileAudience_rows,
    };
}


const connectedSelectFileAudienceList = connect(mapStateToProps, mapDispatchToProps)(SelectFileAudienceList);
export {connectedSelectFileAudienceList as SelectFileAudienceList};
