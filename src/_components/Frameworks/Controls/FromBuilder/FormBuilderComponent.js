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
import { MuiThemeProvider } from '@material-ui/core/styles';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

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
                {/* <span className="toolbox__title">پنل فرم کار</span> */}
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


class FormBuilderComponent extends Component {
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
            layouts: { lg: this.props.initialLayout },
            toolbox: { lg: generateToolBoxItems() },
            changeJSON: {},
            file: null
        };

        this.onAddEmptyItem = this.onAddEmptyItem.bind(this);
        this.onAddHeaderText = this.onAddHeaderText.bind(this);
        this.onAddGroupItem = this.onAddGroupItem.bind(this);
    }
    static defaultProps = {
        className: "layout",
        rowHeight: 30,
        onLayoutChange: function () { },
        cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
        initialLayout: generateLayout(),
    };

    handleChange = colname => event => {
        const { type, checked, value } = event.target;
        const ftype = event.target.getAttribute('ftype');
        let newState = Object.assign({}, this.state);
        if (ftype == "bool")
            newState.changeJSON[[colname]] = checked;
        else if (ftype == "mon")
            newState.changeJSON[[colname]] = value.replace(/,/g, '');
        else if (ftype == "img") {
            newState.changeJSON[[colname]] = value.replace(/,/g, '');
            newState.file = URL.createObjectURL(event.target.files[0]);
        }
        else
            newState.changeJSON[[colname]] = value;
        this.setState(newState);
        console.log(this.state.changeJSON);
    };
    componentDidMount() {
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
                    <option key={index} value={val} Text={ffieldstxtArray[index]}>{ffieldstxtArray[index]}</option>
                );
            }
            return (
                <div key={l.i} flabel={l.flabel} ftype={l.ftype} fnum={l.fnum} frequired={l.frequired} ffields={l.ffields} ffieldstxt={l.ffieldstxt}>
                    <div className="hide-button" onClick={this.onPutItem.bind(this, l)}>
                        &times;
                    </div>
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
                                onChange={this.handleChange(l.ftype + l.fnum)} />
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
                                    onChange={this.handleChange(l.ftype + l.fnum)}>
                                    {listItems}
                                </select>
                            </div>
                            : (l.ftype === 'img'
                                ? <div className="r-formbuilder__img">
                                    <input type="button" value="حذف تصوير" className="btn btn-primary" />
                                    <div className="r-formbuilder__img-holder" onClick={() => this.inputElement.click()}>
                                        <input
                                            type="file"
                                            id={"formvals_" + l.ftype + l.fnum}
                                            name={"formvals_" + l.ftype + l.fnum}
                                            flabel={l.flabel}
                                            ftype={l.ftype}
                                            fnum={l.fnum}
                                            ref={input => this.inputElement = input}
                                            onChange={this.handleChange(l.ftype + l.fnum)} />
                                        <img src={this.state.file} />
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
                                            thousandSeparator={true}
                                            className="form-control"
                                            onChange={this.handleChange(l.ftype + l.fnum)}
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
                                                className="form-control"
                                                onChange={this.handleChange(l.ftype + l.fnum)} />
                                        </div>
                                        : (l.ftype === 'str'
                                            ? <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">{l.flabel}</span>
                                                </div>
                                                <textarea id={"formvals_" + l.ftype + l.fnum} name={"formvals_" + l.ftype + l.fnum} className="form-control" onChange={this.handleChange(l.ftype + l.fnum)}></textarea>
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
                                                            fnum={l.fnum}
                                                            onChange={this.handleChange(l.ftype + l.fnum)}
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
                                                            onChange={this.handleChange(l.ftype + l.fnum)}
                                                            className="form-control"
                                                        />

                                                        {/* <TextField
                                                                id={"formvals_" + l.ftype + l.fnum}
                                                                name={"formvals_" + l.ftype + l.fnum}
                                                                flabel={l.flabel}
                                                                ftype={l.ftype}
                                                                fnum={l.fnum}
                                                                onChange={this.handleChange(l.ftype + l.fnum)}
                                                                className="form-control"
                                                            /> */}

                                                    </div>
                                                    : (l.ftype === 'head'
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

    onAddEmptyItem() {
        var start = 0, end = 100;
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
                        ftype: "empty"
                    }

                ]
            }
        }));
    }

    onAddHeaderText() {
        const enteredName = prompt('لطفا متن مورد نظر را وارد نمایید');
        if (enteredName === null)
            return;
        var start = 0, end = 100;
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
                        ftype: "head"
                    }

                ]
            }
        }));
    }

    onAddGroupItem() {
        const enteredName = prompt('لطفا نام گروه مورد نظر را وارد نمایید');
        if (enteredName === null)
            return;
        var start = 0, end = 100;
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
                        ftype: "group"
                    }

                ]
            }
        }));
    }


    onTakeItem = item => {
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
            if (item.ftype != "head" && item.ftype != "empty" && item.ftype != "group") {
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

    onLayoutChange = (layout, layouts) => {
        this.props.onLayoutChange(layout, layouts);
        this.setState({ layouts });
    };


    render() {
        const { modal, toggle } = this.props;
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
                        <div className="r-formbuilder">
                            <ToolBox
                                items={this.state.toolbox[this.state.currentBreakpoint] || []}
                                onTakeItem={this.onTakeItem}
                                onAddEmptyItem={this.onAddEmptyItem}
                                onAddHeaderText={this.onAddHeaderText}
                                onAddGroupItem={this.onAddGroupItem}
                            />
                            <ResponsiveReactGridLayout
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
                            >
                                {this.generateDOM()}
                            </ResponsiveReactGridLayout>
                        </div>
                        <style>{modalBackDrop}</style>
                    </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                </Modal>
            </div >

        );
    }
}

