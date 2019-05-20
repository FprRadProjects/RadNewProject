import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types"
import {
    BasicInfo_action
} from "../../../../_actions";
class ShortKeyButton extends Component {
    clientClickHandler = () => {
        const { UserAccessForm, AccessInfo, AccessType, handleClick ,lang} = this.props;
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
        const { Key, ShortKey, Id,FormId,tooltip } = this.props;
        return (
            <li key={Key}>
                <a>
                    <i onClick={this.clientClickHandler.bind(this)} formid={FormId} isshortkey="false"
                        id={ShortKey.Element} rowid={ShortKey.Id + ""}
                        className={"icon " + Id} title={tooltip} data-toggle="tooltip" ></i>
                </a>
            </li>
        );
    }
}

ShortKeyButton.contextTypes = {
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

const connectedShortKeyButton = connect(mapStateToProps, mapDispatchToProps)(ShortKeyButton);
export { connectedShortKeyButton as ShortKeyButton };