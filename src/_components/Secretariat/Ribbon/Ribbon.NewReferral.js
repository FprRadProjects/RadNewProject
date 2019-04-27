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

import { toast } from 'react-toastify';
var ConfirmParams = { form: "", page: 1, pagesize: 10, filter: [], Form: "", SaveParams: {} };

class RibbonNewReferral extends Component {
    constructor(props) {

        super(props);
        this.state = {
            ...this.state,
            backdrop: "static",
            modalClass: "modal-dialog-centered modal-xl r-modal"
        };

    }
    componentDidMount() {
        const { GetTemplateForm } = this.props;
        GetTemplateForm(FormInfo.fm_dabir_eghdam.id);
    }


   
    saveReferralHandle = (msg) => {
      
    }

    attachmentsHandle() {
        
    }
   
    controlpanelClick() {
        this.setState(prevState => ({
            HideElementListmodal: !prevState.HideElementListmodal
        }));
    }
    
    render() {
        const { WorkInfo, FetchData, Params, ShortKeys, DeletedElements, EditedElements, RefreshParentForm, ParentForm
            , FetchWorkInfo
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
                                <div className="tab-group-caption">عملیات</div>
                                <div className="tab-group-content">
                                    <div className="tab-content-segment">
                                        <RibbonButton FormId={FormInfo.fm_dabir_eghdam.id}
                                            DeletedElements={DeletedElements}
                                            Id="attachments"
                                            handleClick={this.attachmentsHandle.bind(this)}
                                            EditedElements={EditedElements}
                                            Text="Attachments"
                                        />
                                        <RibbonButton FormId={FormInfo.fm_dabir_eghdam.id}
                                            DeletedElements={DeletedElements}
                                            Id="save-referral"
                                            handleClick={this.saveReferralHandle.bind(this)}
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
                                if (ShortKeys[keyName].Element === "ShortKeyicon-attachments") {
                                    return (
                                        <ShortKeyButton FormId={FormInfo.fm_dabir_eghdam.id} key={index} handleClick={this.attachmentsHandle.bind(this)}
                                            ShortKey={ShortKeys[keyName]} Id="attachments" />
                                    )
                                }
                                else if (ShortKeys[keyName].Element === "ShortKeyicon-save-referral") {
                                    return (
                                        <ShortKeyButton FormId={FormInfo.fm_dabir_eghdam.id} key={index} handleClick={this.saveReferralHandle.bind(this)}
                                            ShortKey={ShortKeys[keyName]} Id="save-referral" />
                                    )
                                }
                            })}
                        </ul>
                    </MenuProvider>
                </nav>

               {this.state.HideElementListmodal && <HideElementListModal modal={this.state.HideElementListmodal}
                    toggle={this.controlpanelClick.bind(this)}
                    FormId={FormInfo.fm_dabir_eghdam.id} />}
                {/*  {this.state.ReferenceViewermodal && <ReferenceViewer modal={this.state.ReferenceViewermodal}
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
                    <Modal isOpen={this.state.Referralmodal} className={this.state.modalClass} >
                        <ModalHeader>{this.context.t("frm_Referral")}</ModalHeader>
                        <ModalBody>
                            
                        </ModalBody>
                        
                    </Modal>
                } */}
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
RibbonNewReferral.contextTypes = {
    t: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { lang } = state.i18nState
    const { WorkInfo } = state.Auto_WorkBasic;
    const { ShortKeys310 } = state.Design;
    const { DeletedElements310 } = state.Design !== undefined ? state.Design : {};
    const { EditedElements310 } = state.Design !== undefined ? state.Design : {};
    return {
        lang,
        WorkInfo,
        ShortKeys: ShortKeys310,
        DeletedElements: DeletedElements310,
        EditedElements: EditedElements310
    };
}


const connectedRibbonNewReferral = connect(mapStateToProps, mapDispatchToProps)(RibbonNewReferral);
export { connectedRibbonNewReferral as RibbonNewReferral };

