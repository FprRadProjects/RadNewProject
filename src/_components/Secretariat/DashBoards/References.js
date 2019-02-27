import React, {Component} from 'react';
import {connect} from "react-redux"
import {Act_Reference, BasicInfo_action, design_Actions, mainpageActions, WorkBasic_action} from "../../../_actions";
import {GridComponent} from "../../Config/GridComponent";
import {RadioFilter} from "./RadioFilter";
import {ReferenceViewer} from "../RecordsPage/ReferenceViewer";
import PropTypes from "prop-types"
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {FormInfo} from "../../../locales";
var columns = [
    {name: 'worker', title: 'کاربر'},
    {name: 'modir', title: 'مدیر'},
    {name: 'name', title: 'نام'},
    {name: 'coname', title: 'شرکت'},
    {name: 'mnos', title: 'سریال سرشاخه'},
    {name: 'mwt', title: 'کار سرشاخه'},
    {name: 'peygir_id', title: 'شاخص کار'},
    {name: 'wtype:', title: 'نوع کار'},
    {name: 'nos_id:', title: 'سریال'},
    {name: 'custom_serial', title: 'سریال سفارشی'},
    {name: 'tarikhaction', title: 'تاریخ'},
    {name: 'mozo', title: 'موضوع'},
    {name: 'zam', title: 'ضمائم'},
    {name: 'vaziyat', title: 'وضعیت سند'},
    {name: 'code', title: 'کد'},
    {name: 'shomare', title: 'شماره'},
    {name: 'ashkhasname', title: 'مخاطب'},
    {name: 'ptype', title: 'پروژه'},
    {name: 'has_peyvast', title: 'پیوست دارد؟'},
    {name: 'flow_code', title: 'کد فرآیند'},
    {name: 'madrak_name', title: 'نام مدرک'},
    {name: 'f_s_status', title: 'وضعیت ارسالی فرآیند'},
    {name: 'f_r_status', title: 'وضعیت دریافتی فرآیند'},


    /*HIDDEN*/
    {name: 'done', title: 'انجام شده'},
    {name: 'id_tel', title: 'شاخص طرف حساب'},
    {name: 'olaviyat', title: 'اولویت'},
    {name: 'cuser', title: 'ایجاد کننده'},
    {name: 'c_date', title: 'تاریخ ایجاد'},
    {name: 'tarikh', title: 'تاریخ تایید'},
    {name: 'ftarikh', title: 'تاریخ تایید مدیر'},
    {name: 'mtarikh', title: 'تاریخ سرشاخه'},
    {name: 'see_date', title: 'تاریخ نمایش'},
    {name: 'fok', title: 'تایید مدیر'},
    {name: 'c_time', title: 'زمان ایجاد'},
    {name: 'wt_id', title: 'شاخص نوع کار'},
    {name: 'suggest_time', title: 'زمان پیشنهادی'},
    {name: 'sm_zaman_anjam_kar', title: 'زمان کار'},
    {name: 'see_time', title: 'زمان نمایش'},
    {name: 'saat', title: 'ساعت تایید'},
    {name: 'fsaat', title: 'ساعت تایید مدیر'},
    {name: 'proje_nos_id', title: 'سریال پروژه'},
    {name: 'p_proje_nose_id:', title: 'سریال پروژه سرشاخه'},
    {name: 'showtree_id', title: 'شاخص سرشاخه'},
    {name: 'flow', title: 'قرآیند'},
    {name: 'muser', title: 'کاربر سرشاخه'},
    {name: 'proje_code', title: 'کد پروژه'},
    {name: 'natije', title: 'نتیجه'},
    /*HIDDEN*/

];
var currencyColumns = ['peygir_id', 'id_tel'];
var hiddenColumnNames = ['done', 'tarikhaction', 'id_tel', 'olaviyat', 'cuser',
    'c_date', 'tarikh', 'fok', 'mtarikh', 'see_date', 'fok', 'c_time', 'wt_id',
    'suggest_time', 'sm_zaman_anjam_kar', 'see_time', 'saat', 'fsaat', 'proje_nos_id',
    'p_proje_nose_id', 'showtree_id', 'flow', 'muser', 'proje_code', 'natije'];
var booleanColumns = ['done', 'has_peyvast', 'done', 'fok'];

var Params = {
    "page": 0,
    "pagesize": 10,
    "seen": "2",
    "done": "0",
    "date": "0",
    "calendar": "",
    "worker": "0",
    "orderby": "tarikhaction",
    "direction": "desc",
    "filter": []

};

class References extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            toggleFilter: false,
            ReferenceViewermodal:false,
            backdrop: "static",
            backdropClassName: "test",
            modalClass: "modal-dialog-centered modal-lg r-filter-modal"
        };
        this.toggleFilter = this.toggleFilter.bind(this);
        this.toggleReferenceViewer = this.toggleReferenceViewer.bind(this);
    }


    toggleFilter() {
        this.setState(prevState => ({
            toggleFilter: !prevState.toggleFilter
        }));
    }
    toggleReferenceViewer() {
        this.setState(prevState => ({
            ReferenceViewermodal: !prevState.ReferenceViewermodal
        }));
    }
    componentDidMount() {
        const { GetTemplateForm,GetFormInfo} = this.props;
        GetFormInfo(FormInfo.fm_dabir_kartabl_erjaat);
    }
    render() {

        const {FetchData, alert, loading,peygir_id} = this.props;

        return (
            <div>
                {loading &&
                <div className={`alert ${alert.type}`}>...Loading</div>
                }
                {alert.message &&
                <div className={`alert ${alert.type}`}>{alert.message}</div>
                }
                <Button color="primary" onClick={this.toggleReferenceViewer}>نتیجه ارجاع</Button>
                { this.state.ReferenceViewermodal&& <ReferenceViewer modal={peygir_id!==undefined &&peygir_id!==0 && this.state.ReferenceViewermodal} toggle={this.toggleReferenceViewer.bind(this)}
                                 peygir_id={peygir_id}
                />}
                <Button color="primary" onClick={this.toggleFilter}>نمایش فیلتر ها</Button>
                <Modal isOpen={this.state.toggleFilter} toggle={this.toggleFilter}
                       className={this.state.modalClass} backdrop={this.state.backdrop}>
                    <ModalHeader toggle={this.toggleFilter}></ModalHeader>
                    <ModalBody>
                        <RadioFilter Params={Params} fetchData={FetchData.bind(this)}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggleFilter}></Button>
                    </ModalFooter>
                </Modal>

                <GridComponent columns={columns} booleanColumns={booleanColumns}
                               UrlParams={Params} fetchData={FetchData.bind(this)}
                               currencyColumns={currencyColumns} hiddenColumnNames={hiddenColumnNames}
                />


            </div>
        );
    }
}


const mapDispatchToProps = dispatch => ({
    FetchData: (Params) => {
        dispatch(Act_Reference.FetchData(Params))
    },
    GetTemplateForm: (Params) => {
        dispatch(design_Actions.GetTemplateForm(Params))
    },
    GetFormInfo: (Param) => {
        dispatch(BasicInfo_action.GetFormInfo(Param))
    },

});
References.contextTypes = {
    t: PropTypes.func.isRequired
}

function mapStateToProps(state) {

    const {alert} = state;
    const {loading} = state.loading;
    const {lang} = state.i18nState
    const {peygir_id} =state.BasicInfo.GridRowData!==undefined? state.BasicInfo.GridRowData:0
    return {
        alert,
        loading,
        lang,
        peygir_id
    };
}




const connectedReferences = connect(mapStateToProps, mapDispatchToProps)(References);
export {connectedReferences as References};



