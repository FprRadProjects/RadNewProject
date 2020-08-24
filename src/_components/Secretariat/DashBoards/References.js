import React, { useState, useEffect, useContext } from 'react'
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
import { ApiGridComponentWithHook } from '../../Frameworks/Controls/Grid';

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

function References(props, context) {

    const [selectedRow, setSelectedRow] = useState([]);
    const [filter, setFilter] = useState(false);
    const [backdrop, setBackdrop] = useState("static");
    const [modalClass, setModalClass] = useState("modal-dialog-centered modal-lg r-filter-modal");
    const [rows, setRows] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    function FetchGridData() {
        let formName = props.lang == "fa" ? FormInfo.fm_dabir_kartabl_erjaat.form_name : FormInfo.fm_dabir_kartabl_erjaat.en_form_name;
        Params.Form = formName;
        let data = Act_Reference.FetchData(Params).then(
            data => {
                setRows(data.data.rows);
                setTotalCount(data.data.totalcount);
            }
        );
    }

    useEffect(() => {
        localStorage.setItem("MasterFormInfo", JSON.stringify(FormInfo.fm_dabir_kartabl_erjaat));
        FetchGridData();
    }, []);

    function toggleFilter() {
        setFilter(!filter);
    }
    function SelectRow(row) {
        setSelectedRow(row);
    }


    const columns = [
        { name: 'flow', title: context.t("Flow") },
        { name: 'peygir_id', title: context.t("WorkID") },
        { name: 'wtype', title: context.t("WorkType") },
        { name: 'tarikhaction', title: context.t("ActionDate") },
        { name: 'deadtime', title: context.t("DeadTime") },
        { name: 'worker', title: context.t("worker") },
        { name: 'modir', title: context.t("manager") },
        { name: 'name', title: context.t("PartyAccountName") },
        { name: 'coname', title: context.t("CompanyName") },
        { name: 'mnos', title: context.t("Serial_Lead") },
        { name: 'mwt', title: context.t("Work_Lead") },
        { name: 'nos_id', title: context.t("Serial") },
        { name: 'custom_serial', title: context.t("CustomSerial") },
        { name: 'mozo', title: context.t("Subject") },
        { name: 'zam', title: context.t("Attachments") },
        { name: 'vaziyat', title: context.t("Status") },
        { name: 'code', title: context.t("Code") },
        { name: 'shomare', title: context.t("FileNumber") },
        { name: 'ashkhasname', title: context.t("Audience") },
        { name: 'ptype', title: context.t("Project") },
        { name: 'has_peyvast', title: context.t("HasAttachment") },
        { name: 'flow_code', title: context.t("FlowCode") },
        { name: 'madrak_name', title: context.t("CertificateName") },
        { name: 'f_s_status', title: context.t("Flow_Delivery_Status") },
        { name: 'f_r_status', title: context.t("Flow_Received_Status") },
        /*HIDDEN*/
        { name: 'done', title: context.t("done") },
        { name: 'id_tel', title: context.t("PartyAccountID") },
        { name: 'olaviyat', title: context.t("Priority") },
        { name: 'cuser', title: context.t("creator") },
        { name: 'c_date', title: context.t("CreatedDate") },
        { name: 'tarikh', title: context.t("DoneDate") },
        { name: 'ftarikh', title: context.t("ManagerDoneDate") },
        { name: 'mtarikh', title: context.t("LeadDate") },
        { name: 'see_date', title: context.t("SeenDate") },
        { name: 'fok', title: context.t("ManagerDone") },
        { name: 'c_time', title: context.t("CreatedTime") },
        { name: 'wt_id', title: context.t("WorkTypeID") },
        { name: 'suggest_time', title: context.t("SuggestTime") },
        { name: 'see_time', title: context.t("SeenTime") },
        { name: 'saat', title: context.t("DoneTime") },
        { name: 'fsaat', title: context.t("ManagerDoneTime") },
        { name: 'proje_nos_id', title: context.t("ProjectSerial") },
        { name: 'p_proje_nose_id', title: context.t("LeadProjectSerial") },
        { name: 'showtree_id', title: context.t("LeadID") },
        { name: 'muser', title: context.t("LeadWorker") },
        { name: 'proje_code', title: context.t("ProjectCode") },
        { name: 'natije', title: context.t("Result") },
    ];



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
                        <RibbonReferences FetchData={FetchGridData} Params={Params}
                            SelectedRow={selectedRow} />
                        <div className="r-main-box__filter">
                            <Button color="" className="r-main-box__filter--btn"
                                onClick={toggleFilter}></Button>
                        </div>
                    </div>
                    <Modal isOpen={filter} toggle={toggleFilter}
                        className={modalClass} backdrop={backdrop}>
                        <ModalHeader toggle={toggleFilter}></ModalHeader>
                        <ModalBody>
                            <RadioFilter Params={Params} fetchData={FetchGridData} />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={toggleFilter}></Button>
                            <style>{modalBackDrop}</style>
                        </ModalFooter>
                    </Modal>

                    <ApiGridComponentWithHook
                        columns={columns}
                        rows={rows}
                        totalCount={totalCount}
                        columnwidth={150}
                        rowId="peygir_id"
                        FetchData={FetchGridData}
                        UrlParams={Params}
                        SelectRow={SelectRow}
                        booleanColumns={booleanColumns}
                        currencyColumns={currencyColumns}
                        hiddenColumnNames={hiddenColumnNames}
                    />
                    {/*                     
                    <ApiGridComponent columns={columns}
                        rows={Dashboards_rows} totalCount={Dashboards_totalCount} columnwidth={150}
                        rowId="peygir_id"
                        UrlParams={Params} fetchData={FetchGridData} SelectRow={SelectRow}
                        booleanColumns={booleanColumns} currencyColumns={currencyColumns} hiddenColumnNames={hiddenColumnNames}
                    /> */}
                </div>
            </div>
        </div>
    );
}


const mapDispatchToProps = dispatch => ({
    // FetchData: (Params) => {
    //     return dispatch(Act_Reference.FetchData(Params))
    // },
    // DeleteData: (Params) => {
    //     return dispatch(Act_Reference.DeleteData(Params))
    // },
});
References.contextTypes = {
    t: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { lang } = state.i18nState;
    return {
        lang,

    };
}


const connectedReferences = connect(mapStateToProps, mapDispatchToProps)(References);
export { connectedReferences as References };


