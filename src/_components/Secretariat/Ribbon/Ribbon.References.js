import React, { Component } from 'react';
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { FormInfo } from "../../../locales";
import { ReferenceViewer } from "../RecordsPage";
import { MenuProvider } from "react-contexify";
import { RibbonButton, ShortKeyButton,ControlPanel } from "../../Frameworks";
import { WorkDiagramViewer } from "../../Automation";
import {
    design_Actions,

    BasicInfo_action, WorkActions_action
    , WorkAccess_action, WorkBasic_action
} from "../../../_actions";
import { toast } from 'react-toastify';
class RibbonReferences extends Component {
    constructor(props) {

        super(props);
        this.state = {
            ...this.state,
            ReferenceViewermodal: false,
            DiagramModal: false,
            DiagramParams:{peygir_id:0,From:"Branch"},
            backdrop: "static",
            modalClass: "modal-dialog-centered modal-lg r-filter-modal"
        };

    }
    componentDidMount() {
        const { GetTemplateForm } = this.props;
        GetTemplateForm(FormInfo.fm_dabir_kartabl_erjaat.id);
    }


    OpenReferenceViewer() {
        const { SelectedRow, SetLog, lang, SeenWork, GetWorkInfo } = this.props;
        if (SelectedRow !== undefined) {
            GetWorkInfo(SelectedRow).then(data => {
                if (data.status) {
                    let formName = lang == "fa" ? FormInfo.fm_dabir_natije_erja.form_name : FormInfo.fm_dabir_natije_erja.en_form_name;
                    SetLog(formName);
                    SeenWork(SelectedRow.peygir_id);
                    this.setState({
                        ReferenceViewermodal: !this.state.ReferenceViewermodal
                    });
                }

            });
        } else
            toast.warn(this.context.t("msg_No_Select_Row"));
    }

    OpenWorkDiagramViewer() {
        const { SelectedRow, SetLog, lang, SeenWork, workDiagram } = this.props;
        if (SelectedRow !== undefined) {
            this.setState({DiagramParams:{peygir_id:SelectedRow.peygir_id,From:"Branch"}});
            workDiagram({peygir_id:SelectedRow.peygir_id,From:"Branch"}).then(data => {
                if (data.status) {
                    let formName = lang == "fa" ? FormInfo.fm_dabir_natije_erja.form_name : FormInfo.fm_dabir_natije_erja.en_form_name;
                    SetLog(formName);
                    SeenWork(SelectedRow.peygir_id);
                    this.setState({
                        DiagramModal: !this.state.DiagramModal
                    });
                }
            });

        } else
            toast.warn(this.context.t("msg_No_Select_Row"));
    }

    toggleReferenceViewer() {

        this.setState(prevState => ({
            ReferenceViewermodal: !prevState.ReferenceViewermodal
        }));

    }

    toggleWorkDiagramViewer() {
        this.setState(prevState => ({
            DiagramModal: !prevState.DiagramModal
        }));

    }
    handleClick() {

    }
    refreshClick() {
        const { FetchData, Params } = this.props;
        Params.mark = "0";
        Params.page = 0;
        Params.filter = [];
        Params.pagesize = 0;
        Params.seen = 2;
        Params.done = 0;
        Params.date = 0;
        Params.worker = 0;
        Params.direction = "desc";
        Params.orderby = "tarikhaction";
        Params.calendar = "";
        Params.calendar = "";
        FetchData(Params);
    }
    setToMarkClick() {
        const { FetchData, Params, SelectedRow, InsertIntoWorkMark } = this.props;
        if (SelectedRow !== undefined) {
            InsertIntoWorkMark(SelectedRow.peygir_id, this.context.t("msg_Operation_Success")).then(data => {
                if (data.status) {
                    FetchData(Params);
                }
            });
        }
        else
            toast.warn(this.context.t("msg_No_Select_Row"));
    }

