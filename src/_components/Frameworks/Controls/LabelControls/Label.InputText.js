import React, { Component } from 'react';
import { connect } from "react-redux"
import PropTypes from "prop-types"
import InputMask from 'react-input-mask';
import { MenuProvider } from "react-contexify";

class LabelInputText extends Component {
  constructor(props) {
    super(props);
    const { value } = this.props;
    this.state = {
      value: value
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({ value: nextProps.value });
    }
  }
  render() {

    const { DeletedElements, EditedElements, className1, LabelclassName, Text, className2, InputclassName, name, mask,
      changeHandle, Id, FormId, isDisabled, ColClassName } = this.props;
    return (
      <MenuProvider id="menu_id">
        {(DeletedElements === undefined || DeletedElements["labelInputText-" + Id] === undefined ||
          DeletedElements["labelInputText-" + Id].IsShow
        ) &&
          <div className={ColClassName} id={"labelInputText-" + Id} Description={Text} formid={FormId} element={"labelInputText-" + Id} >

            <div className={className1} id={"labelInputTextDiv1-" + Id} Description={Text} formid={FormId} element={"labelInputText-" + Id} >
              <span formid={FormId} className={LabelclassName} id={"labelInputTextLbl-" + Id} element={"labelInputText-" + Id}
                erowid={(EditedElements === undefined || EditedElements["labelInputTextLbl-" + Id] === undefined) ?
                  0 : EditedElements["labelInputTextLbl-" + Id].Id}
                public={(EditedElements === undefined || EditedElements["labelInputTextLbl-" + Id] === undefined) ?
                  "false" : EditedElements["labelInputTextLbl-" + Id].IsPublic + ""}
                Description={Text}
              >{(EditedElements === undefined || EditedElements["labelInputTextLbl-" + Id] === undefined) ?
                Text : EditedElements["labelInputTextLbl-" + Id].Title}</span>
              <div formid={FormId} className={className2} id={"labelInputTextDiv2-" + Id} element={"labelInputText-" + Id} Description={Text}>
                {changeHandle !== undefined && <InputMask formid={FormId} type="text" element={"labelInputText-" + Id} id={"labelInputTextInput-" + Id} mask={mask === undefined ? "" : mask} Description={Text} autoComplete="off" className={InputclassName} name={name} value={this.state.value}
                  onChange={changeHandle.bind(this)} disabled={isDisabled === undefined ? false : isDisabled} />}
                {changeHandle === undefined && <InputMask formid={FormId} type="text" element={"labelInputText-" + Id} id={"labelInputTextInput-" + Id} mask={mask === undefined ? "" : mask} Description={Text} autoComplete="off" className={InputclassName} name={name} value={this.state.value}
                  disabled={isDisabled === undefined ? false : isDisabled} />}
              </div>
            </div>
          </div>
        }

      </MenuProvider>
    );
  }
}

LabelInputText.contextTypes = {
  t: PropTypes.func.isRequired
}



const connectedLabelInputText = connect(null, null)(LabelInputText);
export { connectedLabelInputText as LabelInputText };
