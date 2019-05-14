import React, {Component} from 'react';
import {connect} from "react-redux"
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {ProjectsInfo_action} from "../../_actions";
import PropTypes from "prop-types"
import {GridComponent} from "../Frameworks";

var currencyColumns = [];
var hiddenColumnNames = [];
var booleanColumns = [];
var Params = {
    "page": 0,
    "pagesize": 10,
    "Id_Taraf": "0",
    "orderby": "id",
    "direction": "desc",
    "filter": []
};
class SelectProjectModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            modal: false,
            modalClass: "modal-dialog-centered r-modal"
        };

    }
    SetSelectProjectRowData=(row)=>{
        this.setState({
            row:row
        })
    }
    render() {  
        const columns = [
        {name: 'id', title: this.context.t("RowId")},
        {name: 'code', title: this.context.t("Code")},
        {name: 'ptype', title: this.context.t("Project")},

    ];
        const {modal, toggle, id_tel,GetSelectProject
            ,SelectProject_rows,SelectProject_totalCount,Successtoggle} = this.props;
        Params.Id_Taraf=id_tel;
        
        return (
            <div>

               <div>
                    <Modal isOpen={modal} toggle={toggle} 
                    className={this.state.modalClass}
                         >
                        <ModalHeader>{this.context.t("frm_Select_Project")}</ModalHeader>
                        <ModalBody>
                            <GridComponent columns={columns} booleanColumns={booleanColumns}
                                           rows={SelectProject_rows} totalCount={SelectProject_totalCount}
                                           UrlParams={Params} fetchData={GetSelectProject.bind(this)}
                                           GetRowInfo={this.SetSelectProjectRowData} columnwidth={158}
                                           currencyColumns={currencyColumns} hiddenColumnNames={hiddenColumnNames}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={Successtoggle.bind(this,this.state.row)}>{this.context.t("Select")}</Button>{' '}
                            <Button color="secondary" onClick={toggle}>{this.context.t("Cancel")}</Button>
                        </ModalFooter>
                    </Modal>
                </div>

            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    GetSelectProject: (Params) => {
        dispatch(ProjectsInfo_action.GetSelectProject(Params))
    },
    
});
SelectProjectModal.contextTypes = {
    t: PropTypes.func.isRequired
}

function mapStateToProps(state) {

    const {alert} = state;
    const {loading} = state.loading;
    const {lang} = state.i18nState
    const {SelectProject_rows} = state.projects;
    const {SelectProject_totalCount} = state.projects
    return {
        alert,
        loading,
        lang,
        SelectProject_rows,
        SelectProject_totalCount,
    };
}


const connectedSelectProjectModal = connect(mapStateToProps, mapDispatchToProps)(SelectProjectModal);
export {connectedSelectProjectModal as SelectProjectModal};
