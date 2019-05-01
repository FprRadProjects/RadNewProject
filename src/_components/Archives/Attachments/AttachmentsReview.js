import React, { Component } from 'react';
import { connect } from "react-redux"
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import PropTypes from "prop-types"
import { toast } from 'react-toastify';
import { ArchiveActions_action } from "../../../_actions";

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import UploadFile from './UploadFile';

class AttachmentsReview extends Component {
    constructor(props) {
        super(props);
        const { AttachmentList } = this.props;
        this.state = {
            ...this.state,
            backdrop: "static",
            modal: false,
            FinalAttachmentList: AttachmentList,
            modalClass: "modal-dialog-centered modal-lg r-modal r-attachment-modal"
        };

    }

    EditAttachment = (newArchive) => {
        this.setState({
            FinalAttachmentList: [...this.state.FinalAttachmentList, newArchive]
        });
        const { ChangeAttachments } = this.props;
        ChangeAttachments(this.state.FinalAttachmentList);

    }
    deleteHandler = (archive) => {
        confirmAlert({
            title: this.context.t("Delete"),
            message: this.context.t("AreSureOperations"),
            buttons: [
                {
                    label: this.context.t("Yes"),
                    onClick: () => {
                        const { ArchiveRemoveFullFile } = this.props;
                        if (!archive.fromParent)
                            ArchiveRemoveFullFile(archive.archiveId).then(data => {
                                if (data.status) {
                                    var SelectedArchiveRows = this.state.FinalAttachmentList.filter(function (item) { return item.archiveId != archive.archiveId });
                                    this.setState({ FinalAttachmentList: SelectedArchiveRows });
                                    const { ChangeAttachments } = this.props;
                                    ChangeAttachments(SelectedArchiveRows);
                                }
                            });
                        else {
                            var SelectedArchiveRows = this.state.FinalAttachmentList.filter(function (item) { return item.archiveId != archive.archiveId });
                            this.setState({ FinalAttachmentList: SelectedArchiveRows });
                            const { ChangeAttachments } = this.props;
                            ChangeAttachments(SelectedArchiveRows);
                        }
                    }
                },
                {
                    label: this.context.t("No"),
                }
            ]
        });
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
                        <ModalHeader toggle={toggle}>{this.context.t("frm_Attachment_Review")}</ModalHeader>
                        <ModalBody>
                            <div className="attachment-container">
                                <div className="row ">
                                    <div className="col-6">
                                        <div className="attachment-side">
                                            <UploadFile peygir_id={peygir_id} EditAttachment={this.EditAttachment.bind(this)}></UploadFile>
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

                                                    {this.state.FinalAttachmentList !== undefined && Object.keys(this.state.FinalAttachmentList).map((keyName, index) => {
                                                        return <tr>
                                                            <td>{this.state.FinalAttachmentList[keyName].archiveId}</td>
                                                            <td>{this.state.FinalAttachmentList[keyName].fileName}</td>
                                                            <td><input disabled={true} type="checkbox" checked={this.state.FinalAttachmentList[keyName].fromParent ? "checked" : ""}></input></td>
                                                            <td><i className="fa fa-trash attachment-review-delete" onClick={this.deleteHandler.bind(this, this.state.FinalAttachmentList[keyName])}></i></td>
                                                        </tr>
                                                    })}

                                                </tbody>
                                            </table>
                                        </div>
                                        <Button color="secondary" className="mb-2 mr-2" onClick={toggle}>{this.context.t("ConfirmAndClose")}</Button>
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
    ArchiveRemoveFullFile: (Id) => {
        return dispatch(ArchiveActions_action.ArchiveRemoveFullFile(Id));
    }
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
