import React, { Component } from 'react';
import '../../../../content/css/Calendar.css';
import 'moment-jalaali';
import PropTypes from "prop-types"
import connect from "react-redux/es/connect/connect";
import { MenuProvider } from "react-contexify";

class BoxGroup extends Component {

    render() {
    const { DeletedElements,  className, Id, FormId,Text,
    IconDivClassName,IconClassName,children
    } = this.props;
    return (
            <MenuProvider id="menu_id">
                {(DeletedElements === undefined || DeletedElements["BoxInfo-" + Id] === undefined ||
                    DeletedElements["BoxInfo-" + Id].IsShow
                ) &&
                    <div className={className} id={"BoxInfo-" + Id} Description={Text} formid={FormId} element={"BoxInfo-" + Id} >
                       
                       <div className={IconDivClassName} id={"BoxInfoiconDiv-" + Id} Description={Text} formid={FormId} element={"BoxInfo-" + Id}>
                            <i className={IconClassName} id={"BoxInfoIconSpan-" + Id} isshortkey="false" Description={Text} formid={FormId} element={"BoxInfo-" + Id}></i>
                       </div>
                        {children}
                    </div>
                }
            </MenuProvider>
        );
    }
}


BoxGroup.contextTypes = {
    t: PropTypes.func.isRequired
}

const connectedBoxGroup = connect(null, null)(BoxGroup);
export { connectedBoxGroup as BoxGroup };