import React, { useState, useEffect, useContext } from 'react'
import jmoment from 'moment-jalaali';
import moment from 'moment';
import { mainpageActions, design_Actions, BasicInfo_action } from '../../_actions';
import { FullCalendar } from './FullCalendar';
import { LeftCounts } from './LeftCounts';
import PropTypes from "prop-types"
import { connect } from 'react-redux';
import { ModalFilter } from './ModalFilter';
import { FormInfo } from '../../locales/';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { withCookies } from 'react-cookie';

/*import {MenuProvider} from "react-contexify";
import renderHTML from "react-render-html";
*/
var faMonths = ["فروردین", "اردیبهشت", "خراد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"]
var enMonths = [" January ", " February ", " March ", " April ", " May ", " June ", " July ", " August ", " September ", " October ", " November ", " December "]

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

function DashBoard(props, context) {

    const [backdropClassName, setBackdropClassName] = useState("test");
    const [backdrop, setBackdrop] = useState("static");
    const [modalClass, setModalClass] = useState("modal-dialog-centered modal-lg r-filter-modal");
    const [events, setEvents] = useState();
    const [counts, setCounts] = useState();
    const [template, setTemplate] = useState();
    const [selectedDate, setSelectedDate] = useState();
    const [modal, setModal] = useState(false);

    useEffect(() => {

        let newDate = new Date()
        let selectedDate1 = jmoment(moment(newDate).locale('fa').format('YYYY/MM/DD')).format('jYYYY/jMM/jDD');
        const { lang } = props;
        if (lang === 'en')
            selectedDate1 = moment(newDate).locale('fa').format('YYYY/MM/DD');
        setSelectedDate(selectedDate1);
        localStorage.setItem("MasterFormInfo", JSON.stringify(FormInfo.web_fm_mainpage));

        FetchCountData();
        // FetchTemplateData();
        return () => {

        }
    }, []);
    // function FetchTemplateData() {
    //     design_Actions.GetTemplateForm(FormInfo.web_fm_mainpage.id).then(
    //         data => {
    //             setTemplate(data.data);
    //         }
    //     );
    // }
    function FetchCountData() {
        mainpageActions.GetCounts(CalParams).then(
            data => {
                setCounts(data.data);
            }
        );
    }
    function FetchEventData() {
        mainpageActions.GetEvents(CalParams).then(
            data => {
                setEvents(data.data);
            }
        );
    }

    function convertDate(selectedDate) {
        const { lang } = props;
        var splitted = selectedDate.split("/");
        var month = lang === 'fa' ? faMonths[parseInt(splitted[1] - 1)] : enMonths[parseInt(splitted[1] - 1)];
        return parseInt(splitted[2]) + " " + month + " " + parseInt(splitted[0]);
    }
    function toggle() {
        setModal(!modal);
    }
    function ChangeUserMode(event) {
        if (event.target.id == "manager")
            CalParams.worker = "1";
        else if (event.target.id == "worker")
            CalParams.worker = "0";
        event.target.classList.add('is-active');
        FetchCountData(CalParams);
    }


    function ChaneSelectedDate(val) {
        setSelectedDate(convertDate(val));
    }


    const modalBackDrop = `
        .modal-backdrop {
            opacity:.98!important;
            background: rgb(210,210,210);
            background: -moz-linear-gradient(-45deg, rgba(210,210,210,1) 0%, rgba(229,235,238,1) 50%, rgba(216,216,216,1) 50.1%, rgba(216,216,216,1) 100%);
            background: -webkit-linear-gradient(-45deg, rgba(210,210,210,1) 0%,rgba(229,235,238,1) 50%,rgba(216,216,216,1) 50.1%,rgba(216,216,216,1) 100%);
            background: linear-gradient(135deg, rgba(210,210,210,1) 0%,rgba(229,235,238,1) 50%,rgba(216,216,216,1) 50.1%,rgba(216,216,216,1) 100%);
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#d2d2d2', endColorstr='#d8d8d8',GradientType=1 );
        }`;
    var AdminclassName = CalParams.worker === "1" ? 'admin-view is-active' : 'admin-view ';
    var WorkrclassName = CalParams.worker === "0" ? 'user-view  is-active' : 'user-view ';
    return (
        <div className="row">
            <div className="col-12">
                <div className="dashboard-wrap">

                    <div className="row">

                        <div className="col-3">
                            <div className="dashboard-right-aside">
                                <div className="card bg-white"
                                    style={{ minHeight: 260 + 'px', borderRadius: 10 + 'px' }}>
                                </div>
                                <div className="card bg-white mb-0"
                                    style={{ minHeight: 260 + 'px', borderRadius: 10 + 'px' }}>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="dashboard-calendar">
                                <div className="card">
                                    <FullCalendar ChaneSelectedDate={ChaneSelectedDate} GetCounts={FetchCountData} GetEvent={FetchEventData} Events={events} Params={CalParams} />
                                </div>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="dashboard-left-aside">
                                <Modal isOpen={modal} toggle={toggle}
                                    className={modalClass} backdrop={backdrop}>
                                    <ModalHeader toggle={toggle}></ModalHeader>
                                    <ModalBody>
                                        <ModalFilter Params={CalParams} GetCounts={FetchCountData} GetEvent={FetchEventData} />
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="primary" onClick={toggle}></Button>
                                    </ModalFooter>
                                </Modal>
                                <style>{modalBackDrop}</style>
                                <div className="card">
                                    <Button color="" className="task-filter" onClick={toggle}></Button>
                                    <div className="card-header">
                                        <h4 className="card-title text-light text-center">{selectedDate}</h4>
                                        <div className="task-view-mode">
                                            <a id="manager" onClick={ChangeUserMode} className={AdminclassName}>{context.t("manager")}</a>
                                            <a id="worker" onClick={ChangeUserMode} className={WorkrclassName}>{context.t("worker")}</a>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="dashboard-app-sidebar">
                                            <LeftCounts GetCounts={FetchCountData} Params={CalParams} Counts={counts} />
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


DashBoard.contextTypes = {
    t: PropTypes.func.isRequired
}

function mapStateToProps(state) {

    const { lang } = state.i18nState;


    return {
        lang,

    };
}

const mapDispatchToProps = dispatch => ({
   
});
const connectedDashBoard = withCookies(connect(mapStateToProps, mapDispatchToProps)(DashBoard));
export { connectedDashBoard as DashBoard };



