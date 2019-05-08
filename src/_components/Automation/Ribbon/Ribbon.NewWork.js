import React, { Component } from 'react';
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { FormInfo } from "../../../locales";
import { MenuProvider } from "react-contexify";
import { RibbonButton, ShortKeyButton } from "../../Config";
import { HideElementListModal, EditTextElementListModal } from "../../Basic";
import {
    design_Actions,
} from "../../../_actions";

class RibbonNewWork extends Component {
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
    handleClick() {

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
        const { saveWorkHandle, ShortKeys, DeletedElements, EditedElements, attachmentsToggle } = this.props;

        return (
            <div>
                <div className="r-main-box__toggle">
                    <label className="switch">
                        <input type="checkbox" id="sidebar-toggle" />
                        <span className="switch-state"></span>
                    </label>
                </div>

                <div className="r-main-box__controlpanel">

                    <div className="dropdown ltr">
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
                    <li className="nav-item"><a href="#tab1" className="nav-link active" data-toggle="tab">{this.context.t("Operations")}</a></li>
                    <li className="nav-item"><a href="#tab2" className="nav-link" data-toggle="tab">{this.context.t("Forms")}</a></li>
                </ul>
                <div className="tab-content">
                    <div className="gradient"></div>
                    <div className="tab-pane active" id="tab1">
                        <div className="tab-panel">
                            <div className="tab-panel-group">
                                <div className="tab-group-caption">{this.context.t("Operations")}</div>
                                <div className="tab-group-content">
                                    <div className="tab-content-segment">
                                        <RibbonButton FormId={FormInfo.fm_pub_sabt_kar.id}
                                            DeletedElements={DeletedElements}
                                            Id="new-work"
                                            handleClick={this.handleClick.bind(this)}
                                            EditedElements={EditedElements}
                                            Text="NewWork"
                                        />
                                        <RibbonButton FormId={FormInfo.fm_pub_sabt_kar.id}
                                            DeletedElements={DeletedElements}
                                            Id="create-work"
                                            handleClick={this.handleClick.bind(this)}
                                            EditedElements={EditedElements}
                                            Text="CreateWork"
                                        />
                                        <RibbonButton FormId={FormInfo.fm_pub_sabt_kar.id}
                                            DeletedElements={DeletedElements}
                                            Id="follow"
                                            handleClick={this.handleClick.bind(this)}
                                            EditedElements={EditedElements}
                                            Text="Follow"
                                        />
                                        <RibbonButton FormId={FormInfo.fm_pub_sabt_kar.id}
                                            DeletedElements={DeletedElements}
                                            Id="time-spent"
                                            handleClick={this.handleClick.bind(this)}
                                            EditedElements={EditedElements}
                                            Text="TimeSpent"
                                        />
                                        <RibbonButton FormId={FormInfo.fm_pub_sabt_kar.id}
                                            DeletedElements={DeletedElements}
                                            Id="edit"
                                            handleClick={this.handleClick.bind(this)}
                                            EditedElements={EditedElements}
                                            Text="Edit"
                                        />
                                        <RibbonButton FormId={FormInfo.fm_pub_sabt_kar.id}
                                            DeletedElements={DeletedElements}
                                            Id="confirmation"
                                            handleClick={this.handleClick.bind(this)}
                                            EditedElements={EditedElements}
                                            Text="WorkConfirmation"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="tab-panel-group">
                                <div className="tab-group-caption">{this.context.t("WorksCheck")}</div>
                                <div className="tab-group-content">
                                    <div className="tab-content-segment">
                                        <RibbonButton FormId={FormInfo.fm_pub_sabt_kar.id}
                                            DeletedElements={DeletedElements}
                                            Id="call-work"
                                            handleClick={this.handleClick.bind(this)}
                                            EditedElements={EditedElements}
                                            Text="CallWork"
                                        />
                                        <RibbonButton FormId={FormInfo.fm_pub_sabt_kar.id}
                                            DeletedElements={DeletedElements}
                                            Id="work-view"
                                            handleClick={this.handleClick.bind(this)}
                                            EditedElements={EditedElements}
                                            Text="WorkView"
                                        />
                                        <RibbonButton FormId={FormInfo.fm_pub_sabt_kar.id}
                                            DeletedElements={DeletedElements}
                                            Id="work-info-view"
                                            handleClick={this.handleClick.bind(this)}
                                            EditedElements={EditedElements}
                                            Text="WorkInfoView"
                                        />
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="tab-panel-group">
                                <div className="tab-group-caption">{this.context.t("Attachments")}</div>
                                <div className="tab-group-content">
                                    <div className="tab-content-segment">
                                        <RibbonButton FormId={FormInfo.fm_pub_sabt_kar.id}
                                            DeletedElements={DeletedElements}
                                            Id="attachments"
                                            handleClick={this.handleClick.bind(this)}
                                            EditedElements={EditedElements}
                                            Text="Attachments"
                                        />
                                        
                                        
                                    </div>
                                </div>
                            </div>
                        
                        </div>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="tab2">
                        <div className="tab-panel">
                            <div className="tab-panel-group">
                                <div className="tab-group-caption">{this.context.t("Forms")}</div>
                                <div className="tab-group-content">
                                    <div className="tab-content-segment">
                                        <RibbonButton FormId={FormInfo.fm_pub_sabt_kar.id}
                                            DeletedElements={DeletedElements}
                                            Id="work-form"
                                            handleClick={this.handleClick.bind(this)}
                                            EditedElements={EditedElements}
                                            Text="WorkForm"
                                        />
                                        <RibbonButton FormId={FormInfo.fm_pub_sabt_kar.id}
                                            DeletedElements={DeletedElements}
                                            Id="custom-work-form"
                                            handleClick={this.handleClick.bind(this)}
                                            EditedElements={EditedElements}
                                            Text="CustomWorkForm"
                                        />
                                        <RibbonButton FormId={FormInfo.fm_pub_sabt_kar.id}
                                            DeletedElements={DeletedElements}
                                            Id="financial-form"
                                            handleClick={this.handleClick.bind(this)}
                                            EditedElements={EditedElements}
                                            Text="FinancialForm"
                                        />
                                        <RibbonButton FormId={FormInfo.fm_pub_sabt_kar.id}
                                            DeletedElements={DeletedElements}
                                            Id="process-form-builder"
                                            handleClick={this.handleClick.bind(this)}
                                            EditedElements={EditedElements}
                                            Text="ProcessFormBuilder"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="tab-panel-group">
                                <div className="tab-group-caption">{this.context.t("Copy")}</div>
                                <div className="tab-group-content">
                                    <div className="tab-content-segment">
                                        <RibbonButton FormId={FormInfo.fm_pub_sabt_kar.id}
                                            DeletedElements={DeletedElements}
                                            Id="internal-replication"
                                            handleClick={this.handleClick.bind(this)}
                                            EditedElements={EditedElements}
                                            Text="InternalReplication"
                                        />
                                        <RibbonButton FormId={FormInfo.fm_pub_sabt_kar.id}
                                            DeletedElements={DeletedElements}
                                            Id="external-replication"
                                            handleClick={this.handleClick.bind(this)}
                                            EditedElements={EditedElements}
                                            Text="ExternalReplication"
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
                                if (ShortKeys[keyName].Element === "ShortKeyicon-new-work") {
                                    return (
                                        <ShortKeyButton FormId={FormInfo.fm_pub_sabt_kar.id} key={index} handleClick={this.handleClick.bind(this)}
                                            ShortKey={ShortKeys[keyName]} Id="new-work" />
                                    )
                                }
                                else if (ShortKeys[keyName].Element === "ShortKeyicon-create-work") {
                                    return (
                                        <ShortKeyButton FormId={FormInfo.fm_pub_sabt_kar.id} key={index} handleClick={this.handleClick.bind(this)}
                                            ShortKey={ShortKeys[keyName]} Id="create-work" />
                                    )
                                }
                                
                                else if (ShortKeys[keyName].Element === "ShortKeyicon-follow") {
                                    return (
                                        <ShortKeyButton FormId={FormInfo.fm_pub_sabt_kar.id} key={index} handleClick={this.handleClick.bind(this)}
                                            ShortKey={ShortKeys[keyName]} Id="follow" />
                                    )
                                }
                                else if (ShortKeys[keyName].Element === "ShortKeyicon-time-spent") {
                                    return (
                                        <ShortKeyButton FormId={FormInfo.fm_pub_sabt_kar.id} key={index} handleClick={this.handleClick.bind(this)}
                                            ShortKey={ShortKeys[keyName]} Id="time-spent" />
                                    )
                                }
                                else if (ShortKeys[keyName].Element === "ShortKeyicon-edit") {
                                    return (
                                        <ShortKeyButton FormId={FormInfo.fm_pub_sabt_kar.id} key={index} handleClick={this.handleClick.bind(this)}
                                            ShortKey={ShortKeys[keyName]} Id="edit" />
                                    )
                                }
                                else if (ShortKeys[keyName].Element === "ShortKeyicon-confirmation") {
                                    return (
                                        <ShortKeyButton FormId={FormInfo.fm_pub_sabt_kar.id} key={index} handleClick={this.handleClick.bind(this)}
                                            ShortKey={ShortKeys[keyName]} Id="confirmation" />
                                    )
                                }
                                else if (ShortKeys[keyName].Element === "ShortKeyicon-call-work") {
                                    return (
                                        <ShortKeyButton FormId={FormInfo.fm_pub_sabt_kar.id} key={index} handleClick={this.handleClick.bind(this)}
                                            ShortKey={ShortKeys[keyName]} Id="call-work" />
                                    )
                                }
                                else if (ShortKeys[keyName].Element === "ShortKeyicon-work-view") {
                                    return (
                                        <ShortKeyButton FormId={FormInfo.fm_pub_sabt_kar.id} key={index} handleClick={this.handleClick.bind(this)}
                                            ShortKey={ShortKeys[keyName]} Id="work-view" />
                                    )
                                }
                                else if (ShortKeys[keyName].Element === "ShortKeyicon-work-info-view") {
                                    return (
                                        <ShortKeyButton FormId={FormInfo.fm_pub_sabt_kar.id} key={index} handleClick={this.handleClick.bind(this)}
                                            ShortKey={ShortKeys[keyName]} Id="work-info-view" />
                                    )
                                }
                                else if (ShortKeys[keyName].Element === "ShortKeyicon-attachments") {
                                    return (
                                        <ShortKeyButton FormId={FormInfo.fm_pub_sabt_kar.id} key={index} handleClick={this.handleClick.bind(this)}
                                            ShortKey={ShortKeys[keyName]} Id="attachments" />
                                    )
                                }
                                else if (ShortKeys[keyName].Element === "ShortKeyicon-work-form") {
                                    return (
                                        <ShortKeyButton FormId={FormInfo.fm_pub_sabt_kar.id} key={index} handleClick={this.handleClick.bind(this)}
                                            ShortKey={ShortKeys[keyName]} Id="work-form" />
                                    )
                                }
                                else if (ShortKeys[keyName].Element === "ShortKeyicon-custom-work-form") {
                                    return (
                                        <ShortKeyButton FormId={FormInfo.fm_pub_sabt_kar.id} key={index} handleClick={this.handleClick.bind(this)}
                                            ShortKey={ShortKeys[keyName]} Id="custom-work-form" />
                                    )
                                }
                                else if (ShortKeys[keyName].Element === "ShortKeyicon-financial-form") {
                                    return (
                                        <ShortKeyButton FormId={FormInfo.fm_pub_sabt_kar.id} key={index} handleClick={this.handleClick.bind(this)}
                                            ShortKey={ShortKeys[keyName]} Id="financial-form" />
                                    )
                                }
                                else if (ShortKeys[keyName].Element === "ShortKeyicon-process-form-builder") {
                                    return (
                                        <ShortKeyButton FormId={FormInfo.fm_pub_sabt_kar.id} key={index} handleClick={this.handleClick.bind(this)}
                                            ShortKey={ShortKeys[keyName]} Id="process-form-builder" />
                                    )
                                }
                                else if (ShortKeys[keyName].Element === "ShortKeyicon-external-replication") {
                                    return (
                                        <ShortKeyButton FormId={FormInfo.fm_pub_sabt_kar.id} key={index} handleClick={this.handleClick.bind(this)}
                                            ShortKey={ShortKeys[keyName]} Id="external-replication" />
                                    )
                                }
                                else if (ShortKeys[keyName].Element === "ShortKeyicon-internal-replication") {
                                    return (
                                        <ShortKeyButton FormId={FormInfo.fm_pub_sabt_kar.id} key={index} handleClick={this.handleClick.bind(this)}
                                            ShortKey={ShortKeys[keyName]} Id="internal-replication" />
                                    )
                                }
                            })}
                        </ul>
                    </MenuProvider>
                </nav>

                {this.state.HideElementListmodal && <HideElementListModal modal={this.state.HideElementListmodal}
                    toggle={this.controlpanelClick.bind(this)}
                    FormId={FormInfo.fm_pub_sabt_kar.id} />}
                {this.state.EditTextElementListmodal && <EditTextElementListModal modal={this.state.EditTextElementListmodal}
                    toggle={this.controlpanelClick.bind(this)}
                    FormId={FormInfo.fm_pub_sabt_kar.id} />}

            </div>
        );
    }
}


const mapDispatchToProps = dispatch => ({

    GetTemplateForm: (Params) => {
        dispatch(design_Actions.GetTemplateForm(Params))
    },

});
RibbonNewWork.contextTypes = {
    t: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { lang } = state.i18nState
    const { WorkInfo } = state.Auto_WorkBasic;
    const { ShortKeys344 } = state.Design;
    const { DeletedElements344 } = state.Design !== undefined ? state.Design : {};
    const { EditedElements344 } = state.Design !== undefined ? state.Design : {};
    return {
        lang,
        WorkInfo,
        ShortKeys: ShortKeys344,
        DeletedElements: DeletedElements344,
        EditedElements: EditedElements344,
    };
}


const connectedRibbonNewWork = connect(mapStateToProps, mapDispatchToProps)(RibbonNewWork);
export { connectedRibbonNewWork as RibbonNewWork };

