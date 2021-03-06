import React, { Component } from 'react';
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { FormInfo } from "../../../locales";
import { MenuProvider } from "react-contexify";
import { ShortKeyPrintButton,RibbonPrintButton, ControlPanel } from "../../Frameworks";
import {
    Act_Reference,
    design_Actions,
    FormBuilderBasic_action
} from "../../../_actions";


class RibbonDesignedHistoryFormBuilder extends Component {
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

    render() {
        const {PrintRef , ShortKeys, DeletedElements, EditedElements} = this.props;
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
                    <li className="nav-item"><a href="#designedHistoryFormBuildertab1" className="nav-link active" role="tab" data-toggle="tab">{this.context.t("Operations")}</a></li>
                </ul>
                <div className="tab-content">
                    <div className="gradient"></div>
                    <div className="tab-pane fade show active" id="designedHistoryFormBuildertab1" role="tabpanel">
                        <div className="tab-panel">
                            <div className="tab-panel-group">
                                <div className="tab-group-caption">{this.context.t("Operations")}</div>
                                <div className="tab-group-content">
                                    <div className="tab-content-segment">
                                       
                                    <RibbonPrintButton 
                                            FormId={FormInfo.fm_web_flow_formsaz.id}
                                            DeletedElements={DeletedElements}
                                            Id="form-builder-history-print"
                                            EditedElements={EditedElements}
                                            Text={this.context.t("Print")}
                                            PrintRef={PrintRef}
                                        />
                                        {/* <ReactToPrint
                                            trigger={() => <a href="javascript:void(0)"><i className="icon save"></i><label>{this.context.t("Print")}</label></a>}
                                            content={() => PrintRef}
                                            bodyClass="print"
                                            pageStyle={""}
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
                              if (ShortKeys[keyName].Element === "ShortKeyicon-form-builder-history-print") {
                                    return (
                                        <ShortKeyPrintButton FormId={FormInfo.fm_web_flow_formsaz.id} key={index}  PrintRef={PrintRef}
                                            ShortKey={ShortKeys[keyName]} Id="form-builder-history-print" tooltip={this.context.t("Print")} />
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
    FetchData: (Params) => {
        dispatch(Act_Reference.FetchData(Params))
    },
    GetTemplateForm: (Params) => {
        dispatch(design_Actions.GetTemplateForm(Params))
    },
    FlowPeygirCaptionInfo: (showtree_id) => {
        return dispatch(FormBuilderBasic_action.FlowPeygirCaptionInfo(showtree_id))
    }
});
RibbonDesignedHistoryFormBuilder.contextTypes = {
    t: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { lang } = state.i18nState
    const { ShortKeys10023 } = state.Design;
    const { DeletedElements10023 } = state.Design !== undefined ? state.Design : {};
    const { EditedElements10023 } = state.Design !== undefined ? state.Design : {};
    return {
        lang,
        ShortKeys: ShortKeys10023,
        DeletedElements: DeletedElements10023,
        EditedElements: EditedElements10023
    };
}


const connectedRibbonDesignedHistoryFormBuilder = connect(mapStateToProps, mapDispatchToProps)(RibbonDesignedHistoryFormBuilder);
export { connectedRibbonDesignedHistoryFormBuilder as RibbonDesignedHistoryFormBuilder };

