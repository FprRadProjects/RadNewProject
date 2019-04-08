import React, { Component } from 'react';
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { FormInfo } from "../../../locales";
import { ReferenceViewer } from "../RecordsPage";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { MenuProvider } from "react-contexify";
import { RibbonButton, ShortKeyButton } from "../../Config";
import {HideElementListModal} from "../../Basic";
import {
    design_Actions,
    BasicInfo_action, WorkActions_action
} from "../../../_actions";
import { toast } from 'react-toastify';
import {DiagramViewer} from "../../Config/DiagramViewer";

class RibbonReferences extends Component {
    constructor(props) {

        super(props);
        this.state = {
            ...this.state,
            ReferenceViewermodal: false,
            DiagramModal: false,
            HideElementListmodal: false,
            backdrop: "static",
            modalClass: "modal-dialog-centered modal-lg r-filter-modal"
        };

    }
    componentDidMount() {
        const { GetTemplateForm, GetFormInfo } = this.props;
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
        else
            toast.warn(this.context.t("msg_No_Select_Row"));

    }

    OpenDiagramViewer() {
        const { WorkInfo, SetLog, lang, SeenWork } = this.props;
        if (WorkInfo !== undefined) {
            let formName = lang == "fa" ? FormInfo.fm_dabir_natije_erja.form_name : FormInfo.fm_dabir_natije_erja.en_form_name;
            SetLog(formName);
            SeenWork(WorkInfo.peygir_id);
            this.setState({
                DiagramModal: !this.state.DiagramModal
            });
        }
        else
            this.setState({
                DiagramModal: !this.state.DiagramModal
            });
            toast.warn(this.context.t("msg_No_Select_Row"));

    }

    toggleReferenceViewer() {
        this.setState(prevState => ({
            ReferenceViewermodal: !prevState.ReferenceViewermodal
        }));

    }

    toggleDiagramViewer() {
        this.setState(prevState => ({
            DiagramModal: !prevState.DiagramModal
        }));

    }
    handleClick() {

    }
    refreshClick() {
        const { FetchData, Params } = this.props;
        Params.mark = "0";
        FetchData(Params);
    }
    setToMarkClick() {
        const { FetchData, Params, WorkInfo, InsertIntoWorkMark } = this.props;
        if (WorkInfo !== undefined) {
            InsertIntoWorkMark(WorkInfo.peygir_id, this.context.t("msg_Operation_Success")).then(data => {
                if (data.status) {
                    FetchData(Params);
                }
            });
        }
        else
            toast.warn(this.context.t("msg_No_Select_Row"));
    }

