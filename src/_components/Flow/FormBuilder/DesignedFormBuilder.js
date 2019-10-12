import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import _ from "lodash";
import PropTypes, { bool } from "prop-types"
import { connect } from "react-redux";
import { Responsive, WidthProvider } from "react-grid-layout";
import NumberFormat from "react-number-format";
import InputMask from "react-input-mask";
import { JalaliField } from 'material-ui-hichestan-datetimepicker';
import { RibbonDesignedFormBuilder } from '../Ribbon';
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
            layouts: { lg: this.props.FormBuilderLayoutData },
            FlowFormBuilderModal: this.props.FlowFormBuilderModal,
            FormBuilderCaptionId: this.props.FormBuilderCaptionId,
            FormBuilderLayoutData: this.props.FormBuilderLayoutData,
            DesignPageLayout: this.props.DesignPageLayout,
            DesignPageSize:  this.props.DesignPageSize
        };
    }
    static defaultProps = {
        className: "layout",
        rowHeight: 30,
        cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    };

    handleChange = (ftype, fnum) => event => {
        var colname = ftype + fnum;
        const { checked, value, formatted } = event.target;
        //  const ftype = event.target.getAttribute('ftype');
        var item = {}
        if (ftype == "bool")
            item = { "columname": colname, "value": checked }
        else if (ftype == "mon")
            item = { "columname": colname, "value": value.replace(/,/g, '') }
        else if (ftype == "tar") {
            item = { "columname": colname, "value": formatted }
            console.log(formatted)
            this.setState({ [colname]: formatted });
        }
        else
            item = { "columname": colname, "value": value }

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
    SaveHandle = (msg) => {
        const { WorkInfo, DesignedSaveValues, DesignedSaveImg, FormBuilderCaptionId } = this.props;
        SaveValuesParams.Fields = valuesJSON;
        SaveValuesParams.caption_id = FormBuilderCaptionId;
        SaveValuesParams.peygir_id = WorkInfo.peygir_id;
        DesignedSaveValues(SaveValuesParams, msg).then(data => {
            if (data.status) {
            }
        });

        var hasImages = false;
        for (var item of ImagesFormData.keys())
            hasImages = true;

        console.log(hasImages)
        if (hasImages) {
            ImagesFormData.append("peygir_id", WorkInfo.peygir_id);
            ImagesFormData.append("caption_id", FormBuilderCaptionId);
            ImagesFormData.append("showtree_id", WorkInfo.showtree_id);
            DesignedSaveImg(ImagesFormData, msg).then(data => {
                if (data.status) {
                }
            });

        }
    }
    componentDidMount() {
        SaveValuesParams = { peygir_id: 0, caption_id: 0, Fields: [] };
        ImagesFormData = new FormData();
        valuesJSON = [];
        this.setState({ mounted: true });
    }

    ConfirmationHandle = (e) => {

    }

    rebuildHandle = (e) => {
        const { WorkInfo, FlowPeygirCaptionInfo, DesignedFormFieldList } = this.props;
        FlowPeygirCaptionInfo(WorkInfo.showtree_id).then(data => {
            if (data.status) {
                if (data.data.hasFormBuilder) {
                    DesignedFormFieldList(WorkInfo.peygir_id, WorkInfo.showtree_id).then(data1 => {
                        if (data1.status) {
                            this.setState({
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
                        selected={l.fvalue == val ? "selected" : ""}>{ffieldstxtArray[index]}</option>
                );
            }
            return (
                <div className={l.faccess == "0" ? "is-disabled" : l.frequired ? "is-requierd" : ""} style={{ zIndex: (1000 - parseInt(l.y)) }} key={l.i} flabel={l.flabel} ftype={l.ftype} fnum={l.fnum} frequired={l.frequired} ffields={l.ffields} ffieldstxt={l.ffieldstxt}>
                    {l.ftype === 'adad'
                        ? <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">{l.flabel}</span>
                            </div>
                            <input
                                id={"formvals_" + l.ftype + l.fnum}
                                name={"formvals_" + l.ftype + l.fnum}
                                flabel={l.flabel}
                                ftype={l.ftype}
                                fnum={l.fnum}
                                type="Number"
                                className="form-control"
                                value={l.fvalue}
                                onChange={this.handleChange(l.ftype, l.fnum)} />
                        </div>
                        : (l.ftype === 'look'
                            ? <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">{l.flabel}</span>
                                </div>
                                <select
                                    id={"formvals_" + l.ftype + l.fnum}
                                    name={"formvals_" + l.ftype + l.fnum}
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
                                    <span className="input-group-text d-block">{l.flabel}</span>
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
                                            <span className="input-group-text">{l.flabel}</span>
                                        </div>
                                        <NumberFormat
                                            id={"formvals_" + l.ftype + l.fnum}
                                            name={"formvals_" + l.ftype + l.fnum}
                                            flabel={l.flabel}
                                            ftype={l.ftype}
                                            fnum={l.fnum}
                                            value={l.fvalue}
                                            thousandSeparator={true}
                                            className="form-control"
                                            onChange={this.handleChange(l.ftype, l.fnum)}
                                        />
                                    </div>
                                    : (l.ftype === 'saat'
                                        ? <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">{l.flabel}</span>
                                            </div>

                                            <InputMask
                                                id={"formvals_" + l.ftype + l.fnum}
                                                name={"formvals_" + l.ftype + l.fnum}
                                                flabel={l.flabel}
                                                ftype={l.ftype}
                                                fnum={l.fnum}
                                                type={Text}
                                                mask="99:99"
                                                value={l.fvalue}
                                                className="form-control"
                                                onChange={this.handleChange(l.ftype, l.fnum)} />
                                        </div>
                                        : (l.ftype === 'str'
                                            ? <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">{l.flabel}</span>
                                                </div>
                                                <textarea
                                                    id={"formvals_" + l.ftype + l.fnum}
                                                    name={"formvals_" + l.ftype + l.fnum}
                                                    className="form-control"
                                                    onChange={this.handleChange(l.ftype, l.fnum)}
                                                >
                                                    {l.fvalue}
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
                                                            defaultChecked={l.fvalue == "true" ? "checked" : ""}
                                                            onChange={this.handleChange(l.ftype, l.fnum)}
                                                        />
                                                        <label className="form-check-label" for={"formvals_" + l.ftype + l.fnum}>{l.flabel}</label>
                                                    </div>
                                                </div>
                                                : (l.ftype === 'tar'
                                                    ? <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text">{l.flabel}</span>
                                                        </div>
                                                        <JalaliField
                                                            id={"formvals_" + l.ftype + l.fnum}
                                                            name={"formvals_" + l.ftype + l.fnum}
                                                            flabel={l.flabel}
                                                            ftype={l.ftype}
                                                            fnum={l.fnum}
                                                            value={this.state[l.colname] !== undefined && this.state[l.colname] !== null ? this.state[l.colname] : l.fvalue}
                                                            onChange={this.handleChange(l.ftype, l.fnum)}
                                                            className="form-control"
                                                        />
                                                    </div>
                                                    : (l.ftype === 'label'
                                                        ? <span>{l.flabel}</span>
                                                        : (l.ftype === 'group'
                                                            ? <div className="r-formbuilder__group">
                                                                <h5>{l.flabel}</h5>
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
                            <RibbonDesignedFormBuilder rebuildHandle={this.rebuildHandle.bind(this)} ConfirmationHandle={this.ConfirmationHandle.bind(this)} PrintRef={this.componentRef} SaveHandle={this.SaveHandle.bind(this)} FormBuilderCaptionId={FormBuilderCaptionId} />
                        </div>

                        <div className="r-formbuilder" >
                            <page layoutsize={this.state.DesignPageSize} layout={this.state.DesignPageLayout} >
                                <ResponsiveReactGridLayout
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
    },
});

DesignedFormBuilder.contextTypes = {
    t: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { alert } = state;
    const { loading } = state.loading;
    const { lang } = state.i18nState;

    return {
        alert,
        loading,
        lang,
    };
}

const connectedDesignedFormBuilder = connect(mapStateToProps, mapDispatchToProps)(DesignedFormBuilder);
export { connectedDesignedFormBuilder as DesignedFormBuilder };
