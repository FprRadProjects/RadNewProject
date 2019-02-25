import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {mainpageActions, design_Actions,BasicInfo_action} from '../../_actions';
import {FullCalendar} from './FullCalendar';
import {LeftCounts} from './LeftCounts';
import PropTypes from "prop-types"
import {connect} from 'react-redux';
import {ModalFilter} from './ModalFilter';
import {FormInfo} from '../../locales/';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup} from 'reactstrap';
/*import {MenuProvider} from "react-contexify";
import renderHTML from "react-render-html";
*/


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
            backdropClassName: "test",
            modalClass: "modal-dialog-centered modal-lg r-filter-modal"
        };
        this.toggle = this.toggle.bind(this);

    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }
    ChangeUserMode(event) {
        if(event.target.id=="manager")
            CalParams.worker=1;
        else if(event.target.id=="worker")
            CalParams.worker=0;
        event.target.classList.add('is-active');
        const {GetCounts} = this.props;
        GetCounts(CalParams);

    }
    componentDidMount() {
        const {GetCounts, GetTemplateForm,GetFormInfo} = this.props;
        GetCounts(CalParams);
        GetFormInfo(FormInfo.web_fm_mainpage);
        GetTemplateForm(FormInfo.web_fm_mainpage.id);

    }

    render() {

        const {GetEvents, GetCounts, alert, loading,ShortKeys} = this.props;
        const modalBackDrop = `
        .modal-backdrop {
            opacity:.98!important;
            background: rgb(210,210,210);
            background: -moz-linear-gradient(-45deg, rgba(210,210,210,1) 0%, rgba(229,235,238,1) 50%, rgba(216,216,216,1) 50.1%, rgba(216,216,216,1) 100%);
            background: -webkit-linear-gradient(-45deg, rgba(210,210,210,1) 0%,rgba(229,235,238,1) 50%,rgba(216,216,216,1) 50.1%,rgba(216,216,216,1) 100%);
            background: linear-gradient(135deg, rgba(210,210,210,1) 0%,rgba(229,235,238,1) 50%,rgba(216,216,216,1) 50.1%,rgba(216,216,216,1) 100%);
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#d2d2d2', endColorstr='#d8d8d8',GradientType=1 );
        }`;
        var AdminclassName = CalParams.worker===1 ? 'admin-view is-active' : 'admin-view ';
        var WorkrclassName = CalParams.worker===0 ? 'user-view  is-active' : 'user-view ';

        return (
            <div className="row">
                <div className="col-sm-12">
                    <div className="dashboard-wrap">

                        <div className="row">

                            <div className="col-xl-3 col-md-6">
                                <div className="dashboard-right-aside">
                                    <div className="card bg-white"
                                         style={{minHeight: 260 + 'px', borderRadius: 10 + 'px'}}>
                                    </div>
                                    <div className="card bg-white mb-0"
                                         style={{minHeight: 260 + 'px', borderRadius: 10 + 'px'}}>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-md-12">
                                <div className="dashboard-calendar">
                                    <div className="card">
                                        <FullCalendar GetCounts={GetCounts} GetEvent={GetEvents} Params={CalParams}/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6">
                                <div className="dashboard-left-aside">
                                    <Modal isOpen={this.state.modal} toggle={this.toggle}
                                           className={this.state.modalClass} backdrop={this.state.backdrop}>
                                        <ModalHeader toggle={this.toggle}></ModalHeader>
                                        <ModalBody>
                                            <ModalFilter Params={CalParams} GetCounts={GetCounts} GetEvent={GetEvents}/>
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
                                                <a href="#!" id="manager" onClick={this.ChangeUserMode.bind(this)} className={AdminclassName}>{this.context.t("manager")}</a>
                                                <a href="#worker" id="worker" onClick={this.ChangeUserMode.bind(this)}  className={WorkrclassName}>{this.context.t("worker")}</a>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="dashboard-app-sidebar">
                                                <LeftCounts GetCounts={GetCounts} Params={CalParams}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
                {/*<MenuProvider id="menu_id">
                    {ShortKeys!==undefined && Object.keys(ShortKeys).map((keyName, i) =>  {
                        let keyTarget=ShortKeys[keyName].Meta.replace("element=","rowid='"+ShortKeys[keyName].Id+"' element=");
                        keyTarget=keyTarget.replace("event", "onclick")

                        return  renderHTML(keyTarget);
                    })}
                </MenuProvider>*/}
            </div>

        );
    }
}


DashBoard.contextTypes = {
    t: PropTypes.func.isRequired
}

function mapStateToProps(state) {

    const {alert} = state;
    const {loading} = state.loading;
    const {lang} = state.i18nState;
    const {ShortKeys} = state.Design;

    const {Design} = state

    return {
        alert,
        loading,
        lang,
        ShortKeys,
        Design
    };
}

const mapDispatchToProps = dispatch => ({
    GetCounts: (Params) => {
        dispatch(mainpageActions.GetCounts(Params))
    },
    GetEvents: (Params) => {
        dispatch(mainpageActions.GetEvents(Params))
    },
    GetTemplateForm: (Params) => {
        dispatch(design_Actions.GetTemplateForm(Params))
    },
    GetFormInfo: (Param) => {
        dispatch(BasicInfo_action.GetFormInfo(Param))
    },

});
const connectedDashBoard = connect(mapStateToProps, mapDispatchToProps)(DashBoard);
export {connectedDashBoard as DashBoard};