    deleteFromMarkClick() {
        const { FetchData, Params, SelectedRow, DeleteFromWorkMark } = this.props;
        if (SelectedRow !== undefined) {
            DeleteFromWorkMark(SelectedRow.peygir_id, this.context.t("msg_Operation_Success")).then(data => {
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
        Params.page = 0;
        FetchData(Params);
    }
   
    render() {


        const { SelectedRow, FetchData, Params, ShortKeys, DeletedElements, EditedElements,
            workDiagram } = this.props;

        return (
            <div>
                <div className="r-main-box__toggle">
                    <label className="switch">
                        <input type="checkbox" id="sidebar-toggle" />
                        <span className="switch-state"></span>
                    </label>
                </div>
                <ControlPanel FormInfoId={FormInfo.fm_dabir_kartabl_erjaat.id}></ControlPanel>

                <ul className="nav nav-tabs" id="ribbon-tab">
                    <li className="nav-item"><a href="#referencestab1" className="nav-link active" role="tab" data-toggle="tab">{this.context.t("Operations")}</a></li>
                </ul>
                <div className="tab-content">
                    <div className="gradient"></div>
                    <div className="tab-pane fade show active" id="referencestab1">
                        <div className="tab-panel">
                            <div className="tab-panel-group">
                                <div className="tab-group-caption">{this.context.t("Features")}</div>
                                <div className="tab-group-content">
                                    <div className="tab-content-segment">
                                        {/* بازخوانی اطلاعات */}
                                        <RibbonButton FormId={FormInfo.fm_dabir_kartabl_erjaat.id}
                                            DeletedElements={DeletedElements}
                                            Id="refresh-information"
                                            handleClick={this.refreshClick.bind(this)}
                                            EditedElements={EditedElements}
                                            Text="RefreshInformation"
                                        />

                                        {/* نتیجه ارجاع */}
                                        <RibbonButton FormId={FormInfo.fm_dabir_kartabl_erjaat.id}
                                            AccessInfo={FormInfo.fm_dabir_natije_erja}
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
                                <div className="tab-group-caption">{this.context.t("Marking")}</div>
                                <div className="tab-group-content">
                                    <div className="tab-content-segment">
                                        {/* نشانه ها */}
                                        <RibbonButton FormId={FormInfo.fm_dabir_kartabl_erjaat.id}
                                            DeletedElements={DeletedElements}
                                            Id="marks"
                                            handleClick={this.markViewerClick.bind(this)}
                                            EditedElements={EditedElements}
                                            Text="Marks"
                                        />

                                        {/* حذف نشانه  */}
                                        <RibbonButton FormId={FormInfo.fm_dabir_kartabl_erjaat.id}
                                            DeletedElements={DeletedElements}
                                            Id="remove-mark"
                                            handleClick={this.deleteFromMarkClick.bind(this)}
                                            EditedElements={EditedElements}
                                            Text="RemoveMark"
                                        />

                                        {/* نشانه گذاری  */}
                                        <RibbonButton FormId={FormInfo.fm_dabir_kartabl_erjaat.id}
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
                                <div className="tab-group-caption">{this.context.t("Diagram")}</div>
                                <div className="tab-group-content">
                                    <div className="tab-content-segment">
                                        {/* دیاگرام عطف 
                                        <RibbonButton FormId={FormInfo.fm_dabir_kartabl_erjaat.id}
                                            DeletedElements={DeletedElements}
                                            Id="follow-up-diagram"
                                            handleClick={this.OpenReferenceViewer.bind(this)}
                                            EditedElements={EditedElements}
                                            Text="FollowUpDiagram"
                                        /> */}

                                        {/* دیاگرام  */}
                                        <RibbonButton FormId={FormInfo.fm_dabir_kartabl_erjaat.id}
                                            AccessInfo={FormInfo.fm_par_diagram}
                                            DeletedElements={DeletedElements}
                                            Id="diagram"
                                            handleClick={this.OpenWorkDiagramViewer.bind(this)}
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
                                        <ShortKeyButton FormId={FormInfo.fm_dabir_kartabl_erjaat.id} key={index} handleClick={this.OpenReferenceViewer.bind(this)}
                                        AccessInfo={FormInfo.fm_dabir_natije_erja}
                                        ShortKey={ShortKeys[keyName]} Id="referral-result" tooltip={this.context.t("ReferralResult")} />
                                    )
                                }
                                else if (ShortKeys[keyName].Element === "ShortKeyicon-refresh-information") {
                                    return (
                                        <ShortKeyButton FormId={FormInfo.fm_dabir_kartabl_erjaat.id} key={index} handleClick={this.refreshClick.bind(this)}
                                            ShortKey={ShortKeys[keyName]} Id="refresh-information" tooltip={this.context.t("RefreshInformation")} />
                                    )
                                }
                                else if (ShortKeys[keyName].Element === "ShortKeyicon-marks") {
                                    return (
                                        <ShortKeyButton FormId={FormInfo.fm_dabir_kartabl_erjaat.id} key={index} handleClick={this.markViewerClick.bind(this)}
                                            ShortKey={ShortKeys[keyName]} Id="marks" tooltip={this.context.t("Marks")} />
                                    )
                                }
                                else if (ShortKeys[keyName].Element === "ShortKeyicon-remove-mark") {
                                    return (
                                        <ShortKeyButton FormId={FormInfo.fm_dabir_kartabl_erjaat.id} key={index} handleClick={this.deleteFromMarkClick.bind(this)}
                                            ShortKey={ShortKeys[keyName]} Id="remove-mark" tooltip={this.context.t("RemoveMark")} />
                                    )
                                }
                                else if (ShortKeys[keyName].Element === "ShortKeyicon-marking") {
                                    return (
                                        <ShortKeyButton FormId={FormInfo.fm_dabir_kartabl_erjaat.id} key={index} handleClick={this.setToMarkClick.bind(this)}
                                            ShortKey={ShortKeys[keyName]} Id="marking" tooltip={this.context.t("Marking")} />
                                    )
                                }
                                else if (ShortKeys[keyName].Element === "ShortKeyicon-follow-up-diagram") {
                                    return (
                                        <ShortKeyButton FormId={FormInfo.fm_dabir_kartabl_erjaat.id} key={index} handleClick={this.handleClick.bind(this)}
                                        AccessInfo={FormInfo.fm_par_diagram}
                                        ShortKey={ShortKeys[keyName]} Id="follow-up-diagram" tooltip={this.context.t("FollowUpDiagram")}  />
                                    )
                                }
                                else if (ShortKeys[keyName].Element === "ShortKeyicon-diagram") {
                                    return (
                                        <ShortKeyButton FormId={FormInfo.fm_dabir_kartabl_erjaat.id} key={index} handleClick={this.OpenWorkDiagramViewer.bind(this)}
                                        AccessInfo={FormInfo.fm_par_diagram}
                                        ShortKey={ShortKeys[keyName]} Id="diagram" tooltip={this.context.t("Diagram")} />
                                    )
                                }
                            })}

