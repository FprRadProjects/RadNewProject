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
import { RibbonDesignedFormBuilder } from '../Ribbon';
import 'react-grid-layout/css/styles.css';
import { FormInfo } from "../../../locales";
import {
    FormBuilderActions_action,
    FormBuilderBasic_action, WorkActions_action,WorkBasic_action
} from "../../../_actions";
import { ConfirmFlow } from '../../Flow/ConfirmFlow';
import { toast } from 'react-toastify';
const _Config = JSON.parse(localStorage.getItem("_Config"));
const ResponsiveReactGridLayout = WidthProvider(Responsive);
var ConfirmParams = { form: "", page: 1, pagesize: 10, filter: [], Form: "", SaveParams: null };

var SaveValuesParams = { peygir_id: 0, caption_id: 0, Fields: [] };
var ImagesFormData = new FormData();
var valuesJSON = [];
var files = [];
class DesignedFormBuilder extends Component {
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
            Values:[],
            FlowResultSelectmodal: false,
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

    handleChange = (ftype, fnum) => event => {
        var colname = ftype + fnum;
        const { checked, value, formatted } = event.target;

        //  const ftype = event.target.getAttribute('ftype');
        var item = {}
        if (ftype == "bool") {
            item = { "columname": colname, "value": checked?"1":"0" }
            this.setState(prevState => ({ Values:{...prevState.Values, [colname]: checked} }));
        }
        else if (ftype == "mon") {
            item = { "columname": colname, "value": value.replace(/,/g, '') }
            this.setState(prevState => ({ Values:{...prevState.Values, [colname]: value.replace(/,/g, '')} }));
            // this.setState({ [colname]: value.replace(/,/g, '') });
        }
        else if (ftype == "tar") {
            item = { "columname": colname, "value": formatted }
            this.setState(prevState => ({ Values:{...prevState.Values, [colname]: formatted} }));
            // this.setState({ [colname]: formatted });
        } else if (ftype == "saat") {
            var splitValue = value.split(':');
            if (splitValue[0] > 23 || splitValue[1] > 59) {
                toast.error(this.context.t("msg_Invalid_Time_Value"));
                return false;
            }
            else {
            this.setState(prevState => ({ Values:{...prevState.Values, [colname]: value} }));
            // this.setState({ [colname]: value });
                item = { "columname": colname, "value": value }
            }
        }
        else {
            item = { "columname": colname, "value": value }
            this.setState(prevState => ({ Values:{...prevState.Values, [colname]: value} }));
            // this.setState({ [colname]: value });
        }
        for (var i = 0; i < valuesJSON.length; i++)
            if (valuesJSON[i]["columname"] == colname)
                valuesJSON.splice(i, 1);

        valuesJSON.push(item);

    };
    handleImagesChange = (colname, event) => {
        if (ImagesFormData.has(colname))
            ImagesFormData.delete(colname);
        ImagesFormData.append(colname, event.target.files[0]);
        var el = document.getElementById(colname);
        el.src = URL.createObjectURL(event.target.files[0]);
    };
    handleRemoveImage = (colname, msg, event) => {


        const { WorkInfo, DesignedDelImg } = this.props;
        // console.log(colname)
        //         if (ImagesFormData.has(colname))
        //             ImagesFormData.delete(colname);

        const hasImage = event.target.getAttribute('hasImage');
        if (hasImage == "true") {
            var DelImgFormData = new FormData();
            DelImgFormData.append("peygir_id", WorkInfo.peygir_id);
            DelImgFormData.append("showtree_id", WorkInfo.showtree_id);
            DelImgFormData.append("colname", colname);
            DesignedDelImg(DelImgFormData, msg).then(data => {
                if (data.status) {
                }
            })
        }

        var el = document.getElementById(colname);
        el.src = "";
    };
    SaveHandle = () => {
        const { WorkInfo, DesignedSaveValues, DesignedSaveImg, FormBuilderCaptionId } = this.props;
        SaveValuesParams.Fields = valuesJSON;
        SaveValuesParams.caption_id = FormBuilderCaptionId;
        console.log(WorkInfo)
        SaveValuesParams.peygir_id = WorkInfo.peygir_id;
        DesignedSaveValues(SaveValuesParams, this.context.t("msg_Operation_Success")).then(data => {
            if (data.status) {
                var hasImages = false;
                for (var item of ImagesFormData.keys())
                    hasImages = true;
        
                if (hasImages) {
                    ImagesFormData.append("peygir_id", WorkInfo.peygir_id);
                    ImagesFormData.append("caption_id", FormBuilderCaptionId);
                    ImagesFormData.append("showtree_id", WorkInfo.showtree_id);
                    DesignedSaveImg(ImagesFormData, this.context.t("msg_Operation_Success")).then(data => {
                        if (data.status) {
                        }
                    });
        
                }
            }
        });

       
    }
    componentDidMount() {
        SaveValuesParams = { peygir_id: 0, caption_id: 0, Fields: [] };
        ImagesFormData = new FormData();
        valuesJSON = [];
        this.setState({ mounted: true });
    }
    CloseleSelectFlowResult = (e) => {
        this.setState({
            FlowResultSelectmodal: !this.state.FlowResultSelectmodal,
        });
    }
    ConfirmationHandle = (e) => {
        const { WorkInfo, InitConfirmWork, lang, FetchWorkInfo, Params,
            RefreshParentForm } = this.props;
        ConfirmParams["peygir_id"] = WorkInfo.peygir_id;
        var formname = lang == "fa" ? FormInfo.fm_web_flow_formsaz.form_name : FormInfo.fm_web_flow_formsaz.en_form_name;
        ConfirmParams["Form"] = formname;
        InitConfirmWork(ConfirmParams, this.context.t("msg_Operation_Success")).then(data => {
            if (data.status) {
                if (data.code === 2 && data.data !== null) {
                    this.setState({
                        FlowResultSelectmodal: true,
                    });
                }
                else {
                    FetchWorkInfo(WorkInfo.peygir_id);
                    if (RefreshParentForm !== undefined)
                        RefreshParentForm(Params);
                }
            }
        });
    }

