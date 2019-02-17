import React, {Component} from 'react';
import {connect} from 'react-redux';
import {mainpageActions} from '../../_actions/MainPage';
import {FullCalendar} from './FullCalendar';
import {LeftCounts} from './LeftCounts';
import PropTypes from "prop-types"
import {ModalFilter} from './ModalFilter';
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
            backdrop: "static"
        }; this.toggle = this.toggle.bind(this);

    }
    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }



    componentDidMount() {
        const {GetCounts} = this.props;
        let data = {"seen": "2", "done": "0", "date": "0", "calendar": "", "worker": "0", "typ_id": "0"}
        GetCounts(data);

    }
    render() {

        const {GetEvents, GetCounts, alert} = this.props;

        return (
            <div className="row">
                <Button color="danger" onClick={this.toggle}>نمایش فیلتر ها</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} backdrop={this.state.backdrop}>
                    <ModalHeader toggle={this.toggle}>نمایش فیلتر ها</ModalHeader>
                    <ModalBody>
                        <ModalFilter Params={CalParams}  GetCounts={GetCounts} GetEvent={GetEvents}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <FullCalendar GetCounts={GetCounts} GetEvent={GetEvents} Params={CalParams}/>
                <LeftCounts GetCounts={GetCounts} Params={CalParams}/>
                {alert.message &&
                <div className={`alert ${alert.type}`}>{alert.message}</div>
                }
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

    const {alert} = state;
    const {lang} = state.i18nState
    return {
        alert,
        lang
    };
}

const connectedDashBoard = connect(mapStateToProps, mapDispatchToProps)(DashBoard);
export {connectedDashBoard as DashBoard};



