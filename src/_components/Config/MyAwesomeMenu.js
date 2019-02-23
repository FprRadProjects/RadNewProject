import React, {Component} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import PropTypes from "prop-types"
import {Menu, Item, Separator, Submenu, MenuProvider} from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css';
import connect from "react-redux/es/connect/connect";


class MyAwesomeMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            modal: false,
            backdrop: "static",

        };
    }

    toggle({event, props}) {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    HideClick = ({event, props}) => {
        if (event.target.attributes.id !== undefined) {
            const id = event.target.attributes.id.value;
            if (id.indexOf("ShortKey") === -1) {

                this.setState(prevState => ({
                    ...this.state,
                    modal: !prevState.modal,
                    event: event,
                    public: event.target.attributes.public.value,
                    ishide: true

                }));
            }
        }

    }
    EditClick = ({event, props}) => {
        if (event.target.nodeName == "LABEL") {
            if (event.target.attributes.id !== undefined) {
                const id = event.target.attributes.id.value;
                if (id.indexOf("ShortKey") === -1) {
                    var text = "";
                    if (event.target.nodeName == "INPUT") {
                        text = event.target.value;
                    } else {
                        text = event.target.innerText;
                    }
                    this.setState(prevState => ({
                        ...this.state,
                        modal: !prevState.modal,
                        text: text,
                        event: event,
                        erowid: event.target.attributes.erowid.value,
                        public: event.target.attributes.public.value,
                        ishide: false

                    }));
                }
            }
        }
    }
    ShortKeyClick = ({event, props}) => {
        var Params =
            {
                RowId: 0,
                FormId: this.props.FormId,
                Meta: "",
                Element: "",
                IsPublic: false,
            }
        if (event.target.attributes.id !== undefined) {
            if (event.target.attributes.id.value.indexOf("ShortKey") === -1) {
                Params.Meta = event.target.outerHTML;
                Params.Element = event.target.attributes.id.value;
                const {Set_ShortKey_TemplateForm} = this.props;
                Set_ShortKey_TemplateForm(Params);
            }
        }
    }
    SaveChange = () => {
        if (!this.state.ishide) {
            if (this.state.text != "") {
                const id = this.state.event.target.attributes.id.value;
                var Params =
                    {
                        RowId: this.state.erowid,
                        FormId: this.props.FormId,
                        Title: this.state.text,
                        IsPublic: this.state.public,
                        Element: id
                    }
                const {Set_EditText_TemplateForm} = this.props;
                Set_EditText_TemplateForm(Params);
                this.setState(prevState => ({
                    modal: !prevState.modal,
                }));
            }
        }
        else
        {
            var HideParam =
                {
                    RowId: 0,
                    FormId: this.props.FormId,
                    IsShow: false,
                    IsPublic: this.state.public,
                    Element: this.state.event.target.attributes.element.value
                };
            const {Set_Hide_TemplateForm} = this.props;
            Set_Hide_TemplateForm(HideParam);
            this.setState(prevState => ({
                modal: !prevState.modal,
            }));
        }
    }

    onChangeInput = (event) => {
        this.setState({
            text: event.target.value,
        });
    }
    onChangeCheckBox = (event) => {
        this.setState({
            public: event.target.checked,
        });
    }

    render() {
        const State = this.state;
        return (
            <div>
                <Menu id='menu_id' style={{zIndex: 10000}}>
                    <Item onClick={this.HideClick.bind(this)}>{this.context.t("DeleteControl")}</Item>
                    <Separator/>
                    <Item onClick={this.EditClick.bind(this)}>{this.context.t("EditLabel")}</Item>
                    <Separator/>
                    <Item onClick={this.ShortKeyClick.bind(this)}>{this.context.t("AddToShortKey")}</Item>
                </Menu>
                <Modal isOpen={State.modal} className={this.props.className}>
                    <ModalHeader>{State.ishide?this.context.t("DeleteControl"):this.context.t("EditLabel")}</ModalHeader>
                    <ModalBody>
                        {!State.ishide &&
                        <input type="text" defaultValue={State.text} onChange={this.onChangeInput.bind(this)}/>}
                        <label htmlFor="ispublic"> {this.context.t("IsPublic")}</label>
                        <input id="ispublic" type="checkbox" defaultChecked={State.public === "true" ? "checked" : ""}
                               onChange={this.onChangeCheckBox.bind(this)}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary"
                                onClick={this.SaveChange.bind(this)}>{this.context.t("Save")}</Button>{' '}
                        <Button color="secondary" onClick={this.toggle.bind(this)}>{this.context.t("Cancel")}</Button>
                    </ModalFooter>
                </Modal>

            </div>
        );
    }
}


MyAwesomeMenu.contextTypes = {
    t: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const {lang} = state.i18nState;
    return {
        lang,
    };
}

const connectedMyAwesomeMenu = connect(mapStateToProps, null)(MyAwesomeMenu);
export {connectedMyAwesomeMenu as MyAwesomeMenu};
