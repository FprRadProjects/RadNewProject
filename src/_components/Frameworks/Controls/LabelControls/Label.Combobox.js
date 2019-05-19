import React, { Component } from 'react';
import { connect } from "react-redux"
import PropTypes from "prop-types"
import {
  ComboSelectList
} from "../ComboSelect";
import { MenuProvider } from "react-contexify";
class LabelCombobox extends Component {
  constructor(props) {
    super(props);
    const { selectedOption, isDisabled, options } = this.props;
    this.state = {
      selectedOption: selectedOption,
      isDisabled: isDisabled === undefined ? false : isDisabled,
      options: options,


    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedOption !== this.state.selectedOption) {
      this.setState({ selectedOption: nextProps.selectedOption });
    }
    if (nextProps.isDisabled !== this.state.isDisabled) {
      this.setState({ isDisabled: nextProps.isDisabled });
    }
    if (nextProps.options !== this.state.options) {
      this.setState({ options: nextProps.options });
    }
  }
  render() {

    const { DeletedElements, EditedElements, className1, LabelclassName, Text, className2, ComboclassName, name,
      changeHandle, Id, FormId, ColClassName } = this.props;
    return (
      <MenuProvider id="menu_id">
        {(DeletedElements === undefined || DeletedElements["labelCombobox-" + Id] === undefined ||
          DeletedElements["labelCombobox-" + Id].IsShow
        ) &&
          <div className={ColClassName===undefined?"col-6":ColClassName} id={"labelCombobox-" + Id} Description={Text} formid={FormId} element={"labelCombobox-" + Id} >
            <div className={className1===undefined?"form-group row":className1} id={"labelComboboxDiv1-" + Id} Description={Text} formid={FormId} element={"labelCombobox-" + Id} >
              <span formid={FormId} className={LabelclassName===undefined?"col-2 col-form-label":LabelclassName} id={"labelComboboxLbl-" + Id} element={"labelCombobox-" + Id}
                erowid={(EditedElements === undefined || EditedElements["labelComboboxLbl-" + Id] === undefined) ?
                  0 : EditedElements["labelComboboxLbl-" + Id].Id}
                public={(EditedElements === undefined || EditedElements["labelComboboxLbl-" + Id] === undefined) ?
                  "false" : EditedElements["labelComboboxLbl-" + Id].IsPublic + ""}
                Description={Text}
              >{(EditedElements === undefined || EditedElements["labelComboboxLbl-" + Id] === undefined) ?
                Text : EditedElements["labelComboboxLbl-" + Id].Title}</span>
              <div formid={FormId} className={className2===undefined?"col-10":className2} id={"labelComboboxDiv2-" + Id} element={"labelCombobox-" + Id} Description={Text}>
                <ComboSelectList formid={FormId} isDisabled={this.state.isDisabled} options={this.state.options} 
                classname={ComboclassName===undefined?"mt-2 mb-1":ComboclassName}
                  name={name} onChange={changeHandle.bind(this)} selectedOption={this.state.selectedOption}
                  element={"labelCombobox-" + Id} id={"labelCombobox-" + Id} Description={Text}
                />
              </div>
            </div>
          </div>
        }
        {}
      </MenuProvider>
    );
  }
}
LabelCombobox.contextTypes = {
  t: PropTypes.func.isRequired
}



const connectedLabelCombobox = connect(null, null)(LabelCombobox);
export { connectedLabelCombobox as LabelCombobox };
