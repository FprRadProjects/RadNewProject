import React, { Component } from 'react';
import { connect } from "react-redux"
import { Act_Reference, BasicInfo_action, design_Actions, mainpageActions, WorkBasic_action } from "../../../_actions";
import { GridComponent } from "../../Config/GridComponent";
import { RadioFilter } from "./RadioFilter";
import { ReferenceViewer } from "../RecordsPage/ReferenceViewer";
import PropTypes from "prop-types"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { setLanguage } from "redux-i18n";

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
            backdropClassName: "test",
            modalClass: "modal-dialog-centered modal-lg r-filter-modal"
        };
        this.toggleFilter = this.toggleFilter.bind(this);
        this.toggleReferenceViewer = this.toggleReferenceViewer.bind(this);

    }
    componentDidMount() {
    }

    toggleFilter() {
        this.setState(prevState => ({
            toggleFilter: !prevState.toggleFilter
        }));
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
            { name: 'suggest_time', title: this.context.t("SuggestTime") },
            { name: 'suggest_time', title: this.context.t("Duration_Of_Work") },
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
        const { FetchData,  WorkInfo ,GetWorkInfo} = this.props;
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
                                <li className="nav-item"><a href="#tab1" className="nav-link active" data-toggle="tab">تب باز</a></li>
                                <li className="nav-item"><a href="#tab2" className="nav-link" data-toggle="tab">تب بسته</a></li>
                                <li className="nav-item"><a href="#tab3" className="nav-link" data-toggle="tab">تب بسته</a></li>
                                <li className="nav-item"><a href="#tab4" className="nav-link" data-toggle="tab">تب بسته</a></li>
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
                                <Button color="" className="r-main-box__filter--btn" onClick={this.toggleFilter}></Button>
                            </div>
                        </div>
                        <Button color="primary" onClick={this.toggleReferenceViewer}>نتیجه ارجاع</Button>
                        {this.state.ReferenceViewermodal && <ReferenceViewer modal={ this.state.ReferenceViewermodal}
                                                                             toggle={this.toggleReferenceViewer.bind(this)}
                                                                             WorkInfo={WorkInfo}/>}
                        <Modal isOpen={this.state.toggleFilter} toggle={this.toggleFilter}
                            className={this.state.modalClass} backdrop={this.state.backdrop}>
                            <ModalHeader toggle={this.toggleFilter}></ModalHeader>
                            <ModalBody>
                                <RadioFilter Params={Params} fetchData={FetchData.bind(this)} />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.toggleFilter}></Button>
                            </ModalFooter>
                        </Modal>
                        <GridComponent columns={columns} booleanColumns={booleanColumns}
                            UrlParams={Params} fetchData={FetchData.bind(this)} GetWorkInfo={GetWorkInfo}
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
        dispatch(BasicInfo_action.GetFormInfo(Param))
    },
    setLanguage: (param) => {
        dispatch(setLanguage(param))
    },
    GetWorkInfo: (Params) => {
        dispatch(WorkBasic_action.GetWorkInfo(Params))
    },

});
References.contextTypes = {
    t: PropTypes.func.isRequired
}

function mapStateToProps(state) {

    const {alert} = state;
    const {loading} = state.loading;
    const {lang} =state.i18nState.lang
    const {WorkInfo} = state.Auto_BasicInfo;
    return {
        alert,
        loading,
        lang,
        WorkInfo
    };
}





const connectedReferences = connect(mapStateToProps, mapDispatchToProps)(References);
export { connectedReferences as References };



