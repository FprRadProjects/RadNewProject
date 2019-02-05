import React, {Component} from 'react';
import {connect} from "react-redux"
import {Act_Reference, WorkAccess_action} from "../../../_actions";
import ReactGrid from "./AutomationGrid";

class Works extends Component {
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


//export default connect(mapStateToProps, mapDispatchToProps)(Works);


const connectedWorks = connect(mapStateToProps, mapDispatchToProps)(Works);
export { connectedWorks as Works };



