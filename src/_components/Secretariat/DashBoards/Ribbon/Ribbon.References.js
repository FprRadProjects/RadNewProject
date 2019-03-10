import React, { Component } from 'react';
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { FormInfo } from "../../../../locales";
import { ReferenceViewer } from "../../RecordsPage";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {
    Act_Reference,
    design_Actions,
    WorkBasic_action,
    BasicInfo_action, WorkActions_action
} from "../../../../_actions";

class RibbonReferences extends Component {
    constructor(props) {

        super(props);
        this.state = {
            ...this.state,
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


    OpenReferenceViewer() {
        const { WorkInfo, SetLog, lang, SeenWork } = this.props;
        if (WorkInfo !== undefined) {
            let formName = lang == "fa" ? FormInfo.fm_dabir_natije_erja.form_name : FormInfo.fm_dabir_natije_erja.en_form_name;
            SetLog(formName);
            SeenWork(WorkInfo.peygir_id);
            this.setState({
                ReferenceViewermodal: !this.state.ReferenceViewermodal
            });
        }
    }

    toggleReferenceViewer() {
        this.setState(prevState => ({
            ReferenceViewermodal: !prevState.ReferenceViewermodal
        }));

    }

    render() {
        const { WorkInfo, FetchData, Params } = this.props;
        return (
            <div>
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
                                        {/* بازخوانی اطلاعات */}
                                        <a href="#!">
                                            <i className="icon refresh-information"></i>
                                            <span>{this.context.t("RefreshInformation")}</span>
                                        </a>
                                        {/* نتیجه ارجاع */}
                                        <a onClick={this.OpenReferenceViewer.bind(this)}>
                                            <i className="icon referral-result"></i>
                                            <span>{this.context.t("ReferralResult")}</span>
                                        </a>

                                    </div>
                                </div>
                            </div>
                            <div className="tab-panel-group">
                                <div className="tab-group-caption">نشانه گذاری</div>
                                <div className="tab-group-content">
                                    <div className="tab-content-segment">
                                        {/* نشانه ها */}
                                        <a href="#!">
                                            <i className="icon marks"></i>
                                            <span>{this.context.t("Marks")}</span>
                                        </a>
                                        {/* حذف نشانه  */}
                                        <a href="#!">
                                            <i className="icon remove-mark"></i>
                                            <span>{this.context.t("RemoveMark")}</span>
                                        </a>
                                        {/* حذف نشانه  */}
                                        <a href="#!">
                                            <i className="icon marking"></i>
                                            <span>{this.context.t("Marking")}</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-panel-group">
                                <div className="tab-group-caption">دیاگرام</div>
                                <div className="tab-group-content">
                                    <div className="tab-content-segment">
                                        {/* دیاگرام عطف  */}
                                        <a href="#!">
                                            <i className="icon follow-up-diagram"></i>
                                            <span>{this.context.t("FollowUpDiagram")}</span>
                                        </a>
                                        {/* دیاگرام  */}
                                        <a href="#!">
                                            <i className="icon diagram"></i>
                                            <span>{this.context.t("Diagram")}</span>
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


                {this.state.ReferenceViewermodal && <ReferenceViewer modal={this.state.ReferenceViewermodal}
                    toggle={this.toggleReferenceViewer.bind(this)}
                    WorkInfo={WorkInfo}
                    Params={Params} RefreshParentForm={FetchData.bind(this)}
                    ParentForm={FormInfo.fm_dabir_kartabl_erjaat} />}
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => ({
    GetTemplateForm: (Params) => {
        dispatch(design_Actions.GetTemplateForm(Params))
    },
    SetLog: (Form) => {
        dispatch(BasicInfo_action.SetLog(Form))
    },
    SeenWork: (peygir_id) => {
        dispatch(WorkActions_action.SeenWork(peygir_id))
    },
});
RibbonReferences.contextTypes = {
    t: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { lang } = state.i18nState
    const { WorkInfo } = state.Auto_BasicInfo;
    return {
        lang,
        WorkInfo
    };
}


const connectedRibbonReferences = connect(mapStateToProps, mapDispatchToProps)(RibbonReferences);
export { connectedRibbonReferences as RibbonReferences };

