import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types"
import ReactToPrint from 'react-to-print';
import {
    BasicInfo_action
} from "../../../../_actions";
class ShortKeyPrintButton extends Component {
    clientClickHandler = () => {
        const { UserAccessForm, AccessInfo, AccessType, handleClick, lang } = this.props;
        if (AccessInfo !== undefined) {
            let formName = lang == "fa" ? AccessInfo.form_name : AccessInfo.en_form_name;
            let AccessParams = { "sysname": AccessInfo.sys_name, "type": AccessType !== undefined ? AccessType : "show", formname: formName };
            UserAccessForm(AccessParams).then(data => {
                if (data.status)
                    handleClick()
            });
        }
        else
            handleClick()
    }
    render() {
        const { Key, ShortKey, Id, FormId, tooltip,PrintRef } = this.props;
        return (
            <li key={Key}>
                <ReactToPrint
                    trigger={() => <a href="javascript:void(0)">
                        <i className="icon save" formid={FormId} isshortkey="false"
                            id={ShortKey.Element} rowid={ShortKey.Id + ""}
                            title={tooltip} data-toggle="tooltip" ></i></a>}
                    content={() => PrintRef}
                    bodyClass="print"
                    pageStyle={""}
                    copyStyles={true}
                />
            </li>
        );
    }
}

ShortKeyPrintButton.contextTypes = {
    t: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
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

const connectedShortKeyPrintButton = connect(mapStateToProps, mapDispatchToProps)(ShortKeyPrintButton);
export { connectedShortKeyPrintButton as ShortKeyPrintButton };