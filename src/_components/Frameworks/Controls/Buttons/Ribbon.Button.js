import React, { Component } from 'react';
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { MenuProvider } from "react-contexify";
import {
    BasicInfo_action
} from "../../../../_actions";
var target = "";
class RibbonButton extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { DeletedElements, EditedElements, handleClick, Id, Text, FormId } = this.props;
        return (
            <MenuProvider id="menu_id">

                {(DeletedElements === undefined || DeletedElements["lnk-" + Id] === undefined ||
                    DeletedElements["lnk-" + Id].IsShow
                ) && <a id={"lnk-" + Id} onClick={handleClick.bind(this)} Description={this.context.t(Text)}
                    formid={FormId}
                >
                        <i formid={FormId} isshortkey="true" className={"icon " + Id} id={"icon-" + Id} element={"lnk-" + Id} 
                        Description={this.context.t(Text)} title={this.context.t(Text)}></i>
                        <span formid={FormId} id={"lbl-" + Id} element={"lnk-" + Id}  Description={this.context.t(Text)}
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

const mapDispatchToProps = dispatch => ({
    GetSelectedFormId: (FormId) => {
        dispatch(BasicInfo_action.GetSelectedFormId(FormId))
    },
});

const connectedRibbonButton = connect(null, mapDispatchToProps)(RibbonButton);
export { connectedRibbonButton as RibbonButton };
