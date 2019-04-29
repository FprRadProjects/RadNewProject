import * as React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from "prop-types"

import 'bootstrap-v4-rtl/dist/css/bootstrap-rtl.min.css';
import {
    PagingState,
    SortingState,
    IntegratedFiltering,
    GroupingState,
    IntegratedGrouping,
    IntegratedPaging,
    IntegratedSorting,
    FilteringState,
    DataTypeProvider,
    SelectionState,
    IntegratedSelection
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
    TableFilterRow,
    TableSelection
} from '@devexpress/dx-react-grid-bootstrap4';
import 'open-iconic/font/css/open-iconic-bootstrap.min.css'


import { Loading } from '../../theme-sources/bootstrap4/components/loading';
import { CurrencyTypeProvider } from '../../theme-sources/bootstrap4/components/currency-type-provider';
import connect from "react-redux/es/connect/connect";

var Params = {};
const BooleanTypeProvider = props => (
    <DataTypeProvider
        formatterComponent={BooleanFormatter}
        editorComponent={BooleanEditor}
        {...props}
    />
);

const BooleanFormatter = ({ value }) => (
    <input type="checkbox" checked={value ? true : false} disabled={"disabled"} />

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

class MultiSelectGridComponent extends React.PureComponent {

    ChangeStyle = (restProps) => {

    }

    // TableRow = ({ row, ...restProps }) => (
    //     <Table.Row
    //         {...restProps}
    //         onClick={(e) => {
    //             this.ChangeStyle(restProps);
    //             console.log(row)
    //         }
    //         }
    //         style={{
    //             cursor: 'pointer',
    //         }}
    //     />
    // );
    constructor(props) {
        super(props);
        const { booleanColumns, UrlParams, currencyColumns, hiddenColumnNames, columns, columnwidth } = this.props;
        Params = UrlParams;
        let defaultColumnWidths = [];
        Object.keys(columns).map((item, index) => {
            return defaultColumnWidths[index++] = { columnName: columns[item].name, width: columnwidth };
        })
        this.state = {
            rows: [],
            totalCount: 0,
            tableColumnExtensions: [],
            filters: [],
            sorting: [],
            grouping: [],
            pageSize: Params.pageSize,
            pageSizes: [5, 10, 15],
            currencyColumns: currencyColumns,
            booleanColumns: booleanColumns,
            currentPage: 0,
            loading: false,
            hiddenColumnNames: hiddenColumnNames,
            columnWidths: [],
            booleanFilterOperations: ['boolean'],
            currencyFilterOperations: ['equals'],
            columnOrder: [],
            defaultColumnWidths: defaultColumnWidths,
            selection: [],
            selectedRowsData:[]
        };
        this.loadData();
        this.changeSorting = this.changeSorting.bind(this);
        this.changeCurrentPage = this.changeCurrentPage.bind(this);
        this.changePageSize = this.changePageSize.bind(this);
        this.changeGroup = this.changeGroup.bind(this);
        this.changeFilters = this.changeFilters.bind(this);
        this.hiddenColumnNamesChange = (hiddenColumnNames) => {
            this.setState({ hiddenColumnNames });
        };
        this.changeSelection = this.changeSelection.bind(this);
        this.changeColumnOrder = this.changeColumnOrder.bind(this);


    }
    getRowId (row){ 
    return    row[this.props.rowId];
    }

    changeSelection (selection){
        console.log(selection)
        let selectedRowsData=this.props.rows.filter(
            row =>
                selection.findIndex(selectId => selectId === this.getRowId(row)) !== -1
        );
        this.setState({
            selection
        });
        this.props.GetRowInfo(selectedRowsData);
    }
 
    changeColumnOrder(newOrder) {
        this.setState({ columnOrder: newOrder });
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
        //  this.loadData();
    }

    changeSorting(sorting) {
        this.setState({
            // loading: true,
            sorting,
        });
    }

    changeFilters(filters) {
        var newFilters = Object.keys(filters).map((item, index) => {
            return { columnName: filters[item].columnName, operation:  filters[item].operation,
                value:  filters[item].value.replace(/\ی/g, "ي") };
        })
        this.setState({
            // loading: true,
            filters:newFilters,
        });
    }
    changeColumnWidths(columnWidths) {
        this.setState({
            // loading: true,
            columnWidths,
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
        const { totalCount, currentPage: stateCurrentPage } = this.state;
        const totalPages = Math.ceil(totalCount / pageSize);
        const currentPage = Math.min(stateCurrentPage, totalPages - 1);

        this.setState({
            loading: true,
            pageSize,
            currentPage,
        });
    }

    queryString() {
        const { sorting, pageSize, currentPage, filters } = this.state;
        let queryString = `${URL}?take=${pageSize}&skip=${pageSize * currentPage}`;
        Params.page = (currentPage + 1);
        Params.pagesize = (pageSize);

        const columnSorting = sorting[0];

        if (columnSorting) {
            const sortingDirectionString = columnSorting.direction === 'desc' ? ' desc' : 'asc';
            Params.page = (currentPage + 1);
            Params.pagesize = (pageSize);
            Params.orderby = (columnSorting.columnName);
            Params.direction = (sortingDirectionString);
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
            this.setState({ loading: false });
            return;
        }
        const { fetchData } = this.props;
        if (fetchData !== undefined) {
            Params.filter = this.state.filters;
            fetchData(Params);
            this.lastQuery = queryString;
        }
    }

    render() {
        var rows = [];
        var totalCount = 0;
        var columns = [];
        const {
            currencyColumns,
            sorting,
            pageSizes,
            filters,
            loading,
            pageSize,
            hiddenColumnNames,
            defaultColumnWidths,
            booleanColumns,
            columnOrder,
            booleanFilterOperations,
            currencyFilterOperations,
            selection
        } = this.state;
        if (this.props.rows !== undefined)
            rows = this.props.rows;
        if (this.props.totalCount !== undefined)
            totalCount = this.props.totalCount;

        if (this.props.columns !== undefined)
            columns = this.props.columns;

        const groupingPanelMessages = {
            groupByColumn: this.context.t("grouping"),
        };
        const tableMessages = {
            noData: this.context.t("NoData"),
        };
        const filterMessages = {
            filterPlaceholder: this.context.t("GrigFilter"),
        };
        return (
            <div>
                <Grid
                    rows={rows}
                    columns={columns}
                    getRowId={this.getRowId.bind(this)}
                >
                    <DragDropProvider />
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
                    <IntegratedSorting />
                    <GroupingState defaultGrouping={[]}
                        columnGroupingEnabled={true}
                    />
                    <IntegratedGrouping />

                    <FilteringState
                        filters={filters}
                        onFiltersChange={this.changeFilters}
                    />
                    <IntegratedFiltering />
                    <PagingState
                        defaultCurrentPage={0}
                        defaultPageSize={pageSize}
                    />
                    <SelectionState
                        selection={selection}
                        onSelectionChange={this.changeSelection}
                    />
                    <IntegratedPaging />
                    <IntegratedSelection  />
                    <Table />
                    <TableColumnReordering
                        order={columnOrder}
                        onOrderChange={this.changeColumnOrder}
                    />
                    <TableColumnResizing
                        defaultColumnWidths={defaultColumnWidths}
                    />

                    <TableHeaderRow showSortingControls />
                    <TableSelection showSelectAll={true}  selectByRowClick={true} />

                    <PagingPanel
                        pageSizes={pageSizes}
                    />
                    <TableGroupRow />
                    <TableColumnVisibility
                        hiddenColumnNames={hiddenColumnNames}
                        onHiddenColumnNamesChange={this.hiddenColumnNamesChange}
                    />
                    <TableFilterRow
                        messages={filterMessages}
                    />
                    <Toolbar />
                    <ColumnChooser />
                    <GroupingPanel showGroupingControls={true} showSortingControls LocalizationMessages
                        messages={groupingPanelMessages} />
                </Grid>
                {loading && <Loading />}
            </div>
        );
    }
}

MultiSelectGridComponent.contextTypes = {
    t: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    lang: state.i18nState.lang
});


const mapDispatchToProps = dispatch => ({
    /* GetRowsData: (data) => {
         dispatch(BasicInfo_action.GetRowData(data))
     },
     GetRowData: (data) => {
         dispatch(BasicInfo_action.GetRowData(data))
     },*/
});
const connectedMultiSelectGridComponent = connect(mapStateToProps, mapDispatchToProps)(MultiSelectGridComponent);
export { connectedMultiSelectGridComponent as MultiSelectGridComponent };
