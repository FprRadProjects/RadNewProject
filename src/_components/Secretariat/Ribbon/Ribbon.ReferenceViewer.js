import React, { Component } from 'react';
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { FormInfo } from "../../../locales";
import { ReferenceViewer } from "../RecordsPage";
import { MenuProvider } from "react-contexify";
import { RibbonButton, ShortKeyButton, ControlPanel } from "../../Frameworks";
import {
    Act_Reference,
    WorkBasic_action,
    design_Actions,
    WorkActions_action,
    WorkAccess_action,
    FormBuilderBasic_action
} from "../../../_actions";

import { ConfirmFlow } from '../../Flow/ConfirmFlow';

import { toast } from 'react-toastify';
import { NewReferral } from '../RecordsPage/Referral.New';
import { DesignedFormBuilder } from '../../Flow/FormBuilder/DesignedFormBuilder';
import { DesignedHistoryFormBuilder } from '../../Flow/FormBuilder/DesignedHistoryFormBuilder';


class RibbonReferenceViewer extends Component {
    constructor(props) {

        super(props);
        this.state = {
            ...this.state,
            ReferenceViewermodal: false,
            Referralmodal: false,
            backdrop: "static",
            modalClass: "modal-dialog-centered modal-xl r-modal",
            FlowFormBuilderModal: false,
            HistoryFlowFormBuilderModal: false,
            FormBuilderCaptionId: null,
            FormBuilderLayoutData: [],
            DesignPageLayout: "partial",
            DesignPageSize: "A4"
        };

    }
    componentDidMount() {
        const { GetTemplateForm } = this.props;
        GetTemplateForm(FormInfo.fm_dabir_natije_erja.id);
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

    toggleReferenceViewer() {
        this.setState(prevState => ({
            ReferenceViewermodal: !prevState.ReferenceViewermodal
        }));

    }
    toggleReferral() {
        this.setState(prevState => ({
            Referralmodal: !prevState.Referralmodal
        }));

    }
    toggleHistoryFormBuilder() {
        this.setState(prevState => ({
            HistoryFlowFormBuilderModal: !prevState.HistoryFlowFormBuilderModal
        }));

    }
    toggleFormBuilder() {
        this.setState(prevState => ({
            FlowFormBuilderModal: !prevState.FlowFormBuilderModal
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

    ReferralHandle() {
        const { WorkInfo, CanSubOnWork } = this.props;
        if (WorkInfo !== undefined) {
            CanSubOnWork(WorkInfo.peygir_id, WorkInfo.id_tel, this.context.t("frm_New_Referral"), "referral").then(data => {
                if (data.status) {
                    this.setState({
                        Referralmodal: true,
                    });
                }
            });
        }
        else
            toast.warn(this.context.t("msg_No_Select_Row"));

    }
    HistoryFlowFormBuilderHandle() {
        const { WorkInfo, FlowPeygirCaptionInfo, DesignedHistoryFormFieldList } = this.props;
        FlowPeygirCaptionInfo(WorkInfo.showtree_id).then(data => {
            if (data.status) {
                if (data.data.hasFormBuilder) {
                    DesignedHistoryFormFieldList(WorkInfo.peygir_id, WorkInfo.showtree_id).then(data1 => {
                        if (data1.status) {
                            this.setState({
                                HistoryFlowFormBuilderModal: true,
                                FormBuilderCaptionId: data.data.CaptionId,
                                FormBuilderLayoutData: data1.data.rows,
                                DesignPageLayout: data.data.DesignPageLayout,
                                DesignPageSize: data.data.DesignPageSize
                            });
                        }
                    });
                }
                else
                    toast.error(this.context.t("msg_No_Form_Builder"));
            }

        });






    }
    FlowFormBuilderHandle() {
        const { WorkInfo, FlowPeygirCaptionInfo, DesignedFormFieldList } = this.props;
        FlowPeygirCaptionInfo(WorkInfo.showtree_id).then(data => {
            if (data.status) {
                if (data.data.hasFormBuilder) {
                    DesignedFormFieldList(WorkInfo.peygir_id, WorkInfo.showtree_id).then(data1 => {
                        if (data1.status) {
                            this.setState({
                                FlowFormBuilderModal: true,
                                FormBuilderCaptionId: data.data.CaptionId,
                                FormBuilderLayoutData: data1.data.rows,
                                DesignPageLayout: data.data.DesignPageLayout,
                                DesignPageSize: data.data.DesignPageSize
                            });
                        }
                    });
                }
                else
                    toast.error(this.context.t("msg_No_Form_Builder"));
            }
        });
    }

    rebuildHandle() {
        const { RebuildWork, WorkInfo, RefreshParentForm, FetchWorkInfo, Params } = this.props;
        RebuildWork(WorkInfo.peygir_id, this.context.t("msg_Operation_Success")).then(data => {
            if (data.status) {
                if (RefreshParentForm !== undefined)
                    RefreshParentForm(Params);
                FetchWorkInfo(WorkInfo.peygir_id);
            }
        });
    }



    render() {
        const { WorkInfo, FetchData, Params, ShortKeys, DeletedElements, EditedElements, RefreshParentForm, ParentForm
            , FetchWorkInfo, saveWorkHandle, ConfirmationHandle,
        } = this.props;
        return (
            <div>
                <div className="r-main-box__toggle">
                    <label className="switch">
                        <input type="checkbox" id="sidebar-toggle" />
                        <span className="switch-state"></span>
                    </label>
                </div>
                <ControlPanel FormInfoId={FormInfo.fm_dabir_natije_erja.id}></ControlPanel>

                <ul className="nav nav-tabs" id="ribbon-tab">
                    <li className="nav-item"><a href="#referenceviewertab1" className="nav-link active" role="tab" data-toggle="tab">{this.context.t("Operations")}</a></li>
                </ul>
                <div className="tab-content">
                    <div className="gradient"></div>
                    <div className="tab-pane fade show active" id="referenceviewertab1" role="tabpanel">
                        <div className="tab-panel">
                            <div className="tab-panel-group">
                                <div className="tab-group-caption">{this.context.t("Submit")}</div>
                                <div className="tab-group-content">
                                    <div className="tab-content-segment">
                                        <RibbonButton FormId={FormInfo.fm_dabir_natije_erja.id}
                                            DeletedElements={DeletedElements}
                                            Id="confirmation"
                                            handleClick={ConfirmationHandle.bind(this)}
                                            EditedElements={EditedElements}
                                            Text="Confirmation"
                                        />
                                        <RibbonButton FormId={FormInfo.fm_dabir_natije_erja.id}
                                            DeletedElements={DeletedElements}
                                            Id="rebuild"
                                            handleClick={this.rebuildHandle.bind(this)}
                                            EditedElements={EditedElements}
                                            Text="Rebuild"
                                        />
                                        <RibbonButton FormId={FormInfo.fm_dabir_natije_erja.id}
                                            DeletedElements={DeletedElements}
                                            Id="save"
                                            handleClick={saveWorkHandle.bind(this, this.context.t("msg_Operation_Success"))}
                                            EditedElements={EditedElements}
                                            Text="Save"
                                        />


                                    </div>
                                </div>
                            </div>
                            <div className="tab-panel-group">
                                <div className="tab-group-caption">{this.context.t("Operations")}</div>
                                <div className="tab-group-content">
                                    <div className="tab-content-segment">
                                        <RibbonButton FormId={FormInfo.fm_dabir_natije_erja.id}
                                            DeletedElements={DeletedElements}
                                            Id="referral"
                                            AccessInfo={FormInfo.fm_dabir_eghdam}
                                            handleClick={this.ReferralHandle.bind(this)}
                                            EditedElements={EditedElements}
                                            Text="Referral"
                                        />
                                        <RibbonButton FormId={FormInfo.fm_dabir_natije_erja.id}
                                            DeletedElements={DeletedElements}
                                            Id="process-form-builder"
                                            handleClick={this.FlowFormBuilderHandle.bind(this)}
                                            EditedElements={EditedElements}
                                            Text="FlowFormBuilder"
                                        />
                                        <RibbonButton FormId={FormInfo.fm_dabir_natije_erja.id}
                                            DeletedElements={DeletedElements}
                                            Id="history-process-form-builder"
                                            handleClick={this.HistoryFlowFormBuilderHandle.bind(this)}
                                            EditedElements={EditedElements}
                                            Text="HistoryFlowFormBuilder"
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <nav className="radialnav">
                    <a href="javascript:void(0)" className="ellipsis"></a>
                    <MenuProvider id="menu_id">
                        <ul className="menu">
                            {ShortKeys !== undefined && Object.keys(ShortKeys).map((keyName, index) => {
                                if (ShortKeys[keyName].Element === "ShortKeyicon-confirmation") {
                                    return (
                                        <ShortKeyButton FormId={FormInfo.fm_dabir_natije_erja.id} key={index} handleClick={ConfirmationHandle.bind(this)}
                                            ShortKey={ShortKeys[keyName]} Id="confirmation" tooltip={this.context.t("Confirmation")} />
                                    )
                                }
                                else if (ShortKeys[keyName].Element === "ShortKeyicon-save") {
                                    return (
                                        <ShortKeyButton FormId={FormInfo.fm_dabir_natije_erja.id} key={index} handleClick={saveWorkHandle.bind(this)}
                                            ShortKey={ShortKeys[keyName]} Id="save" tooltip={this.context.t("Save")} />
                                    )
                                }
                                else if (ShortKeys[keyName].Element === "ShortKeyicon-rebuild") {
                                    return (
                                        <ShortKeyButton FormId={FormInfo.fm_dabir_natije_erja.id} key={index} handleClick={this.rebuildHandle.bind(this)}
                                            ShortKey={ShortKeys[keyName]} Id="rebuild" tooltip={this.context.t("Rebuild")} />
                                    )
                                }
                                else if (ShortKeys[keyName].Element === "ShortKeyicon-referral") {
                                    return (
                                        <ShortKeyButton FormId={FormInfo.fm_dabir_natije_erja.id} key={index} handleClick={this.ReferralHandle.bind(this)}
                                            AccessInfo={FormInfo.fm_dabir_eghdam}
                                            ShortKey={ShortKeys[keyName]} Id="referral" tooltip={this.context.t("Referral")} />
                                    )
                                }
                                else if (ShortKeys[keyName].Element === "ShortKeyicon-process-form-builder") {
                                    return (
                                        <ShortKeyButton FormId={FormInfo.fm_dabir_natije_erja.id} key={index} handleClick={this.FlowFormBuilderHandle.bind(this)}
                                            AccessInfo={FormInfo.fm_dabir_eghdam}
                                            ShortKey={ShortKeys[keyName]} Id="process-form-builder" tooltip={this.context.t("FlowFormBuilder")} />
                                    )
                                }
                                else if (ShortKeys[keyName].Element === "ShortKeyicon-history-process-form-builder") {
                                    return (
                                        <ShortKeyButton FormId={FormInfo.fm_dabir_natije_erja.id} key={index} handleClick={this.HistoryFlowFormBuilderHandle.bind(this)}
                                            AccessInfo={FormInfo.fm_dabir_eghdam}
                                            ShortKey={ShortKeys[keyName]} Id="history-process-form-builder" tooltip={this.context.t("HistoryFlowFormBuilder")} />
                                    )
                                }
                            })}
                        </ul>
                    </MenuProvider>
                </nav>


                {this.state.ReferenceViewermodal && <ReferenceViewer modal={this.state.ReferenceViewermodal}
                    toggle={this.toggleReferenceViewer.bind(this)}
                    WorkInfo={WorkInfo}
                    Params={Params} RefreshParentForm={FetchData.bind(this)}
                    ParentForm={FormInfo.fm_dabir_kartabl_erjaat} />}

                {this.state.Referralmodal &&
                    <NewReferral modal={this.state.Referralmodal}
                        toggle={this.toggleReferral.bind(this)}
                        RefreshParentForm={RefreshParentForm}
                        Params={Params}
                    />
                }
                {this.state.FlowFormBuilderModal &&
                    <DesignedFormBuilder modal={this.state.FlowFormBuilderModal}
                        toggle={this.toggleFormBuilder.bind(this)}
                        FormBuilderCaptionId={this.state.FormBuilderCaptionId}
                        FormBuilderLayoutData={this.state.FormBuilderLayoutData}
                        DesignPageLayout={this.state.DesignPageLayout}
                        DesignPageSize={this.state.DesignPageSize}
                        Params={Params}
                        RefreshParentForm={RefreshParentForm}
                    />
                }
                {this.state.HistoryFlowFormBuilderModal &&
                    <DesignedHistoryFormBuilder modal={this.state.HistoryFlowFormBuilderModal}
                    toggle={this.toggleHistoryFormBuilder.bind(this)}
                        FormBuilderCaptionId={this.state.FormBuilderCaptionId}
                        RefreshParentForm={RefreshParentForm}
                        FormBuilderLayoutData={this.state.FormBuilderLayoutData}
                        DesignPageLayout={this.state.DesignPageLayout}
                        DesignPageSize={this.state.DesignPageSize}
                        Params={Params}
                    />
                }
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
    RebuildWork: (Peygir_id, msg) => {
        return dispatch(WorkActions_action.RebuildWork(Peygir_id, msg))
    },
    DeleteWork: (Peygir_id, msg) => {
        dispatch(WorkActions_action.DeleteWork(Peygir_id))
    },
    FetchWorkInfo: (peygir_id) => {
        dispatch(WorkBasic_action.FetchWorkInfo(peygir_id))
    },
    CanSubOnWork: (peygir_id, id_tel, formname, from) => {
        return dispatch(WorkAccess_action.CanSubOnWork(peygir_id, id_tel, formname, from))
    },

    FlowPeygirCaptionInfo: (showtree_id) => {
        return dispatch(FormBuilderBasic_action.FlowPeygirCaptionInfo(showtree_id))
    },

    DesignedFormFieldList: (peygir_id, showtree_id) => {
        return dispatch(FormBuilderBasic_action.DesignedFormFieldList(peygir_id, showtree_id))
    },
    DesignedHistoryFormFieldList: (peygir_id, showtree_id) => {
        return dispatch(FormBuilderBasic_action.DesignedHistoryFormFieldList(peygir_id, showtree_id))
    },


});
RibbonReferenceViewer.contextTypes = {
    t: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { lang } = state.i18nState
    const { WorkInfo } = state.Auto_WorkBasic;
    const { ShortKeys340 } = state.Design;
    const { DeletedElements340 } = state.Design !== undefined ? state.Design : {};
    const { EditedElements340 } = state.Design !== undefined ? state.Design : {};
    return {
        lang,
        WorkInfo,
        ShortKeys: ShortKeys340,
        DeletedElements: DeletedElements340,
        EditedElements: EditedElements340
    };
}


const connectedRibbonReferenceViewer = connect(mapStateToProps, mapDispatchToProps)(RibbonReferenceViewer);
export { connectedRibbonReferenceViewer as RibbonReferenceViewer };

