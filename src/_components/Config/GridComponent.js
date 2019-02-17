import * as React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from "prop-types"

import 'bootstrap-v4-rtl/dist/css/bootstrap-rtl.min.css';
import {
    PagingState,
    SortingState,
    CustomPaging,
    GroupingState,
    IntegratedGrouping,
    IntegratedPaging,
    FilteringState,
    DataTypeProvider
} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    PagingPanel,
    TableGroupRow,
    GroupingPanel,
    DragDropProvider,
    Toolbar,
    ColumnChooser,
    TableColumnVisibility,
    TableColumnReordering,
    TableColumnResizing,
    TableFilterRow
} from '@devexpress/dx-react-grid-bootstrap4';


import {Loading} from '../../theme-sources/bootstrap4/components/loading';
import {CurrencyTypeProvider} from '../../theme-sources/bootstrap4/components/currency-type-provider';
import connect from "react-redux/es/connect/connect";
const groupingPanelMessages = {
    groupByColumn: 'عنوان ستون را برای گروه بندی بر اساس آن ستون بکشید',
};const tableMessages = {
    noData: 'اطلاعات موجود نیست',
};
var Params={};
const TableRow = ({row, ...restProps}) => (
    <Table.Row
        {...restProps}
        onClick={() => alert(JSON.stringify(row))}
        style={{
            cursor: 'pointer',

        }}
    />
);

const BooleanFormatter = ({ value }) => (
    <input type="checkbox" checked={value?true:false} disabled={"disabled"} />

);

const BooleanEditor = ({ value, onValueChange }) => (
    <select
        className="form-control"
        value={value}
        onChange={e => onValueChange(e.target.value)}
    >
        <option value={null}>
            همه
        </option>
        <option value={null}>
            خالی
        </option>
        <option value={0}>
            انتخاب نشده
        </option>
        <option value={1}>
            انتخاب شده
        </option>
    </select>
);

