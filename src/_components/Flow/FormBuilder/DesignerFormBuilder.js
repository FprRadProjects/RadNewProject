import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import _ from "lodash";
import PropTypes from "prop-types"
import { connect } from "react-redux";
import { Responsive, WidthProvider } from "react-grid-layout";
import NumberFormat from "react-number-format";
import InputMask from "react-input-mask";
import { JalaliField } from 'material-ui-hichestan-datetimepicker';
import 'react-grid-layout/css/styles.css';
import {
    FormBuilderActions_action
} from "../../../_actions";
import { RibbonDesignerFormBuilder } from '../Ribbon/Ribbon.DesignerFormBuilder';
import reactCSS from 'reactcss'
import { ChromePicker } from 'react-color'
const ResponsiveReactGridLayout = WidthProvider(Responsive);

var SaveParams = { caption_id: 0, layout: "partial", size: "A4", Fields: [], settings: [] };
var Settings = [];
var layoutPageSize = {
    A5landscape: { layoutsize: 'A5', rowWidth: '29.7cm', rowHeight: '21cm', layout: 'landscape' }, A5partial: { layoutsize: 'A5', rowWidth: '21cm', rowHeight: '29.7cm', layout: 'partial' },
    A4landscape: { layoutsize: 'A4', rowWidth: '21cm', rowHeight: '14.8cm', layout: 'landscape' }, A4partial: { layoutsize: 'A4', rowWidth: '21cm', rowHeight: '14.8cm', layout: 'partial' },
    A3landscape: { layoutsize: 'A3', rowWidth: '42cm', rowHeight: '29.7cm', layout: 'landscape' }, A3partial: { layoutsize: 'A3', rowWidth: '29.7cm', rowHeight: '42cm', layout: 'partial' }
};
class ToolBoxItem extends Component {
    render() {
        return (
            <div
                className="toolbox__items__item"
                onClick={this.props.onTakeItem.bind(undefined, this.props.item)}
            >
                {this.props.item.flabel}
            </div>
        );
    }
}

class ToolBox extends Component {

    render() {

        return (
            <div className="toolbox">
                <span className="toolbox__title"><span>پنل فرم کار</span></span>
                <div className="toolbox__items">
                    <div className="toolbox__items__item" onClick={this.props.onAddEmptyItem}>Divider</div>
                    <div className="toolbox__items__item" onClick={this.props.onAddHeaderText}>Label</div>
                    <div className="toolbox__items__item" onClick={this.props.onAddGroupItem}>Group</div>
                    {this.props.items.map(item => (
                        <ToolBoxItem
                            key={item.i}
                            item={item}
                            onTakeItem={this.props.onTakeItem}
                        />
                    ))}
                </div>
            </div>
        );
    }
}


