import React, {Component} from 'react';
//import GridsService from "../../../_services/Grids/GridsService";
import {connect} from "react-redux"
import {Act_Reference} from "../../../_actions";
import ReactGrid from "./AutomationGrid";
import {dashboards} from "../../../_reducers/reducers/Secretariat";

class References extends Component {
    componentDidMount() {

        let data = {
            "page":1,"seen":0,"done":0,"date":0,"calendar":"","worker":2
        }
        this.props.FetchData(data);
    }


    render() {
        let {GridColumns, GridRows} = this.props;
        if (GridColumns === undefined)
            GridColumns = [{headerName: "peygir_id", field: "peygir_id", checkboxSelection: true}];
        if (GridRows === undefined)
            GridRows = [{peygir_id: "1000"}];

        return (
            <div>
                <div>
                    <ReactGrid columns={GridColumns} rows={GridRows}/>
                </div>
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => ({
    FetchData: () => {
        let data = {
            "page":1,"seen":0,"done":0,"date":0,"calendar":"","worker":2
        }
        dispatch(Act_Reference.FetchData(data))
    }
});

const mapStateToProps = state => ({
    GridColumns: state.dashboards.columns,
    GridRows: state.dashboards.rows
});


const connectedReferences = connect(mapStateToProps, mapDispatchToProps)(References);
export { connectedReferences as References };



