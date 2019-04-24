import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types"
class ShortKeyButton extends Component {
    render() {
        const { Key, ShortKey, handleClick, Id,FormId,tooltip } = this.props;
        return (
            <li key={Key}>
                <a>
                    <i onClick={handleClick.bind(this)} formid={FormId}
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

const connectedShortKeyButton = connect(null, null)(ShortKeyButton);
export { connectedShortKeyButton as ShortKeyButton };
