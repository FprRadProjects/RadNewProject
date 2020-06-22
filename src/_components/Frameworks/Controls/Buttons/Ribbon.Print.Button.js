import React, { Component } from 'react';
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { MenuProvider } from "react-contexify";
import ReactToPrint from 'react-to-print';
import {
    BasicInfo_action
} from "../../../../_actions";
class RibbonPrintButton extends Component {
    constructor(props) {
        super(props);
    }
    clientClickHandler = () => {
        const { UserAccessForm, AccessInfo, AccessType, handleClick,lang } = this.props;
        if (AccessInfo !== undefined) {
            let formName = lang == "fa" ? AccessInfo.form_name : AccessInfo.en_form_name;
            let AccessParams =  { "sysname": AccessInfo.sys_name, "type": AccessType !== undefined ? AccessType : "show",formname:formName };
            UserAccessForm(AccessParams).then(data => {
                if (data.status)
                    handleClick()
            });
        }
        else
            handleClick()
    }
    render() {
        const { DeletedElements, EditedElements, Id, Text, FormId,PrintRef} = this.props;
        return (
           

                
                <ReactToPrint
                
               
                trigger={() =>  <MenuProvider id="menu_id">  {(DeletedElements === undefined || DeletedElements["lnk-" + Id] === undefined ||
                DeletedElements["lnk-" + Id].IsShow
            ) && 
                
                <a id={"lnk-" + Id} href="javascript:void(0)"  Description={this.context.t(Text)} formid={FormId}
                >
                    <i formid={FormId} isshortkey="true" className="icon save" id={"icon-" + Id} element={"lnk-" + Id}
                            Description={this.context.t(Text)} title={this.context.t(Text)}></i>
                     
                     <label formid={FormId} id={"lbl-" + Id} element={"lnk-" + Id} Description={this.context.t(Text)}
                            erowid={(EditedElements === undefined || EditedElements["lbl-" + Id] === undefined) ?
                                0 : EditedElements["lbl-" + Id].Id}
                            public={(EditedElements === undefined || EditedElements["lbl-" + Id] === undefined) ?
                                "false" : EditedElements["lbl-" + Id].IsPublic + ""}
                        >{(EditedElements === undefined || EditedElements["lbl-" + Id] === undefined) ?
                            this.context.t(Text) : EditedElements["lbl-" + Id].Title}</label>

                    {/* <label>
                {(EditedElements === undefined || EditedElements[Id] === undefined) ?
                            this.context.t(Text) : EditedElements[ Id].Title}
                
                </label> */}
                </a>} </MenuProvider>}
                content={() => PrintRef}
                formid={FormId}
                bodyClass="print"
                pageStyle={""}
                copyStyles={true}
                isshortkey="true"
            /> 
           
        );
    }
}

RibbonPrintButton.contextTypes = {
    t: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
    GetSelectedFormId: (FormId) => {
        dispatch(BasicInfo_action.GetSelectedFormId(FormId))
    },
    UserAccessForm: (Params) => {
        return dispatch(BasicInfo_action.UserAccessForm(Params))
    },
});

function mapStateToProps(state) {
    const { lang } = state.i18nState
    return {
        lang,
    };
}

const connectedRibbonPrintButton = connect(mapStateToProps, mapDispatchToProps)(RibbonPrintButton);
export { connectedRibbonPrintButton as RibbonPrintButton };
