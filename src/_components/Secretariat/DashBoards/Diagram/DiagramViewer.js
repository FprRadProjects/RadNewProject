import React, { Component } from 'react';
import { connect } from "react-redux"
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import PropTypes from "prop-types"
import {OrgChart} from "../../../Config/orgChart";

class DiagramViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            toggleDiagram : false,
            modalClass: "modal-dialog-centered modal-lg r-modal"
        };

    }


    toggleDiagram() {
        this.setState(prevState => ({
            toggleDiagram: !prevState.toggleDiagram
        }));
    }



    render() {
        const { modal, toggle, WorkInfo, Params, RefreshParentForm, ParentForm } = this.props;
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
                <Modal isOpen={modal} toggle={toggle} keyboard={false}
                       className={this.state.modalClass} backdrop={this.state.backdrop}>
                    <ModalHeader toggle={toggle}>دیاگرام</ModalHeader>
                    <ModalBody>
                        <OrgChart/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggleDiagram.bind(this)}></Button>
                        <style>{modalBackDrop}</style>
                    </ModalFooter>
                </Modal>



            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({

});
DiagramViewer.contextTypes = {
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


const connectedDiagramViewer = connect(mapStateToProps, mapDispatchToProps)(DiagramViewer);
export { connectedDiagramViewer as DiagramViewer };