const BooleanTypeProvider = props => (
    <DataTypeProvider
        formatterComponent={BooleanFormatter}
        editorComponent={BooleanEditor}
        {...props}
    />
);
 class GridComponent extends React.PureComponent {
    constructor(props) {
        super(props);
        const {columns,booleanColumns,UrlParams,currencyColumns,hiddenColumnNames}=this.props;
        Params=UrlParams;
        this.state = {
            rows:[],
            totalCount: 0,
            columns: columns,
            tableColumnExtensions: [],
            filters: [],
            sorting: [],
            grouping: [],
            pageSize: 10,
            pageSizes: [5, 10, 15],
            currencyColumns: currencyColumns,
            booleanColumns:booleanColumns,
            currentPage: 0,
            loading: true,
            hiddenColumnNames: hiddenColumnNames,
            columnWidths: [],
            booleanFilterOperations: ['boolean'],
            currencyFilterOperations: ['equals'],

        };
        this.changeSorting = this.changeSorting.bind(this);
        this.changeCurrentPage = this.changeCurrentPage.bind(this);
        this.changePageSize = this.changePageSize.bind(this);
        this.changeGroup = this.changeGroup.bind(this);
        this.hiddenColumnNamesChange = (hiddenColumnNames) => {
            this.setState({hiddenColumnNames});
        };
        this.changeFilters = this.changeFilters.bind(this);

        this.changeColumnWidths = (columnWidths) => {
            this.setState({columnWidths});
        };
    }

    componentDidMount() {
        this.loadData();
        const classList = ReactDOM.findDOMNode(this).querySelector('.flex-column').classList;
        classList.add('rtl');
        classList.add('table-bordered');
        classList.add('table-striped');
        classList.add('table-condensed');
    }

    componentDidUpdate() {
        this.loadData();
    }

    changeSorting(sorting) {
        this.setState({
            loading: true,
            sorting,
        });
    }
    changeFilters(filters) {
        this.setState({
            loading: true,
            filters,
        });
    }
    changeGroup(grouping) {
        this.setState({
            loading: true,
            grouping
        });
    }

    changeCurrentPage(currentPage) {
        this.setState({
            loading: true,
            currentPage,
        });
    }


    changePageSize(pageSize) {
        const {totalCount, currentPage: stateCurrentPage} = this.state;
        const totalPages = Math.ceil(totalCount / pageSize);
        const currentPage = Math.min(stateCurrentPage, totalPages - 1);

        this.setState({
            loading: true,
            pageSize,
            currentPage,
        });
    }

    queryString() {
        const {sorting, pageSize, currentPage,filters} = this.state;
        let queryString = `${URL}?take=${pageSize}&skip=${pageSize * currentPage}`;

        Params.page=(currentPage + 1);
        Params.pagesize=(pageSize);

        const columnSorting = sorting[0];

        if (columnSorting) {
            const sortingDirectionString = columnSorting.direction === 'desc' ? ' desc' : 'asc';
            Params.page=(currentPage + 1);
            Params.pagesize=(pageSize);
            Params.orderby=(columnSorting.columnName);
            Params.direction=(sortingDirectionString);
            queryString = `${queryString}orderby=${columnSorting.columnName}${sortingDirectionString}`;
        }

        let filter = filters.reduce((acc, { columnName, value }) => {
            acc.push(`["${columnName}", "contains", "${encodeURIComponent(value)}"]`);
            return acc;
        }, []).join(',"and",');
        if (filters.length > 0) {
            filter = `[${filter}]`;
            queryString = `${queryString}&filter=${filter}`;
        }
        return queryString;
    }

    loadData() {
        const queryString = this.queryString();
        if (queryString === this.lastQuery) {
            this.setState({loading: false});
            console.log(queryString === this.lastQuery)
            return;
        }
        const {fetchData}=this.props;
        Params.filter=this.state.filters;
        console.log(Params)
        fetchData(Params);
        this.lastQuery = queryString;
    }

    render() {
        var rows=[];
        var totalCount=0;
        const {
            columns,
            currencyColumns,
            sorting,
            pageSize,
            pageSizes,
            currentPage,
            loading,
            tableColumnExtensions,
            hiddenColumnNames,
            columnWidths,
            booleanColumns,
            booleanFilterOperations,
            currencyFilterOperations
        } = this.state;
        if(this.props.rows!==undefined)
            rows=this.props.rows;
        if(this.props.totalCount!==undefined)
            totalCount=this.props.totalCount;
        return (
            <div className="card" style={{position: 'relative'}}>
                <Grid
                    rows={rows}
                    columns={columns}
                >
                    <DragDropProvider/>
                    <CurrencyTypeProvider
                        for={currencyColumns}
                        availableFilterOperations={currencyFilterOperations}
                    />
                    <BooleanTypeProvider
                        for={booleanColumns}
                        availableFilterOperations={booleanFilterOperations}
                    />
                    <SortingState
                        sorting={sorting}
                        onSortingChange={this.changeSorting}
                    />
                    <GroupingState defaultGrouping={[]}
                                   columnGroupingEnabled={true}
                    />
                    <IntegratedGrouping/>
                    <PagingState
                        currentPage={currentPage}
                        onCurrentPageChange={this.changeCurrentPage}
                        defaultCurrentPage={0}
                        pageSize={pageSize === 0 ? 10 : pageSize}
                        onPageSizeChange={this.changePageSize}
                    />
                    {pageSize === 0 && <IntegratedPaging/>}
                    <FilteringState
                        onFiltersChange={this.changeFilters}
                    />
                    <Table rowComponent={TableRow}
                           columnExtensions={tableColumnExtensions}
                           messages={tableMessages}
                    />
                    <TableColumnReordering
                        defaultOrder={["peygir_id","done", 'worker', 'wt_id', 'tarikhaction', 'id_tel']}
                    /> <TableColumnResizing
                    columnWidths={columnWidths}
                    onColumnWidthsChange={this.changeColumnWidths}
                />
                    <TableHeaderRow showSortingControls/>

                    <CustomPaging
                        totalCount={totalCount}
                    /> <PagingPanel
                    pageSizes={pageSizes}
                />
                    <TableGroupRow/>
                    <TableColumnVisibility
                        hiddenColumnNames={hiddenColumnNames}
                        onHiddenColumnNamesChange={this.hiddenColumnNamesChange}
                    />
                    <TableFilterRow />
                    <Toolbar/>
                    <ColumnChooser/>
                    <GroupingPanel showGroupingControls={true} showSortingControls LocalizationMessages
                                   messages={groupingPanelMessages}/>
                </Grid>
                {loading && <Loading/>}
            </div>
        );
    }
}
GridComponent.contextTypes = {
    t: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    rows: state.dashboards.rows,
    totalCount: state.dashboards.totalCount,
    lang: state.i18nState.lang
});


const connectedGrid = connect(mapStateToProps, null)(GridComponent);
export { connectedGrid as GridComponent };