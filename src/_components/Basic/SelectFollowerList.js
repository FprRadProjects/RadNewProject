import React, {Component} from 'react';
import {connect} from "react-redux"
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {AutoBasicInfo_action} from "../../_actions";
import PropTypes from "prop-types"
import {ApiModalGridComponent} from "../Frameworks";
var currencyColumns = [];
var hiddenColumnNames = ['showtree_id','flow'];
var booleanColumns = [];
var FollowerGridParams = {
    "page": 0,
    "pagesize": 10,
    "orderby": "tarikhaction",
    "direction": "desc",
    "id_tel":0,
    "filter": [],
    "filtertype": " AND "
};

class SelectFollowerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            modal: false,
            modalClass: "modal-dialog-centered modal-xl r-modal r-newwork-modal"
        };

    }
    SetSelectFollowerRowData=(row)=>{
        this.setState({
            row:row
        })
    }
    render() {  const columns = [
        {name: 'peygir_id', title: this.context.t("WorkID")},
        {name: 'id_taraf', title: this.context.t("PartyAccountID")},
        {name: 'wtype', title: this.context.t("WorkType")},
        {name: 'taraf_name', title: this.context.t("PartyAccountName")},
        {name: 'coname', title: this.context.t("CompanyName")},
        {name: 'nos_id', title: this.context.t("Serial")},
        {name: 'mozo', title: this.context.t("Subject")},
        {name: 'tarikhaction', title: this.context.t("ActionDate")},
        {name: 'shomare', title: this.context.t("FileNumber")},
        {name: 'code', title: this.context.t("Code")},
        {name: 'Audience', title: this.context.t("Signatory")},
        {name: 'zam', title: this.context.t("Attachments")},
        {name: 'ptype', title: this.context.t("Project")},
        {name: 'c_date', title: this.context.t("CreatedDate")},
        {name: 'c_time', title: this.context.t("CreatedTime")},
        {name: 'tarikh', title: this.context.t("DoneDate")},
        {name: 'flow', title: this.context.t("Flow")},
        {name: 'showtree_id', title: this.context.t("LeadID")},

    ];
 
        const {GetSelectFollowerList,modal, toggle,id_tel
            ,SelectFollowerList_rows,SelectFollowerList_totalCount,Successtoggle} = this.props;
            FollowerGridParams.id_tel=id_tel;
       
        return (
            <div>

               <div>
                    <Modal isOpen={modal} toggle={toggle}
                 
                 className={this.state.modalClass}
                         >
                        <ModalHeader>{this.context.t("frm_Follower_list")}</ModalHeader>
                        <ModalBody>
                        <ApiModalGridComponent columns={columns} booleanColumns={booleanColumns}
                                          rows={SelectFollowerList_rows} totalCount={SelectFollowerList_totalCount} columnwidth={135}
                                          rowId="peygir_id"  
                                          UrlParams={FollowerGridParams} fetchData={GetSelectFollowerList.bind(this)} SelectRow ={this.SetSelectFollowerRowData.bind(this)}
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
    GetSelectFollowerList: (Params) => {
        dispatch(AutoBasicInfo_action.SelectFollowerList(Params))
    }
});
SelectFollowerList.contextTypes = {
    t: PropTypes.func.isRequired
}

function mapStateToProps(state) {

    const {alert} = state;
    const {loading} = state.loading;
    const {lang} = state.i18nState
    const {SelectFollowerList_totalCount} = state.Auto_BasicInfo;
    const {SelectFollowerList_rows} = state.Auto_BasicInfo
    return {
        alert,
        loading,
        lang,
        SelectFollowerList_totalCount,
        SelectFollowerList_rows,
    };
}


const connectedSelectFollowerList = connect(mapStateToProps, mapDispatchToProps)(SelectFollowerList);
export {connectedSelectFollowerList as SelectFollowerList};
