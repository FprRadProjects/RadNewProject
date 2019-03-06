import React, { Component } from 'react';
import { connect } from "react-redux"
import {
    Act_Reference,
    design_Actions,
    WorkBasic_action,
    BasicInfo_action, WorkActions_action
} from "../../../_actions";
import { ApiGridComponent } from "../../Config/ApiGridComponent";
import { RadioFilter } from "./RadioFilter";
import { ReferenceViewer } from "../RecordsPage/ReferenceViewer";
import PropTypes from "prop-types"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { setLanguage } from "redux-i18n";
import { FormInfo } from "../../../locales";

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

class References extends Component {
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
        const { GetTemplateForm, GetFormInfo } = this.props;
        // GetFormInfo(FormInfo.fm_dabir_kartabl_erjaat);
        GetTemplateForm(FormInfo.fm_dabir_kartabl_erjaat.id);
    }

    toggleFilter() {
        this.setState(prevState => ({
            toggleFilter: !prevState.toggleFilter
        }));
    }

    OpenReferenceViewer() {
        const { WorkInfo, SetLog, lang, SeenWork } = this.props;
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
            { name: 'peygir_id', title: this.context.t("WorkID") },
            { name: 'worker', title: this.context.t("worker") },
            { name: 'modir', title: this.context.t("manager") },
            { name: 'name', title: this.context.t("PartyAccountName") },
            { name: 'coname', title: this.context.t("CompanyName") },
            { name: 'mnos', title: this.context.t("Serial_Lead") },
            { name: 'mwt', title: this.context.t("Work_Lead") },
            { name: 'wtype', title: this.context.t("WorkType") },
            { name: 'nos_id', title: this.context.t("Serial") },
            { name: 'custom_serial', title: this.context.t("CustomSerial") },
            { name: 'tarikhaction', title: this.context.t("ActionDate") },
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
            { name: 'deadtime', title: this.context.t("DeadTime") },
            { name: 'see_time', title: this.context.t("SeenTime") },
            { name: 'saat', title: this.context.t("DoneTime") },
            { name: 'fsaat', title: this.context.t("ManagerDoneTime") },
            { name: 'proje_nos_id', title: this.context.t("ProjectSerial") },
            { name: 'p_proje_nose_id', title: this.context.t("LeadProjectSerial") },
            { name: 'showtree_id', title: this.context.t("LeadID") },
            { name: 'flow', title: this.context.t("Flow") },
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
                            <div className="r-main-box__toggle">
                                <label className="switch">
                                    <input type="checkbox" id="sidebar-toggle" />
                                    <span className="switch-state"></span>
                                </label>
                            </div>
                            <ul className="nav nav-tabs" id="ribbon-tab">
                                <li className="nav-item"><a href="#tab1" className="nav-link active" data-toggle="tab">تب
                                    باز</a></li>
                                <li className="nav-item"><a href="#tab2" className="nav-link" data-toggle="tab">تب
                                    بسته</a></li>
                                <li className="nav-item"><a href="#tab3" className="nav-link" data-toggle="tab">تب
                                    بسته</a></li>
                                <li className="nav-item"><a href="#tab4" className="nav-link" data-toggle="tab">تب
                                    بسته</a></li>
                            </ul>
                            <div className="tab-content">
                                <div className="gradient"></div>
                                <div className="tab-pane active" id="tab1">
                                    <div className="tab-panel">
                                        <div className="tab-panel-group">
                                            <div className="tab-group-caption">امکانات</div>
                                            <div className="tab-group-content">
                                                <div className="tab-content-segment">
                                                    <a href="#!">
                                                        <i className="icon"></i>
                                                        <span>بازخوانی اطلاعات</span>
                                                    </a>
                                                    <a onClick={this.OpenReferenceViewer.bind(this)}>
                                                        <i className="icon"></i>
                                                        <span>نتیجه ارجاع</span>
                                                    </a>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-panel-group">
                                            <div className="tab-group-caption">نشانه گذاری</div>
                                            <div className="tab-group-content">
                                                <div className="tab-content-segment">
                                                    <a href="#!">
                                                        <i className="icon"></i>
                                                        <span>نشانه ها</span>
                                                    </a>
                                                    <a href="#!">
                                                        <i className="icon"></i>
                                                        <span>حذف نشانه ها</span>
                                                    </a>
                                                    <a href="#!">
                                                        <i className="icon"></i>
                                                        <span>نشانه گذاری</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-panel-group">
                                            <div className="tab-group-caption">پیگیری وضعیت</div>
                                            <div className="tab-group-content">
                                                <div className="tab-content-segment">
                                                    <a href="#!">
                                                        <i className="icon"></i>
                                                        <span>پیش نیازها</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-panel-group">
                                            <div className="tab-group-caption">دیاگرام</div>
                                            <div className="tab-group-content">
                                                <div className="tab-content-segment">
                                                    <a href="#!">
                                                        <i className="icon"></i>
                                                        <span>دیاگرام عطف</span>
                                                    </a>
                                                    <a href="#!">
                                                        <i className="icon"></i>
                                                        <span>دیاگرام</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-panel-group">
                                            <div className="tab-group-caption">سایر</div>
                                            <div className="tab-group-content">
                                                <div className="tab-content-segment">
                                                    <a href="#!">
                                                        <i className="icon"></i>
                                                        <span>خلاصه گردش کار</span>
                                                    </a>
                                                    <a href="#!">
                                                        <i className="icon"></i>
                                                        <span>گروه آرشیو کاربر</span>
                                                    </a>
                                                    <a href="#!">
                                                        <i className="icon"></i>
                                                        <span>نمایش دبیرخانه</span>
                                                    </a>
                                                    <a href="#!">
                                                        <i className="icon"></i>
                                                        <span>ایجاد رونوشت</span>
                                                    </a>
                                                    <a href="#!">
                                                        <i className="icon"></i>
                                                        <span>ارجاع</span>
                                                    </a>
                                                    <a href="#!">
                                                        <i className="icon"></i>
                                                        <span>ویرایش ارجاع</span>
                                                    </a>
                                                    <a href="#!">
                                                        <i className="icon"></i>
                                                        <span>فراخوانی از ایمیل کاربر</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div role="tabpanel" className="tab-pane fade" id="tab2">
                                    <div className="tab-panel">
                                        <div className="tab-panel-group">
                                            <div className="tab-group-caption">امکانات</div>
                                            <div className="tab-group-content">
                                                <div className="tab-content-segment">
                                                    <a href="#!">
                                                        <i className="icon"></i>
                                                        <span>بازخوانی اطلاعات</span>
                                                    </a>
                                                    <a href="#!">
                                                        <i className="icon"></i>
                                                        <span>نمایش کار</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-panel-group">
                                            <div className="tab-group-caption">نشانه گذاری</div>
                                            <div className="tab-group-content">
                                                <div className="tab-content-segment">
                                                    <a href="#!">
                                                        <i className="icon"></i>
                                                        <span>نشانه ها</span>
                                                    </a>
                                                    <a href="#!">
                                                        <i className="icon"></i>
                                                        <span>حذف نشانه ها</span>
                                                    </a>
                                                    <a href="#!">
                                                        <i className="icon"></i>
                                                        <span>نشانه گذاری</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-panel-group">
                                            <div className="tab-group-caption">پیگیری وضعیت</div>
                                            <div className="tab-group-content">
                                                <div className="tab-content-segment">
                                                    <a href="#!">
                                                        <i className="icon"></i>
                                                        <span>پیش نیازها</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div role="tabpanel" className="tab-pane fade" id="tab3">
                                    <div className="tab-panel">
                                        <div className="tab-panel-group">
                                            <div className="tab-group-caption">دیاگرام</div>
                                            <div className="tab-group-content">
                                                <div className="tab-content-segment">
                                                    <a href="#!">
                                                        <i className="icon"></i>
                                                        <span>دیاگرام عطف</span>
                                                    </a>
                                                    <a href="#!">
                                                        <i className="icon"></i>
                                                        <span>دیاگرام</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-panel-group">
                                            <div className="tab-group-caption">سایر</div>
                                            <div className="tab-group-content">
                                                <div className="tab-content-segment">
                                                    <a href="#!">
                                                        <i className="icon"></i>
                                                        <span>خلاصه گردش کار</span>
                                                    </a>
                                                    <a href="#!">
                                                        <i className="icon"></i>
                                                        <span>گروه آرشیو کاربر</span>
                                                    </a>
                                                    <a href="#!">
                                                        <i className="icon"></i>
                                                        <span>نمایش دبیرخانه</span>
                                                    </a>
                                                    <a href="#!">
                                                        <i className="icon"></i>
                                                        <span>ایجاد رونوشت</span>
                                                    </a>
                                                    <a href="#!">
                                                        <i className="icon"></i>
                                                        <span>ارجاع</span>
                                                    </a>
                                                    <a href="#!">
                                                        <i className="icon"></i>
                                                        <span>ویرایش ارجاع</span>
                                                    </a>
                                                    <a href="#!">
                                                        <i className="icon"></i>
                                                        <span>فراخوانی از ایمیل کاربر</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div role="tabpanel" className="tab-pane fade" id="tab4">
                                    <div className="tab-panel">
                                        <div className="tab-panel-group">
                                            <div className="tab-group-caption">نشانه گذاری</div>
                                            <div className="tab-group-content">
                                                <div className="tab-content-segment">
                                                    <a href="#!">
                                                        <i className="icon"></i>
                                                        <span>نشانه ها</span>
                                                    </a>
                                                    <a href="#!">
                                                        <i className="icon"></i>
                                                        <span>حذف نشانه ها</span>
                                                    </a>
                                                    <a href="#!">
                                                        <i className="icon"></i>
                                                        <span>نشانه گذاری</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-panel-group">
                                            <div className="tab-group-caption">پیگیری وضعیت</div>
                                            <div className="tab-group-content">
                                                <div className="tab-content-segment">
                                                    <a href="#!">
                                                        <i className="icon"></i>
                                                        <span>پیش نیازها</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-panel-group">
                                            <div className="tab-group-caption">دیاگرام</div>
                                            <div className="tab-group-content">
                                                <div className="tab-content-segment">
                                                    <a href="#!">
                                                        <i className="icon"></i>
                                                        <span>دیاگرام عطف</span>
                                                    </a>
                                                    <a href="#!">
                                                        <i className="icon"></i>
                                                        <span>دیاگرام</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <nav className="radialnav">
                                <a href="#" className="ellipsis"></a>
                                <ul className="menu">
                                    <li><a href="#!" title="تست"><i className="icon"></i></a></li>
                                    <li><a href="#!"><i className="icon"></i></a></li>
                                    <li><a href="#!"><i className="icon"></i></a></li>
                                    <li><a href="#!"><i className="icon"></i></a></li>
                                    <li><a href="#!"><i className="icon"></i></a></li>
                                    <li><a href="#!"><i className="icon"></i></a></li>
                                    <li><a href="#!"><i className="icon"></i></a></li>
                                </ul>
                            </nav>
                            <div className="r-main-box__filter">
                                <Button color="" className="r-main-box__filter--btn"
                                    onClick={this.toggleFilter.bind(this)}></Button>
                            </div>
                        </div>
                        {this.state.ReferenceViewermodal && <ReferenceViewer modal={this.state.ReferenceViewermodal}
                            toggle={this.toggleReferenceViewer.bind(this)}
                            WorkInfo={WorkInfo} GetRowInfo={GetWorkInfo}
                            Params={Params} RefreshForm={FetchData.bind(this)}
                            ParentForm={FormInfo.fm_dabir_kartabl_erjaat} />}
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
                            rows={Dashboards_rows} totalCount={Dashboards_totalCount}  columnwidth={150}
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
    FetchData: (Params) => {
        dispatch(Act_Reference.FetchData(Params))
    },
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
References.contextTypes = {
    t: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { Dashboards_rows } = state.dashboards;
    const { Dashboards_totalCount } = state.dashboards
    const { alert } = state;
    const { loading } = state.loading;
    const { lang } = state.i18nState
    const { WorkInfo } = state.Auto_BasicInfo;
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



