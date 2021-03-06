import React, { Component } from 'react';
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { toast } from 'react-toastify';

import { WorkBasic_action, WorkActions_action } from "../../../_actions";
import { FormInfo } from "../../../locales";
import { SelectFlowResultModal } from '../../Flow/ConfirmFlow/SelectFlowResultModal';
import { ReviewWorkModal } from '../../Flow/ConfirmFlow/ReviewWorkModal';

var FinalConfirmParams = { form: "", page: 0, pagesize: 10, filter: [], Results: [] };

class ConfirmFlow extends Component {
    constructor(props) {
        super(props);
        const { flowResultSelectModal } = this.props;
        this.state = {
            ...this.state,
            FlowResultSelectmodal: flowResultSelectModal === undefined || !flowResultSelectModal ? false : true,
            ReviewWorkModal: false,
            backdrop: "static",
            modalClass: "modal-dialog-centered modal-lg r-filter-modal"
        };
        this.CloseSelectReviewWork = this.CloseSelectReviewWork.bind(this);
    }


    CloseSelectReviewWork = (e) => {
        this.setState({
            ReviewWorkModal: !this.state.ReviewWorkModal,
        });
    }
    SuccesSelectFlowResult = (row, e) => {
        if (undefined !== row) {
            const { peygir_id, FinalFlowConfirmWork, RefreshParentForm, Params, FetchWorkInfo } = this.props;
            FinalConfirmParams["peygir_id"] = peygir_id;
            FinalConfirmParams["Results"] = [row.id];
            FinalFlowConfirmWork(FinalConfirmParams, this.context.t("msg_Operation_Success")).then(data => {
                if (data.status) {
                    this.setState({
                        FlowResultSelectmodal: !this.state.FlowResultSelectmodal,
                    });
                    if (data.code === 2 && data.data !== null) {
                        this.setState({
                            ReviewWorkModal: true,
                        });
                    }
                    console.log("222222222")
                    console.log(Params)
                    console.log(FetchWorkInfo)
                    console.log(RefreshParentForm)
                    if (FetchWorkInfo !== undefined)
                        FetchWorkInfo(peygir_id);
                    if (RefreshParentForm !== undefined)
                        RefreshParentForm(Params);
                }
            });;
        }
        else
            toast.warn(this.context.t("msg_No_Select_Row"));
    }
    SuccesReviewWorkConfirm = () => {
        const { peygir_id, ConfirmReviewWork, Params, RefreshParentForm } = this.props;
        ConfirmReviewWork(peygir_id, this.context.t("msg_Operation_Success")).then(data => {
            if (data.status) {
                this.setState({
                    ReviewWorkModal: false,
                });
                console.log("11111111111")
                console.log(Params)
                if (RefreshParentForm !== undefined)
                    RefreshParentForm(Params);
            }
        });
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.flowResultSelectModal !== this.props.flowResultSelectModal)
            this.setState({ FlowResultSelectmodal: nextProps.flowResultSelectModal === undefined || !nextProps.flowResultSelectModal ? false : true, });
    }
    render() {
        const { peygir_id, ParentForm, CloseleSelectFlowResult } = this.props;
        return (
            <div>

                {this.state.FlowResultSelectmodal &&
                    <SelectFlowResultModal modal={this.state.FlowResultSelectmodal}
                        toggle={CloseleSelectFlowResult.bind(this)}
                        peygir_id={peygir_id}
                        SuccesSelectFlowResult={this.SuccesSelectFlowResult.bind(this)}
                    />}
                {this.state.ReviewWorkModal &&
                    <ReviewWorkModal modal={this.state.ReviewWorkModal} ParentForm={ParentForm}
                        toggle={this.CloseSelectReviewWork.bind(this)}
                        peygir_id={peygir_id}
                        SuccesReviewWorkConfirm={this.SuccesReviewWorkConfirm.bind(this)}
                    />}

            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({

    FinalFlowConfirmWork: (Params, msg) => {
        return dispatch(WorkActions_action.FinalFlowConfirmWork(Params, msg))
    },
    ConfirmReviewWork: (peygir_id, msg) => {
        return dispatch(WorkActions_action.ConfirmReviewWork(peygir_id, msg))
    },
    FetchWorkInfo: (peygir_id) => {
        dispatch(WorkBasic_action.FetchWorkInfo(peygir_id))
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
