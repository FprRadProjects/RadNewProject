import React, { Component } from 'react';
import { connect } from "react-redux"
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import PropTypes from "prop-types"
import { GridComponent } from "../../Frameworks";
import { WorkActions_action, WorkBasic_action } from "../../../_actions";
import { EditeReviewWorkModal } from '../../Flow/ConfirmFlow/EditeReviewWorkModal';
import { toast } from 'react-toastify';
var currencyColumns = [];
var hiddenColumnNames = ["ashkhas_id"];
var booleanColumns = [];
var Params = {
    "page": 0,
    "pagesize": 10,
    "peygir_id": "0",
    "orderby": "id",
    "direction": "desc",
    "filter": []
};
var ReviewParams = { peygir_id: 0, page: 0, pagesize: 10, filter: [] };
var SaveParams = { form: "", data: [] };

class ReviewWorkModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            EditReviewModal: false,
            modalClass: "modal-dialog-centered modal-lg r-modal"
        };

        this.EditReviewWorkConfirm = this.EditReviewWorkConfirm.bind(this);
        this.SuccesEditReviewWork = this.SuccesEditReviewWork.bind(this);
    }
    SuccesEditReviewWork(e) {
        const { ParentForm, SaveWorkInfo, lang, ReviewWorkConfirmList,ReviewWork_Info
        ,FetchGetReviewWorkInfo } = this.props;
        var formname = lang == "fa" ? ParentForm.form_name : ParentForm.en_form_name;
        if (SaveParams.data["tarikhaction"] !== undefined) {
            if (SaveParams.data["tarikhaction"].tarikhaction.length < 10) {
                toast.error(this.context.t("msg_ActionDate_Not_Valid"));
                return false;
            }
        }
        SaveParams.data["peygir_id"] = { "peygir_id": ReviewWork_Info.peygir_id };
        SaveParams.form = formname;
        let obj = [];
        Object.keys(SaveParams.data).map((item, index) => {
            return obj[index++] = SaveParams.data[item];
        })
        SaveParams.data = obj;
        
        SaveWorkInfo(SaveParams,this.context.t("msg_Operation_Success")).then(data => {
            if (data.status) {
                this.setState({
                    EditReviewModal: false,
                });
                ReviewParams.peygir_id = ReviewWork_Info.p_id;
                ReviewWorkConfirmList(ReviewParams);
                FetchGetReviewWorkInfo(ReviewWork_Info.peygir_id);
            }
        });
        SaveParams = { form: "", data: [] };
    }

    EditReviewWorkConfirm = () => {
        const {  GetReviewWorkInfo } = this.props;
        if (this.state.SelectedRow !== undefined) {
            GetReviewWorkInfo(this.state.SelectedRow).then(data => {
                if (data.status) {
                    this.setState({
                        EditReviewModal: !this.state.EditReviewModal
                    })
                }
            });
        } else
        toast.warn(this.context.t("msg_No_Select_Row"));
    }
    SelectRow(row) {
        this.setState({SelectedRow:row});
    }


    render() {
        const columns = [
            { name: 'peygir_id', title: this.context.t("RowId") },
            { name: 'wtype', title: this.context.t("WorkType") },
            { name: 'tarikhaction', title: this.context.t("ActionDate") },
            { name: 'worker', title: this.context.t("worker") },
            { name: 'modir', title: this.context.t("manager") },
            { name: 'deadtime', title: this.context.t("DeadTime") },
            { name: 'suggest_time', title: this.context.t("SuggestTime") },
            { name: 'tozihat', title: this.context.t("Description") },
            { name: 'flow_code', title: this.context.t("FlowCode") },
            { name: 'madrak_name', title: this.context.t("CertificateName") },
            { name: 'ashkhasname', title: this.context.t("Audience") },
            { name: 'mozo', title: this.context.t("Subject") },
            { name: 'ashkhas_id', title: this.context.t("AudienceID") },

        ];
        const { modal, peygir_id, ReviewWorkList_rows, ReviewWorkList_totalCount, ParentForm,
            SuccesReviewWorkConfirm,ReviewWork_Info } = this.props;
        Params.peygir_id = peygir_id;
      
        return (
            <div>

                <div>
                    <Modal isOpen={modal} keyboard={false}
                    className={this.state.modalClass}>
                        <ModalHeader>{this.context.t("frm_Review_Confirm_Work")}</ModalHeader>
                        <ModalBody>
                            <GridComponent columns={columns} booleanColumns={booleanColumns}
                                rows={ReviewWorkList_rows} totalCount={ReviewWorkList_totalCount}
                                rowId="peygir_id"
                                UrlParams={Params} 
                                GetRowInfo={this.SelectRow.bind(this)} columnwidth={150}
                                currencyColumns={currencyColumns} hiddenColumnNames={hiddenColumnNames}
                            />
                        </ModalBody>
                        <ModalFooter>
                        <Button color="primary" onClick={this.EditReviewWorkConfirm.bind(this)}>{this.context.t("Edit")}</Button>{' '}
                            <Button color="primary" onClick={SuccesReviewWorkConfirm.bind(this)}>{this.context.t("ConfirmAndClose")}</Button>{' '}
                        </ModalFooter>
                    </Modal>
                </div>
                {this.state.EditReviewModal &&
                    <EditeReviewWorkModal 
                        modal={this.state.EditReviewModal} ParentForm={ParentForm}
                        toggle={this.EditReviewWorkConfirm.bind(this)} Params={Params} SaveParams={SaveParams}
                        rowData={ReviewWork_Info!==undefined?ReviewWork_Info:{}} SuccesEditReviewWork={this.SuccesEditReviewWork.bind(this)}

                    />}
            </div>
        );
    }
}


ReviewWorkModal.contextTypes = {
    t: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({


    SaveWorkInfo: (SaveParams,msg) => {
        return dispatch(WorkActions_action.SaveWorkInfo(SaveParams,msg));
    },
    ReviewWorkConfirmList: (Params) => {
        dispatch(WorkBasic_action.ReviewWorkConfirmList(Params));
    },
    GetReviewWorkInfo: (row) => {
       return dispatch(WorkBasic_action.GetReviewWorkInfo(row));
    },
    FetchGetReviewWorkInfo: (peygir_id) => {
        return dispatch(WorkBasic_action.FetchGetReviewWorkInfo(peygir_id))
    },

});
function mapStateToProps(state) {

    const { alert } = state;
    const { loading } = state.loading;
    const { lang } = state.i18nState
    const { ReviewWorkList_rows } =
        state.Auto_WorkBasic !== null && state.Auto_WorkBasic !== undefined ?
            state.Auto_WorkBasic.ReviewWorkList_rows != null && state.Auto_WorkBasic.ReviewWorkList_rows != undefined
                ? state.Auto_WorkBasic : [] : [];
    const { ReviewWorkList_totalCount } = state.Auto_WorkBasic
    const { ReviewWork_Info } = state.Auto_WorkBasic;
    return {
        alert,
        loading,
        lang,
        ReviewWorkList_rows,
        ReviewWorkList_totalCount,
        ReviewWork_Info
    };
}


const connectedReviewWorkModal = connect(mapStateToProps, mapDispatchToProps)(ReviewWorkModal);
export { connectedReviewWorkModal as ReviewWorkModal };
