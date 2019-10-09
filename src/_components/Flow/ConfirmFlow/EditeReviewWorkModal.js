import React, { Component } from 'react';
import { SelectDefaultTextModal } from "../../Basic/";
import { connect } from "react-redux"
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import PropTypes from "prop-types"
import { WorkActions_action, AutoBasicInfo_action } from "../../../_actions";
import { ComboSelectList, CalendarDatePicker } from "../../Frameworks";
import { toast } from 'react-toastify';
var thisSaveParams = { form: "", data: [] };
var WorkerParams = {
    "page": 0,
    "pagesize": 10,
    "id_role": 0,
    "wt_id": 0,
    "orderby": "id_user",
    "direction": "desc",
    "filter": []
};
class EditeReviewWorkModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            EditReviewModal: false,
            ashkhasList: [],
            workerList: [],
            managerList: [],
            SubjectSelectmodal: false,
            workerSelectedOption: {},
            managerSelectedOption: {},
            ashkhasSelectedOption: {},
            modalClass: "modal-dialog-centered modal-lg r-modal"
        };
        const { SaveParams } = this.props;
        thisSaveParams = SaveParams;
    }


    componentDidMount() {
        const { rowData, SelectWorkerList, SelectManagerList, SelectAshkhasList } = this.props;
        WorkerParams.wt_id=rowData.wt_id;
        SelectWorkerList(WorkerParams);

        SelectManagerList(0, rowData.wt_id);
        SelectAshkhasList(rowData.id_tel);
        this.setState({ ashkhasSelectedOption: { value: rowData.ashkhas_id, label: rowData.ashkhasname } });
        this.setState({ workerSelectedOption: { value: rowData.worker_id, label: rowData.worker } });
        this.setState({ managerSelectedOption: { value: rowData.defmodir_id, label: rowData.modir } });
    }
    changeHandle = (e, val) => {
        if (val !== undefined) {
            const { name } = e;
            if (val.value !== 0) {
                if (name === "worker_id") {
                    const { SayManagerOnWorkerWtype, rowData } = this.props;
                    SayManagerOnWorkerWtype(val.value, rowData.wt_id).then(data => {
                        if (data.status) {
                            this.setState({ managerSelectedOption: { value: data.data.managerId, label: data.data.managerUName } });
                            thisSaveParams.data[["defmodir_id"]] = { ["defmodir_id"]: data.data.managerId }
                        }
                    });
                }
                thisSaveParams.data[[name]] = { [name]: val.value }

            } else
                thisSaveParams.data[[name]] = { [name]: null }
        }
        else {
            const { name, value } = e.target;
            thisSaveParams.data[[name]] = { [name]: value };
        }
    }
    CalendarChange = (value, name) => {
        thisSaveParams.data[[name]] = { [name]: value }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.rowData !== this.props.rowData) {
            var rowData = nextProps.rowData;
            this.setState({ ashkhasSelectedOption: { value: rowData.ashkhas_id, label: rowData.ashkhasname } });
            this.setState({ workerSelectedOption: { value: rowData.worker_id, label: rowData.worker } });
            this.setState({ managerSelectedOption: { value: rowData.defmodir_id, label: rowData.modir } });
        }
    }

    OpenSelectDefaultText = (e) => {
        const { name } = e.target;
        this.setState({
            SubjectSelectmodal: !this.state.SubjectSelectmodal,
            type: name,
        });

    }
    SuccessSelectSubject = (row, e) => {
        if (row !== undefined && row !== null) {
            if (this.state.SubjectSelectmodal)
                if (this.state.type === "subject") {
                    this.refs.SubjectInput.value += " " + (row !== undefined ? row.sharh !== undefined ? row.sharh : "" : "");
                    thisSaveParams.data["mozo"] = { "mozo": this.refs.SubjectInput.value };
                } else {
                    this.refs.DescriptionInput.value += " " + (row !== undefined ? row.sharh !== undefined ? row.sharh : "" : "");
                    thisSaveParams.data["tozihat"] = { "tozihat": this.refs.DescriptionInput.value };
                }
            this.setState({
                SubjectSelectmodal: !this.state.SubjectSelectmodal,
                type: "",
            });
        }
        else
            toast.warn(this.context.t("msg_No_Select_Row"));
    }
    CloseSelectDefaultText = (e) => {
        this.setState({
            SubjectSelectmodal: !this.state.SubjectSelectmodal,
        });
    }
    render() {

        const { modal, rowData, toggle, SelectManagerList_rows, SelectWorkerList_rows, SelectAshkhasList_rows
            , SuccesEditReviewWork } = this.props;
        var None = [{ value: 0, label: this.context.t("NoSelection") }]
        var AshkhasList = None.concat(SelectAshkhasList_rows)
        
        return (
            <div>

                <div>
                    <Modal isOpen={modal} className={this.state.modalClass} toggle={toggle} >
                        <ModalHeader>{this.context.t("frm_Edit_Review_Confirm_Work")}</ModalHeader>
                        <ModalBody>
                            {rowData !== undefined && rowData != null &&
                                <div>
                                    <div className="row ">
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label><b>{this.context.t("WorkID")}</b></label>
                                                <input type="text" readOnly className="form-control-plaintext" defaultValue={rowData.peygir_id} />
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label><b>{this.context.t("FlowCode")}</b></label>
                                                <input type="text" readOnly className="form-control-plaintext" defaultValue={rowData.flow_code} />
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label><b>{this.context.t("CertificateName")}</b></label>
                                                <input type="text" readOnly className="form-control-plaintext" defaultValue={rowData.madrak_name} />
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label><b>{this.context.t("WorkType")}</b></label>
                                                <input type="text" readOnly className="form-control-plaintext" defaultValue={rowData.wtype} />
                                            </div>
                                        </div>
                                    </div>

                                    <hr className="mt-1 mb-4" />
                                    <div className="row bg-gray mg-b-5">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>{this.context.t("ActionDate")}</label>
                                                <CalendarDatePicker className="form-control" fieldname="tarikhaction" CalendarChange={this.CalendarChange.bind(this)} setDate={rowData.tarikhaction}></CalendarDatePicker>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>{this.context.t("DeadTime")}</label>
                                                <input type="text" className="form-control" name="deadtime" onChange={this.changeHandle.bind(this)} defaultValue={rowData.deadtime} />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>{this.context.t("SuggestTime")}</label>
                                                <input type="text" className="form-control" name="suggest_time" onChange={this.changeHandle.bind(this)} defaultValue={rowData.suggest_time} />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>{this.context.t("worker")}</label>
                                                {SelectWorkerList_rows !== undefined &&
                                                    <ComboSelectList options={SelectWorkerList_rows} name="worker_id" onChange={this.changeHandle.bind(this)} selectedOption={this.state.workerSelectedOption} />
                                                }
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>{this.context.t("manager")}</label>
                                                {SelectManagerList_rows !== undefined &&
                                                    <ComboSelectList options={SelectManagerList_rows} name="defmodir_id" onChange={this.changeHandle.bind(this)} selectedOption={this.state.managerSelectedOption} />
                                                }
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>{this.context.t("Audience")}</label>
                                                {SelectAshkhasList_rows !== undefined &&
                                                    <ComboSelectList options={AshkhasList} name="ashkhas_id" onChange={this.changeHandle.bind(this)} selectedOption={this.state.ashkhasSelectedOption} />
                                                }
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>{this.context.t("Subject")}</label>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend align-self-stretch">
                                                        <Button color="primary" name="subject"
                                                            onClick={this.OpenSelectDefaultText.bind(this)}>{this.context.t("SelectPopup")}</Button>
                                                    </div>
                                                    <input type="text" className="form-control" ref="SubjectInput" name="mozo" onChange={this.changeHandle.bind(this)} defaultValue={rowData.mozo} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="form-group">
                                                <label>{this.context.t("Description")}</label>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend align-self-stretch">
                                                        <Button color="primary" name="tozihat"
                                                            onClick={this.OpenSelectDefaultText.bind(this)}>{this.context.t("SelectPopup")}</Button>
                                                    </div>
                                                    <textarea type="text" rows="4" className="form-control" ref="DescriptionInput" name="tozihat" onChange={this.changeHandle.bind(this)} defaultValue={rowData.tozihat}></textarea><br />
                                                </div>
                                            </div>
                                        </div>
                                       
                                    </div>
                                </div>
                            }
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={SuccesEditReviewWork.bind(this)}>{this.context.t("SaveAndClose")}</Button>{' '}
                            <Button color="error" onClick={toggle}>{this.context.t("Cancel")}</Button>
                        </ModalFooter>
                    </Modal>
                </div>
                {this.state.SubjectSelectmodal &&
                    <SelectDefaultTextModal modal={this.state.SubjectSelectmodal}
                        toggle={this.CloseSelectDefaultText.bind(this)}
                        Successtoggle={this.SuccessSelectSubject.bind(this)}
                        id_tel={rowData.id_tel} />}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({

    ConfirmReviewWork: (peygir_id) => {
        dispatch(WorkActions_action.ConfirmReviewWork(peygir_id))
    }, SelectManagerList: (id_role, wt_id) => {
        dispatch(AutoBasicInfo_action.SelectManagerList(id_role, wt_id))
    }, SelectWorkerList: (Params) => {
        dispatch(AutoBasicInfo_action.SelectWorkerList(Params))
    }, SelectAshkhasList: (id_taraf) => {
        dispatch(AutoBasicInfo_action.SelectAshkhasList(id_taraf))
    }, SayManagerOnWorkerWtype: (worker_id, wt_id) => {
        return dispatch(AutoBasicInfo_action.SayManagerOnWorkerWtype(worker_id, wt_id))
    },
});
EditeReviewWorkModal.contextTypes = {
    t: PropTypes.func.isRequired
}

function mapStateToProps(state) {

    const { alert } = state;
    const { loading } = state.loading;
    const { lang } = state.i18nState

    const { SelectManagerList_rows, SelectWorkerList_rows, SelectAshkhasList_rows } = state.Auto_BasicInfo
    return {
        alert,
        loading,
        lang,
        SelectManagerList_rows,
        SelectWorkerList_rows,
        SelectAshkhasList_rows,
    };
}


const connectedEditeReviewWorkModal = connect(mapStateToProps, mapDispatchToProps)(EditeReviewWorkModal);
export { connectedEditeReviewWorkModal as EditeReviewWorkModal };
