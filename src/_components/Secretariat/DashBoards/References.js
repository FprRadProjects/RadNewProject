import React, { Component } from 'react';
import { connect } from "react-redux"
import {
    Act_Reference,
    design_Actions,
    WorkBasic_action,
    BasicInfo_action, WorkActions_action
} from "../../../_actions";
import { ApiGridComponent } from "../../Frameworks";
import { RadioFilter } from "./RadioFilter";
import PropTypes from "prop-types"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FormInfo } from "../../../locales";
import { RibbonReferences } from '../Ribbon/Ribbon.References';

var currencyColumns = [];
var hiddenColumnNames = ['done', 'id_tel', 'olaviyat', 'cuser',
    'c_date', 'tarikh', 'fok', 'mtarikh', 'see_date', 'fok', 'c_time', 'wt_id',
    'suggest_time', 'sm_zaman_anjam_kar', 'see_time', 'saat', 'fsaat', 'proje_nos_id',
    'p_proje_nose_id', 'showtree_id', 'muser', 'proje_code', 'natije'];
var booleanColumns = ['done', 'has_peyvast', 'done', 'fok'];

var Params = {
    "page": 0,
    "pagesize": 10,
    "mark": "0",
    "seen": "2",
    "done": "0",
    "date": "0",
    "calendar": "",
    "worker": "0",
    "orderby": "tarikhaction",
    "direction": "desc",
    "Form": "",
    "filter": []

};

class References extends Component {

    constructor(props) {

        super(props);
        this.state = {
            ...this.state,
            toggleFilter: false,
            backdrop: "static",
            modalClass: "modal-dialog-centered modal-lg r-filter-modal"
        };
        localStorage.setItem("MasterFormInfo", JSON.stringify( FormInfo.fm_dabir_kartabl_erjaat));

    }

    toggleFilter() {
        this.setState(prevState => ({
            toggleFilter: !prevState.toggleFilter
        }));
    }
    SelectRow(row) {
        this.setState({SelectedRow:row});
    }


