import React, { Component } from 'react';
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { MenuProvider } from "react-contexify";
import { Button } from "reactstrap";
import {
  ComboSelectList
} from "../ComboSelect";
class LabelPopUpInputText extends Component {
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

    const { DeletedElements, EditedElements, className1, className2, className3, LabelclassName, Text, InputclassName, name,
      changeHandle, options, Id, ColClassName, FormId, Type, isDisabled, color, ButtonClick, ButtonText, isButtonDisabled, deleteHandler, hasDelete } = this.props;
    return (
      <MenuProvider id="menu_id">

        {(DeletedElements === undefined || DeletedElements["LabelPopUpInputText-" + Id] === undefined ||
          DeletedElements["LabelPopUpInputText-" + Id].IsShow
        ) &&
          <div className={ColClassName} id={"LabelPopUpInputText-" + Id} Description={Text} formid={FormId} element={"LabelPopUpInputText-" + Id}>
            <div className={className1} id={"LabelPopUpInputTextDiv1-" + Id} Description={Text} formid={FormId} element={"LabelPopUpInputText-" + Id} >
              <span formid={FormId} className={LabelclassName} id={"LabelPopUpInputTextLbl-" + Id} element={"LabelPopUpInputText-" + Id}
                erowid={(EditedElements === undefined || EditedElements["LabelPopUpInputTextLbl-" + Id] === undefined) ?
                  0 : EditedElements["LabelPopUpInputTextLbl-" + Id].Id}
                public={(EditedElements === undefined || EditedElements["LabelPopUpInputTextLbl-" + Id] === undefined) ?
                  "false" : EditedElements["LabelPopUpInputTextLbl-" + Id].IsPublic + ""}
                Description={Text} >
                {(EditedElements === undefined || EditedElements["LabelPopUpInputTextLbl-" + Id] === undefined) ?
                  Text : EditedElements["LabelPopUpInputTextLbl-" + Id].Title}</span>
              <div className={className2}>
                <div className={className3} >
                  <div className="input-group-prepend">
                    <Button color={color} formid={FormId} element={"LabelPopUpInputText-" + Id} id={"LabelPopUpInputTextSelect-" + Id} Description={Text}
                      onClick={ButtonClick.bind(this)} name={Id} disabled={isButtonDisabled === undefined ? false : isButtonDisabled}>{ButtonText}</Button>
                    {hasDelete !== undefined && (hasDelete && 
                    <Button className="rounded-0"  formid={FormId} element={"LabelPopUpInputText-" + Id} 
                    id={"LabelPopUpInputTextDelete-" + Id} Description={Text} 
                    color="danger" onClick={deleteHandler.bind(this)}>{this.context.t("Delete")}</Button>)}
                    
                  </div>
                  {Type === "Input" && <input formid={FormId} type="text" element={"LabelPopUpInputText-" + Id} id={"LabelPopUpInputTextInput-" + Id} Description={Text} 
                  autoComplete="off" className={InputclassName} name={name} value={this.state.value}
                    onChange={changeHandle.bind(this)} disabled={isDisabled === undefined ? false : isDisabled} />}

                  {Type === "TextArea" &&
                    <textarea rows="3"
                      ormid={FormId} type="text" element={"LabelPopUpInputText-" + Id} id={"LabelPopUpInputTextInput-" + Id} Description={Text} autoComplete="off" className={InputclassName} name={name} value={this.state.value}
                      onChange={changeHandle.bind(this)} disabled={isDisabled === undefined ? false : isDisabled}></textarea>
                  }
                  {Type === "ComboBox" &&
                    <ComboSelectList
                      element={"LabelPopUpInputText-" + Id} id={"LabelPopUpInputTextInput-" + Id} Description={Text}
                      options={options} name={name} onChange={changeHandle.bind(this)} selectedOption={this.state.value} />
                  }


                </div>
              </div>
            </div>
          </div>
        }


      </MenuProvider>
    );
  }
}

LabelPopUpInputText.contextTypes = {
  t: PropTypes.func.isRequired
}



const connectedLabelPopUpInputText = connect(null, null)(LabelPopUpInputText);
export { connectedLabelPopUpInputText as LabelPopUpInputText };
