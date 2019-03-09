import React, { Component } from 'react';
import { connect } from "react-redux"
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import PropTypes from "prop-types"
import { SelectProjectModal } from "../../Project/";
import { SelectDefaultTextModal } from "../../Basic/";

import { WorkAccess_action, design_Actions, BasicInfo_action, WorkActions_action } from "../../../_actions";
import { FormInfo } from "../../../locales";
import { SelectFlowResultModal } from '../../Flow/ConfirmFlow/SelectFlowResultModal';
import { ReviewWorkModal } from '../../Flow/ConfirmFlow/ReviewWorkModal';
import { toast } from 'react-toastify';

var SaveParams = { form: "", data: [] };
var ConfirmParams = { form: "", page: 1, pagesize: 10, filter: [], Form: "" };

class ConfirmFlow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            FlowResultSelectmodal: false,
            ReviewWorkModal: false,
            backdrop: "static",
            modalClass: "modal-dialog-centered modal-lg r-filter-modal"
        };
        this.CloseSelectReviewWork = this.CloseSelectReviewWork.bind(this);
        this.CloseSelectFlowResult = this.CloseSelectFlowResult.bind(this);

    }


    CloseSelectReviewWork = (e) => {
        this.setState({
            ReviewWorkModal: !this.state.ReviewWorkModal,
        });
    }

    CloseSelectFlowResult = (e) => {
        this.setState({
            FlowResultSelectmodal: !this.state.FlowResultSelectmodal,
        });
    }
   
    componentWillReceiveProps(nextProps) {
        const {  flowResultSelectModal, reviewWorkModal} = nextProps;
       
        if (flowResultSelectModal !== undefined) {
            this.setState({
                FlowResultSelectmodal: flowResultSelectModal,
            });
        }
        if (reviewWorkModal !== undefined) {
            this.setState({
                ReviewWorkModal: reviewWorkModal,
            });
        }
    }

    render() {
        const {  peygir_id, Params, RefreshFormAction } = this.props;
      
        return (
            <div>

                {this.state.FlowResultSelectmodal &&
                    <SelectFlowResultModal modal={this.state.FlowResultSelectmodal}
                        toggle={this.CloseSelectFlowResult.bind(this)} Params={Params}
                        peygir_id={peygir_id} RefreshFormAction={RefreshFormAction} />}
                {this.state.ReviewWorkModal &&
                    <ReviewWorkModal modal={this.state.ReviewWorkModal}
                        toggle={this.CloseSelectReviewWork.bind(this)} Params={Params}
                        peygir_id={peygir_id} RefreshFormAction={RefreshFormAction} />}

            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    InitConfirmWork: (Params) => {
        dispatch(WorkActions_action.InitConfirmWork(Params))
    },


});
ConfirmFlow.contextTypes = {
    t: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { alert } = state;
    const { loading } = state.loading;
    const { lang } = state.i18nState
    const { Refresh_Form } = state.Common;
    const { SelectFlowResultTogleModal } = state.Auto_WorkBasic;
    const { ReviewWorkTogleModal } = state.Auto_WorkBasic;

    return {
        alert,
        loading,
        lang,
        Refresh_Form,
        SelectFlowResultTogleModal,
        ReviewWorkTogleModal
    };
}


const connectedConfirmFlow = connect(mapStateToProps, mapDispatchToProps)(ConfirmFlow);
export { connectedConfirmFlow as ConfirmFlow };
