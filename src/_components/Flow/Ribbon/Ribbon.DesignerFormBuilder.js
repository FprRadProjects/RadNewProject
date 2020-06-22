import React, { Component } from 'react';
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { FormInfo } from "../../../locales";
import { MenuProvider } from "react-contexify";
import { RibbonButton, ShortKeyButton, ControlPanel } from "../../Frameworks";
import {
    Act_Reference,
    design_Actions,
    FormBuilderBasic_action
} from "../../../_actions";

class RibbonDesignerFormBuilder extends Component {
    constructor(props) {

        super(props);
        this.state = {
            ...this.state,
            backdrop: "static",
            modalClass: "modal-dialog-centered modal-xl r-modal",
            DesignerFormBuilderModal: false,
            FormBuilderCaptionId: null,
            FormBuilderLayoutData: [],
            FormBuilderToolBoxData: []
        };

    }
    componentDidMount() {
        const { GetTemplateForm } = this.props;
        GetTemplateForm(FormInfo.fm_web_formsaz_design.id);
    }
    toggleFormBuilder() {
        this.setState(prevState => ({
            DesignerFormBuilderModal: !prevState.DesignerFormBuilderModal
        }));
    }
    render() {
        const { ShortKeys, DeletedElements, EditedElements
            , SaveFormDesignerHandle
        } = this.props;
        return (
            <div>
                <div className="r-main-box__toggle">
                    <label className="switch">
                        <input type="checkbox" id="sidebar-toggle" />
                        <span className="switch-state"></span>
                    </label>
                </div>
                <ControlPanel FormInfoId={FormInfo.fm_web_formsaz_design.id}></ControlPanel>
                <ul className="nav nav-tabs" id="ribbon-tab">
                    <li className="nav-item"><a href="#designerFormBuildertab1" className="nav-link active" role="tab" data-toggle="tab">{this.context.t("Operations")}</a></li>
                </ul>
                <div className="tab-content">
                    <div className="gradient"></div>
                    <div className="tab-pane fade show active" id="designerFormBuildertab1" role="tabpanel">
                        <div className="tab-panel">
                            <div className="tab-panel-group">
                                <div className="tab-group-caption">{this.context.t("Operations")}</div>
                                <div className="tab-group-content">
                                    <div className="tab-content-segment">
                                        <RibbonButton FormId={FormInfo.fm_web_formsaz_design.id}
                                            DeletedElements={DeletedElements}
                                            Id="save-form-designer"
                                            handleClick={SaveFormDesignerHandle.bind(this, this.context.t("msg_Operation_Success"))}
                                            EditedElements={EditedElements}
                                            Text="SaveFormDesigner"
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
                            {ShortKeys !== undefined && Object.keys(ShortKeys).map((keyName, index) => {
                                if (ShortKeys[keyName].Element === "ShortKeyicon-save-form-designer") {
                                    return (
                                        <ShortKeyButton FormId={FormInfo.fm_web_formsaz_design.id} key={index} handleClick={SaveFormDesignerHandle.bind(this, this.context.t("msg_Operation_Success"))}
                                            ShortKey={ShortKeys[keyName]} Id="save-form-designer" tooltip={this.context.t("SaveFormDesigner")} />
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
    },
    DesignerFieldList: (CaptionId) => {
        return dispatch(FormBuilderBasic_action.DesignerFieldList(CaptionId))
    },
});
RibbonDesignerFormBuilder.contextTypes = {
    t: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { lang } = state.i18nState
    const { WorkInfo } = state.Auto_WorkBasic;
    const { ShortKeys10004 } = state.Design;
    const { DeletedElements10004 } = state.Design !== undefined ? state.Design : {};
    const { EditedElements10004 } = state.Design !== undefined ? state.Design : {};
    return {
        lang,
        WorkInfo,
        ShortKeys: ShortKeys10004,
        DeletedElements: DeletedElements10004,
        EditedElements: EditedElements10004
    };
}

const connectedRibbonDesignerFormBuilder = connect(mapStateToProps, mapDispatchToProps)(RibbonDesignerFormBuilder);
export { connectedRibbonDesignerFormBuilder as RibbonDesignerFormBuilder };

