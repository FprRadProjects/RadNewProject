import React, {Component} from 'react';
//import GridsService from "../../../_services/Grids/GridsService";
import {connect} from "react-redux"
import {Act_Reference} from "../../../_actions";
import ReactGrid from "./AutomationGrid";

class Works extends Component {
    componentDidMount() {

        let data = new FormData();
        data.append("page", '1');
        data.append("seen", '0');
        data.append("done", '0');
        data.append("date", '0');
        data.append("calendar", '');
        data.append("worker", '0');


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
        let data = new FormData();
        data.append("page", '1');
        data.append("seen", '0');
        data.append("done", '0');
        data.append("date", '0');
        data.append("calendar", '');
        data.append("worker", '0');

        dispatch(Act_Reference.FetchData(data))
    }
});

const mapStateToProps = state => ({
    GridColumns: state.dashboards.columns,
    GridRows: state.dashboards.rows
});


//export default connect(mapStateToProps, mapDispatchToProps)(Works);


const connectedWorks = connect(mapStateToProps, mapDispatchToProps)(Works);
export { connectedWorks as Works };