    render() {

        const columns = [
            { name: 'flow', title: this.context.t("Flow") },
            { name: 'peygir_id', title: this.context.t("WorkID") },
            { name: 'wtype', title: this.context.t("WorkType") },
            { name: 'tarikhaction', title: this.context.t("ActionDate") },
            { name: 'deadtime', title: this.context.t("DeadTime") },
            { name: 'worker', title: this.context.t("worker") },
            { name: 'modir', title: this.context.t("manager") },
            { name: 'name', title: this.context.t("PartyAccountName") },
            { name: 'coname', title: this.context.t("CompanyName") },
            { name: 'mnos', title: this.context.t("Serial_Lead") },
            { name: 'mwt', title: this.context.t("Work_Lead") },
            { name: 'nos_id', title: this.context.t("Serial") },
            { name: 'custom_serial', title: this.context.t("CustomSerial") },
            { name: 'mozo', title: this.context.t("Subject") },
            { name: 'zam', title: this.context.t("Attachments") },
            { name: 'vaziyat', title: this.context.t("Status") },
            { name: 'code', title: this.context.t("Code") },
            { name: 'shomare', title: this.context.t("FileNumber") },
            { name: 'ashkhasname', title: this.context.t("Audience") },
            { name: 'ptype', title: this.context.t("Project") },
            { name: 'has_peyvast', title: this.context.t("HasAttachment") },
            { name: 'flow_code', title: this.context.t("FlowCode") },
            { name: 'madrak_name', title: this.context.t("CertificateName") },
            { name: 'f_s_status', title: this.context.t("Flow_Delivery_Status") },
            { name: 'f_r_status', title: this.context.t("Flow_Received_Status") },
            /*HIDDEN*/
            { name: 'done', title: this.context.t("done") },
            { name: 'id_tel', title: this.context.t("PartyAccountID") },
            { name: 'olaviyat', title: this.context.t("Priority") },
            { name: 'cuser', title: this.context.t("creator") },
            { name: 'c_date', title: this.context.t("CreatedDate") },
            { name: 'tarikh', title: this.context.t("DoneDate") },
            { name: 'ftarikh', title: this.context.t("ManagerDoneDate") },
            { name: 'mtarikh', title: this.context.t("LeadDate") },
            { name: 'see_date', title: this.context.t("SeenDate") },
            { name: 'fok', title: this.context.t("ManagerDone") },
            { name: 'c_time', title: this.context.t("CreatedTime") },
            { name: 'wt_id', title: this.context.t("WorkTypeID") },
            { name: 'suggest_time', title: this.context.t("SuggestTime") },
            { name: 'see_time', title: this.context.t("SeenTime") },
            { name: 'saat', title: this.context.t("DoneTime") },
            { name: 'fsaat', title: this.context.t("ManagerDoneTime") },
            { name: 'proje_nos_id', title: this.context.t("ProjectSerial") },
            { name: 'p_proje_nose_id', title: this.context.t("LeadProjectSerial") },
            { name: 'showtree_id', title: this.context.t("LeadID") },
            { name: 'muser', title: this.context.t("LeadWorker") },
            { name: 'proje_code', title: this.context.t("ProjectCode") },
            { name: 'natije', title: this.context.t("Result") },
        ];
        const {
            FetchData, WorkInfo, GetWorkInfo, Dashboards_totalCount, Dashboards_rows
            , lang
        } = this.props;
        let formName = lang == "fa" ? FormInfo.fm_dabir_kartabl_erjaat.form_name : FormInfo.fm_dabir_kartabl_erjaat.en_form_name;
        Params.Form = formName;


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
            <div className="row">
                <div className="col-sm-12">
                    <div className="r-main-box">
                        <div className="r-main-box__ribbon sticky-top">
                            <RibbonReferences FetchData={FetchData.bind(this)} Params={Params}
                            SelectedRow={this.state.SelectedRow}  />
                            <div className="r-main-box__filter">
                                <Button color="" className="r-main-box__filter--btn"
                                        onClick={this.toggleFilter.bind(this)}></Button>
                            </div>
                        </div>
                        <Modal isOpen={this.state.toggleFilter} toggle={this.toggleFilter.bind(this)}
                               className={this.state.modalClass} backdrop={this.state.backdrop}>
                            <ModalHeader toggle={this.toggleFilter.bind(this)}></ModalHeader>
                            <ModalBody>
                                <RadioFilter Params={Params} fetchData={FetchData.bind(this)} />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.toggleFilter.bind(this)}></Button>
                                <style>{modalBackDrop}</style>
                            </ModalFooter>
                        </Modal>
                        <ApiGridComponent columns={columns} booleanColumns={booleanColumns}
                                          rows={Dashboards_rows} totalCount={Dashboards_totalCount} columnwidth={150}
                                          rowId="peygir_id"  
                                          UrlParams={Params} fetchData={FetchData.bind(this)} SelectRow ={this.SelectRow.bind(this)}
                                          currencyColumns={currencyColumns} hiddenColumnNames={hiddenColumnNames}
                        />
                    </div>
                </div>
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => ({
    FetchData: (Params) => {
        dispatch(Act_Reference.FetchData(Params))
    },
    SetLog: (Form) => {
        dispatch(BasicInfo_action.SetLog(Form))
    },
    SeenWork: (peygir_id) => {
        dispatch(WorkActions_action.SeenWork(peygir_id))
    },
});
References.contextTypes = {
    t: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { Dashboards_rows } = state.dashboards;
    const { Dashboards_totalCount } = state.dashboards
    const { alert } = state;
    const { loading } = state.loading;
    const { lang } = state.i18nState
    const { WorkInfo } = state.Auto_WorkBasic;
    return {
        alert,
        loading,
        lang,
        Dashboards_rows,
        Dashboards_totalCount,
        WorkInfo
    };
}


const connectedReferences = connect(mapStateToProps, mapDispatchToProps)(References);
export { connectedReferences as References };


