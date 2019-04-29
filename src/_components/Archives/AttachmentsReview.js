import React, { Component } from 'react';
import { connect } from "react-redux"
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { design_Actions } from "../../_actions";
import PropTypes from "prop-types"
import { GridComponent } from "../Config/GridComponent";
import { toast } from 'react-toastify';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import UploadFile from './UploadFile';

var currencyColumns = [];
var hiddenColumnNames = [];
var booleanColumns = ["IsPublic"];
var Params = {
    "page": 0,
    "pagesize": 10,
    "FormId": "0",
    "orderby": "id",
    "direction": "desc",
    "filter": []
};
class AttachmentsReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            backdrop: "static",
            modal: false,
            modalClass: "modal-dialog-centered modal-lg r-modal r-attachment-modal"
        };

    }


    render() {
        const { modal, toggle, peygir_id, parentPeygirId } = this.props;
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

                <div>
                    <Modal isOpen={modal} toggle={toggle} backdrop={this.state.backdrop} className={this.state.modalClass} >
                        <ModalHeader>{this.context.t("frm_Attachment_Review")}</ModalHeader>
                        <ModalBody>
                            <div className="attachment-container">
                                <div className="row ">
                                    <div className="col-6">
                                        <div className="attachment-side">
                                            <UploadFile peygir_id={peygir_id}></UploadFile>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="attachment-review">
                                            <table className="table table-bordered table-striped text-center">
                                                <thead>
                                                    <tr>
                                                        <th className="text-center">شاخص آرشیو</th>
                                                        <th className="text-center">نام فایل</th>
                                                        <th className="text-center">فایل سرشاخه</th>
                                                        <th className="text-center"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>12345</td>
                                                        <td>acsascascasc.png</td>
                                                        <td>1961981</td>
                                                        <td><i className="fa fa-trash attachment-review-delete"></i></td>
                                                    </tr>
                                                    <tr>
                                                        <td>12345</td>
                                                        <td>acsascascasc.png</td>
                                                        <td>1961981</td>
                                                        <td><i className="fa fa-trash attachment-review-delete"></i></td>
                                                    </tr>
                                                    <tr>
                                                        <td>12345</td>
                                                        <td>acsascascasc.png</td>
                                                        <td>1961981</td>
                                                        <td><i className="fa fa-trash attachment-review-delete"></i></td>
                                                    </tr>
                                                    <tr>
                                                        <td>12345</td>
                                                        <td>acsascascasc.png</td>
                                                        <td>1961981</td>
                                                        <td><i className="fa fa-trash attachment-review-delete"></i></td>
                                                    </tr>
                                                    <tr>
                                                        <td>12345</td>
                                                        <td>acsascascasc.png</td>
                                                        <td>1961981</td>
                                                        <td><i className="fa fa-trash attachment-review-delete"></i></td>
                                                    </tr>
                                                   
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ModalBody>
                    </Modal>
                    <style>{modalBackDrop}</style>
                </div>

            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({

});
AttachmentsReview.contextTypes = {
    t: PropTypes.func.isRequired
}

function mapStateToProps(state) {

    const { alert } = state;
    const { loading } = state.loading;
    const { lang } = state.i18nState
    return {
        alert,
        loading,
        lang,
    };
}

const connectedAttachmentsReview = connect(mapStateToProps, mapDispatchToProps)(AttachmentsReview);
export { connectedAttachmentsReview as AttachmentsReview };