    rebuildHandle = (e) => {
        const { WorkInfo, FlowPeygirCaptionInfo, DesignedFormFieldList } = this.props;
        FlowPeygirCaptionInfo(WorkInfo.showtree_id).then(data => {
            if (data.status) {
                if (data.data.hasFormBuilder) {
                    DesignedFormFieldList(WorkInfo.peygir_id, WorkInfo.showtree_id).then(data1 => {
                        if (data1.status) {
                            this.setState({
                                Values:[],
                                layouts: { lg: data1.data.rows },
                                DesignPageLayout: data.data.DesignPageLayout,
                                DesignPageSize: data.data.DesignPageSize
                            });
                        }
                    });
                }
                else
                    toast.error(this.context.t("msg_No_Form_Builder"));
            }
        });
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
                    selected={this.state.Values[l.colname] !== undefined && this.state.Values[l.colname] !== null ? this.state.Values[l.colname] == val ? "selected" : "" : l.fvalue == val ? "selected" : ""}
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
                                id={"formvals_" + l.ftype + l.fnum}
                                name={"formvals_" + l.ftype + l.fnum}
                                flabel={l.flabel}
                                ftype={l.ftype}
                                fnum={l.fnum}
                                type="Number"
                                className="form-control"
                                value={this.state.Values[l.colname] !== undefined && this.state.Values[l.colname] !== null ? this.state.Values[l.colname] : l.fvalue}
                                onChange={this.handleChange(l.ftype, l.fnum)} />
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
                                    id={"formvals_" + l.ftype + l.fnum}
                                    name={"formvals_" + l.ftype + l.fnum}
                                    defaultValue={l.fvalue}
                                    // value={this.state.Values[l.colname] !== undefined && this.state.Values[l.colname] !== null ? this.state.Values[l.colname] : l.fvalue}
                                    flabel={l.flabel}
                                    ftype={l.ftype}
                                    fnum={l.fnum}
                                    ffields={l.ffields}
                                    ffieldstxt={l.ffieldstxt}
                                    className="form-control"
                                    onChange={this.handleChange(l.ftype, l.fnum)}>
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
                                    <input type="button" value={this.context.t("RemoveImage")} hasImage={l.fimg != null ? "true" : "false"} onClick={this.handleRemoveImage.bind(this, l.colname, this.context.t("msg_Operation_Success"))} className="btn btn-block btn-danger" />
                                    <div className="r-formbuilder__img-holder" onClick={() => this.refs[l.colname].click()}>
                                        <input
                                            type="file"
                                            id={"formvals_" + l.ftype + l.fnum}
                                            name={"formvals_" + l.ftype + l.fnum}
                                            flabel={l.flabel}
                                            ftype={l.ftype}
                                            fnum={l.fnum}
                                            ref={l.colname}
                                            onChange={this.handleImagesChange.bind(this, l.ftype + l.fnum)} />
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
                                            id={"formvals_" + l.ftype + l.fnum}
                                            name={"formvals_" + l.ftype + l.fnum}
                                            flabel={l.flabel}
                                            ftype={l.ftype}
                                            fnum={l.fnum}
                                            value={this.state.Values[l.colname] !== undefined && this.state.Values[l.colname] !== null ? this.state.Values[l.colname] : l.fvalue}
                                            thousandSeparator={true}
                                            className="form-control"
                                            onChange={this.handleChange(l.ftype, l.fnum)}
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
                                                id={"formvals_" + l.ftype + l.fnum}
                                                name={"formvals_" + l.ftype + l.fnum}
                                                flabel={l.flabel}
                                                ftype={l.ftype}
                                                fnum={l.fnum}
                                                type={Text}
                                                mask="99:99"
                                                value={this.state.Values[l.colname] !== undefined && this.state.Values[l.colname] !== null ? this.state.Values[l.colname] : l.fvalue}
                                                className="form-control"
                                                onChange={this.handleChange(l.ftype, l.fnum)} />
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
                                                    id={"formvals_" + l.ftype + l.fnum}
                                                    name={"formvals_" + l.ftype + l.fnum}
                                                    className="form-control"
                                                    onChange={this.handleChange(l.ftype, l.fnum)}
                                                    value={this.state.Values[l.colname] !== undefined && this.state.Values[l.colname] !== null ? this.state.Values[l.colname] : l.fvalue}

                                                >
                                                    {this.state.Values[l.colname] !== undefined && this.state.Values[l.colname] !== null ? this.state.Values[l.colname] : l.fvalue}
                                                </textarea>
                                            </div>
                                            : (l.ftype === 'bool'
                                                ? <div className="input-group">
                                                    <div className="form-check">
                                                        <input
                                                            type="checkbox"
                                                            className="form-check-input"
                                                            id={"formvals_" + l.ftype + l.fnum}
                                                            name={"formvals_" + l.ftype + l.fnum}
                                                            flabel={l.flabel}
                                                            ftype={l.ftype}
                                                            value={l.fvalue}
                                                            fnum={l.fnum}
                                                            defaultChecked={l.fvalue == "1" ? "checked" : ""}
                                                            onChange={this.handleChange(l.ftype, l.fnum)}
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
                                                            id={"formvals_" + l.ftype + l.fnum}
                                                            name={"formvals_" + l.ftype + l.fnum}
                                                            flabel={l.flabel}
                                                            ftype={l.ftype}
                                                            fnum={l.fnum}
                                                            defaultValue={this.state.Values[l.colname] !== undefined && this.state.Values[l.colname] !== null ? this.state.Values[l.colname] : l.fvalue}
                                                            value={this.state.Values[l.colname] !== undefined && this.state.Values[l.colname] !== null ? this.state.Values[l.colname] : l.fvalue}
                                                            onChange={this.handleChange(l.ftype, l.fnum)}
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

        const { WorkInfo,modal, toggle, FormBuilderCaptionId ,RefreshParentForm,Params} = this.props;
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
                            <RibbonDesignedFormBuilder rebuildHandle={this.rebuildHandle.bind(this)} 
                            ConfirmationHandle={this.ConfirmationHandle.bind(this)} 
                            PrintRef={this.componentRef} SaveHandle={this.SaveHandle.bind(this)} 
                            FormBuilderCaptionId={FormBuilderCaptionId}
                            />
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
                            {this.state.FlowResultSelectmodal &&
                                    <ConfirmFlow ParentForm={FormInfo.fm_web_flow_formsaz}
                                        flowResultSelectModal={this.state.FlowResultSelectmodal}
                                        Params={Params} CloseleSelectFlowResult={this.CloseleSelectFlowResult.bind(this)}
                                        peygir_id={WorkInfo.peygir_id} RefreshParentForm={RefreshParentForm} />}
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
    },   
    InitConfirmWork: (Params, msg) => {
        return dispatch(WorkActions_action.InitConfirmWork(Params, msg))
    },
    FetchWorkInfo: (peygir_id) => {
        dispatch(WorkBasic_action.FetchWorkInfo(peygir_id))
    },
});

DesignedFormBuilder.contextTypes = {
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

const connectedDesignedFormBuilder = connect(mapStateToProps, mapDispatchToProps)(DesignedFormBuilder);
export { connectedDesignedFormBuilder as DesignedFormBuilder };