class DesignerFormBuilder extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.DesignPageSize);
        var currentBreakpointState = "";
        if (this.props.DesignPageLayout == "landscape") {
            if (this.props.DesignPageSize == "A4") {
                currentBreakpointState = "lg";
            }
            else if (this.props.DesignPageSize == "A5") {
                currentBreakpointState = "sm";
            }
        }
        else if (this.props.DesignPageLayout == "partial") {
            if (this.props.DesignPageSize == "A4") {
                currentBreakpointState = "sm";
            }
            else if (this.props.DesignPageSize == "A5") {
                currentBreakpointState = "xs";
            }
        }
        console.log(currentBreakpointState);
        this.state = {
            ...this.state,
            settings: [],
            modal: false,
            backdrop: "static",
            modalClass: "modal-dialog-centered modal-xl r-modal",
            currentBreakpoint: currentBreakpointState,
            compactType: "vertical",
            mounted: false,
            layouts: { [currentBreakpointState]: this.props.FormBuilderLayoutData },
            toolbox: { [currentBreakpointState]: this.props.FormBuilderToolBoxData },
            DesignPageLayout: this.props.DesignPageLayout,
            DesignPageSize: this.props.DesignPageSize
        };

        this.onAddEmptyItem = this.onAddEmptyItem.bind(this);
        this.onAddHeaderText = this.onAddHeaderText.bind(this);
        this.onAddGroupItem = this.onAddGroupItem.bind(this);
    }
    static defaultProps = {
        className: "layout",
        rowHeight: 30,
        onLayoutChange: function () { },
        cols: { lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 },
    };

    componentDidMount() {
        SaveParams = { caption_id: 0, Fields: [], settings: [] };
        this.setState({ mounted: true });
    }

    handleClick = (colname) => {
        if (this.state["displayColorPicker" + colname] == undefined)
            this.setState({
                ["displayColorPicker" + colname]: false
            });
        this.setState(prevState => ({
            ["displayColorPicker" + colname]: prevState["displayColorPicker" + colname] != undefined ? !prevState["displayColorPicker" + colname] : true
        }));
        var el = document.getElementById("displayColorPicker" + colname);
        if (this.state["displayColorPicker" + colname] == undefined || this.state["displayColorPicker" + colname])
            el.style.display = "block";
        else
            el.style.display = "none";
    };

    handleClose = (colname, event) => {
        if (this.state["displayColorPicker" + colname] == undefined)
            this.setState({
                ["displayColorPicker" + colname]: false
            });
        this.setState(prevState => ({
            ["displayColorPicker" + colname]: prevState["displayColorPicker" + colname] != undefined ? !prevState["displayColorPicker" + colname] : true
        }));
        var el = document.getElementById("displayColorPicker" + colname);
        if (this.state["displayColorPicker" + colname])
            el.style.display = "block";
        else
            el.style.display = "none";
    };

    handleChange = (color, colname) => {
        this.setState({ ["color" + colname]: color.hex })
        if (Settings[colname] !== null && Settings[colname] !== undefined)
            Settings[colname].setting.color = color.hex;
        else
            Settings[colname] = { columname: colname, setting: { "fontweight": "normal", "fontstyle": "normal", "fontsize": "12px", "fontfamily": "IRANSans_Fa", "color": color.hex } }

        console.log(Settings)
    };

    generateDOM() {
        return _.map(this.state.layouts[this.state.currentBreakpoint], l => {
            var ffieldsArray = null;
            var ffieldstxtArray = null;
            var listItemsEmpty = null;
            var listItems = null;
            if (l.ftype === 'look') {
                ffieldsArray = l.ffields.split(',');
                ffieldstxtArray = l.ffieldstxt.split(',');
                listItems = ffieldsArray.map((val, index) =>
                    <option key={index} value={val} Text={ffieldstxtArray[index]}>{ffieldstxtArray[index]}</option>
                );
            }
            console.log(l);
            // console.log(l.colname)
            //console.log(this.state["displayColorPicker" + l.colname])

            return (
                <div key={l.i} style={{ zIndex: (1000 - parseInt(l.y)) }}>
                    <div className="r-formbuilder-controlpanel">
                        <div className="hide-button" onClick={this.onPutItem.bind(this, l)}>
                            &times;
                        </div>
                        {(l.ftype === 'empty'
                            ? null
                            : <div class="dropdown setting-dropdown">
                                <button class="setting-button" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="fa fa-cog"></i>
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <li class="dropdown-item" onClick={this.onBoldItem.bind(this, l.colname)}>
                                        <label>{this.context.t("Bold")}</label>
                                        <div className="bold-button" >
                                        </div>
                                    </li>
                                    <li class="dropdown-item" onClick={this.onItalicItem.bind(this, l.colname)}>
                                        <label>{this.context.t("Italic")}</label>
                                        <div className="italic-button" >
                                        </div>
                                    </li>
                                    <li class="dropdown-item">
                                        <label>{this.context.t("FontSize")}</label>
                                        <div className="fontsize-button">
                                            <select onClick={this.onFontSizeItem.bind(this, l.colname)}>
                                                <option value="12px" selected={l.ffontsize == "12px" ? "selected" : ""}>12</option>
                                                <option value="13px" selected={l.ffontsize == "13px" ? "selected" : ""}>13</option>
                                                <option value="14px" selected={l.ffontsize == "14px" ? "selected" : ""}>14</option>
                                                <option value="16px" selected={l.ffontsize == "16px" ? "selected" : ""}>16</option>
                                                <option value="18px" selected={l.ffontsize == "18px" ? "selected" : ""}>18</option>
                                            </select>
                                        </div>
                                    </li>
                                    <li class="dropdown-item">
                                        <label>{this.context.t("FontFamily")}</label>
                                        <div className="fontfamily-button">
                                            <select onClick={this.onFontFamilyItem.bind(this, l.colname)}>
                                                <option value="IRANSans_Fa" selected={l.ffontfamily == "IRANSans_Fa" ? "selected" : ""}>IRANSans</option>
                                                <option value="Tahoma" selected={l.ffontfamily == "Tahoma" ? "selected" : ""}>Tahoma</option>
                                                <option value="Arial" selected={l.ffontfamily == "Arial" ? "selected" : ""}>Arial</option>
                                            </select>
                                        </div>
                                    </li>
                                    <li class="dropdown-item">
                                        <label>{this.context.t("Color")}</label>
                                        <div className="color-button">
                                            <div className="r-formbuilder-colorpicker-lnk" onClick={this.handleClick.bind(this, l.colname)}>
                                                <div className="r-formbuilder-colorpicker-color" style={{ background: this.state["color" + l.colname] !== undefined && this.state["color" + l.colname] !== null ? this.state["color" + l.colname] : l.fcolor }} />
                                            </div>
                                            <div id={"displayColorPicker" + l.colname} className="r-formbuilder-colorpicker-popover">
                                                <div className="r-formbuilder-colorpicker-cover" onClick={this.handleClose.bind(this, l.colname)} />
                                                <ChromePicker color={this.state["color" + l.colname] !== undefined && this.state["color" + l.colname] !== null ? this.state["color" + l.colname] : l.fcolor}
                                                    onChange={event => this.handleChange(event, l.colname)} />
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                        )}


                    </div>
                    {
                        l.ftype === 'adad'
                            ? <div className="input-group">
                                <div className="input-group-prepend">
                                    <span
                                        style={{
                                            color: this.state["color" + l.colname] !== undefined && this.state["color" + l.colname] !== null ? this.state["color" + l.colname] : l.fcolor,
                                            fontWeight: this.state["bold" + l.colname] !== undefined && this.state["bold" + l.colname] !== null ? this.state["bold" + l.colname] : l.ffontweight,
                                            fontStyle: this.state["italic" + l.colname] !== undefined && this.state["italic" + l.colname] !== null ? this.state["italic" + l.colname] : l.ffontstyle,
                                            fontSize: this.state["fontsize" + l.colname] !== undefined && this.state["fontsize" + l.colname] !== null ? this.state["fontsize" + l.colname] : l.ffontsize,
                                            fontFamily: this.state["fontfamily" + l.colname] !== undefined && this.state["fontfamily" + l.colname] !== null ? this.state["fontfamily" + l.colname] : l.ffontfamily
                                        }}
                                        className="input-group-text">{l.flabel}</span>
                                </div>
                                <input
                                    type="Number"
                                    className="form-control"
                                />
                            </div>
                            : (l.ftype === 'look'
                                ? <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span style={{
                                            color: this.state["color" + l.colname] !== undefined && this.state["color" + l.colname] !== null ? this.state["color" + l.colname] : l.fcolor,
                                            fontWeight: this.state["bold" + l.colname] !== undefined && this.state["bold" + l.colname] !== null ? this.state["bold" + l.colname] : l.ffontweight,
                                            fontStyle: this.state["italic" + l.colname] !== undefined && this.state["italic" + l.colname] !== null ? this.state["italic" + l.colname] : l.ffontstyle,
                                            fontSize: this.state["fontsize" + l.colname] !== undefined && this.state["fontsize" + l.colname] !== null ? this.state["fontsize" + l.colname] : l.ffontsize,
                                            fontFamily: this.state["fontfamily" + l.colname] !== undefined && this.state["fontfamily" + l.colname] !== null ? this.state["fontfamily" + l.colname] : l.ffontfamily
                                        }}
                                            className="input-group-text">{l.flabel}</span>
                                    </div>
                                    <select
                                        className="form-control"
                                    >
                                        {listItems}
                                    </select>
                                </div>
                                : (l.ftype === 'img'
                                    ? <div className="r-formbuilder__img">
                                        <span style={{
                                            color: this.state["color" + l.colname] !== undefined && this.state["color" + l.colname] !== null ? this.state["color" + l.colname] : l.fcolor,
                                            fontWeight: this.state["bold" + l.colname] !== undefined && this.state["bold" + l.colname] !== null ? this.state["bold" + l.colname] : l.ffontweight,
                                            fontStyle: this.state["italic" + l.colname] !== undefined && this.state["italic" + l.colname] !== null ? this.state["italic" + l.colname] : l.ffontstyle,
                                            fontSize: this.state["fontsize" + l.colname] !== undefined && this.state["fontsize" + l.colname] !== null ? this.state["fontsize" + l.colname] : l.ffontsize,
                                            fontFamily: this.state["fontfamily" + l.colname] !== undefined && this.state["fontfamily" + l.colname] !== null ? this.state["fontfamily" + l.colname] : l.ffontfamily
                                        }}
                                            className="input-group-text d-block">{l.flabel}</span>
                                        <input type="button" value={this.context.t("RemoveImage")} className="btn btn-block btn-danger" />
                                        <div className="r-formbuilder__img-holder">
                                            <input
                                                type="file"
                                            />
                                            <img src="" />
                                        </div>
                                    </div>
                                    : (l.ftype === 'mon'
                                        ? <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span style={{
                                                    color: this.state["color" + l.colname] !== undefined && this.state["color" + l.colname] !== null ? this.state["color" + l.colname] : l.fcolor,
                                                    fontWeight: this.state["bold" + l.colname] !== undefined && this.state["bold" + l.colname] !== null ? this.state["bold" + l.colname] : l.ffontweight,
                                                    fontStyle: this.state["italic" + l.colname] !== undefined && this.state["italic" + l.colname] !== null ? this.state["italic" + l.colname] : l.ffontstyle,
                                                    fontSize: this.state["fontsize" + l.colname] !== undefined && this.state["fontsize" + l.colname] !== null ? this.state["fontsize" + l.colname] : l.ffontsize,
                                                    fontFamily: this.state["fontfamily" + l.colname] !== undefined && this.state["fontfamily" + l.colname] !== null ? this.state["fontfamily" + l.colname] : l.ffontfamily
                                                }}
                                                    className="input-group-text">{l.flabel}</span>
                                            </div>
                                            <NumberFormat
                                                thousandSeparator={true}
                                                className="form-control"
                                            />
                                        </div>
                                        : (l.ftype === 'saat'
                                            ? <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span style={{
                                                        color: this.state["color" + l.colname] !== undefined && this.state["color" + l.colname] !== null ? this.state["color" + l.colname] : l.fcolor,
                                                        fontWeight: this.state["bold" + l.colname] !== undefined && this.state["bold" + l.colname] !== null ? this.state["bold" + l.colname] : l.ffontweight,
                                                        fontStyle: this.state["italic" + l.colname] !== undefined && this.state["italic" + l.colname] !== null ? this.state["italic" + l.colname] : l.ffontstyle,
                                                        fontSize: this.state["fontsize" + l.colname] !== undefined && this.state["fontsize" + l.colname] !== null ? this.state["fontsize" + l.colname] : l.ffontsize,
                                                        fontFamily: this.state["fontfamily" + l.colname] !== undefined && this.state["fontfamily" + l.colname] !== null ? this.state["fontfamily" + l.colname] : l.ffontfamily
                                                    }}
                                                        className="input-group-text">{l.flabel}</span>
                                                </div>

                                                <InputMask
                                                    type={Text}
                                                    mask="99:99"
                                                    className="form-control"
                                                />
                                            </div>
                                            : (l.ftype === 'str'
                                                ? <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <span style={{
                                                            color: this.state["color" + l.colname] !== undefined && this.state["color" + l.colname] !== null ? this.state["color" + l.colname] : l.fcolor,
                                                            fontWeight: this.state["bold" + l.colname] !== undefined && this.state["bold" + l.colname] !== null ? this.state["bold" + l.colname] : l.ffontweight,
                                                            fontStyle: this.state["italic" + l.colname] !== undefined && this.state["italic" + l.colname] !== null ? this.state["italic" + l.colname] : l.ffontstyle,
                                                            fontSize: this.state["fontsize" + l.colname] !== undefined && this.state["fontsize" + l.colname] !== null ? this.state["fontsize" + l.colname] : l.ffontsize,
                                                            fontFamily: this.state["fontfamily" + l.colname] !== undefined && this.state["fontfamily" + l.colname] !== null ? this.state["fontfamily" + l.colname] : l.ffontfamily
                                                        }}
                                                            className="input-group-text">{l.flabel}</span>
                                                    </div>
                                                    <textarea className="form-control">
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
                                                            />
                                                            <label className="form-check-label" style={{
                                                                color: this.state["color" + l.colname] !== undefined && this.state["color" + l.colname] !== null ? this.state["color" + l.colname] : l.fcolor,
                                                                fontWeight: this.state["bold" + l.colname] !== undefined && this.state["bold" + l.colname] !== null ? this.state["bold" + l.colname] : l.ffontweight,
                                                                fontStyle: this.state["italic" + l.colname] !== undefined && this.state["italic" + l.colname] !== null ? this.state["italic" + l.colname] : l.ffontstyle,
                                                                fontSize: this.state["fontsize" + l.colname] !== undefined && this.state["fontsize" + l.colname] !== null ? this.state["fontsize" + l.colname] : l.ffontsize,
                                                                fontFamily: this.state["fontfamily" + l.colname] !== undefined && this.state["fontfamily" + l.colname] !== null ? this.state["fontfamily" + l.colname] : l.ffontfamily
                                                            }} for={"formvals_" + l.ftype + l.fnum}>{l.flabel}</label>
                                                        </div>
                                                    </div>
                                                    : (l.ftype === 'tar'
                                                        ? <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span style={{
                                                                    color: this.state["color" + l.colname] !== undefined && this.state["color" + l.colname] !== null ? this.state["color" + l.colname] : l.fcolor,
                                                                    fontWeight: this.state["bold" + l.colname] !== undefined && this.state["bold" + l.colname] !== null ? this.state["bold" + l.colname] : l.ffontweight,
                                                                    fontStyle: this.state["italic" + l.colname] !== undefined && this.state["italic" + l.colname] !== null ? this.state["italic" + l.colname] : l.ffontstyle,
                                                                    fontSize: this.state["fontsize" + l.colname] !== undefined && this.state["fontsize" + l.colname] !== null ? this.state["fontsize" + l.colname] : l.ffontsize,
                                                                    fontFamily: this.state["fontfamily" + l.colname] !== undefined && this.state["fontfamily" + l.colname] !== null ? this.state["fontfamily" + l.colname] : l.ffontfamily
                                                                }}
                                                                    className="input-group-text">{l.flabel}</span>
                                                            </div>
                                                            <JalaliField
                                                                className="form-control"
                                                            />
                                                        </div>
                                                        : (l.ftype === 'label'
                                                            ? <span style={{
                                                                color: this.state["color" + l.colname] !== undefined && this.state["color" + l.colname] !== null ? this.state["color" + l.colname] : l.fcolor,
                                                                fontWeight: this.state["bold" + l.colname] !== undefined && this.state["bold" + l.colname] !== null ? this.state["bold" + l.colname] : l.ffontweight,
                                                                fontStyle: this.state["italic" + l.colname] !== undefined && this.state["italic" + l.colname] !== null ? this.state["italic" + l.colname] : l.ffontstyle,
                                                                fontSize: this.state["fontsize" + l.colname] !== undefined && this.state["fontsize" + l.colname] !== null ? this.state["fontsize" + l.colname] : l.ffontsize,
                                                                fontFamily: this.state["fontfamily" + l.colname] !== undefined && this.state["fontfamily" + l.colname] !== null ? this.state["fontfamily" + l.colname] : l.ffontfamily
                                                            }}>{l.flabel}</span>
                                                            : (l.ftype === 'group'
                                                                ? <div className="r-formbuilder__group">
                                                                    <h5 style={{
                                                                        color: this.state["color" + l.colname] !== undefined && this.state["color" + l.colname] !== null ? this.state["color" + l.colname] : l.fcolor,
                                                                        fontWeight: this.state["bold" + l.colname] !== undefined && this.state["bold" + l.colname] !== null ? this.state["bold" + l.colname] : l.ffontweight,
                                                                        fontStyle: this.state["italic" + l.colname] !== undefined && this.state["italic" + l.colname] !== null ? this.state["italic" + l.colname] : l.ffontstyle,
                                                                        fontSize: this.state["fontsize" + l.colname] !== undefined && this.state["fontsize" + l.colname] !== null ? this.state["fontsize" + l.colname] : l.ffontsize,
                                                                        fontFamily: this.state["fontfamily" + l.colname] !== undefined && this.state["fontfamily" + l.colname] !== null ? this.state["fontfamily" + l.colname] : l.ffontfamily
                                                                    }}>{l.flabel}</h5>
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
                </div >
            );
        });
    }

    onAddEmptyItem() {
        var start = 1000, end = 2000;
        var num = (Math.random() * (end - start) + start) ^ 0;
        this.setState(prevState => ({
            layouts: {
                ...prevState.layouts,
                [prevState.currentBreakpoint]: [
                    ...prevState.layouts[prevState.currentBreakpoint],
                    {
                        i: num.toString(),
                        x: 0,
                        y: Infinity,
                        w: 12,
                        h: 1,
                        fnum: "",
                        ffields: "",
                        ffieldstxt: "",
                        flabel: "",
                        frequired: "",
                        ftype: "empty",
                        colname: "empty"
                    }

                ]
            }
        }));
    }

    onAddHeaderText() {
        const enteredName = prompt(this.context.t("msg_Please_Enter_Your_Text"));
        if (enteredName === null)
            return;
        var start = 1000, end = 2000;
        var num = (Math.random() * (end - start) + start) ^ 0;
        this.setState(prevState => ({
            layouts: {
                ...prevState.layouts,
                [prevState.currentBreakpoint]: [
                    ...prevState.layouts[prevState.currentBreakpoint],
                    {
                        i: num.toString(),
                        x: 0,
                        y: Infinity,
                        w: 12,
                        h: 2,
                        fnum: "",
                        ffields: "",
                        ffieldstxt: "",
                        frequired: "",
                        flabel: enteredName,
                        ftype: "label",
                        colname: "label"

                    }

                ]
            }
        }));
    }

    onAddGroupItem() {
        const enteredName = prompt(this.context.t("msg_Please_Enter_Group_Name"));
        if (enteredName === null)
            return;
        var start = 1000, end = 2000;
        var num = (Math.random() * (end - start) + start) ^ 0;
        this.setState(prevState => ({
            layouts: {
                ...prevState.layouts,
                [prevState.currentBreakpoint]: [
                    ...prevState.layouts[prevState.currentBreakpoint],
                    {
                        i: num.toString(),
                        x: 0,
                        y: Infinity,
                        w: 12,
                        h: 2,
                        fnum: "",
                        ffields: "",
                        ffieldstxt: "",
                        frequired: "",
                        flabel: enteredName,
                        ftype: "group",
                        colname: "group"
                    }

                ]
            }
        }));
    }


    onTakeItem = item => {
        console.log(item)
        this.setState(prevState => ({
            toolbox: {
                ...prevState.toolbox,
                [prevState.currentBreakpoint]: prevState.toolbox[
                    prevState.currentBreakpoint
                ].filter(({ i }) => i !== item.i)
            },
            layouts: {
                ...prevState.layouts,
                [prevState.currentBreakpoint]: [
                    ...prevState.layouts[prevState.currentBreakpoint],
                    item
                ]
            }
        }));
    };

    onPutItem = item => {
        this.setState(prevState => {
            if (item.ftype != "label" && item.ftype != "empty" && item.ftype != "group") {
                return {
                    toolbox: {
                        ...prevState.toolbox,
                        [prevState.currentBreakpoint]: [
                            ...(prevState.toolbox[prevState.currentBreakpoint] || []),
                            item
                        ]
                    },
                    layouts: {
                        ...prevState.layouts,
                        [prevState.currentBreakpoint]: prevState.layouts[
                            prevState.currentBreakpoint
                        ].filter(({ i }) => i !== item.i)
                    }
                };
            }
            else {
                return {
                    layouts: {
                        ...prevState.layouts,
                        [prevState.currentBreakpoint]: prevState.layouts[
                            prevState.currentBreakpoint
                        ].filter(({ i }) => i !== item.i)
                    }
                };
            }
        });
    };
    onBoldItem = (colname) => {
        if (Settings[colname] != null && Settings[colname] != undefined) {
            var fontweight = Settings[colname].setting.fontweight == "normal" ? "bold" : "normal";
            Settings[colname].setting.fontweight = fontweight;
        } else
            Settings[colname] = { columname: colname, setting: { "fontweight": "bold", "fontstyle": "normal", "fontsize": "12px", "fontfamily": "IRANSans_Fa", "color": "#000000" } }

        console.log(Settings)
        this.setState(prevState => ({
            ["bold" + colname]: prevState["bold" + colname] != undefined ? prevState["bold" + colname] == "normal" ? "bold" : "normal" : "bold"
        }));
        //   console.log(this.state)

    }
    onItalicItem = (colname) => {
        if (Settings[colname] !== null && Settings[colname] !== undefined) {
            var fontstyle = Settings[colname].setting.fontstyle == "normal" ? "italic" : "normal"
            Settings[colname].setting.fontstyle = fontstyle;
        }
        else
            Settings[colname] = { columname: colname, setting: { "fontweight": "normal", "fontstyle": "italic", "fontsize": "12px", "fontfamily": "IRANSans_Fa", "color": "#000000" } }

        console.log(Settings)
        this.setState(prevState => ({
            ["italic" + colname]: prevState["italic" + colname] != undefined ? prevState["italic" + colname] == "normal" ? "italic" : "normal" : "italic"
        }));
        console.log(this.state)

    }
    onFontSizeItem = (colname, event) => {
        if (Settings[colname] !== null && Settings[colname] !== undefined)
            Settings[colname].setting.fontsize = event.target.value;
        else
            Settings[colname] = { columname: colname, setting: { "fontweight": "normal", "fontstyle": "normal", "fontsize": event.target.value, "fontfamily": "IRANSans_Fa", "color": "#000000" } }

        console.log(Settings)
        this.setState({ ["fontsize" + colname]: event.target.value });
        // this.setState(prevState => ({
        //     ["italic" + colname]: prevState["italic" + colname] != undefined ? prevState["italic" + colname] == "normal" ? "italic" : "normal" : "normal"
        // }));
        console.log(this.state)

    }
    onFontFamilyItem = (colname, event) => {
        if (Settings[colname] !== null && Settings[colname] !== undefined)
            Settings[colname].setting.fontfamily = event.target.value;
        else
            Settings[colname] = { columname: colname, setting: { "fontweight": "normal", "fontstyle": "normal", "fontsize": "12px", "fontfamily": event.target.value, "color": "#000000" } }
        console.log(Settings)
        this.setState({ ["fontfamily" + colname]: event.target.value });

        // this.setState(prevState => ({
        //     ["italic" + colname]: prevState["italic" + colname] != undefined ? prevState["italic" + colname] == "normal" ? "italic" : "normal" : "normal"
        // }));
        console.log(this.state)

    }

    onLayoutChange = (layout, layouts) => {
        this.props.onLayoutChange(layout, layouts);
        this.setState({ layouts });
    };

    SaveFormDesignerHandle = (msg) => {
        console.log(this.state)
        const { WorkInfo, DesignerSave, FormBuilderCaptionId } = this.props;
        let obj = [];
        Object.keys(this.state.layouts[this.state.currentBreakpoint]).map((item, index) => {
            return obj[index++] =
                {
                    "colname": this.state.layouts[this.state.currentBreakpoint][item].colname,
                    "i": this.state.layouts[this.state.currentBreakpoint][item].i,
                    "x": this.state.layouts[this.state.currentBreakpoint][item].x.toString(),
                    "y": this.state.layouts[this.state.currentBreakpoint][item].y,
                    "w": this.state.layouts[this.state.currentBreakpoint][item].w,
                    "h": this.state.layouts[this.state.currentBreakpoint][item].h,
                    "flabel": this.state.layouts[this.state.currentBreakpoint][item].flabel,
                    "ffontweight": Settings[this.state.layouts[this.state.currentBreakpoint][item].colname] !== undefined ?
                        Settings[this.state.layouts[this.state.currentBreakpoint][item].colname].setting.fontweight : "normal",
                    "ffontstyle": Settings[this.state.layouts[this.state.currentBreakpoint][item].colname] !== undefined ?
                        Settings[this.state.layouts[this.state.currentBreakpoint][item].colname].setting.fontstyle : "normal",
                    "ffontsize": Settings[this.state.layouts[this.state.currentBreakpoint][item].colname] !== undefined ?
                        Settings[this.state.layouts[this.state.currentBreakpoint][item].colname].setting.fontsize : "12px",
                    "ffontfamily": Settings[this.state.layouts[this.state.currentBreakpoint][item].colname] !== undefined ?
                        Settings[this.state.layouts[this.state.currentBreakpoint][item].colname].setting.fontfamily : "IRANSans_Fa",
                    "fcolor": Settings[this.state.layouts[this.state.currentBreakpoint][item].colname] !== undefined ?
                        Settings[this.state.layouts[this.state.currentBreakpoint][item].colname].setting.color : "#000000"
                }
                ;
        })
         console.log(obj)
        // let objsetting = [];
        // Object.keys(Settings).map((item, index) => {
        //     return objsetting[index++] =
        //         {
        //             "columname": Settings[item].columname,
        //             "setting": {
        //                 "fontweight": Settings[item].setting.fontweight,
        //                 "fontstyle": Settings[item].setting.fontstyle,
        //                 "fontsize": Settings[item].setting.fontsize,
        //                 "fontfamily": Settings[item].setting.fontfamily,
        //                 "color": Settings[item].setting.color
        //             }
        //         }
        // })
        // SaveParams.settings = objsetting;
        SaveParams.Fields = obj;
        SaveParams.caption_id = FormBuilderCaptionId;
        SaveParams.pagelayout = this.state.DesignPageLayout;
        SaveParams.pagesize = this.state.DesignPageSize;
        // console.log(SaveParams)
        DesignerSave(SaveParams, msg).then(data => {
            if (data.status) {

            }
        });
    }


    ChangeLayout = event => {
        const {  value } = event.target;
      
        var cwec = this.state.currentBreakpoint;

        var bp = "";
        if (layoutPageSize[value].layout == "landscape") {
            if (layoutPageSize[value].layoutsize == "A4") {
                bp = "lg";
            }
            else if (layoutPageSize[value].layoutsize == "A5") {
                bp = "sm";
            }
        }
        else if (layoutPageSize[value].layout == "partial") {
            if (layoutPageSize[value].layoutsize == "A4") {
                bp = "sm";
            }
            else if (layoutPageSize[value].layoutsize == "A5") {
                bp = "xs";
            }
        }
        this.setState(prevState => ({
            DesignPageLayout: layoutPageSize[value].layout,
            DesignPageSize: layoutPageSize[value].layoutsize,
            currentBreakpoint: bp,
            layouts: { [bp]: prevState.layouts[cwec] },
            toolbox: { [bp]: prevState.toolbox[cwec] },
        }));

    }

    onResize = (val, event) => {
        this.forceUpdate();

    }
    render() {

        var layoutsize = this.state.DesignPageSize === undefined ? 'A4' : this.state.DesignPageSize;
        var layout = this.state.DesignPageLayout === undefined ? 'partial' : this.state.DesignPageLayout;

        const { modal, toggle, WorkInfo, FormBuilderCaptionId, FormBuilderLayoutData, FormBuilderToolBoxData } = this.props;
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
                            <RibbonDesignerFormBuilder SaveFormDesignerHandle={this.SaveFormDesignerHandle.bind(this)} FormBuilderCaptionId={FormBuilderCaptionId} />
                        </div>
                        <div className="r-formbuilder">
                            <ToolBox
                                items={this.state.toolbox[this.state.currentBreakpoint] || []}
                                onTakeItem={this.onTakeItem}
                                onAddEmptyItem={this.onAddEmptyItem}
                                onAddHeaderText={this.onAddHeaderText}
                                onAddGroupItem={this.onAddGroupItem}
                            />
                            <select onChange={this.ChangeLayout.bind(this)}>
                            <option key={1} value={"A5landscape"} Text={"A5 Landscape"} selected={layoutsize+layout == "A5landscape" ? "selected" : ""}>{"A5 Landscape"}</option>
                            <option key={1} value={"A5partial"} Text={"A5 Partial"} selected={layoutsize+layout == "A5partial" ? "selected" : ""}>{"A5 Partial"}</option>
                            
                            <option key={1} value={"A4landscape"} Text={"A4 Landscape"} selected={layoutsize+layout == "A4landscape" ? "selected" : ""}>{"A4 Landscape"}</option>
                            <option key={1} value={"A4partial"} Text={"A4 Partial"} selected={layoutsize+layout == "A4partial" ? "selected" : ""}>{"A4 Partial"}</option>
                            </select>
                            <label>{this.context.t("PageLayoutSize")}</label>
                            
                            <page layoutsize={layoutsize} layout={layout}>
                                <ResponsiveReactGridLayout
                                    rowWidth={this.state.rowWidth}
                                    rowHeight={this.state.rowHeight}
                                    onResize={this.onResize}
                                    {...this.props}
                                    className="r-formbuilder__layout"
                                    layouts={this.state.layouts}
                                    onLayoutChange={this.onLayoutChange}
                                    // WidthProvider option
                                    measureBeforeMount={false}
                                    // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
                                    // and set `measureBeforeMount={true}`.
                                    useCSSTransforms={this.state.mounted}
                                    isDraggable={true}
                                    isResizable={true}
                                    margin={[10, 25]}
                                    draggableCancel=".r-formbuilder-controlpanel"

                                >
                                    {this.generateDOM()}
                                </ResponsiveReactGridLayout>
                            </page >

                        </div>
                        <style>{modalBackDrop}</style>
                    </ModalBody>

                </Modal>
            </div >

        );
    }
}

const mapDispatchToProps = dispatch => ({
    DesignerSave: (SaveParams, msg) => {
        return dispatch(FormBuilderActions_action.DesignerSave(SaveParams, msg));
    },
});
DesignerFormBuilder.contextTypes = {
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


const connectedDesignerFormBuilder = connect(mapStateToProps, mapDispatchToProps)(DesignerFormBuilder);
export { connectedDesignerFormBuilder as DesignerFormBuilder };


