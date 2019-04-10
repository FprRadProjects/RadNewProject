import React, { Component } from 'react';
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { FormInfo } from "../../../locales";
import { ReferenceViewer } from "../RecordsPage";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { MenuProvider } from "react-contexify";
import { RibbonButton, ShortKeyButton } from "../../Config";
import { HideElementListModal } from "../../Basic";
import {
    Act_Reference,
    WorkBasic_action,
    design_Actions,
    WorkActions_action
} from "../../../_actions";
import { ConfirmFlow } from '../../Flow/ConfirmFlow';

import { toast } from 'react-toastify';
var ConfirmParams = { form: "", page: 1, pagesize: 10, filter: [], Form: "", SaveParams: {} };

class RibbonReferenceViewer extends Component {
    constructor(props) {

        super(props);
        this.state = {
            ...this.state,
            ReferenceViewermodal: false,
            HideElementListmodal: false,
            backdrop: "static",
            modalClass: "modal-dialog-centered modal-lg r-filter-modal"
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

    saveHandle = (msg) => {
        const { ParentForm, WorkInfo, SaveWorkInfo, lang, FetchWorkInfo,
            RefreshParentForm, Params, SaveParams, clearSaveParams
        } = this.props;
        var formname = lang == "fa" ? ParentForm.form_name : ParentForm.en_form_name;
        SaveParams.data["peygir_id"] = { "peygir_id": WorkInfo.peygir_id };
        SaveParams.form = formname;
        let obj = [];
        Object.keys(SaveParams.data).map((item, index) => {
            return obj[index++] = SaveParams.data[item];
        })
        SaveParams.data = obj;
        SaveWorkInfo(SaveParams, msg).then(data => {
            if (data.status) {
                RefreshParentForm(Params);
                FetchWorkInfo(WorkInfo.peygir_id);
            }
        });
        clearSaveParams();
    }
    ConfirmationHandle = (e) => {
        const { WorkInfo, InitConfirmWork, ParentForm, lang, FetchWorkInfo, Params, 
            clearSaveParams,RefreshParentForm, SaveParams } = this.props;
        ConfirmParams["peygir_id"] = WorkInfo.peygir_id;
        var formname = lang == "fa" ? ParentForm.form_name : ParentForm.en_form_name;
        ConfirmParams["Form"] = formname;
        SaveParams.data["peygir_id"] = { "peygir_id": WorkInfo.peygir_id };
        SaveParams.form = formname;
        let obj = [];
        Object.keys(SaveParams.data).map((item, index) => {
            return obj[index++] = SaveParams.data[item];
        })
        SaveParams.data = obj;
        ConfirmParams.SaveParams = SaveParams;
        console.log(ConfirmParams.SaveParams)
        //this.saveHandle("");
        InitConfirmWork(ConfirmParams, this.context.t("msg_Operation_Success")).then(data => {
            if (data.status) {
                if (data.code === 2 && data.data !== null) {
                    this.setState({
                        FlowResultSelectmodal: true,
                    });
                }
                else {
                    FetchWorkInfo(WorkInfo.peygir_id);
                    RefreshParentForm(Params);

                }
            }
        });
        clearSaveParams();
    }
    rebuildHandle() {
        const { RebuildWork, WorkInfo, RefreshParentForm, FetchWorkInfo, Params } = this.props;
        RebuildWork(WorkInfo.peygir_id, this.context.t("msg_Operation_Success")).then(data => {
            if (data.status) {
                RefreshParentForm(Params);
                FetchWorkInfo(WorkInfo.peygir_id);
            }
        });
    }
    controlpanelClick() {
        this.setState(prevState => ({
            HideElementListmodal: !prevState.HideElementListmodal
        }));
    }
    
    CloseleSelectFlowResult = (e) => {
        this.setState({
            FlowResultSelectmodal: !this.state.FlowResultSelectmodal,
        });
    }
    
    render() {
        const { WorkInfo, FetchData, Params, ShortKeys, DeletedElements,EditedElements,RefreshParentForm ,ParentForm
            ,FetchWorkInfo
        } = this.props;
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
                    <li className="nav-item"><a href="#tab1" className="nav-link active" data-toggle="tab">عملیات</a></li>
                </ul>
                <div className="tab-content">
                    <div className="gradient"></div>
                    <div className="tab-pane active" id="tab1">
                        <div className="tab-panel">
                            <div className="tab-panel-group">
                                <div className="tab-group-caption">ثبت</div>
                                <div className="tab-group-content">
                                    <div className="tab-content-segment">
                                        <RibbonButton FormId={FormInfo.fm_dabir_natije_erja.id}
                                            DeletedElements={DeletedElements}
                                            Id="confirmation"
                                            handleClick={this.ConfirmationHandle.bind(this)}
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
                                            handleClick={this.saveHandle.bind(this, this.context.t("msg_Operation_Success"))}
                                            EditedElements={EditedElements}
                                            Text="Save"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <nav className="radialnav">
                    <a href="#" className="ellipsis"></a>
                    <MenuProvider id="menu_id">
                        <ul className="menu">
                            {ShortKeys !== undefined && Object.keys(ShortKeys).map((keyName, index) => {
                                if (ShortKeys[keyName].Element === "ShortKeyicon-confirmation") {
                                    return (
                                        <ShortKeyButton FormId={FormInfo.fm_dabir_natije_erja.id} key={index} handleClick={this.ConfirmationHandle.bind(this)}
                                            ShortKey={ShortKeys[keyName]} Id="confirmation" />
                                    )
                                }
                                else if (ShortKeys[keyName].Element === "ShortKeyicon-save") {
                                    return (
                                        <ShortKeyButton FormId={FormInfo.fm_dabir_natije_erja.id} key={index} handleClick={this.saveHandle.bind(this)}
                                            ShortKey={ShortKeys[keyName]} Id="save" />
                                    )
                                }
                                else if (ShortKeys[keyName].Element === "ShortKeyicon-rebuild") {
                                    return (
                                        <ShortKeyButton FormId={FormInfo.fm_dabir_natije_erja.id} key={index} handleClick={this.rebuildHandle.bind(this)}
                                            ShortKey={ShortKeys[keyName]} Id="rebuild" />
                                    )
                                }
                            })}
                        </ul>
                    </MenuProvider>
                </nav>

                {this.state.HideElementListmodal && <HideElementListModal modal={this.state.HideElementListmodal}
                    toggle={this.controlpanelClick.bind(this)}
                    FormId={FormInfo.fm_dabir_natije_erja.id} />}
                {this.state.ReferenceViewermodal && <ReferenceViewer modal={this.state.ReferenceViewermodal}
                    toggle={this.toggleReferenceViewer.bind(this)}
                    WorkInfo={WorkInfo}
                    Params={Params} RefreshParentForm={FetchData.bind(this)}
                    ParentForm={FormInfo.fm_dabir_kartabl_erjaat} />}
                          {this.state.FlowResultSelectmodal &&
                                    <ConfirmFlow ParentForm={ParentForm}
                                        flowResultSelectModal={this.state.FlowResultSelectmodal}
                                        Params={Params} CloseleSelectFlowResult={this.CloseleSelectFlowResult.bind(this)}
                                        peygir_id={WorkInfo.peygir_id} RefreshParentForm={RefreshParentForm} FetchWorkInfo={FetchWorkInfo}/>}
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
    SaveWorkInfo: (SaveParams, msg) => {
        return dispatch(WorkActions_action.SaveWorkInfo(SaveParams, msg));
    },
    RebuildWork: (Peygir_id, msg) => {
        return dispatch(WorkActions_action.RebuildWork(Peygir_id, msg))
    },
    DeleteWork: (Peygir_id, msg) => {
        dispatch(WorkActions_action.DeleteWork(Peygir_id))
    },
    InitConfirmWork: (Params, msg) => {
        return dispatch(WorkActions_action.InitConfirmWork(Params, msg))
    },

    FetchWorkInfo: (peygir_id) => {
        dispatch(WorkBasic_action.FetchWorkInfo(peygir_id))
    }

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
        DeletedElements:DeletedElements340,
        EditedElements:EditedElements340
    };
}


const connectedRibbonReferenceViewer = connect(mapStateToProps, mapDispatchToProps)(RibbonReferenceViewer);
export { connectedRibbonReferenceViewer as RibbonReferenceViewer };

