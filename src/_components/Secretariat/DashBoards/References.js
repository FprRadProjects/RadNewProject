import React, {Component} from 'react';
//import GridsService from "../../../_services/Grids/GridsService";
import {connect} from "react-redux"
import {Act_Reference} from "../../../_actions";
import {GridComponent} from "../../Config/GridComponent";
var FetchData;

class References extends Component {

    render() {

        const{FetchData}= this.props;
        const  columns= [
            {name: 'peygir_id', title: 'شاخص کار'},
            {name: 'worker', title: 'کاربر'},
            {name: 'done', title: 'انجام شده'},
            {name: 'wt_id', title: 'شاخض نوع کار'},
            {name: 'tarikhaction', title: 'تاریخ کار'},
            {name: 'id_tel', title: 'شاخص طرف حساب'},
        ];
        const  currencyColumns= ['peygir_id', 'id_tel'];
        const  hiddenColumnNames= ['peygir_id', 'id_tel'];
        const booleanColumns=['done'];
        const Params = {
            "page": 0,
            "pagesize": 10,
            "seen": 0,
            "done": 0,
            "date": 0,
            "calendar": "",
            "worker": 1,
            "orderby": "tarikhaction",
            "direction": "desc"
        };
        return (
            <div>
                <GridComponent columns={columns} booleanColumns={booleanColumns}
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



