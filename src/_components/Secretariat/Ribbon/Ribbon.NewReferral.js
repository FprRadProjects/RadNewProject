import React, { Component } from 'react';
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { FormInfo } from "../../../locales";
import { MenuProvider } from "react-contexify";
import { RibbonButton, ShortKeyButton, ControlPanel } from "../../Frameworks";
import {
    design_Actions,
} from "../../../_actions";

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





  
    render() {
        const { saveReferralHandle, ShortKeys, DeletedElements, EditedElements, attachmentsToggle } = this.props;

        return (
            <div>
                <div className="r-main-box__toggle">
                    <label className="switch">
                        <input type="checkbox" id="sidebar-toggle" />
                        <span className="switch-state"></span>
                    </label>
                </div>
                <ControlPanel FormInfoId={FormInfo.fm_dabir_eghdam.id}></ControlPanel>
                <ul className="nav nav-tabs" id="ribbon-tab">
                    <li className="nav-item"><a href="#newreferraltab1" className="nav-link active" role="tab" data-toggle="tab">عملیات</a></li>
                </ul>
                <div className="tab-content">
                    <div className="gradient"></div>
                    <div className="tab-pane fade show active" id="newreferraltab1" role="tabpanel">
                        <div className="tab-panel">
                            <div className="tab-panel-group">
                                <div className="tab-group-caption">عملیات</div>
                                <div className="tab-group-content">
                                    <div className="tab-content-segment">
                                        <RibbonButton FormId={FormInfo.fm_dabir_eghdam.id}
                                            DeletedElements={DeletedElements}
                                            Id="attachments"
                                            handleClick={attachmentsToggle.bind(this)}
                                            EditedElements={EditedElements}
                                            Text="Attachments"
                                        />
                                        <RibbonButton FormId={FormInfo.fm_dabir_eghdam.id}
                                            DeletedElements={DeletedElements}
                                            Id="submit-referral"
                                            handleClick={saveReferralHandle.bind(this)}
                                            EditedElements={EditedElements}
                                            Text="Submit"
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
                                        <ShortKeyButton FormId={FormInfo.fm_dabir_eghdam.id} key={index} handleClick={attachmentsToggle.bind(this)}
                                            ShortKey={ShortKeys[keyName]} Id="attachments" />
                                    )
                                }
                                else if (ShortKeys[keyName].Element === "ShortKeyicon-submit-referral") {
                                    return (
                                        <ShortKeyButton FormId={FormInfo.fm_dabir_eghdam.id} key={index} handleClick={saveReferralHandle.bind(this)}
                                            ShortKey={ShortKeys[keyName]} Id="submit-referral" />
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
        EditedElements: EditedElements310,
    };
}


const connectedRibbonNewReferral = connect(mapStateToProps, mapDispatchToProps)(RibbonNewReferral);
export { connectedRibbonNewReferral as RibbonNewReferral };

