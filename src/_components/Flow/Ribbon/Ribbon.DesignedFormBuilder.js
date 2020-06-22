import React, { Component } from 'react';
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { FormInfo } from "../../../locales";
import { MenuProvider } from "react-contexify";
import { RibbonButton, ShortKeyButton, ControlPanel,RibbonPrintButton,ShortKeyPrintButton } from "../../Frameworks";
import {
    Act_Reference,
    design_Actions,
    FormBuilderBasic_action
} from "../../../_actions";


import { toast } from 'react-toastify';
import { DesignerFormBuilder } from '../FormBuilder/DesignerFormBuilder';


class RibbonDesignedFormBuilder extends Component {
    constructor(props) {

        super(props);
        this.state = {
            ...this.state,
            backdrop: "static",
            modalClass: "modal-dialog-centered modal-xl r-modal",
            DesignerFormBuilderModal: false,
            FormBuilderCaptionId: null,
            FormBuilderLayoutData: [],
            FormBuilderToolBoxData: [],
            DesignPageLayout:"partial",
            DesignPageSize: "A4"
        };

    }
    componentDidMount() {
        const { GetTemplateForm } = this.props;
        GetTemplateForm(FormInfo.fm_web_flow_formsaz.id);
    }



    toggleFormBuilder() {
        this.setState(prevState => ({
            DesignerFormBuilderModal: !prevState.DesignerFormBuilderModal
        }));

    }

    FormBuilderDesignerHandle() {
        const { WorkInfo, FlowPeygirCaptionInfo, DesignerFieldList } = this.props;
        FlowPeygirCaptionInfo(WorkInfo.showtree_id).then(data => {
            if (data.status) {
                if (data.data.hasFormBuilder) {
                    DesignerFieldList(data.data.CaptionId).then(data1 => {
                        if (data1.status) {
                            console.log(data1.data.DesignPageLayout)
                            console.log(data1.data.DesignPageSize)
                            this.setState({
                                DesignerFormBuilderModal: true,
                                FormBuilderCaptionId: data.data.CaptionId,
                                FormBuilderLayoutData: data1.data.Designed,
                                FormBuilderToolBoxData: data1.data.ToolsBox,
                                DesignPageLayout: data1.data.DesignPageLayout,
                                DesignPageSize: data1.data.DesignPageSize
                            });
                            console.log(this.state.FormBuilderLayoutData)
                        }
                    });
                }
                else
                    toast.error(this.context.t("msg_No_Form_Builder"));
            }
        });
    }

