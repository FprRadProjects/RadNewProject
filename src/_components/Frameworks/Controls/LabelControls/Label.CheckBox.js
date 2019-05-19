import React, { Component } from 'react';
import { connect } from "react-redux"
import PropTypes from "prop-types"
import InputMask from 'react-input-mask';
import { MenuProvider } from "react-contexify";

class LabelCheckBox extends Component {
  constructor(props) {
    super(props);
    const { checked } = this.props;
  this.state = {
      checked: checked
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.checked !== this.state.checked) {
      this.setState({ checked: nextProps.checked });
    }
  }
  render() {
    const { DeletedElements, EditedElements,  LabelclassName, Text,  name, defaultChecked,
      checkBoxChangeHandler, Id, FormId, isDisabled } = this.props;
    return (
      <MenuProvider id="menu_id">
        {(DeletedElements === undefined || DeletedElements["LabelCheckBox-" + Id] === undefined ||
          DeletedElements["LabelCheckBox-" + Id].IsShow
        ) && <div className="checkbox" id={"LabelCheckBox-" + Id} Description={Text} formid={FormId} element={"LabelCheckBox-" + Id}>
            <input formid={FormId} element={"LabelCheckBox-" + Id} id={"LabelCheckBoxInput-" + Id} Description={Text}
              onChange={checkBoxChangeHandler.bind(this)} name={name} disabled={isDisabled===undefined?false:isDisabled} 
              defaultChecked={defaultChecked===undefined?false:defaultChecked}
              checked={this.state.checked} type="checkbox" />
            <label htmlFor={"LabelCheckBoxInput-" + Id} formid={FormId} className={LabelclassName===undefined?"m-0":LabelclassName} id={"LabelCheckBoxLbl-" + Id} element={"LabelCheckBox-" + Id}
              erowid={(EditedElements === undefined || EditedElements["LabelCheckBoxLbl-" + Id] === undefined) ?
                0 : EditedElements["LabelCheckBoxLbl-" + Id].Id}
              public={(EditedElements === undefined || EditedElements["LabelCheckBoxLbl-" + Id] === undefined) ?
                "false" : EditedElements["LabelCheckBoxLbl-" + Id].IsPublic + ""}
              Description={Text}
            >{(EditedElements === undefined || EditedElements["LabelCheckBoxLbl-" + Id] === undefined) ?
              Text : EditedElements["LabelCheckBoxLbl-" + Id].Title}</label>

          </div>
        }

      </MenuProvider>
    );
  }
}

LabelCheckBox.contextTypes = {
  t: PropTypes.func.isRequired
}



const connectedLabelCheckBox = connect(null, null)(LabelCheckBox);
export { connectedLabelCheckBox as LabelCheckBox };