    deleteFromMarkClick() {
        const { FetchData, Params, WorkInfo, DeleteFromWorkMark } = this.props;
        if (WorkInfo !== undefined) {
            DeleteFromWorkMark(WorkInfo.peygir_id, this.context.t("msg_Operation_Success")).then(data => {
                if (data.status) {
                    FetchData(Params);
                }
            });
        }
        else
            toast.warn(this.context.t("msg_No_Select_Row"));

    }
    markViewerClick() {
        const { FetchData, Params } = this.props;
        Params.mark = "1";
        FetchData(Params);
    }
    controlpanelClick(){
        this.setState(prevState => ({
            HideElementListmodal: !prevState.HideElementListmodal
        }));
    }
    render() {
        const { WorkInfo, FetchData, Params, ShortKeys, Design } = this.props;
        const { DeletedElements } = Design !== undefined ? Design : {};
        const { EditedElements } = Design !== undefined ? Design : {};
        return (
            <div>
                <div className="r-main-box__toggle">
                    <label className="switch">
                        <input type="checkbox" id="sidebar-toggle" />
                        <span className="switch-state"></span>
                    </label>
                </div>
                <div className="r-main-box__controlpanel">
                    <a className="r-main-box__controlpanel--action"
                    title="جعبه ابزار" onClick={this.controlpanelClick.bind(this)}></a>
                </div>
                <ul className="nav nav-tabs" id="ribbon-tab">
                    <li className="nav-item"><a href="#tab1" className="nav-link active" data-toggle="tab">تب
                                    باز</a></li>
                    {/* <li className="nav-item"><a href="#tab2" className="nav-link" data-toggle="tab">تب
                                    بسته</a></li>
                    <li className="nav-item"><a href="#tab3" className="nav-link" data-toggle="tab">تب
                                    بسته</a></li>
                    <li className="nav-item"><a href="#tab4" className="nav-link" data-toggle="tab">تب
                                    بسته</a></li> */}
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
                                        <RibbonButton
                                            DeletedElements={DeletedElements}
                                            Id="refresh-information"
                                            handleClick={this.refreshClick.bind(this)}
                                            EditedElements={EditedElements}
                                            Text="RefreshInformation"
                                        />

                                        {/* نتیجه ارجاع */}
                                        <RibbonButton
                                            DeletedElements={DeletedElements}
                                            Id="referral-result"
                                            handleClick={this.OpenReferenceViewer.bind(this)}
                                            EditedElements={EditedElements}
                                            Text="ReferralResult"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="tab-panel-group">
                                <div className="tab-group-caption">نشانه گذاری</div>
                                <div className="tab-group-content">
                                    <div className="tab-content-segment">
                                        {/* نشانه ها */}
                                        <RibbonButton
                                            DeletedElements={DeletedElements}
                                            Id="marks"
                                            handleClick={this.markViewerClick.bind(this)}
                                            EditedElements={EditedElements}
                                            Text="Marks"
                                        />

                                        {/* حذف نشانه  */}
                                        <RibbonButton
                                            DeletedElements={DeletedElements}
                                            Id="remove-mark"
                                            handleClick={this.deleteFromMarkClick.bind(this)}
                                            EditedElements={EditedElements}
                                            Text="RemoveMark"
                                        />

                                        {/* نشانه گذاری  */}
                                        <RibbonButton
                                            DeletedElements={DeletedElements}
                                            Id="marking"
                                            handleClick={this.setToMarkClick.bind(this)}
                                            EditedElements={EditedElements}
                                            Text="Marking"
                                        />

                                    </div>
                                </div>
                            </div>
                            <div className="tab-panel-group">
                                <div className="tab-group-caption">دیاگرام</div>
                                <div className="tab-group-content">
                                    <div className="tab-content-segment">
                                        {/* دیاگرام عطف  */}
                                        <RibbonButton
                                            DeletedElements={DeletedElements}
                                            Id="follow-up-diagram"
                                            handleClick={this.OpenReferenceViewer.bind(this)}
                                            EditedElements={EditedElements}
                                            Text="FollowUpDiagram"
                                        />

                                        {/* دیاگرام  */}
                                        <RibbonButton
                                            DeletedElements={DeletedElements}
                                            Id="diagram"
                                            handleClick={this.OpenDiagramViewer.bind(this)}
                                            EditedElements={EditedElements}
                                            Text="Diagram"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div role="tabpanel" className="tab-pane fade" id="tab2">
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
                    </div>*/}
                </div>
                <nav className="radialnav">
                    <a href="#" className="ellipsis"></a>
                    <MenuProvider id="menu_id">
                        <ul className="menu">
                            {ShortKeys !== undefined && Object.keys(ShortKeys).map((keyName, index) => {
                                if (ShortKeys[keyName].Element === "ShortKeyicon-referral-result") {
                                    return (
                                        <ShortKeyButton key={index} handleClick={this.OpenReferenceViewer.bind(this)}
                                            ShortKey={ShortKeys[keyName]} Id="referral-result" />
                                    )
                                }
                                else if (ShortKeys[keyName].Element === "ShortKeyicon-refresh-information") {
                                    return (
                                        <ShortKeyButton key={index} handleClick={this.refreshClick.bind(this)}
                                            ShortKey={ShortKeys[keyName]} Id="refresh-information" />
                                    )
                                }
                                else if (ShortKeys[keyName].Element === "ShortKeyicon-marks") {
                                    return (
                                        <ShortKeyButton key={index} handleClick={this.markViewerClick.bind(this)}
                                            ShortKey={ShortKeys[keyName]} Id="marks" />
                                    )
                                }
                                else if (ShortKeys[keyName].Element === "ShortKeyicon-remove-mark") {
                                    return (
                                        <ShortKeyButton key={index} handleClick={this.deleteFromMarkClick.bind(this)}
                                            ShortKey={ShortKeys[keyName]} Id="remove-mark" />
                                    )
                                }
                                else if (ShortKeys[keyName].Element === "ShortKeyicon-marking") {
                                    return (
                                        <ShortKeyButton key={index} handleClick={this.setToMarkClick.bind(this)}
                                            ShortKey={ShortKeys[keyName]} Id="marking" />
                                    )
                                }
                                else if (ShortKeys[keyName].Element === "ShortKeyicon-follow-up-diagram") {
                                    return (
                                        <ShortKeyButton key={index} handleClick={this.handleClick.bind(this)}
                                            ShortKey={ShortKeys[keyName]} Id="follow-up-diagram" />
                                    )
                                }
                                else if (ShortKeys[keyName].Element === "ShortKeyicon-diagram") {
                                    return (
                                        <ShortKeyButton key={index} handleClick={this.handleClick.bind(this)}
                                            ShortKey={ShortKeys[keyName]} Id="diagram" />
                                    )
                                }
                            })}

                        </ul>
                    </MenuProvider>

                </nav>

                {this.state.DiagramModal && <DiagramViewer modal={this.state.DiagramModal}
                                                           toggle={this.toggleDiagramViewer.bind(this)} />}


                {this.state.ReferenceViewermodal && <ReferenceViewer modal={this.state.ReferenceViewermodal}
                    toggle={this.toggleReferenceViewer.bind(this)}
                    WorkInfo={WorkInfo}
                    Params={Params} RefreshParentForm={FetchData.bind(this)}
                    ParentForm={FormInfo.fm_dabir_kartabl_erjaat} />}



                    {this.state.HideElementListmodal && <HideElementListModal modal={this.state.HideElementListmodal}
                        toggle={this.controlpanelClick.bind(this)}
                        FormId={FormInfo.fm_dabir_kartabl_erjaat.id} />}
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
    DeleteFromWorkMark: (peygir_id, msg) => {
        return dispatch(WorkActions_action.DeleteFromWorkMark(peygir_id, msg))
    },
    InsertIntoWorkMark: (peygir_id, msg) => {
        return dispatch(WorkActions_action.InsertIntoWorkMark(peygir_id, msg))
    },
});
RibbonReferences.contextTypes = {
    t: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { lang } = state.i18nState
    const { WorkInfo } = state.Auto_WorkBasic;
    const { ShortKeys } = state.Design;
    const { Design } = state;
    return {
        lang,
        WorkInfo,
        ShortKeys,
        Design
    };
}


const connectedRibbonReferences = connect(mapStateToProps, mapDispatchToProps)(RibbonReferences);
export { connectedRibbonReferences as RibbonReferences };