                        </ul>
                    </MenuProvider>

                </nav>


                {this.state.DiagramModal && <WorkDiagramViewer modal={this.state.DiagramModal}
                    toggle={this.toggleWorkDiagramViewer.bind(this)}
                    Params={this.state.DiagramParams} RefreshParentForm={workDiagram.bind(this)}
                    SelectedRow={SelectedRow} />}



                {this.state.ReferenceViewermodal && <ReferenceViewer modal={this.state.ReferenceViewermodal}
                    toggle={this.toggleReferenceViewer.bind(this)}
                    Params={Params} RefreshParentForm={FetchData.bind(this)}
                    ParentForm={FormInfo.fm_dabir_kartabl_erjaat} />}



            </div>
        );
    }
}


const mapDispatchToProps = dispatch => ({
    workDiagram: (Params) => {
        return dispatch(WorkBasic_action.workDiagram(Params))
    }
    ,
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
    CheckAccess: (Params) => {
        return dispatch(WorkAccess_action.CheckAccess(Params))
    },
    GetWorkInfo: (Params) => {
        return dispatch(WorkBasic_action.GetWorkInfo(Params))
    },

});
RibbonReferences.contextTypes = {
    t: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { lang } = state.i18nState
    const { ShortKeys342 } = state.Design;

    const { DeletedElements342 } = state.Design !== undefined ? state.Design : {};
    const { EditedElements342 } = state.Design !== undefined ? state.Design : {};
    return {
        lang,
        ShortKeys: ShortKeys342,
        DeletedElements: DeletedElements342,
        EditedElements: EditedElements342

    };
}


const connectedRibbonReferences = connect(mapStateToProps, mapDispatchToProps)(RibbonReferences);
export { connectedRibbonReferences as RibbonReferences };

