import React, { useState, useEffect, useContext } from 'react'
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { FormInfo } from "../../../locales";
import { ReferenceViewer } from "../RecordsPage";
import { MenuProvider } from "react-contexify";
import { RibbonButton, ShortKeyButton, ControlPanel } from "../../Frameworks";
import { WorkDiagramViewer } from "../../Automation";
import {
    design_Actions,
    BasicInfo_action, WorkActions_action
    , WorkAccess_action, WorkBasic_action, FormBuilderBasic_action
} from "../../../_actions";
import { toast } from 'react-toastify';
import { DesignedHistoryFormBuilder } from '../../Flow/FormBuilder/DesignedHistoryFormBuilder';
import { DesignedFormBuilder } from '../../Flow/FormBuilder/DesignedFormBuilder';
import ShowWorkViewer from '../RecordsPage/ShowWorkViewer';

function RibbonReferences(props, context) {

    const [referenceViewermodal, setReferenceViewermodal] = useState(false);
    const [diagramModal, setDiagramModal] = useState(false);
    const [diagramParams, setDiagramParams] = useState({ peygir_id: 0, From: "Branch" });
    const [backdrop, setBackdrop] = useState("static");
    const [modalClass, setModalClass] = useState("modal-dialog-centered modal-lg r-filter-modal");
    const [flowFormBuilderModal, setFlowFormBuilderModal] = useState(false);
    const [historyFlowFormBuilderModal, setHistoryFlowFormBuilderModal] = useState(false);
    const [formBuilderCaptionId, setFormBuilderCaptionId] = useState(null);
    const [designPageLayout, setDesignPageLayout] = useState("partial");
    const [designPageSize, setDesignPageSize] = useState("A4");
    const [showWorkModal, setShowWorkModal] = useState(false);
    const [shortKeys, setShortKeys] = useState([]);
    const [deletedElements, setDeletedElements] = useState([]);
    const [editedElements, setEditedElements] = useState([]);
    const [formBuilderLayoutData, setFormBuilderLayoutData] = useState([]);
    const [workDiagramData, setWorkDiagramData] = useState({});

    useEffect(() => {
        let data = design_Actions.GetTemplateForm(FormInfo.fm_dabir_kartabl_erjaat.id).then(
            data => {
                setShortKeys(data.data.ShortKeys);
                setDeletedElements(data.data.DeletedElements);
                setEditedElements(data.data.EditedElements);
            }
        );
    }, []);

    function toggleFormBuilder() {
        setFlowFormBuilderModal(!flowFormBuilderModal);
    }

    function toggleHistoryFormBuilder() {
        setHistoryFlowFormBuilderModal(!historyFlowFormBuilderModal);
    }

    function OpenReferenceViewer() {
        if (props.SelectedRow !== undefined) {
            // WorkBasic_action.GetWorkInfo(props.SelectedRow).then(data => {
            // if (data.status) {
            let formName = props.lang == "fa" ? FormInfo.fm_dabir_natije_erja.form_name : FormInfo.fm_dabir_natije_erja.en_form_name;
            BasicInfo_action.SetLog(formName);
            WorkActions_action.SeenWork(props.SelectedRow.peygir_id);
            setReferenceViewermodal(!referenceViewermodal);
            // }

            // });
        } else
            toast.warn(context.t("msg_No_Select_Row"));
    }
    function WorkDiagramFun(Param) {
        return WorkBasic_action.workDiagram(Param).then(data => {
            if (data.status) {
                setWorkDiagramData(data);
            }
        });
    }
    function OpenWorkDiagramViewer() {
        if (props.SelectedRow !== undefined) {
            setDiagramParams({ peygir_id: props.SelectedRow.peygir_id, From: "Branch" });

            WorkDiagramFun({ peygir_id: props.SelectedRow.peygir_id, From: "Branch" }).then(data => {
                if (data.status) {
                    let formName = props.lang == "fa" ? FormInfo.fm_dabir_natije_erja.form_name : FormInfo.fm_dabir_natije_erja.en_form_name;
                    BasicInfo_action.SetLog(formName);
                    WorkActions_action.SeenWork(props.SelectedRow.peygir_id);
                    setDiagramModal(!diagramModal);
                }
            });

        } else
            toast.warn(context.t("msg_No_Select_Row"));
    }

    function toggleReferenceViewer() {
        setReferenceViewermodal(!referenceViewermodal);
    }
    function toggleShowWork() {
        setShowWorkModal(!showWorkModal);
    }

    function toggleWorkDiagramViewer() {
        setDiagramModal(!diagramModal);
    }
    function handleClick() {

    }
    function refreshClick() {
        props.Params.mark = "0";
        props.Params.page = 0;
        props.Params.filter = [];
        props.Params.pagesize = 0;
        props.Params.seen = 2;
        props.Params.done = 0;
        props.Params.date = 0;
        props.Params.worker = 0;
        props.Params.direction = "desc";
        props.Params.orderby = "tarikhaction";
        props.Params.calendar = "";
        props.Params.calendar = "";
        props.FetchData(props.Params);
    }
    function setToMarkClick() {
        if (props.SelectedRow !== undefined) {
            WorkActions_action.InsertIntoWorkMark(props.SelectedRow.peygir_id, context.t("msg_Operation_Success")).then(data => {
                // console.log(data)
                // if (data.status) {
                //     props.FetchData(props.Params);
                // }
            });
        }
        else
            toast.warn(context.t("msg_No_Select_Row"));
    }

    function deleteFromMarkClick() {
        if (props.SelectedRow !== undefined) {
            WorkActions_action.DeleteFromWorkMark(props.SelectedRow.peygir_id, context.t("msg_Operation_Success")).then(data => {
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
        props.Params.page = 0;
        props.FetchData(props.Params);
    }


    function HistoryFlowFormBuilderHandle() {
        const { FlowPeygirCaptionInfo, DesignedHistoryFormFieldList } = props;
        if (props.SelectedRow !== undefined) {
            //GetWorkInfo(SelectedRow).then(data2 => {
            //if (data2.status) {
            FlowPeygirCaptionInfo(props.SelectedRow.showtree_id).then(data => {
                if (data.status) {
                    if (data.data.hasFormBuilder) {
                        DesignedHistoryFormFieldList(props.SelectedRow.peygir_id, props.SelectedRow.showtree_id).then(data1 => {
                            if (data1.status) {
                                setHistoryFlowFormBuilderModal(true);
                                setFormBuilderCaptionId(data.data.CaptionId);
                                setFormBuilderLayoutData(data1.data.rows);
                                setDesignPageLayout(data.data.DesignPageLayout);
                                setDesignPageSize(data.data.DesignPageSize);
                            }
                        });
                    }
                    else
                        toast.error(context.t("msg_No_Form_Builder"));
                }

            });

            //}

            //});

        } else
            toast.warn(context.t("msg_No_Select_Row"));


    }

    function FlowFormBuilderHandle() {
        const { SelectedRow, FlowPeygirCaptionInfo, DesignedFormFieldList, GetWorkInfo } = props;
        if (props.SelectedRow !== undefined) {
            //GetWorkInfo(SelectedRow).then(data2 => {
            //  if (data2.status) {
            FormBuilderBasic_action.FlowPeygirCaptionInfo(props.SelectedRow.showtree_id).then(data => {
                if (data.status) {
                    if (data.data.hasFormBuilder) {
                        FormBuilderBasic_action.DesignedFormFieldList(props.SelectedRow.peygir_id, SelectedRow.showtree_id).then(data1 => {
                            if (data1.status) {
                                setFlowFormBuilderModal(true);
                                setFormBuilderCaptionId(data.data.CaptionId);
                                setFormBuilderLayoutData(data1.data.rows);
                                setDesignPageLayout(data.data.DesignPageLayout);
                                setDesignPageSize(data.data.DesignPageSize);
                            }
                        });
                    }
                    else
                        toast.error(context.t("msg_No_Form_Builder"));
                }

            });
            //     }

            // });
        } else
            toast.warn(context.t("msg_No_Select_Row"));


    }


    function OpenShowWork() {
        if (props.SelectedRow !== undefined) {
            setShowWorkModal(!showWorkModal);
        } else
            toast.warn(context.t("msg_No_Select_Row"));
    }


    const { FetchData, Params,
        workDiagram, WorkInfo } = props;

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
                <li className="nav-item"><a href="#referencestab1" className="nav-link active" role="tab" data-toggle="tab">{context.t("Operations")}</a></li>
            </ul>
            <div className="tab-content">
                <div className="gradient"></div>
                <div className="tab-pane fade show active" id="referencestab1">
                    <div className="tab-panel">
                        <div className="tab-panel-group">
                            <div className="tab-group-caption">{context.t("Features")}</div>
                            <div className="tab-group-content">
                                <div className="tab-content-segment">

                                    {/* بازخوانی اطلاعات */}
                                    <RibbonButton FormId={FormInfo.fm_dabir_kartabl_erjaat.id}
                                        DeletedElements={deletedElements}
                                        Id="refresh-information"
                                        handleClick={refreshClick}
                                        EditedElements={editedElements}
                                        Text="RefreshInformation"
                                    />

                                    {/* نتیجه ارجاع */}
                                    <RibbonButton FormId={FormInfo.fm_dabir_kartabl_erjaat.id}
                                        AccessInfo={FormInfo.fm_dabir_natije_erja}
                                        DeletedElements={deletedElements}
                                        Id="referral-result"
                                        handleClick={OpenReferenceViewer}
                                        EditedElements={editedElements}
                                        Text="ReferralResult"
                                    />

                                    {/* نمایش کار */}
                                    <RibbonButton FormId={FormInfo.fm_par_modiriyatkarha.id}
                                        AccessInfo={FormInfo.fm_par_modiriyatkarha}
                                        DeletedElements={deletedElements}
                                        Id="show-work"
                                        handleClick={OpenShowWork}
                                        EditedElements={editedElements}
                                        Text="frm_Show_File_Work"
                                    />

                                    <RibbonButton FormId={FormInfo.fm_dabir_kartabl_erjaat.id}
                                        DeletedElements={deletedElements}
                                        Id="process-form-builder"
                                        handleClick={FlowFormBuilderHandle}
                                        EditedElements={editedElements}
                                        Text="FlowFormBuilder"
                                    />

                                    <RibbonButton FormId={FormInfo.fm_dabir_kartabl_erjaat.id}
                                        DeletedElements={deletedElements}
                                        Id="history-process-form-builder"
                                        handleClick={HistoryFlowFormBuilderHandle}
                                        EditedElements={editedElements}
                                        Text="HistoryFlowFormBuilder"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="tab-panel-group">
                            <div className="tab-group-caption">{context.t("Marking")}</div>
                            <div className="tab-group-content">
                                <div className="tab-content-segment">
                                    {/* نشانه ها */}
                                    <RibbonButton FormId={FormInfo.fm_dabir_kartabl_erjaat.id}
                                        DeletedElements={deletedElements}
                                        Id="marks"
                                        handleClick={markViewerClick}
                                        EditedElements={editedElements}
                                        Text="Marks"
                                    />

                                    {/* حذف نشانه  */}
                                    <RibbonButton FormId={FormInfo.fm_dabir_kartabl_erjaat.id}
                                        DeletedElements={deletedElements}
                                        Id="remove-mark"
                                        handleClick={deleteFromMarkClick}
                                        EditedElements={editedElements}
                                        Text="RemoveMark"
                                    />

                                    {/* نشانه گذاری  */}
                                    <RibbonButton FormId={FormInfo.fm_dabir_kartabl_erjaat.id}
                                        DeletedElements={deletedElements}
                                        Id="marking"
                                        handleClick={setToMarkClick}
                                        EditedElements={editedElements}
                                        Text="Marking"
                                    />

                                </div>
                            </div>
                        </div>
                        <div className="tab-panel-group">
                            <div className="tab-group-caption">{context.t("Diagram")}</div>
                            <div className="tab-group-content">
                                <div className="tab-content-segment">
                                    {/* دیاگرام عطف 
                                        <RibbonButton FormId={FormInfo.fm_dabir_kartabl_erjaat.id}
                                            DeletedElements={deletedElements}
                                            Id="follow-up-diagram"
                                            handleClick={OpenReferenceViewer}
                                            EditedElements={editedElements}
                                            Text="FollowUpDiagram"
                                        /> */}

                                    {/* دیاگرام  */}
                                    <RibbonButton FormId={FormInfo.fm_dabir_kartabl_erjaat.id}
                                        AccessInfo={FormInfo.fm_par_diagram}
                                        DeletedElements={deletedElements}
                                        Id="diagram"
                                        handleClick={OpenWorkDiagramViewer}
                                        EditedElements={editedElements}
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
                <a href="javascript:void(0)" className="ellipsis"></a>
                <MenuProvider id="menu_id">
                    <ul className="menu">
                        {shortKeys !== undefined && Object.keys(shortKeys).map((keyName, index) => {
                            if (shortKeys[keyName].Element === "ShortKeyicon-referral-result") {
                                return (
                                    <ShortKeyButton FormId={FormInfo.fm_dabir_kartabl_erjaat.id} key={index} handleClick={OpenReferenceViewer}
                                        AccessInfo={FormInfo.fm_dabir_natije_erja}
                                        ShortKey={shortKeys[keyName]} Id="referral-result" tooltip={context.t("ReferralResult")} />
                                )
                            }
                            else if (shortKeys[keyName].Element === "ShortKeyicon-show-work") {
                                return (
                                    <ShortKeyButton FormId={FormInfo.fm_par_modiriyatkarha.id} key={index} handleClick={OpenShowWork}
                                        ShortKey={shortKeys[keyName]} Id="show-work" tooltip={context.t("frm_Show_File_Work")} />
                                )
                            }
                            else if (shortKeys[keyName].Element === "ShortKeyicon-refresh-information") {
                                return (
                                    <ShortKeyButton FormId={FormInfo.fm_dabir_kartabl_erjaat.id} key={index} handleClick={refreshClick}
                                        ShortKey={shortKeys[keyName]} Id="refresh-information" tooltip={context.t("RefreshInformation")} />
                                )
                            }
                            else if (shortKeys[keyName].Element === "ShortKeyicon-marks") {
                                return (
                                    <ShortKeyButton FormId={FormInfo.fm_dabir_kartabl_erjaat.id} key={index} handleClick={markViewerClick}
                                        ShortKey={shortKeys[keyName]} Id="marks" tooltip={context.t("Marks")} />
                                )
                            }
                            else if (shortKeys[keyName].Element === "ShortKeyicon-remove-mark") {
                                return (
                                    <ShortKeyButton FormId={FormInfo.fm_dabir_kartabl_erjaat.id} key={index} handleClick={deleteFromMarkClick}
                                        ShortKey={shortKeys[keyName]} Id="remove-mark" tooltip={context.t("RemoveMark")} />
                                )
                            }
                            else if (shortKeys[keyName].Element === "ShortKeyicon-marking") {
                                return (
                                    <ShortKeyButton FormId={FormInfo.fm_dabir_kartabl_erjaat.id} key={index} handleClick={setToMarkClick}
                                        ShortKey={shortKeys[keyName]} Id="marking" tooltip={context.t("Marking")} />
                                )
                            }
                            else if (shortKeys[keyName].Element === "ShortKeyicon-follow-up-diagram") {
                                return (
                                    <ShortKeyButton FormId={FormInfo.fm_dabir_kartabl_erjaat.id} key={index} handleClick={handleClick}
                                        AccessInfo={FormInfo.fm_par_diagram}
                                        ShortKey={shortKeys[keyName]} Id="follow-up-diagram" tooltip={context.t("FollowUpDiagram")} />
                                )
                            }
                            else if (shortKeys[keyName].Element === "ShortKeyicon-diagram") {
                                return (
                                    <ShortKeyButton FormId={FormInfo.fm_dabir_kartabl_erjaat.id} key={index} handleClick={OpenWorkDiagramViewer}
                                        AccessInfo={FormInfo.fm_par_diagram}
                                        ShortKey={shortKeys[keyName]} Id="diagram" tooltip={context.t("Diagram")} />
                                )
                            }
                            else if (shortKeys[keyName].Element === "ShortKeyicon-process-form-builder") {
                                return (
                                    <ShortKeyButton FormId={FormInfo.fm_dabir_kartabl_erjaat.id} key={index} handleClick={FlowFormBuilderHandle}
                                        AccessInfo={FormInfo.fm_dabir_eghdam}
                                        ShortKey={shortKeys[keyName]} Id="process-form-builder" tooltip={context.t("FlowFormBuilder")} />
                                )
                            }
                            else if (shortKeys[keyName].Element === "ShortKeyicon-history-process-form-builder") {
                                return (
                                    <ShortKeyButton FormId={FormInfo.fm_dabir_kartabl_erjaat.id} key={index} handleClick={HistoryFlowFormBuilderHandle}
                                        AccessInfo={FormInfo.fm_dabir_eghdam}
                                        ShortKey={shortKeys[keyName]} Id="history-process-form-builder" tooltip={context.t("HistoryFlowFormBuilder")} />
                                )
                            }
                        })}

                    </ul>
                </MenuProvider>

            </nav>


            {diagramModal && <WorkDiagramViewer modal={diagramModal}
                toggle={toggleWorkDiagramViewer}
                Params={diagramParams} data={workDiagramData} RefreshParentForm={WorkDiagramFun}
                SelectedRow={props.SelectedRow} />}



            {referenceViewermodal && <ReferenceViewer modal={referenceViewermodal}
                toggle={toggleReferenceViewer}
                Params={props.Params} RefreshParentForm={props.FetchData}
                ParentForm={FormInfo.fm_dabir_kartabl_erjaat}
                peygir_id={props.SelectedRow.peygir_id}
                id_tel={props.SelectedRow.id_tel}
                />}

            {historyFlowFormBuilderModal &&
                <DesignedHistoryFormBuilder modal={historyFlowFormBuilderModal}
                    toggle={toggleHistoryFormBuilder}
                    FormBuilderCaptionId={formBuilderCaptionId}
                    FormBuilderLayoutData={formBuilderLayoutData}
                    DesignPageLayout={designPageLayout}
                    DesignPageSize={designPageSize}

                />
            }

            {flowFormBuilderModal &&
                <DesignedFormBuilder modal={flowFormBuilderModal}
                    toggle={toggleFormBuilder}
                    FormBuilderCaptionId={formBuilderCaptionId}
                    FormBuilderLayoutData={formBuilderLayoutData}
                    DesignPageLayout={designPageLayout}
                    DesignPageSize={designPageSize}
                    Params={props.Params}
                    RefreshParentForm={props.FetchData}
                />
            }

            {showWorkModal && <ShowWorkViewer
                modal={showWorkModal}
                toggle={toggleShowWork}
                SelectedRow={props.SelectedRow}
            />}

        </div>
    );
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

    GetWorkInfo: (Params) => {
        return dispatch(WorkBasic_action.GetWorkInfo(Params))
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
RibbonReferences.contextTypes = {
    t: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { lang } = state.i18nState
    const { ShortKeys342 } = state.Design;
    const { WorkInfo } = state.Auto_WorkBasic;

    const { DeletedElements342 } = state.Design !== undefined ? state.Design : {};
    const { EditedElements342 } = state.Design !== undefined ? state.Design : {};
    return {
        lang,
        ShortKeys: ShortKeys342,
        DeletedElements: DeletedElements342,
        EditedElements: EditedElements342,
        WorkInfo

    };
}


const connectedRibbonReferences = connect(mapStateToProps, mapDispatchToProps)(RibbonReferences);
export { connectedRibbonReferences as RibbonReferences };

