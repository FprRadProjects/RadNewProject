import React, { Component } from 'react';
import { connect } from "react-redux"
import { HideElementListModal, EditTextElementListModal } from "../../../Basic";
import PropTypes from "prop-types"

class ControlPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      HideElementListmodal: false,
    };
  }
  controlpanelClick(e) {
    const { name } = e.target;
    if (name === "hide")
      this.setState(prevState => ({
        HideElementListmodal: !prevState.HideElementListmodal
      }));
    else if (name === "edit")
      this.setState(prevState => ({
        EditTextElementListmodal: !prevState.EditTextElementListmodal
      }));
  }
  render() {
    const { FormInfoId } = this.props;
    return (
      <div className="r-main-box__controlpanel">

        <div class="dropdown ltr">
          <a className="r-main-box__controlpanel--action dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></a>
          <div className="dropdown-menu">
            <a className="dropdown-item"
              title={this.context.t("DeletedControlManagement")} name="hide" onClick={this.controlpanelClick.bind(this)}>{this.context.t("DeletedControlManagement")}</a>
            <a className="dropdown-item"
              title={this.context.t("LabelManagement")} name="edit" onClick={this.controlpanelClick.bind(this)}>{this.context.t("LabelManagement")}</a>
            <a className="dropdown-item"
              title={this.context.t("SaveFormLayout")} name="savelaout" onClick={this.controlpanelClick.bind(this)}>{this.context.t("SaveFormLayout")}</a>
          </div>
        </div>

        {this.state.HideElementListmodal &&
          <HideElementListModal modal={this.state.HideElementListmodal}
            toggle={this.controlpanelClick.bind(this)}
            FormId={FormInfoId} />}
        {this.state.EditTextElementListmodal &&
          <EditTextElementListModal modal={this.state.EditTextElementListmodal}
            toggle={this.controlpanelClick.bind(this)}
            FormId={FormInfoId} />}
      </div>
    );
  }
}

ControlPanel.contextTypes = {
  t: PropTypes.func.isRequired
}


const connectedControlPanel = connect(null, null)(ControlPanel);
export { connectedControlPanel as ControlPanel };


