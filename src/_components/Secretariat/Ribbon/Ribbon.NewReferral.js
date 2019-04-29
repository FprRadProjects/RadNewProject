import React, { Component } from 'react';
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { FormInfo } from "../../../locales";
import { MenuProvider } from "react-contexify";
import { RibbonButton, ShortKeyButton } from "../../Config";
import { HideElementListModal, EditTextElementListModal } from "../../Basic";
import {AttachmentsReview } from "../../Archives";
import {
    design_Actions
} from "../../../_actions";

class RibbonNewReferral extends Component {
    constructor(props) {

        super(props);
        this.state = {
            ...this.state,
            EditTextElementListmodal: false,
            backdrop: "static",
            modalClass: "modal-dialog-centered modal-xl r-modal"
        };

    }
    componentDidMount() {
        const { GetTemplateForm } = this.props;
        GetTemplateForm(FormInfo.fm_dabir_eghdam.id);
    }




    attachmentsHandle() {
        this.setState({
            AttachmentReviewmodal: !this.state.AttachmentReviewmodal
        });

    }

    controlpanelClick(e) {
        const { name } = e.target;
        if (name === "hide")
            this.setState(prevState => ({
                HideElementListmodal: !prevState.HideElementListmodal
            }));
        else if (name === "edit")
            this.setState(prevState => ({
                EditTextElementListmodal: !prevState.EditTextElementListmodal
            }));
    }

    render() {
        const { WorkInfo, saveReferralHandle, ShortKeys, DeletedElements, EditedElements } = this.props;
        return (
            <div>
                <div className="r-main-box__toggle">
                    <label className="switch">
                        <input type="checkbox" id="sidebar-toggle" />
                        <span className="switch-state"></span>
                    </label>
                </div>

                <div className="r-main-box__controlpanel">

                    <div class="dropdown ltr">
                        <a className="r-main-box__controlpanel--action dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></a>
                        <div className="dropdown-menu">
                            <a className="dropdown-item"
                                title={this.context.t("Toolbox")} name="hide" onClick={this.controlpanelClick.bind(this)}>{this.context.t("DeletedControlManagement")}</a>
                            <a className="dropdown-item"
                                title={this.context.t("Toolbox")} name="edit" onClick={this.controlpanelClick.bind(this)}>{this.context.t("LabelManagement")}</a>
                        </div>
                    </div>
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
                                            handleClick={saveReferralHandle.bind(this)}
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
                                        <ShortKeyButton FormId={FormInfo.fm_dabir_eghdam.id} key={index} handleClick={saveReferralHandle.bind(this)}
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
                {this.state.EditTextElementListmodal && <EditTextElementListModal modal={this.state.EditTextElementListmodal}
                    toggle={this.controlpanelClick.bind(this)}
                    FormId={FormInfo.fm_dabir_eghdam.id} />}
                {this.state.AttachmentReviewmodal &&
                    <AttachmentsReview modal={this.state.AttachmentReviewmodal}
                        toggle={this.attachmentsHandle.bind(this)}
                        parentPeygirId={WorkInfo.peygir_id} peygir_id={0} />}
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => ({

    GetTemplateForm: (Params) => {
        dispatch(design_Actions.GetTemplateForm(Params))
    },

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

