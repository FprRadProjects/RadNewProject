import React, { useState, useEffect, useContext } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { ApiGridComponent } from "../../Frameworks";
import { FormInfo } from "../../../locales";
import PropTypes from "prop-types"
import { paramsService } from "../../../_webservices";
import {
    Act_workManagement
} from "../../../_actions";
import { ApiGridComponentWithHook } from '../../Frameworks/Controls/Grid';

const currencyColumns = [];
const hiddenColumnNames = ['done', 'id_tel', 'olaviyat', 'cuser',
    'c_date', 'tarikh', 'fok', 'mtarikh', 'see_date', 'fok', 'c_time', 'wt_id',
    'suggest_time', 'sm_zaman_anjam_kar', 'see_time', 'saat', 'fsaat', 'proje_nos_id',
    'p_proje_nose_id', 'showtree_id', 'muser', 'proje_code', 'natije'];
const booleanColumns = ['done', 'has_peyvast', 'done', 'fok'];

const Params = {
    pageIndex: 0,
    pageSize: 10,
    peygirId: 0,
    From: "WorkFlowItem",
    tarafId: 0,
    showTreeId: 0,
    filter: [],
    orderby: "",
    direction: "asc",
};

const ShowWorkViewer = (props, context) => {
    const [selectedRow, setSelectedRow] = useState();
    const [rows, setRows] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const dispatch = useDispatch();
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

    function FetchData() {
        if (props.SelectedRow !== undefined) {
            Params.tarafId = props.SelectedRow.id_tel;
            Params.peygirId = props.SelectedRow.peygir_id;
            Params.showTreeId = props.SelectedRow.showtree_id;
            // let data = Act_workManagement.FetchWorkManagementData(Params);
            let data = Act_workManagement.FetchWorkManagementData(Params).then(
                data => {
                    setRows(data.data.rows);
                    setTotalCount(data.data.totalcount);
                }
            );

        }
    }

    useEffect(() => {
        FetchData();
        return () => {

        }
    }, []);
    const SelectRow = (row) => {
        console.log(row)
        setSelectedRow(row);
    }

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
        <>
            <Modal isOpen={props.modal} toggle={props.toggle} backdrop="static" className="modal-dialog-centered modal-xl r-modal">
                <ModalHeader toggle={props.toggle}>{context.t("frm_Show_File_Work")}</ModalHeader>
                <ModalBody>
                    <ApiGridComponentWithHook
                        columns={columns}
                        rows={rows}
                        totalCount={totalCount}
                        columnwidth={150}
                        rowId="peygir_id"
                        FetchData={FetchData}
                        UrlParams={Params}
                        SelectRow={SelectRow}
                        booleanColumns={booleanColumns}
                        currencyColumns={currencyColumns}
                        hiddenColumnNames={hiddenColumnNames}
                    />
                </ModalBody>
                <style>{modalBackDrop}</style>
            </Modal>
        </>
    )
}

ShowWorkViewer.contextTypes = {
    t: PropTypes.func
}

export default ShowWorkViewer
