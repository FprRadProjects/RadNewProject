import React, {Component} from 'react';
import {connect} from "react-redux"
import {Act_Reference, design_Actions} from "../../../_actions";
import { ApiGridComponent } from "../../Frameworks";
import {RadioFilter} from "./RadioFilter";
import PropTypes from "prop-types"
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
var currencyColumns = ['peygir_id', 'id_tel'];
var hiddenColumnNames = ['done', 'tarikhaction', 'id_tel', 'olaviyat', 'cuser',
    'c_date', 'tarikh', 'fok', 'mtarikh', 'see_date', 'fok', 'c_time', 'wt_id',
    'suggest_time', 'sm_zaman_anjam_kar', 'see_time', 'saat', 'fsaat', 'proje_nos_id',
    'p_proje_nose_id', 'showtree_id', 'flow', 'muser', 'proje_code', 'natije'];
var booleanColumns = ['done', 'has_peyvast', 'done', 'fok'];


var Params = {
    "page": 0,
    "pagesize": 10,
    "seen": "2",
    "done": "0",
    "date": "0",
    "calendar": "",
    "worker": "0",
    "orderby": "tarikhaction",
    "direction": "desc",
    "filter": []

};

class Works extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            modal: false,
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    render() {

        const {FetchData, alert, loading} = this.props;
        const columns = [
            {name: 'peygir_id', title: this.context.t("WorkID")},
            {name: 'worker', title: this.context.t("worker")},
            {name: 'modir', title: this.context.t("manager")},
            {name: 'name', title: this.context.t("PartyAccountName")},
            {name: 'coname', title: this.context.t("CompanyName")},
            {name: 'mnos', title: this.context.t("Serial_Lead")},
            {name: 'mwt', title: this.context.t("Work_Lead")},
            {name: 'wtype', title: this.context.t("WorkType")},
            {name: 'nos_id', title: this.context.t("Serial")},
            {name: 'custom_serial', title: this.context.t("CustomSerial")},
            {name: 'tarikhaction', title: this.context.t("ActionDate")},
            {name: 'mozo', title: this.context.t("Subject")},
            {name: 'zam', title: this.context.t("Attachments")},
            {name: 'vaziyat', title: this.context.t("Status")},
            {name: 'code', title: this.context.t("Code")},
            {name: 'shomare', title: this.context.t("FileNumber")},
            {name: 'ashkhasname', title: this.context.t("Audience")},
            {name: 'ptype', title: this.context.t("Project")},
            {name: 'has_peyvast', title: this.context.t("HasAttachment")},
            {name: 'flow_code', title: this.context.t("FlowCode")},
            {name: 'madrak_name', title: this.context.t("CertificateName")},
            {name: 'f_s_status', title: this.context.t("Flow_Delivery_Status")},
            {name: 'f_r_status', title: this.context.t("Flow_Received_Status")},
            /*HIDDEN*/
            {name: 'done', title: this.context.t("done")},
            {name: 'id_tel', title: this.context.t("PartyAccountID")},
            {name: 'olaviyat', title: this.context.t("Priority")},
            {name: 'cuser', title: this.context.t("creator")},
            {name: 'c_date', title: this.context.t("CreatedDate")},
            {name: 'tarikh', title: this.context.t("DoneDate")},
            {name: 'ftarikh', title: this.context.t("ManagerDoneDate")},
            {name: 'mtarikh', title: this.context.t("LeadDate")},
            {name: 'see_date', title: this.context.t("SeenDate")},
            {name: 'fok', title: this.context.t("ManagerDone")},
            {name: 'c_time', title: this.context.t("CreatedTime")},
            {name: 'wt_id', title: this.context.t("WorkTypeID")},
            {name: 'suggest_time', title: this.context.t("SuggestTime")},
            {name: 'suggest_time', title: this.context.t("SuggestTime")},
            {name: 'suggest_time', title: this.context.t("Duration_Of_Work")},
            {name: 'deadtime', title: this.context.t("DeadTime")},
            {name: 'see_time', title: this.context.t("SeenTime")},
            {name: 'saat', title: this.context.t("DoneTime")},
            {name: 'fsaat', title: this.context.t("ManagerDoneTime")},
            {name: 'proje_nos_id', title: this.context.t("ProjectSerial")},
            {name: 'p_proje_nose_id', title: this.context.t("LeadProjectSerial")},
            {name: 'showtree_id', title: this.context.t("LeadID")},
            {name: 'flow', title: this.context.t("Flow")},
            {name: 'muser', title: this.context.t("LeadWorker")},
            {name: 'proje_code', title: this.context.t("ProjectCode")},
            {name: 'natije', title: this.context.t("Result")},
        ];

        return (
            <div>
                {loading &&
                <div className={`alert ${alert.type}`}>...Loading</div>
                }
                {alert.message &&
                <div className={`alert ${alert.type}`}>{alert.message}</div>
                }

                <Button color="primary" onClick={this.toggle}>نمایش فیلتر ها</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}
                       className={this.state.modalClass} backdrop={this.state.backdrop}>
                    <ModalHeader toggle={this.toggle}></ModalHeader>
                    <ModalBody>
                        <RadioFilter Params={Params} fetchData={FetchData.bind(this)}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}></Button>
                    </ModalFooter>
                </Modal>


                <ApiGridComponent columns={columns} booleanColumns={booleanColumns}
                               UrlParams={Params} fetchData={FetchData.bind(this)}
                               currencyColumns={currencyColumns} hiddenColumnNames={hiddenColumnNames}
                />


            </div>
        );
    }
}


const mapDispatchToProps = dispatch => ({
    FetchData: (Params) => {
        dispatch(Act_Reference.FetchData(Params))
    },
    GetTemplateForm: (Params) => {
        dispatch(design_Actions.GetTemplateForm(Params))
    }
});

Works.contextTypes = {
    t: PropTypes.func.isRequired
}

function mapStateToProps(state) {

    const {alert} = state;
    const {loading} = state.loading;
    const {lang} = state.i18nState
    return {
        alert,
        loading,
        lang
    };
}

const connectedWorks = connect(mapStateToProps, mapDispatchToProps)(Works);
export { connectedWorks as Works };



