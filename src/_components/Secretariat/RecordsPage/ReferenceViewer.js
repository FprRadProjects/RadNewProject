import React, {Component} from 'react';
import {connect} from "react-redux"
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {WorkBasic_action} from "../../../_actions/General/Automation/WorkDetails";
import {design_Actions} from "../../../_actions/Design";
import PropTypes from "prop-types"

class ReferenceViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            modal: false,
            backdrop: "static",
            backdropClassName: "test",
            modalClass: "modal-dialog-centered modal-lg r-filter-modal"
        };
    }
    componentDidMount() {
        const{GetWorkInfo,peygir_id}=this.props;
        if(peygir_id!==undefined)
            GetWorkInfo(peygir_id);
    }

    render() {
        const{modal,toggle,WorkInfo}=this.props;
        WorkInfo!=undefined && console.log(WorkInfo)
        const modalBackDrop = `
        .modal-backdrop {
            opacity:.98!important;
            background: rgb(210,210,210);
            background: -moz-linear-gradient(-45deg, rgba(210,210,210,1) 0%, rgba(229,235,238,1) 50%, rgba(216,216,216,1) 50.1%, rgba(216,216,216,1) 100%);
            background: -webkit-linear-gradient(-45deg, rgba(210,210,210,1) 0%,rgba(229,235,238,1) 50%,rgba(216,216,216,1) 50.1%,rgba(216,216,216,1) 100%);
            background: linear-gradient(135deg, rgba(210,210,210,1) 0%,rgba(229,235,238,1) 50%,rgba(216,216,216,1) 50.1%,rgba(216,216,216,1) 100%);
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#d2d2d2', endColorstr='#d8d8d8',GradientType=1 );
        }`;
        return (
            <div>
                <Modal isOpen={modal } toggle={toggle}
                       className={this.state.modalClass} backdrop={this.state.backdrop}>
                    <ModalHeader toggle={toggle}></ModalHeader>
                    <ModalBody>
                        {WorkInfo!==undefined&&<div>
                            <label>{ WorkInfo.peygir_id}</label><br/>
                            <label>{ WorkInfo.tarikhaction}</label><br/>
                            <label>{ WorkInfo.flow}</label><br/>
                            <label>{ WorkInfo.worker}</label><br/>
                            <label>{ WorkInfo.ptype}</label><br/>
                        </div>}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={toggle}></Button>
                    </ModalFooter>
                </Modal>
                <style>{modalBackDrop}</style>

            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    GetWorkInfo: (Params) => {
        dispatch(WorkBasic_action.GetWorkInfo(Params))
    },
    GetTemplateForm: (Params) => {
        dispatch(design_Actions.GetTemplateForm(Params))
    }
});
ReferenceViewer.contextTypes = {
    t: PropTypes.func.isRequired
}

function mapStateToProps(state) {

    const {alert} = state;
    const {loading} = state.loading;
    const {lang} = state.i18nState
    const {GridRowData} = state.BasicInfo
    const {WorkInfo} = state.Auto_BasicInfo;
    return {
        alert,
        loading,
        lang,
        GridRowData,
        WorkInfo
    };
}




const connectedReferenceViewer = connect(mapStateToProps, mapDispatchToProps)(ReferenceViewer);
export { connectedReferenceViewer as ReferenceViewer };
