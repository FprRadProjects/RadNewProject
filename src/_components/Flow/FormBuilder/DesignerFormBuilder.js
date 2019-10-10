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
const ResponsiveReactGridLayout = WidthProvider(Responsive);

var SaveParams = { caption_id: 0, Fields: [] };
var layoutSize = {
    A5landscape: { layoutsize: 'A5',rowWidth : '29.7cm',rowHeight: '21cm', layout: 'landscape' }, A5partial: { layoutsize: 'A5',rowWidth : '21cm',rowHeight: '29.7cm', layout: 'partial' },
    A4landscape: { layoutsize: 'A4',rowWidth : '21cm',rowHeight: '14.8cm', layout: 'landscape' }, A4partial: { layoutsize: 'A4',rowWidth : '21cm',rowHeight: '14.8cm', layout: 'partial' },
    A3landscape: { layoutsize: 'A3',rowWidth : '42cm',rowHeight: '29.7cm', layout: 'landscape' }, A3partial: { layoutsize: 'A3',rowWidth : '29.7cm',rowHeight: '42cm', layout: 'partial' }
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

        this.state = {
            ...this.state,
            modal: false,
            backdrop: "static",
            modalClass: "modal-dialog-centered modal-xl r-modal",
            currentBreakpoint: "lg",
            compactType: "vertical",
            mounted: false,
            layouts: { lg: this.props.FormBuilderLayoutData },
            toolbox: { lg: this.props.FormBuilderToolBoxData }
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
    };

    componentDidMount() {
        SaveParams = { caption_id: 0, Fields: [] };
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
                <div key={l.i}>
                    <div className="hide-button" onClick={this.onPutItem.bind(this, l)}>
                        &times;
                    </div>
                    {l.ftype === 'adad'
                        ? <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">{l.flabel}</span>
                            </div>
                            <input
                                type="Number"
                                className="form-control"
                            />
                        </div>
                        : (l.ftype === 'look'
                            ? <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">{l.flabel}</span>
                                </div>
                                <select
                                    className="form-control"
                                >
                                    {listItems}
                                </select>
                            </div>
                            : (l.ftype === 'img'
                                ? <div className="r-formbuilder__img">
                                    <span className="input-group-text d-block">{l.flabel}</span>
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
                                            <span className="input-group-text">{l.flabel}</span>
                                        </div>
                                        <NumberFormat
                                            thousandSeparator={true}
                                            className="form-control"
                                        />
                                    </div>
                                    : (l.ftype === 'saat'
                                        ? <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">{l.flabel}</span>
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
                                                    <span className="input-group-text">{l.flabel}</span>
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
                                                        <label className="form-check-label" for={"formvals_" + l.ftype + l.fnum}>{l.flabel}</label>
                                                    </div>
                                                </div>
                                                : (l.ftype === 'tar'
                                                    ? <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text">{l.flabel}</span>
                                                        </div>
                                                        <JalaliField
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

    onLayoutChange = (layout, layouts) => {
        this.props.onLayoutChange(layout, layouts);
        this.setState({ layouts });
        
    };

    SaveFormDesignerHandle = (msg) => {
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
                    "flabel": this.state.layouts[this.state.currentBreakpoint][item].flabel
                }
                ;
        })
        console.log(obj)
        SaveParams.Fields = obj;
        SaveParams.caption_id = FormBuilderCaptionId;
        console.log(SaveParams)
        DesignerSave(SaveParams, msg).then(data => {
            if (data.status) {

            }
        });
    }
   
  
    ChangeLayout = (val, event) => {
        this.setState({
            pageLayout: layoutSize[val],
            layouts:null
            
        });


    }
      
    render() {
        var layoutsize = this.state.pageLayout === undefined ? 'A4' : this.state.pageLayout.layoutsize;
        var layout = this.state.pageLayout === undefined ? 'partial' : this.state.pageLayout.layout;
        var rowWidth = this.state.pageLayout === undefined ? '21cm' : this.state.pageLayout.rowWidth;
        var rowHeight = this.state.pageLayout === undefined ? '29.7cm' : this.state.pageLayout.rowHeight;
        
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
                              <input type="Button" onClick={this.ChangeLayout.bind(this, "A5landscape")} value="A5landscape"></input>
                <input type="Button" onClick={this.ChangeLayout.bind(this, "A5partial")} value="A5partial"></input>
                <input type="Button" onClick={this.ChangeLayout.bind(this, "A4landscape")} value="A4landscape"></input>
                <input type="Button" onClick={this.ChangeLayout.bind(this, "A4partial")} value="A4partial"></input>
                <input type="Button" onClick={this.ChangeLayout.bind(this, "A3landscape")} value="A3landscape"></input>
                <input type="Button" onClick={this.ChangeLayout.bind(this, "A3partial")} value="A3partial"></input>

                            <page layoutsize={layoutsize} layout={layout}>
                                <ResponsiveReactGridLayout
                                    {...this.props}
                                    className="r-formbuilder__layout"
                                    layouts={this.state.layouts}
                                    onLayoutChange={this.onLayoutChange}
                                    // WidthProvider option
                                    measureBeforeMount={true}
                                    // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
                                    // and set `measureBeforeMount={true}`.
                                    useCSSTransforms={this.state.mounted}
                                    isDraggable={true}
                                    isResizable={true}
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


