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
            backdrop: "static"
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
                var HideParam=
                {
                    RowId:0,
                    FormId:this.props.FormId,
                    IsShow:false,
                    IsPublic:false,
                    Element:event.target.attributes.element.value
                };
                const{Set_Hide_TemplateForm} =this.props;
                Set_Hide_TemplateForm(HideParam);
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
                    event: event
                }));
            }}
        }
    }
    ShortKeyClick = ({event, props}) => {
        var Params=
            {
                RowId:0,
                FormId:this.props.FormId,
                Meta:"",
                Element:"",
                IsPublic:false,
            }
        if (event.target.attributes.id !== undefined) {
            if (event.target.attributes.id.value.indexOf("ShortKey") === -1) {
                Params.Meta= event.target.outerHTML;
                Params.Element= event.target.attributes.id.value;
                const{Set_ShortKey_TemplateForm} =this.props;
                Set_ShortKey_TemplateForm(Params);
            }
        }
    }
    ChangeText = () => {
        if (this.state.event.target.nodeName == "INPUT") {
            this.state.event.target.value = this.state.text;
        } else {
            this.state.event.target.innerText = this.state.text;
        }
        const id = this.state.event.target.attributes.id.value;
        var Params=
            {
                RowId:0,
                FormId:this.props.FormId,
                Title:this.state.text,
                IsPublic:false,
                Element:id
            }
        const{Set_EditText_TemplateForm} =this.props;
        Set_EditText_TemplateForm(Params);
        this.setState(prevState => ({
            modal: !prevState.modal,
        }));
    }
    onChangeInput = (event) => {
        this.setState({
            text: event.target.value,
        });
    }

    render() {
        const State = this.state;
        return (
            <div >
                <Menu id='menu_id' style={{zIndex:10000}}>
                    <Item onClick={this.HideClick.bind(this)}>{this.context.t("DeleteControl")}</Item>
                    <Separator/>
                    <Item onClick={this.EditClick.bind(this)}>{this.context.t("EditLabel")}</Item>
                    <Separator/>
                    <Item onClick={this.ShortKeyClick.bind(this)}>{this.context.t("AddToShortKey")}</Item>
                </Menu>
                <Modal isOpen={State.modal} className={this.props.className}>
                    <ModalHeader >{this.context.t("EditLabel")}</ModalHeader>
                    <ModalBody>
                        <input type="text" defaultValue={State.text} onChange={this.onChangeInput.bind(this)}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.ChangeText.bind(this)}>{this.context.t("Save")}</Button>{' '}
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

const connectedMyAwesomeMenu= connect(mapStateToProps, null)(MyAwesomeMenu);
export {connectedMyAwesomeMenu as MyAwesomeMenu};
