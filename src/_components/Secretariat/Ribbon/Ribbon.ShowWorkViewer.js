import React, { useState, useEffect, useContext } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
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


const RibbonShowWorkViewer = (props, context) => {
    const [referenceViewermodal, setReferenceViewermodal] = useState(false);
    const [referralmodal, setReferralmodal] = useState(false);
    const [flowFormBuilderModal, setFlowFormBuilderModal] = useState(false);
    const [historyFlowFormBuilderModal, setHistoryFlowFormBuilderModal] = useState(false);
    const [formBuilderCaptionId, setFormBuilderCaptionId] = useState(null);
    const [formBuilderLayoutData, setFormBuilderLayoutData] = useState([]);
    const [backdrop] = useState("static");
    const [modalClass] = useState("modal-dialog-centered modal-xl r-modal");
    const [designPageLayout, setDesignPageLayout] = useState("partial");
    const [designPageSize, setDesignPageSize] = useState("A4");
    const lang = useSelector(state => state.lang)

    useEffect(() => {
        props.GetTemplateForm(FormInfo.fm_dabir_natije_erja.id);
        return () => { }
    }, []);

    // constructor(props) {

    //     super(props);
    //     this.state = {
    //         ...this.state,
    //         ReferenceViewermodal: false,
    //         Referralmodal: false,
    //         backdrop: "static",
    //         modalClass: "modal-dialog-centered modal-xl r-modal",
    //         FlowFormBuilderModal: false,
    //         HistoryFlowFormBuilderModal: false,
    //         FormBuilderCaptionId: null,
    //         FormBuilderLayoutData: [],
    //         DesignPageLayout: "partial",
    //         DesignPageSize: "A4"
    //     };

    // }
    // componentDidMount() {
    //     const { GetTemplateForm } = this.props;
    //     GetTemplateForm(FormInfo.fm_dabir_natije_erja.id);
    // }


    function OpenReferenceViewer() {
        if (props.WorkInfo !== undefined) {
            let formName = lang == "fa" ? FormInfo.fm_dabir_natije_erja.form_name : FormInfo.fm_dabir_natije_erja.en_form_name;
            props.SetLog(formName);
            props.SeenWork(props.WorkInfo.peygir_id);
            setReferenceViewermodal(!referenceViewermodal)
        }
        else
            toast.warn(context.t("msg_No_Select_Row"));

    }

    function refreshClick() {
        props.Params.mark = "0";
        props.FetchData(props.Params);
    }
    function setToMarkClick() {
        if (props.WorkInfo !== undefined) {
            props.InsertIntoWorkMark(props.WorkInfo.peygir_id, context.t("msg_Operation_Success")).then(data => {
                if (data.status) {
                    props.FetchData(props.Params);
                }
            });
        }
        else
            toast.warn(context.t("msg_No_Select_Row"));
    }

    function deleteFromMarkClick() {
        if (props.WorkInfo !== undefined) {
            props.DeleteFromWorkMark(props.WorkInfo.peygir_id, context.t("msg_Operation_Success")).then(data => {
                if (data.status) {
                    props.FetchData(props.Params);
                }
            });
        }
        else
            toast.warn(context.t("msg_No_Select_Row"));

    }
    function markViewerClick() {
        props.Params.mark = "1";
        props.FetchData(props.Params);
    }

    function ReferralHandle() {
        if (props.WorkInfo !== undefined) {
            props.CanSubOnWork(props.WorkInfo.peygir_id, props.WorkInfo.id_tel, context.t("frm_New_Referral"), "referral").then(data => {
                if (data.status) {
                    setReferralmodal(true)
                }
            });
        }
        else
            toast.warn(context.t("msg_No_Select_Row"));

    }
    function HistoryFlowFormBuilderHandle() {
        props.FlowPeygirCaptionInfo(props.WorkInfo.showtree_id).then(data => {
            if (data.status) {
                if (data.data.hasFormBuilder) {
                    props.DesignedHistoryFormFieldList(props.WorkInfo.peygir_id, props.WorkInfo.showtree_id).then(data1 => {
                        if (data1.status) {

                            setHistoryFlowFormBuilderModal(true)
                            setFormBuilderCaptionId(data.data.CaptionId)
                            setFormBuilderLayoutData(data.data.rows)
                            setDesignPageLayout(data.data.DesignPageLayout)
                            setDesignPageSize(data.data.DesignPageSize)
                        }
                    });
                }
                else
                    toast.error(context.t("msg_No_Form_Builder"));
            }

        });
    }
    function FlowFormBuilderHandle() {
        props.FlowPeygirCaptionInfo(props.WorkInfo.showtree_id).then(data => {
            if (data.status) {
                if (data.data.hasFormBuilder) {
                    props.DesignedFormFieldList(props.WorkInfo.peygir_id, props.WorkInfo.showtree_id).then(data1 => {
                        if (data1.status) {
                            setFlowFormBuilderModal(true)
                            setFormBuilderCaptionId(data.data.CaptionId)
                            setFormBuilderLayoutData(data.data.rows)
                            setDesignPageLayout(data.data.DesignPageLayout)
                            setDesignPageSize(data.data.DesignPageSize)
                        }
                    });
                }
                else
                    toast.error(context.t("msg_No_Form_Builder"));
            }
        });
    }

    function rebuildHandle() {
        props.RebuildWork(props.WorkInfo.peygir_id, context.t("msg_Operation_Success")).then(data => {
            if (data.status) {
                if (props.RefreshParentForm !== undefined)
                    props.RefreshParentForm(props.Params);
                props.FetchWorkInfo(props.WorkInfo.peygir_id);
            }
        });
    }
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
                <li className="nav-item"><a href="#referenceviewertab1" className="nav-link active" role="tab" data-toggle="tab">{context.t("Operations")}</a></li>
            </ul>
            <div className="tab-content">
                <div className="gradient"></div>
                <div className="tab-pane fade show active" id="referenceviewertab1" role="tabpanel">
                    <div className="tab-panel">
                        <div className="tab-panel-group">
                            <div className="tab-group-caption">{context.t("Submit")}</div>
                            <div className="tab-group-content">
                                <div className="tab-content-segment">
                                    <RibbonButton FormId={FormInfo.fm_dabir_natije_erja.id}
                                        DeletedElements={props.DeletedElements}
                                        Id="confirmation"
                                        handleClick={props.ConfirmationHandle}
                                        EditedElements={props.EditedElements}
                                        Text="Confirmation"
                                    />
                                    <RibbonButton FormId={FormInfo.fm_dabir_natije_erja.id}
                                        DeletedElements={props.DeletedElements}
                                        Id="rebuild"
                                        handleClick={rebuildHandle}
                                        EditedElements={props.EditedElements}
                                        Text="Rebuild"
                                    />
                                    <RibbonButton FormId={FormInfo.fm_dabir_natije_erja.id}
                                        DeletedElements={props.DeletedElements}
                                        Id="save"
                                        handleClick={props.saveWorkHandle.bind(this, context.t("msg_Operation_Success"))}
                                        EditedElements={props.EditedElements}
                                        Text="Save"
                                    />


                                </div>
                            </div>
                        </div>
                        <div className="tab-panel-group">
                            <div className="tab-group-caption">{context.t("Operations")}</div>
                            <div className="tab-group-content">
                                <div className="tab-content-segment">
                                    <RibbonButton FormId={FormInfo.fm_dabir_natije_erja.id}
                                        DeletedElements={props.DeletedElements}
                                        Id="referral"
                                        AccessInfo={FormInfo.fm_dabir_eghdam}
                                        handleClick={ReferralHandle}
                                        EditedElements={props.EditedElements}
                                        Text="Referral"
                                    />
                                    <RibbonButton FormId={FormInfo.fm_dabir_natije_erja.id}
                                        DeletedElements={props.DeletedElements}
                                        Id="process-form-builder"
                                        handleClick={FlowFormBuilderHandle}
                                        EditedElements={props.EditedElements}
                                        Text="FlowFormBuilder"
                                    />
                                    <RibbonButton FormId={FormInfo.fm_dabir_natije_erja.id}
                                        DeletedElements={props.DeletedElements}
                                        Id="history-process-form-builder"
                                        handleClick={HistoryFlowFormBuilderHandle}
                                        EditedElements={props.EditedElements}
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
                        {props.ShortKeys !== undefined && Object.keys(props.ShortKeys).map((keyName, index) => {
                            if (props.ShortKeys[keyName].Element === "ShortKeyicon-confirmation") {
                                return (
                                    <ShortKeyButton FormId={FormInfo.fm_dabir_natije_erja.id} key={index} handleClick={props.ConfirmationHandle}
                                        ShortKey={props.ShortKeys[keyName]} Id="confirmation" tooltip={context.t("Confirmation")} />
                                )
                            }
                            else if (props.ShortKeys[keyName].Element === "ShortKeyicon-save") {
                                return (
                                    <ShortKeyButton FormId={FormInfo.fm_dabir_natije_erja.id} key={index} handleClick={props.saveWorkHandle}
                                        ShortKey={props.ShortKeys[keyName]} Id="save" tooltip={context.t("Save")} />
                                )
                            }
                            else if (props.ShortKeys[keyName].Element === "ShortKeyicon-rebuild") {
                                return (
                                    <ShortKeyButton FormId={FormInfo.fm_dabir_natije_erja.id} key={index} handleClick={props.rebuildHandle}
                                        ShortKey={props.ShortKeys[keyName]} Id="rebuild" tooltip={context.t("Rebuild")} />
                                )
                            }
                            else if (props.ShortKeys[keyName].Element === "ShortKeyicon-referral") {
                                return (
                                    <ShortKeyButton FormId={FormInfo.fm_dabir_natije_erja.id} key={index} handleClick={ReferralHandle}
                                        AccessInfo={FormInfo.fm_dabir_eghdam}
                                        ShortKey={props.ShortKeys[keyName]} Id="referral" tooltip={context.t("Referral")} />
                                )
                            }
                            else if (props.ShortKeys[keyName].Element === "ShortKeyicon-process-form-builder") {
                                return (
                                    <ShortKeyButton FormId={FormInfo.fm_dabir_natije_erja.id} key={index} handleClick={FlowFormBuilderHandle}
                                        AccessInfo={FormInfo.fm_dabir_eghdam}
                                        ShortKey={props.ShortKeys[keyName]} Id="process-form-builder" tooltip={context.t("FlowFormBuilder")} />
                                )
                            }
                            else if (props.ShortKeys[keyName].Element === "ShortKeyicon-history-process-form-builder") {
                                return (
                                    <ShortKeyButton FormId={FormInfo.fm_dabir_natije_erja.id} key={index} handleClick={HistoryFlowFormBuilderHandle}
                                        AccessInfo={FormInfo.fm_dabir_eghdam}
                                        ShortKey={props.ShortKeys[keyName]} Id="history-process-form-builder" tooltip={context.t("HistoryFlowFormBuilder")} />
                                )
                            }
                        })}
                    </ul>
                </MenuProvider>
            </nav>


            {referenceViewermodal && <ReferenceViewer modal={referenceViewermodal}
                toggle={setReferenceViewermodal(!referenceViewermodal)}
                WorkInfo={props.WorkInfo}
                Params={props.Params} RefreshParentForm={props.FetchData}
                ParentForm={FormInfo.fm_dabir_kartabl_erjaat} />}

            {referralmodal &&
                <NewReferral modal={referralmodal}
                    toggle={setReferralmodal(!referralmodal)}
                    RefreshParentForm={props.RefreshParentForm}
                    Params={props.Params}
                />
            }
            {flowFormBuilderModal &&
                <DesignedFormBuilder modal={flowFormBuilderModal}
                    toggle={setFlowFormBuilderModal(!flowFormBuilderModal)}
                    FormBuilderCaptionId={formBuilderCaptionId}
                    FormBuilderLayoutData={formBuilderLayoutData}
                    DesignPageLayout={designPageLayout}
                    DesignPageSize={designPageSize}
                    Params={props.Params}
                    RefreshParentForm={props.RefreshParentForm}
                />
            }
            {historyFlowFormBuilderModal &&
                <DesignedHistoryFormBuilder modal={historyFlowFormBuilderModal}
                    toggle={setHistoryFlowFormBuilderModal(!historyFlowFormBuilderModal)}
                    FormBuilderCaptionId={formBuilderCaptionId}
                    RefreshParentForm={props.RefreshParentForm}
                    FormBuilderLayoutData={formBuilderLayoutData}
                    DesignPageLayout={designPageSize}
                    Params={props.Params}
                />
            }
        </div>
    );
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
RibbonShowWorkViewer.contextTypes = {
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


const connectedRibbonShowWorkViewer = connect(mapStateToProps, mapDispatchToProps)(RibbonShowWorkViewer);
export { connectedRibbonShowWorkViewer as RibbonShowWorkViewer };

