import React, { useState, useEffect, useContext } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Collapse, Card, CardBody, Row, Col } from 'reactstrap';
import { ApiGridComponent } from "../../Frameworks";
import { FormInfo } from "../../../locales";
import PropTypes from "prop-types"
import { paramsService } from "../../../_webservices";
import {
    Act_workManagement
} from "../../../_actions";
import { ApiGridComponentWithHook } from '../../Frameworks/Controls/Grid';

import {
    LabelInputText, LabelPopUpInputText, BoxGroup
} from "../../Frameworks";

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

    const DeletedElements = useSelector(state => state.Design !== undefined ? state.Design : {});
    const EditedElements = useSelector(state => state.Design !== undefined ? state.Design : {});

    const [resultTextArea, setResultTextArea] = useState("");
    const [durationDoneText, setDurationDoneText] = useState("");
    const [descriptionTextArea, setDescriptionTextArea] = useState("");
    const [subjectInputText, setSubjectInputText] = useState("");
    const [codeText, setCodeText] = useState("");
    const [fileNumberText, setFileNumberText] = useState("");
    const [projectSelectedOption, setProjectSelectedOption] = useState({ value: "", label: "" });
    const [isOpen, setIsOpen] = useState(false);


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
    }, [props]);

    const toggle = () => setIsOpen(!isOpen);

    const SelectRow = (row) => {
        setSelectedRow(row);
        console.log(selectedRow);
        setProjectSelectedOption({ value: selectedRow != undefined ? selectedRow.p_type_id : "", label: selectedRow != undefined ? selectedRow.ptype : "" });
        setSubjectInputText(selectedRow != undefined ? selectedRow.mozo !== null ? selectedRow.mozo : "" : "");
        setResultTextArea(selectedRow != undefined ? selectedRow.natije !== null ? selectedRow.natije : "" : "");
        setDurationDoneText(selectedRow != undefined ? selectedRow.modat_anjam_w !== null ? selectedRow.modat_anjam_w : "" : "");
        setCodeText(selectedRow != undefined ? selectedRow.code !== null ? selectedRow.code : "" : "");
        setFileNumberText(selectedRow != undefined ? selectedRow.shomare !== null ? selectedRow.shomare : "" : "");
        setIsOpen(true);
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
            <Modal isOpen={props.modal} toggle={props.toggle} backdrop="static" className="modal-dialog-centered modal-xl r-modal show-work-viewer-modal">
                <ModalHeader toggle={props.toggle}>{context.t("frm_Show_File_Work")}</ModalHeader>
                <ModalBody >
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
                <ModalFooter>
                    <Button color="primary" onClick={toggle} style={{ marginBottom: '1rem' }}>Toggle</Button>
                    <Collapse isOpen={isOpen}>
                        <Card>
                            <CardBody>
                                <BoxGroup
                                    Text={context.t("DetailsInfoBox")}
                                    FormId={FormInfo.fm_par_modiriyatkarha.id}
                                    Id="DetailsInfoBox"
                                    IconClassName="row-icon project"
                                    DeletedElements={DeletedElements}
                                    EditedElements={EditedElements}
                                >
                                    <div className="col-11">
                                        <div className="row">
                                            {/* <LabelPopUpInputText
                                                LabelclassName="col-3 col-form-label"
                                                ColClassName="col-4"
                                                Text={context.t("Project")} 
                                                className2="col-9"
                                                InputclassName="form-control" 
                                                name="p_type_id"
                                                Id="Project"
                                                //ButtonClick={this.OpenSelectProject.bind(this)}
                                                FormId={FormInfo.fm_par_modiriyatkarha.id}
                                                DeletedElements={DeletedElements}
                                                EditedElements={EditedElements}
                                                value={projectSelectedOption}
                                                Type="ComboBox"
                                                options={[{ value: 0, label: context.t("NoSelection") }]}
                                                isDisabled={selectedRow != undefined ? selectedRow.done ? true : false : false}
                                                isButtonDisabled={selectedRow != undefined ? selectedRow.done ? true : false : false}
                                                //changeHandle={this.changeHandle.bind(this)}
                                                ButtonText={context.t("SelectPopup")}
                                            ></LabelPopUpInputText> */}
                                            <LabelInputText
                                                LabelclassName="col-4 col-form-label"
                                                ColClassName="col-4"
                                                Text={context.t("FileNumber")} className2="col-8"
                                                InputclassName="form-control my-2 ltr" name="shomare"
                                                Id="FileNumber" 
                                                //changeHandle={this.changeHandle.bind(this)}
                                                FormId={FormInfo.fm_par_modiriyatkarha.id}
                                                DeletedElements={DeletedElements}
                                                EditedElements={EditedElements}
                                                isDisabled={selectedRow != undefined ? selectedRow.done ? true : false : false}
                                                value={fileNumberText}
                                            ></LabelInputText>
                                            <LabelInputText
                                                LabelclassName="col-4 col-form-label"
                                                ColClassName="col-4"
                                                Text={context.t("Code")} className2="col-8"
                                                InputclassName="form-control my-2 ltr" name="code"
                                                Id="Code" 
                                                //changeHandle={this.changeHandle.bind(this)}
                                                FormId={FormInfo.fm_par_modiriyatkarha.id}
                                                DeletedElements={DeletedElements}
                                                isDisabled={selectedRow != undefined ? selectedRow.done ? true : false : false}
                                                EditedElements={EditedElements}
                                                value={codeText}
                                            ></LabelInputText>
                                            <LabelInputText
                                                LabelclassName="col-3 col-form-label"
                                                ColClassName="col-4"
                                                Text={context.t("Duration_Of_Work_Short")}
                                                className2="col-9"
                                                InputclassName="form-control mb-2 ltr"
                                                name="modat_anjam_w"
                                                Id="Duration_Of_Work_Short"
                                                //changeHandle={this.changeHandle.bind(this)}
                                                FormId={FormInfo.fm_par_modiriyatkarha.id}
                                                DeletedElements={DeletedElements}
                                                EditedElements={EditedElements}
                                                mask="99999999"
                                                maskChar=""
                                                isDisabled={selectedRow != undefined ? selectedRow.done ? true : false : false}
                                                value={durationDoneText}
                                            ></LabelInputText>

                                            <LabelPopUpInputText
                                                ColClassName="col-8"
                                                Text={context.t("Subject")}
                                                className3="input-group mb-2"
                                                InputclassName="form-control" name="mozo"
                                                Id="Subject" 
                                                //ButtonClick={this.OpenSelectDefaultText.bind(this)}
                                                FormId={FormInfo.fm_par_modiriyatkarha.id}
                                                DeletedElements={DeletedElements}
                                                EditedElements={EditedElements}
                                                value={subjectInputText}

                                                Type="Input"
                                                isDisabled={selectedRow != undefined ? selectedRow.done ? true : false : false}
                                                isButtonDisabled={selectedRow != undefined ? selectedRow.done ? true : false : false}
                                                //changeHandle={this.changeHandle.bind(this)}
                                                ButtonText={context.t("SelectPopup")}
                                            ></LabelPopUpInputText>
                                        </div>
                                    </div>
                                </BoxGroup>
                                <BoxGroup
                                    Text={context.t("ResultInfoBox")}
                                    FormId={FormInfo.fm_par_modiriyatkarha.id}
                                    Id="ResultInfoBox"
                                    IconClassName="row-icon result"
                                    DeletedElements={DeletedElements}
                                    EditedElements={EditedElements}
                                >
                                    <div className="col-11">
                                        <div className="row">
                                            <LabelPopUpInputText LabelclassName="col-1 col-form-label"
                                                ColClassName="col-12"
                                                Text={context.t("WorkResult")} className2="col-11"
                                                className3="input-group mt-2 mb-2"
                                                InputclassName="form-control" name="natije"
                                                Id="Result"
                                                //ButtonClick={this.OpenSelectDefaultText.bind(this)}
                                                FormId={FormInfo.fm_par_modiriyatkarha.id}
                                                DeletedElements={DeletedElements}
                                                EditedElements={EditedElements}
                                                value={resultTextArea}
                                                Type="TextArea"
                                                isDisabled={selectedRow != undefined ? selectedRow.done ? true : false : false}
                                                isButtonDisabled={selectedRow != undefined ? selectedRow.done ? true : false : false}
                                                //changeHandle={this.changeHandle.bind(this)}
                                                ButtonText={context.t("SelectPopup")}
                                            ></LabelPopUpInputText>
                                        </div>
                                    </div>
                                </BoxGroup>
                            </CardBody>
                        </Card>
                    </Collapse>
                </ModalFooter>
                <style>{modalBackDrop}</style>
            </Modal>
        </>
    )
}

ShowWorkViewer.contextTypes = {
    t: PropTypes.func
}

export default ShowWorkViewer
