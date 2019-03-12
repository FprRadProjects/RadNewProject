import React, { Component } from 'react';
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { MenuProvider } from "react-contexify";
class RibbonButton extends Component {
    render() {
        const { DeletedElements, EditedElements, handleClick, Id, Text } = this.props;
        return (
            <MenuProvider id="menu_id">

{                (DeletedElements === undefined || DeletedElements["lnk-" + Id] === undefined ||
                    DeletedElements["lnk-" + Id].IsShow
            ) && <a id={"lnk-" + Id} onClick={handleClick.bind(this)}>
                    <i className={"icon " + Id} id={"icon-" + Id} element={"lnk-" + Id}></i>
                    <span id={"lbl-" + Id} element={"lnk-" + Id}
                        erowid={(EditedElements === undefined || EditedElements["lbl-" + Id] === undefined) ?
                            0 : EditedElements["lbl-" + Id].Id}
                        public={(EditedElements === undefined || EditedElements["lbl-" + Id] === undefined) ?
                            "false" : EditedElements["lbl-" + Id].IsPublic + ""}
                    >{(EditedElements === undefined || EditedElements["lbl-" + Id] === undefined) ?
                        this.context.t(Text) : EditedElements["lbl-" + Id].Title}</span>
                </a>}
            </MenuProvider>
        );
    }
}

RibbonButton.contextTypes = {
    t: PropTypes.func.isRequired
}

const connectedRibbonButton = connect(null, null)(RibbonButton);
export { connectedRibbonButton as RibbonButton };
