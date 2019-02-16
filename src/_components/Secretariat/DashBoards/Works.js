import React, {Component} from 'react';
import {connect} from "react-redux"
import {Act_Reference} from "../../../_actions";
import {GridComponent} from "../../Config/GridComponent";

class Works extends Component {
    render() {

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
        const Params = {
            "page": 0,
            "pagesize": 10,
            "seen": 0,
            "done": 1,
            "date": 1,
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


const connectedWorks = connect(null, mapDispatchToProps)(Works);
export { connectedWorks as Works };



