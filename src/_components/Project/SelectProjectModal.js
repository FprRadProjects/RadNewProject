import React, {Component} from 'react';
import {connect} from "react-redux"
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {ProjectsInfo_action} from "../../_actions";
import PropTypes from "prop-types"
import {GridComponent} from "../Config/GridComponent";
import {ApiGridComponent} from "../Config/ApiGridComponent";

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
            backdrop: "static",
            backdropClassName: "test",
            modalClass: "modal-dialog-centered modal-lg r-filter-modal"
        };

    }

    render() {  const columns = [
        {name: 'id', title: this.context.t("RowId")},
        {name: 'code', title: this.context.t("Code")},
        {name: 'ptype', title: this.context.t("Project")},

    ];
        const {modal, toggle, id_tel,GetSelectProject,GetSelectProjectRowData
            ,SelectProject_rows,SelectProject_totalCount} = this.props;
        Params.Id_Taraf=id_tel;
        const modalBackDrop = `
        .modal-backdrop {
            opacity:.98!important;
            background: rgb(210,210,210);
            background: -moz-linear-gradient(-45deg, rgba(210,210,210,1) 0%, rgba(229,235,238,1) 50%, rgba(216,216,216,1) 50.1%, rgba(216,216,216,1) 100%);
            background: -webkit-linear-gradient(-45deg, rgba(210,210,210,1) 0%,rgba(229,235,238,1) 50%,rgba(216,216,216,1) 50.1%,rgba(216,216,216,1) 100%);
            background: linear-gradient(135deg, rgba(210,210,210,1) 0%,rgba(229,235,238,1) 50%,rgba(216,216,216,1) 50.1%,rgba(216,216,216,1) 100%);
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#d2d2d2', endColorstr='#d8d8d8',GradientType=1 );
        }`;
        return (
            <div>

               <div>
                    <Modal isOpen={modal} toggle={toggle}
                         >
                        <ModalHeader>{this.context.t("frm_Select_Project")}</ModalHeader>
                        <ModalBody>
                            <GridComponent columns={columns} booleanColumns={booleanColumns}
                                           rows={SelectProject_rows} totalCount={SelectProject_totalCount}
                                           UrlParams={Params} fetchData={GetSelectProject.bind(this)}
                                           GetRowInfo={GetSelectProjectRowData}
                                           currencyColumns={currencyColumns} hiddenColumnNames={hiddenColumnNames}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={toggle}>{this.context.t("Select")}</Button>{' '}
                            <Button color="secondary" onClick={toggle}>{this.context.t("Cancel")}</Button>
                        </ModalFooter>
                    </Modal>
                </div>
                <style>{modalBackDrop}</style>

            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    GetSelectProject: (Params) => {
        dispatch(ProjectsInfo_action.GetSelectProject(Params))
    },
    GetSelectProjectRowData: (Params) => {
        dispatch(ProjectsInfo_action.GetSelectProjectRowData(Params))
    }
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