const mapDispatchToProps = dispatch => ({


});
FormBuilderComponent.contextTypes = {
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


const connectedFormBuilderComponent = connect(mapStateToProps, mapDispatchToProps)(FormBuilderComponent);
export { connectedFormBuilderComponent as FormBuilderComponent };



function generateLayout() {
    return (
        [
            // {i: '1', x: 0, y: 0, w: 2, h: 2, ftype: 'adad', fnum: '1', flabel: 'عدد', frequired: 'False', ffields: '', ffieldstxt: '' },
            // {i: '2', x: 2, y: 0, w: 2, h: 2, ftype: 'saat', fnum: '1', flabel: 'ساعت', frequired: 'False', ffields: '', ffieldstxt: '' },
            // {i: '3', x: 4, y: 0, w: 2, h: 2, ftype: 'img', fnum: '1', flabel: 'عکس', frequired: 'False', ffields: '', ffieldstxt: '' },
            // {i: '4', x: 6, y: 0, w: 2, h: 2, ftype: 'mon', fnum: '1', flabel: 'قیمت', frequired: 'False', ffields: '', ffieldstxt: '' },
            // {i: '5', x: 8, y: 0, w: 2, h: 2, ftype: 'look', fnum: '1', flabel: 'انتخابی', frequired: 'False', ffields: '26,27,28', ffieldstxt: 'آیتم1,آیتم2,آیتم3' },
            // {i: '6', x: 10, y: 0, w: 2, h: 2, ftype: 'str', fnum: '1', flabel: 'متن', frequired: 'False', ffields: '', ffieldstxt: '' },
            // {i: '7', x: 12, y: 0, w: 2, h: 2, ftype: 'bool', fnum: '1', flabel: 'تیک', frequired: 'False', ffields: '', ffieldstxt: '' },
            // {i: '8', x: 14, y: 0, w: 2, h: 2, ftype: 'tar', fnum: '1', flabel: 'تاریخ', frequired: 'False', ffields: '', ffieldstxt: '' },
        ]
    );

}
function generateToolBoxItems() {
    return (
        [
            { i: '1', x: '0', y: 'Infinity', w: 12, h: 2, ftype: 'adad', fnum: '1', flabel: 'Number', frequired: 'False', ffields: '', ffieldstxt: '' },
            { i: '2', x: '0', y: 'Infinity', w: 12, h: 2, ftype: 'saat', fnum: '1', flabel: 'Time', frequired: 'False', ffields: '', ffieldstxt: '' },
            { i: '3', x: '0', y: 'Infinity', w: 12, h: 4, ftype: 'img', fnum: '1', flabel: 'Picture', frequired: 'False', ffields: '', ffieldstxt: '' },
            { i: '4', x: '0', y: 'Infinity', w: 12, h: 2, ftype: 'mon', fnum: '1', flabel: 'Money', frequired: 'False', ffields: '', ffieldstxt: '' },
            { i: '5', x: '0', y: 'Infinity', w: 12, h: 2, ftype: 'look', fnum: '1', flabel: 'Select', frequired: 'False', ffields: '26,27,28', ffieldstxt: 'آیتم 1,آیتم 2,آیتم 3' },
            { i: '6', x: '0', y: 'Infinity', w: 12, h: 2, ftype: 'str', fnum: '1', flabel: 'TextArea', frequired: 'False', ffields: '', ffieldstxt: '' },
            { i: '7', x: '0', y: 'Infinity', w: 12, h: 2, ftype: 'bool', fnum: '1', flabel: 'CheckBox', frequired: 'False', ffields: '', ffieldstxt: '' },
            { i: '8', x: '0', y: 'Infinity', w: 12, h: 2, ftype: 'tar', fnum: '1', flabel: 'Date', frequired: 'False', ffields: '', ffieldstxt: '' }
        ]
    );
}