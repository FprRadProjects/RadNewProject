import React, {Component} from 'react';
//import GridsService from "../../../_services/Grids/GridsService";
import {connect} from "react-redux"
import {Act_Reference, userActions} from "../../../_actions";
import {GridComponent} from "../../Config/GridComponent";
import CalendarComponent from "../../Config/CalendarComponent";
var Params = {
    "page": 0,
    "pagesize": 10,
    "seen": 0,
    "done": 2,
    "date": 0,
    "calendar": "",
    "worker": 1,
    "orderby": "tarikhaction",
    "direction": "desc",
    "filter":[]

};
class References extends Component {
    CalendarChange(event){
        event= event.replace(/-/g, '/');;
        Params.calendar = event;
        const{FetchData}= this.props;
        FetchData(Params);
    }
    render() {
        Params = {
            "page": 0,
            "pagesize": 10,
            "seen": 0,
            "done": 2,
            "date": 0,
            "calendar": "",
            "worker": 1,
            "orderby": "tarikhaction",
            "direction": "desc",
            "filter":[]

        };
        const{FetchData}= this.props;
        const  columns= [
            {name: 'peygir_id', title: 'شاخص کار'},
            {name: 'worker', title: 'کاربر'},
            {name: 'done', title: 'انجام شده'},
            {name: 'wt_id', title: 'شاخص نوع کار'},
            {name: 'tarikhaction', title: 'تاریخ کار'},
            {name: 'id_tel', title: 'شاخص طرف حساب'},
        ];
        const  currencyColumns= ['peygir_id', 'id_tel'];
        const  hiddenColumnNames= ['peygir_id', 'id_tel'];
        const booleanColumns=['done'];

        return (
            <div>

                <CalendarComponent CalendarChange={this.CalendarChange.bind(this)}/>
                <GridComponent  columns={columns} booleanColumns={booleanColumns}
                      UrlParams={Params} fetchData={FetchData.bind(this)}
                      currencyColumns={currencyColumns} hiddenColumnNames={hiddenColumnNames}
                />
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => ({
    FetchData: (Params) => {
        dispatch(Act_Reference.FetchData(Params))
    }
});



const connectedReferences = connect(null, mapDispatchToProps)(References);
export { connectedReferences as References };



