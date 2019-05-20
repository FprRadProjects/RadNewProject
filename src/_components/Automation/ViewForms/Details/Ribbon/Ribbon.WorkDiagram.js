import React, { Component } from 'react';
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { FormInfo } from "../../../../../locales";
import { MenuProvider } from "react-contexify";
import { RibbonButton, ShortKeyButton,ControlPanel } from "../../../../Frameworks";
import {
    design_Actions,
} from "../../../../../_actions";

class RibbonWorkDiagram extends Component {
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
        GetTemplateForm(FormInfo.fm_par_diagram.id);
    }
    handleClick() {

    }
  
    render() {
        const { saveWorkHandle, ShortKeys, DeletedElements, EditedElements, OpenReferenceViewer } = this.props;

        return (
            <div>
                <div className="r-main-box__toggle">
                    <label className="switch">
                        <input type="checkbox" id="sidebar-toggle" />
                        <span className="switch-state"></span>
                    </label>
                </div>

                <ControlPanel FormInfoId={FormInfo.fm_par_diagram.id}></ControlPanel>

                <ul className="nav nav-tabs" id="ribbon-tab">
                    <li className="nav-item"><a href="#workdiagramtab1" className="nav-link active" role="tab" data-toggle="tab">{this.context.t("Operations")}</a></li>
                    <li className="nav-item"><a href="#workdiagramtab2" className="nav-link" role="tab" data-toggle="tab">{this.context.t("Forms")}</a></li>
                </ul>
                <div className="tab-content">
                    <div className="gradient"></div>
                    <div className="tab-pane fade show active" id="workdiagramtab1" role="tabpanel">
                        <div className="tab-panel">
                            <div className="tab-panel-group">
                                <div className="tab-group-caption">{this.context.t("Operations")}</div>
                                <div className="tab-group-content">
                                    <div className="tab-content-segment">
                                        <RibbonButton FormId={FormInfo.fm_par_diagram.id}
                                            DeletedElements={DeletedElements}
                                            Id="work-view"
                                            handleClick={this.handleClick.bind(this)}
                                            EditedElements={EditedElements}
                                            Text="WorkView"
                                        />
                                        <RibbonButton FormId={FormInfo.fm_par_diagram.id}
                                            DeletedElements={DeletedElements}
                                            Id="work-info-view"
                                            handleClick={this.handleClick.bind(this)}
                                            EditedElements={EditedElements}
                                            Text="WorkInfoView"
                                        />
                                        <RibbonButton FormId={FormInfo.fm_par_diagram.id}
                                            DeletedElements={DeletedElements}
                                            Id="attachments-view"
                                            handleClick={this.handleClick.bind(this)}
                                            EditedElements={EditedElements}
                                            Text="AttachmentsView"
                                        />
                                        <RibbonButton FormId={FormInfo.fm_par_diagram.id}
                                            DeletedElements={DeletedElements}
                                            Id="referral-result"
                                            handleClick={OpenReferenceViewer.bind(this)}
                                            EditedElements={EditedElements}
                                            Text="ReferralResult"
                                        />
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="workdiagramtab2" role="tabpanel">
                        <div className="tab-panel">
                            <div className="tab-panel-group">
                                <div className="tab-group-caption">{this.context.t("Forms")}</div>
                                <div className="tab-group-content">
                                    <div className="tab-content-segment">
                                        <RibbonButton FormId={FormInfo.fm_par_diagram.id}
                                            DeletedElements={DeletedElements}
                                            Id="work-form"
                                            handleClick={this.handleClick.bind(this)}
                                            EditedElements={EditedElements}
                                            Text="WorkForm"
                                        />
                                        <RibbonButton FormId={FormInfo.fm_par_diagram.id}
                                            DeletedElements={DeletedElements}
                                            Id="custom-work-form"
                                            handleClick={this.handleClick.bind(this)}
                                            EditedElements={EditedElements}
                                            Text="CustomWorkForm"
                                        />
                                        <RibbonButton FormId={FormInfo.fm_par_diagram.id}
                                            DeletedElements={DeletedElements}
                                            Id="financial-form"
                                            handleClick={this.handleClick.bind(this)}
                                            EditedElements={EditedElements}
                                            Text="FinancialForm"
                                        />
                                        <RibbonButton FormId={FormInfo.fm_par_diagram.id}
                                            DeletedElements={DeletedElements}
                                            Id="process-form-builder"
                                            handleClick={this.handleClick.bind(this)}
                                            EditedElements={EditedElements}
                                            Text="ProcessFormBuilder"
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
                                if (ShortKeys[keyName].Element === "ShortKeyicon-work-view") {
                                    return (
                                        <ShortKeyButton FormId={FormInfo.fm_par_diagram.id} key={index} handleClick={this.handleClick.bind(this)}
                                            ShortKey={ShortKeys[keyName]} Id="work-view" />
                                    )
                                }
                                else if (ShortKeys[keyName].Element === "ShortKeyicon-work-info-view") {
                                    return (
                                        <ShortKeyButton FormId={FormInfo.fm_par_diagram.id} key={index} handleClick={saveWorkHandle.bind(this)}
                                            ShortKey={ShortKeys[keyName]} Id="work-info-view" />
                                    )
                                }
                                
                                else if (ShortKeys[keyName].Element === "ShortKeyicon-referral-result") {
                                    return (
                                        <ShortKeyButton FormId={FormInfo.fm_par_diagram.id} key={index} handleClick={OpenReferenceViewer.bind(this)}
                                            ShortKey={ShortKeys[keyName]} Id="referral-result" />
                                    )
                                }
                               
                                else if (ShortKeys[keyName].Element === "ShortKeyicon-attachments-view") {
                                    return (
                                        <ShortKeyButton FormId={FormInfo.fm_par_diagram.id} key={index} handleClick={this.handleClick.bind(this)}
                                            ShortKey={ShortKeys[keyName]} Id="attachments-view" />
                                    )
                                }
                                
                                else if (ShortKeys[keyName].Element === "ShortKeyicon-work-form") {
                                    return (
                                        <ShortKeyButton FormId={FormInfo.fm_par_diagram.id} key={index} handleClick={this.handleClick.bind(this)}
                                            ShortKey={ShortKeys[keyName]} Id="work-form" />
                                    )
                                }
                                else if (ShortKeys[keyName].Element === "ShortKeyicon-custom-work-form") {
                                    return (
                                        <ShortKeyButton FormId={FormInfo.fm_par_diagram.id} key={index} handleClick={this.handleClick.bind(this)}
                                            ShortKey={ShortKeys[keyName]} Id="custom-work-form" />
                                    )
                                }
                                else if (ShortKeys[keyName].Element === "ShortKeyicon-financial-form") {
                                    return (
                                        <ShortKeyButton FormId={FormInfo.fm_par_diagram.id} key={index} handleClick={this.handleClick.bind(this)}
                                            ShortKey={ShortKeys[keyName]} Id="financial-form" />
                                    )
                                }
                                else if (ShortKeys[keyName].Element === "ShortKeyicon-process-form-builder") {
                                    return (
                                        <ShortKeyButton FormId={FormInfo.fm_par_diagram.id} key={index} handleClick={this.handleClick.bind(this)}
                                            ShortKey={ShortKeys[keyName]} Id="process-form-builder" />
                                    )
                                }
                               
                            })}
                        </ul>
                    </MenuProvider>
                </nav>
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => ({

    GetTemplateForm: (Params) => {
        dispatch(design_Actions.GetTemplateForm(Params))
    },

});
RibbonWorkDiagram.contextTypes = {
    t: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { lang } = state.i18nState
    const { WorkInfo } = state.Auto_WorkBasic;
    const { ShortKeys217 } = state.Design;
    const { DeletedElements217 } = state.Design !== undefined ? state.Design : {};
    const { EditedElements217 } = state.Design !== undefined ? state.Design : {};
    return {
        lang,
        WorkInfo,
        ShortKeys: ShortKeys217,
        DeletedElements: DeletedElements217,
        EditedElements: EditedElements217,
    };
}


const connectedRibbonWorkDiagram = connect(mapStateToProps, mapDispatchToProps)(RibbonWorkDiagram);
export { connectedRibbonWorkDiagram as RibbonWorkDiagram };

