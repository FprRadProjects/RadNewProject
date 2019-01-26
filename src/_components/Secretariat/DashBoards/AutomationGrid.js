import React, {Component} from 'react';
import {AgGridReact} from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';


class ReactGrid extends Component {
    render() {
        const {columns, rows} = this.props;


        return (
            <div>
                <div className="ag-theme-balham"
                     style={{
                         height: '350px',
                         width: '100%',
                         marginTop: 20
                     }}>

                    <AgGridReact
                        pagination={true}
                        rowSelection="multiple"
                        enableSorting={true}
                        enableFilter={true}
                        columnDefs={columns}
                        rowData={rows}
                    >
                    </AgGridReact>

                </div>
            </div>
        );
    }
}

export default ReactGrid;
