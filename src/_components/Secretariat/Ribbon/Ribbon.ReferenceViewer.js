import React, { Component } from 'react';
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { FormInfo } from "../../../locales";
import { ReferenceViewer } from "../RecordsPage";
import { MenuProvider } from "react-contexify";
import { RibbonButton, ShortKeyButton,ControlPanel } from "../../Frameworks";
import {
    Act_Reference,
    WorkBasic_action,
    design_Actions,
    WorkActions_action,
    WorkAccess_action
} from "../../../_actions";
import { ConfirmFlow } from '../../Flow/ConfirmFlow';

import { toast } from 'react-toastify';
import { NewReferral } from '../RecordsPage/Referral.New';


class RibbonReferenceViewer extends Component {
    constructor(props) {

        super(props);
        this.state = {
            ...this.state,
            ReferenceViewermodal: false,
            Referralmodal: false,
            backdrop: "static",
            modalClass: "modal-dialog-centered modal-xl r-modal"
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

    rebuildHandle() {
        const { RebuildWork, WorkInfo, RefreshParentForm, FetchWorkInfo, Params } = this.props;
        RebuildWork(WorkInfo.peygir_id, this.context.t("msg_Operation_Success")).then(data => {
            if (data.status) {
                RefreshParentForm(Params);
                FetchWorkInfo(WorkInfo.peygir_id);
            }
        });
    }
  
    CloseleSelectFlowResult = (e) => {
        this.setState({
            FlowResultSelectmodal: !this.state.FlowResultSelectmodal,
        });
    }

    render() {
        const { WorkInfo, FetchData, Params, ShortKeys, DeletedElements, EditedElements, RefreshParentForm, ParentForm
            , FetchWorkInfo,saveWorkHandle,ConfirmationHandle
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
                    <li className="nav-item"><a href="#referenceviewertab1" className="nav-link active" role="tab" data-toggle="tab">عملیات</a></li>
                </ul>
                <div className="tab-content">
                    <div className="gradient"></div>
                    <div className="tab-pane fade show active" id="referenceviewertab1" role="tabpanel">
                        <div className="tab-panel">
                            <div className="tab-panel-group">
                                <div className="tab-group-caption">ثبت</div>
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
                                <div className="tab-group-caption">عملیات</div>
                                <div className="tab-group-content">
                                    <div className="tab-content-segment">
                                        <RibbonButton FormId={FormInfo.fm_dabir_natije_erja.id}
                                            DeletedElements={DeletedElements}
                                            Id="referral"
                                            handleClick={this.ReferralHandle.bind(this)}
                                            EditedElements={EditedElements}
                                            Text="Referral"
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
                                            ShortKey={ShortKeys[keyName]} Id="referral" tooltip={this.context.t("Referral")} />
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
                {this.state.FlowResultSelectmodal &&
                    <ConfirmFlow ParentForm={ParentForm}
                        flowResultSelectModal={this.state.FlowResultSelectmodal}
                        Params={Params} CloseleSelectFlowResult={this.CloseleSelectFlowResult.bind(this)}
                        peygir_id={WorkInfo.peygir_id} RefreshParentForm={RefreshParentForm} FetchWorkInfo={FetchWorkInfo} />}

                {this.state.Referralmodal &&
                    <NewReferral modal={this.state.Referralmodal}
                        toggle={this.toggleReferral.bind(this)}
                        RefreshParentForm={RefreshParentForm}
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