    saveHandle() {
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
        const { WorkInfo, Params, ShortKeys, DeletedElements, EditedElements, RefreshParentForm,
             SaveHandle, ConfirmationHandle, rebuildHandle
       ,PrintRef } = this.props;
        return (
            <div>
                <div className="r-main-box__toggle">
                    <label className="switch">
                        <input type="checkbox" id="sidebar-toggle" />
                        <span className="switch-state"></span>
                    </label>
                </div>
                <ControlPanel FormInfoId={FormInfo.fm_web_flow_formsaz.id}></ControlPanel>

                <ul className="nav nav-tabs" id="ribbon-tab">
                    <li className="nav-item"><a href="#designedFormBuildertab1" className="nav-link active" role="tab" data-toggle="tab">{this.context.t("Operations")}</a></li>
                </ul>
                <div className="tab-content">
                    <div className="gradient"></div>
                    <div className="tab-pane fade show active" id="designedFormBuildertab1" role="tabpanel">
                        <div className="tab-panel">
                            <div className="tab-panel-group">
                                <div className="tab-group-caption">{this.context.t("Submit")}</div>
                                <div className="tab-group-content">
                                    <div className="tab-content-segment">
                                        <RibbonButton FormId={FormInfo.fm_web_flow_formsaz.id}
                                            DeletedElements={DeletedElements}
                                            Id="confirmation"
                                            handleClick={ConfirmationHandle.bind(this)}
                                            EditedElements={EditedElements}
                                            Text="Confirmation"
                                        />

                                        <RibbonButton FormId={FormInfo.fm_web_flow_formsaz.id}
                                            DeletedElements={DeletedElements}
                                            Id="save"
                                            handleClick={SaveHandle.bind(this)}
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
                                        <RibbonButton FormId={FormInfo.fm_web_flow_formsaz.id}
                                            DeletedElements={DeletedElements}
                                            Id="refresh-information"
                                            handleClick={rebuildHandle.bind(this)}
                                            EditedElements={EditedElements}
                                            Text="RefreshInformation"
                                        />
                                        <RibbonButton FormId={FormInfo.fm_web_flow_formsaz.id}
                                            DeletedElements={DeletedElements}
                                            Id="form-builder-designer"
                                            handleClick={this.FormBuilderDesignerHandle.bind(this)}
                                            EditedElements={EditedElements}
                                            Text="FormBuilderDesigner"
                                        />
                                         <RibbonPrintButton 
                                            FormId={FormInfo.fm_web_flow_formsaz.id}
                                            DeletedElements={DeletedElements}
                                            Id="form-builder-print"
                                            EditedElements={EditedElements}
                                            Text={this.context.t("Print")}
                                            PrintRef={PrintRef}
                                        />
                                        
                                        {/* <ReactToPrint
                                            trigger={() => <a href="javascript:void(0)"><i className="icon save"></i><label>{this.context.t("Print")}</label></a>}
                                            content={() => PrintRef}
                                            bodyClass="print"
                                            pageStyle={""}
                                            copyStyles={true}
                                        /> */}
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
                                        <ShortKeyButton FormId={FormInfo.fm_web_flow_formsaz.id} key={index} handleClick={ConfirmationHandle.bind(this)}
                                            ShortKey={ShortKeys[keyName]} Id="confirmation" tooltip={this.context.t("Confirmation")} />
                                    )
                                }
                                else if (ShortKeys[keyName].Element === "ShortKeyicon-form-builder-designer") {
                                    return (
                                        <ShortKeyButton FormId={FormInfo.fm_web_flow_formsaz.id} key={index} handleClick={this.FormBuilderDesignerHandle.bind(this)}
                                            ShortKey={ShortKeys[keyName]} Id="form-builder-designer" tooltip={this.context.t("FormBuilderDesigner")} />
                                    )
                                }
                                else if (ShortKeys[keyName].Element === "ShortKeyicon-refresh-information") {
                                    return (
                                        <ShortKeyButton FormId={FormInfo.fm_web_flow_formsaz.id} key={index} handleClick={rebuildHandle.bind(this)}
                                            ShortKey={ShortKeys[keyName]} Id="refresh-information" tooltip={this.context.t("RefreshInformation")} />
                                    )
                                }
                                else if (ShortKeys[keyName].Element === "ShortKeyicon-form-builder-print") {
                                    return (
                                        <ShortKeyPrintButton FormId={FormInfo.fm_web_flow_formsaz.id} key={index}  PrintRef={PrintRef}
                                            ShortKey={ShortKeys[keyName]} Id="form-builder-print" tooltip={this.context.t("Print")} />
                                    )
                                }
                            })}
                        </ul>
                    </MenuProvider>
                </nav>
                {this.state.DesignerFormBuilderModal &&
                    <DesignerFormBuilder modal={this.state.DesignerFormBuilderModal}
                        WorkInfo={WorkInfo}
                        toggle={this.toggleFormBuilder.bind(this)}
                        RefreshParentForm={RefreshParentForm}
                        FormBuilderCaptionId={this.state.FormBuilderCaptionId}
                        FormBuilderLayoutData={this.state.FormBuilderLayoutData}
                        FormBuilderToolBoxData={this.state.FormBuilderToolBoxData}
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
    FlowPeygirCaptionInfo: (showtree_id) => {
        return dispatch(FormBuilderBasic_action.FlowPeygirCaptionInfo(showtree_id))
    },
    DesignerFieldList: (CaptionId) => {
        return dispatch(FormBuilderBasic_action.DesignerFieldList(CaptionId))
    },

});
RibbonDesignedFormBuilder.contextTypes = {
    t: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { lang } = state.i18nState
    const { WorkInfo } = state.Auto_WorkBasic;
    const { ShortKeys10023 } = state.Design;
    const { DeletedElements10023 } = state.Design !== undefined ? state.Design : {};
    const { EditedElements10023 } = state.Design !== undefined ? state.Design : {};
    return {
        lang,
        WorkInfo,
        ShortKeys: ShortKeys10023,
        DeletedElements: DeletedElements10023,
        EditedElements: EditedElements10023
    };
}


const connectedRibbonDesignedFormBuilder = connect(mapStateToProps, mapDispatchToProps)(RibbonDesignedFormBuilder);
export { connectedRibbonDesignedFormBuilder as RibbonDesignedFormBuilder };

