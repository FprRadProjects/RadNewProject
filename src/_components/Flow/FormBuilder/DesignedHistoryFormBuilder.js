import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import _ from "lodash";
import $ from 'jquery';
import PropTypes, { bool } from "prop-types"
import { connect } from "react-redux";
import { Responsive, WidthProvider } from "react-grid-layout";
import NumberFormat from "react-number-format";
import InputMask from "react-input-mask";
import { JalaliField } from 'material-ui-hichestan-datetimepicker';
import { RibbonDesignedHistoryFormBuilder } from '../Ribbon';
import 'react-grid-layout/css/styles.css';
import {
    FormBuilderActions_action,
    FormBuilderBasic_action
} from "../../../_actions";
import { toast } from 'react-toastify';
const _Config = JSON.parse(localStorage.getItem("_Config"));
const ResponsiveReactGridLayout = WidthProvider(Responsive);

var SaveValuesParams = { peygir_id: 0, caption_id: 0, Fields: [] };
var ImagesFormData = new FormData();
var valuesJSON = [];
var files = [];
class DesignedHistoryFormBuilder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...this.state,
            modal: false,
            backdrop: "static",
            modalClass: "modal-dialog-centered modal-xl r-modal",
            currentBreakpoint: "lg",
            compactType: "vertical",
            mounted: false,
            layouts: { lg: this.props.FormBuilderLayoutData },
            FlowFormBuilderModal: this.props.FlowFormBuilderModal,
            FormBuilderCaptionId: this.props.FormBuilderCaptionId,
            FormBuilderLayoutData: this.props.FormBuilderLayoutData,
            DesignPageLayout: this.props.DesignPageLayout,
            DesignPageSize: this.props.DesignPageSize
        };
    }
    static defaultProps = {
        className: "layout",
        rowHeight: 30,
        cols: { lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 },
    };

  
    componentDidMount() {
        SaveValuesParams = { peygir_id: 0, caption_id: 0, Fields: [] };
        ImagesFormData = new FormData();
        valuesJSON = [];
        this.setState({ mounted: true });
    }

 

  

    generateDOM() {
        return _.map(this.state.layouts[this.state.currentBreakpoint], l => {
            var ffieldsArray = null;
            var ffieldstxtArray = null;
            var listItems = null;
            if (l.ftype === 'look') {
                ffieldsArray = l.ffields.split(',');
                ffieldstxtArray = l.ffieldstxt.split(',');
                listItems = ffieldsArray.map((val, index) =>
                    <option
                        key={index}
                        value={val}
                        Text={ffieldstxtArray[index]}
                        >{ffieldstxtArray[index]}</option>
                );
            }
            return (
                <div className={l.faccess == "0" ? "is-disabled" : l.frequired ? "is-requierd" : ""} style={{ zIndex: (1000 - parseInt(l.y)) }} key={l.i} flabel={l.flabel} ftype={l.ftype} fnum={l.fnum} frequired={l.frequired} ffields={l.ffields} ffieldstxt={l.ffieldstxt}>
                    {l.ftype === 'adad'
                        ? <div className="input-group">
                            <div className="input-group-prepend">
                                <span style={{
                                    color: l.fcolor,
                                    fontWeight: l.ffontweight,
                                    fontStyle: l.ffontstyle,
                                    fontSize: l.ffontsize,
                                    fontFamily: l.ffontfamily
                                }} className="input-group-text">{l.flabel}</span>
                            </div>
                            <input
                                disabled={"disabled"}
                                id={"formvals_" + l.ftype + l.fnum}
                                name={"formvals_" + l.ftype + l.fnum}
                                flabel={l.flabel}
                                ftype={l.ftype}
                                fnum={l.fnum}
                                type="Number"
                                className="form-control"
                                value={l.fvalue} />
                        </div>
                        : (l.ftype === 'look'
                            ? <div className="input-group">
                                <div className="input-group-prepend">
                                    <span style={{
                                        color: l.fcolor,
                                        fontWeight: l.ffontweight,
                                        fontStyle: l.ffontstyle,
                                        fontSize: l.ffontsize,
                                        fontFamily: l.ffontfamily
                                    }} className="input-group-text">{l.flabel}</span>
                                </div>
                                <select
                                    defaultValue={l.fvalue}
                                    disabled={"disabled"}
                                    id={"formvals_" + l.ftype + l.fnum}
                                    name={"formvals_" + l.ftype + l.fnum}
                                    flabel={l.flabel}
                                    ftype={l.ftype}
                                    fnum={l.fnum}
                                    ffields={l.ffields}
                                    ffieldstxt={l.ffieldstxt}
                                    className="form-control">
                                    {listItems}
                                </select>
                            </div>
                            : (l.ftype === 'img'
                                ? <div className="r-formbuilder__img">
                                    <span style={{
                                        color: l.fcolor,
                                        fontWeight: l.ffontweight,
                                        fontStyle: l.ffontstyle,
                                        fontSize: l.ffontsize,
                                        fontFamily: l.ffontfamily
                                    }} className="input-group-text d-block">{l.flabel}</span>
                                    <div className="r-formbuilder__img-holder" >
                                        <input
                                            disabled={"disabled"}
                                            type="file"
                                            id={"formvals_" + l.ftype + l.fnum}
                                            name={"formvals_" + l.ftype + l.fnum}
                                            flabel={l.flabel}
                                            ftype={l.ftype}
                                            fnum={l.fnum}
                                            ref={l.colname}
                                            />
                                        <img id={l.colname} src={l.fimg != null ? _Config.BaseUrl + l.fimg : ""} />
                                    </div>
                                </div>
                                : (l.ftype === 'mon'
                                    ? <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span style={{
                                                color: l.fcolor,
                                                fontWeight: l.ffontweight,
                                                fontStyle: l.ffontstyle,
                                                fontSize: l.ffontsize,
                                                fontFamily: l.ffontfamily
                                            }} className="input-group-text">{l.flabel}</span>
                                        </div>
                                        <NumberFormat
                                            disabled={"disabled"}
                                            id={"formvals_" + l.ftype + l.fnum}
                                            name={"formvals_" + l.ftype + l.fnum}
                                            flabel={l.flabel}
                                            ftype={l.ftype}
                                            fnum={l.fnum}
                                            value={l.fvalue}
                                            thousandSeparator={true}
                                            className="form-control"
                                        />
                                    </div>
                                    : (l.ftype === 'saat'
                                        ? <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span style={{
                                                    color: l.fcolor,
                                                    fontWeight: l.ffontweight,
                                                    fontStyle: l.ffontstyle,
                                                    fontSize: l.ffontsize,
                                                    fontFamily: l.ffontfamily
                                                }} className="input-group-text">{l.flabel}</span>
                                            </div>

                                            <InputMask
                                                disabled={"disabled"}
                                                id={"formvals_" + l.ftype + l.fnum}
                                                name={"formvals_" + l.ftype + l.fnum}
                                                flabel={l.flabel}
                                                ftype={l.ftype}
                                                fnum={l.fnum}
                                                type={Text}
                                                mask="99:99"
                                                value={l.fvalue}
                                                className="form-control" />
                                        </div>
                                        : (l.ftype === 'str'
                                            ? <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span style={{
                                                        color: l.fcolor,
                                                        fontWeight: l.ffontweight,
                                                        fontStyle: l.ffontstyle,
                                                        fontSize: l.ffontsize,
                                                        fontFamily: l.ffontfamily
                                                    }} className="input-group-text">{l.flabel}</span>
                                                </div>
                                                <textarea
                                                    disabled={"disabled"}
                                                    id={"formvals_" + l.ftype + l.fnum}
                                                    name={"formvals_" + l.ftype + l.fnum}
                                                    className="form-control"
                                                >
                                                    {l.fvalue}
                                                </textarea>
                                            </div>
                                            : (l.ftype === 'bool'
                                                ? <div className="input-group">
                                                    <div className="form-check">
                                                        <input
                                                            disabled={"disabled"}
                                                            type="checkbox"
                                                            className="form-check-input"
                                                            id={"formvals_" + l.ftype + l.fnum}
                                                            name={"formvals_" + l.ftype + l.fnum}
                                                            flabel={l.flabel}
                                                            ftype={l.ftype}
                                                            value={l.fvalue}
                                                            fnum={l.fnum}
                                                            defaultChecked={l.fvalue == "1" ? "checked" : ""}
                                                        />
                                                        <label className="form-check-label" style={{
                                                            color: l.fcolor,
                                                            fontWeight: l.ffontweight,
                                                            fontStyle: l.ffontstyle,
                                                            fontSize: l.ffontsize,
                                                            fontFamily: l.ffontfamily
                                                        }} for={"formvals_" + l.ftype + l.fnum}>{l.flabel}</label>
                                                    </div>
                                                </div>
                                                : (l.ftype === 'tar'
                                                    ? <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <span style={{
                                                                color: l.fcolor,
                                                                fontWeight: l.ffontweight,
                                                                fontStyle: l.ffontstyle,
                                                                fontSize: l.ffontsize,
                                                                fontFamily: l.ffontfamily
                                                            }} className="input-group-text">{l.flabel}</span>
                                                        </div>
                                                        <JalaliField
                                                            disabled={"disabled"}
                                                            id={"formvals_" + l.ftype + l.fnum}
                                                            name={"formvals_" + l.ftype + l.fnum}
                                                            flabel={l.flabel}
                                                            ftype={l.ftype}
                                                            fnum={l.fnum}
                                                            defaultValue={this.state[l.colname] !== undefined && this.state[l.colname] !== null ? this.state[l.colname] : l.fvalue}
                                                            value={this.state[l.colname] !== undefined && this.state[l.colname] !== null ? this.state[l.colname] : l.fvalue}
                                                            className="form-control"
                                                        />
                                                    </div>
                                                    : (l.ftype === 'label'
                                                        ? <span style={{
                                                            color: l.fcolor,
                                                            fontWeight: l.ffontweight,
                                                            fontStyle: l.ffontstyle,
                                                            fontSize: l.ffontsize,
                                                            fontFamily: l.ffontfamily
                                                        }}>{l.flabel}</span>
                                                        : (l.ftype === 'group'
                                                            ? <div className="r-formbuilder__group">
                                                                <span style={{
                                                                    color: l.fcolor,
                                                                    fontWeight: l.ffontweight,
                                                                    fontStyle: l.ffontstyle,
                                                                    fontSize: l.ffontsize,
                                                                    fontFamily: l.ffontfamily
                                                                }}>{l.flabel}</span>
                                                            </div>
                                                            : null
                                                        )
                                                    )
                                                )
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    }
                </div>
            );
        });
    }
   
    render() {

        const { modal, toggle, FormBuilderCaptionId } = this.props;
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
                    <ModalHeader toggle={toggle}>{this.context.t("frm_Flow_Form_Builder")}</ModalHeader>
                    <ModalBody>
                        <div className="r-main-box__ribbon">
                            <RibbonDesignedHistoryFormBuilder  PrintRef={this.componentRef} />
                        </div>

                        <div className="r-formbuilder" >
                            <page layoutsize={this.state.DesignPageSize} layout={this.state.DesignPageLayout} >
                                <ResponsiveReactGridLayout
                                    id="printme"
                                    {...this.props}
                                    className="r-formbuilder__layout designed"
                                    layouts={this.state.layouts}
                                    isDraggable={false}
                                    isResizable={false}
                                    ref={el => (this.componentRef = el)}

                                >
                                    {this.generateDOM()}
                                </ResponsiveReactGridLayout>
                            </page>
                        </div>
                        <style>{modalBackDrop}</style>
                    </ModalBody>
                </Modal>
            </div >

        );
    }
}

const mapDispatchToProps = dispatch => ({
    DesignedSaveValues: (SaveParams, msg) => {
        return dispatch(FormBuilderActions_action.DesignedSaveValues(SaveParams, msg));
    },
    DesignedSaveImg: (Params, msg) => {
        return dispatch(FormBuilderActions_action.DesignedSaveImg(Params, msg));
    },
    DesignedDelImg: (Params, msg) => {
        return dispatch(FormBuilderActions_action.DesignedDelImg(Params, msg));
    },
    FlowPeygirCaptionInfo: (showtree_id) => {
        return dispatch(FormBuilderBasic_action.FlowPeygirCaptionInfo(showtree_id))
    },

    DesignedFormFieldList: (peygir_id, showtree_id) => {
        return dispatch(FormBuilderBasic_action.DesignedFormFieldList(peygir_id, showtree_id))
    }
});

DesignedHistoryFormBuilder.contextTypes = {
    t: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { alert } = state;
    const { loading } = state.loading;
    const { lang } = state.i18nState;
    const { WorkInfo } = state.Auto_WorkBasic;

    return {
        alert,
        loading,
        lang,
        WorkInfo
    };
}

const connectedDesignedHistoryFormBuilder = connect(mapStateToProps, mapDispatchToProps)(DesignedHistoryFormBuilder);
export { connectedDesignedHistoryFormBuilder as DesignedHistoryFormBuilder };
