import React, {Component} from 'react';
import {connect} from "react-redux"
import {Act_Reference, BasicInfo_action, design_Actions, WorkActions_action, WorkBasic_action} from "../../../_actions";
import {OrgChart} from "../../Config/orgChart"
import PropTypes from "prop-types"
import {setLanguage} from "redux-i18n";
import {FormInfo} from "../../../locales";
import 'open-iconic/font/css/open-iconic-bootstrap.min.css'
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
import {TreeGridComponent} from "../../Config/TreeGridComponent";


var currencyColumns = [];
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
    "Form": "",
    "filter": []

};

class workManagement extends Component {
    constructor(props) {

        super(props);
        this.state = {
            ...this.state,
            toggleFilter: false,
            ReferenceViewermodal: false,
            backdrop: "static",
            modalClass: "modal-dialog-centered modal-lg r-filter-modal"
        };

    }

    componentDidMount() {
        const {GetTemplateForm, GetFormInfo} = this.props;
        // GetFormInfo(FormInfo.fm_dabir_kartabl_erjaat);
        GetTemplateForm(FormInfo.fm_dabir_kartabl_erjaat.id);
    }

    toggleFilter() {
        this.setState(prevState => ({
            toggleFilter: !prevState.toggleFilter
        }));
    }

    OpenReferenceViewer() {
        const {WorkInfo, SetLog, lang, SeenWork} = this.props;
        if (WorkInfo !== undefined) {
            let formName = lang == "fa" ? FormInfo.fm_dabir_natije_erja.form_name : FormInfo.fm_dabir_natije_erja.en_form_name;
            SetLog(formName);
            SeenWork(WorkInfo.peygir_id);
            this.setState(prevState => ({
                ReferenceViewermodal: !prevState.ReferenceViewermodal
            }));
        }
    }

    toggleReferenceViewer() {
        this.setState(prevState => ({
            ReferenceViewermodal: !prevState.ReferenceViewermodal
        }));

    }

    render() {

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
        const {
            FetchData, WorkInfo, GetWorkInfo, Dashboards_totalCount, Dashboards_tree_rows
            , lang, Diagram
        } = this.props;
        let formName = lang == "fa" ? FormInfo.fm_dabir_kartabl_erjaat.form_name : FormInfo.fm_dabir_kartabl_erjaat.en_form_name;
        Params.Form = formName;

        return (
            <div className="row">
                <div className="col-sm-12">
                    <div className="r-main-box">

                        <OrgChart/>



                        <TreeGridComponent columns={columns} booleanColumns={booleanColumns}
                                            totalCount={Dashboards_totalCount}  columnwidth={150}
                                          UrlParams={Params} fetchData={FetchData.bind(this)} GetRowInfo={GetWorkInfo}
                                          currencyColumns={currencyColumns} hiddenColumnNames={hiddenColumnNames}
                        />
                    </div>
                </div>
            </div>

        );


    }
}


const mapDispatchToProps = dispatch => ({
    FetchData: (Params, reload, tree) =>
        dispatch(Act_Reference.FetchDataTree(Params, reload, tree))
    // console.log(dispatch())
    ,
    GetTemplateForm: (Params) => {
        dispatch(design_Actions.GetTemplateForm(Params))
    },
    GetFormInfo: (Param) => {
        dispatch(Act_Reference.GetFormInfo(Param))
    },
    setLanguage: (param) => {
        dispatch(setLanguage(param))
    },
    GetWorkInfo: (Params) => {
        dispatch(WorkBasic_action.GetWorkInfo(Params))
    },
    SetLog: (Form) => {
        dispatch(BasicInfo_action.SetLog(Form))
    },
    SeenWork: (peygir_id) => {
        dispatch(WorkActions_action.SeenWork(peygir_id))
    },
});
workManagement.contextTypes = {
    t: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const {Dashboards_tree_rows} = state.dashboards;
    const {Dashboards_totalCount} = state.dashboards
    const {alert} = state;
    const {loading} = state.loading;
    const {lang} = state.i18nState
    const {WorkInfo} = state.Auto_WorkBasic;
    return {
        alert,
        loading,
        lang,
        Dashboards_tree_rows,
        Dashboards_totalCount,
        WorkInfo
    };
}


const connectedReferences = connect(mapStateToProps, mapDispatchToProps)(workManagement);
export {connectedReferences as workManagement};



