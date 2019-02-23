import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mainpageActions } from '../../_actions/MainPage';
import { FullCalendar } from './FullCalendar';
import { LeftCounts } from './LeftCounts';
import PropTypes from "prop-types"
import { ModalFilter } from './ModalFilter';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';

var CalParams = {
    "seen": "2",
    "done": "0",
    "date": "0",
    "calendar": "",
    "worker": "0",
    "typ_id": "0",
    "startdate": "",
    "enddate": ""
};

class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            modal: false,
            backdrop: "static",
            backdropClassName:"test",
            modalClass: "modal-dialog-centered modal-lg r-filter-modal"
        }; this.toggle = this.toggle.bind(this);

    }
    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    submitChange() {
        const { GetEvent, GetCounts, Params } = this.props;
        GetCounts(Params);
        GetEvent(Params);
        console.log(Params)
    }
    componentDidMount() {
        const { GetCounts } = this.props;
        let data = { "seen": "2", "done": "0", "date": "0", "calendar": "", "worker": "0", "typ_id": "0" }
        GetCounts(data);

    }
    render() {

        const { GetEvents, GetCounts, alert, loading } = this.props;
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
            <div className="row">
                <div className="col-sm-12">
                    <div className="dashboard-wrap">

                        <div className="row">
                            <div className="col-xl-3 col-md-6">
                                <div className="dashboard-right-aside">
                                    <div className="card bg-white" style={{ minHeight: 260 + 'px', borderRadius: 10 + 'px' }}>
                                    </div>
                                    <div className="card bg-white mb-0" style={{ minHeight: 260 + 'px', borderRadius: 10 + 'px' }}>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-md-12">
                                <div className="dashboard-calendar">
                                    <div className="card">
                                        <FullCalendar GetCounts={GetCounts} GetEvent={GetEvents} Params={CalParams} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6">
                                <div className="dashboard-left-aside">
                                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.state.modalClass} backdrop={this.state.backdrop}>
                                        <ModalHeader toggle={this.toggle}></ModalHeader>
                                        <ModalBody>
                                            <ModalFilter Params={CalParams} GetCounts={GetCounts} GetEvent={GetEvents} />
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="primary" onClick={this.toggle}></Button>
                                        </ModalFooter>
                                    </Modal>
                                    <style>{modalBackDrop}</style>
                                    <div className="card">
                                        <Button color="" className="task-filter" onClick={this.toggle}></Button>
                                        <div className="card-header">
                                            <h4 className="card-title text-light text-center">2 بهمن 1397</h4>
                                            <div className="task-view-mode">
                                                <a href="#!" className="admin-view is-active">مدیر</a>
                                                <a href="#!" className="user-view">کاربر</a>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="dashboard-app-sidebar">
                                                <LeftCounts GetCounts={GetCounts} Params={CalParams} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
            
        );
    }
}


const mapDispatchToProps = dispatch => ({
    GetCounts: (Params) => {
        dispatch(mainpageActions.GetCounts(Params))
    },

    GetEvents: (Params) => {
        dispatch(mainpageActions.GetEvents(Params))
    }
});
DashBoard.contextTypes = {
    t: PropTypes.func.isRequired
}

function mapStateToProps(state) {

    const { alert } = state;
    const { loading } = state.loading;
    const { lang } = state.i18nState
    return {
        alert,
        loading,
        lang
    };
}

const connectedDashBoard = connect(mapStateToProps, mapDispatchToProps)(DashBoard);
export { connectedDashBoard as DashBoard };



