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
} from '@devexpress/dx-react-grid-material-ui';

import '@material-ui/icons/ChevronLeft'
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

class ApiModalGridComponent extends React.PureComponent {

    ChangeStyle = (restProps) => {

    }

    TableRow = ({ row, ...restProps }) => (
        <Table.Row
            {...restProps}
            onClick={(e) => {
                //  this.props.GetRowInfo(row);
                this.props.SelectRow(row);

                this.ChangeStyle(restProps);
            }
            }
            style={{
                cursor: 'pointer',
            }}
        />
    );
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
            pageSize: 10,
            pageSizes: [5, 10, 15],
            currencyColumns: currencyColumns,
            booleanColumns: booleanColumns,
            currentPage: 0,
            hiddenColumnNames: hiddenColumnNames,
            columnWidths: [],
            booleanFilterOperations: ['boolean'],
            currencyFilterOperations: ['equals'],
            columnOrder: [],
            defaultColumnWidths: defaultColumnWidths
        };
        this.changeSorting = this.changeSorting.bind(this);
        this.changeCurrentPage = this.changeCurrentPage.bind(this);
        this.changePageSize = this.changePageSize.bind(this);
        this.changeGroup = this.changeGroup.bind(this);
        this.hiddenColumnNamesChange = (hiddenColumnNames) => {
            this.setState({ hiddenColumnNames });
        };
        this.changeFilters = this.changeFilters.bind(this);
        this.changeColumnOrder = this.changeColumnOrder.bind(this);

        this.changeColumnWidths = (columnWidths) => {
            this.setState({ columnWidths });
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.UrlParams !== this.props.UrlParams) {
            Params = nextProps.UrlParams;
        }
    }
    changeColumnOrder(newOrder) {
        this.setState({
            columnOrder: newOrder,
            totalCount: this.props.totalCount !== undefined ? this.props.totalCount : 0,
        });
    }

    componentDidMount() {
        this.loadData();
        // const classList = ReactDOM.findDOMNode(this).querySelector('.flex-column').classList;
        // classList.add('rtl');
        // classList.add('table-bordered');
        // classList.add('table-striped');
        // classList.add('table-condensed');
    }

    componentDidUpdate() {
        this.loadData();
    }

    changeSorting(sorting) {
        this.setState({
            sorting,
            totalCount: this.props.totalCount !== undefined ? this.props.totalCount : 0,
        });
    }

    changeFilters(filters) {
        var newFilters = Object.keys(filters).map((item, index) => {
            return {
                columnName: filters[item].columnName,
                value: filters[item].value.replace("ی", "ي"),
                operation: filters[item].operation
            };
        })
        this.setState({
            // loading: true,
            filters: newFilters,
            totalCount: this.props.totalCount !== undefined ? this.props.totalCount : 0,
        });
    }

    changeGroup(grouping) {
        this.setState({
            grouping,
            totalCount: this.props.totalCount !== undefined ? this.props.totalCount : 0,
        });
    }

    changeCurrentPage(currentPage) {
        this.setState({
            currentPage,
            totalCount: this.props.totalCount !== undefined ? this.props.totalCount : 0,

        });
    }


    changePageSize(pageSize) {
        this.setState({
            totalCount: this.props.totalCount !== undefined ? this.props.totalCount : 0,
        });
        const { currentPage: stateCurrentPage } = this.state;
        const totalCount = this.props.totalCount !== undefined ? this.props.totalCount : 0;
        const totalPages = Math.ceil(totalCount / pageSize);
        const currentPage = Math.min(stateCurrentPage, totalPages - 1);
        this.setState({
            pageSize,
            currentPage
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
            return;
        }
        const { fetchData } = this.props;
        Params.filter = this.state.filters;
        fetchData(Params);
        this.lastQuery = queryString;
    }

    render() {
        var rows = [];
        var totalCount = 0;
        var columns = [];
        const {
            currencyColumns,
            sorting,
            pageSize,
            pageSizes,
            currentPage,
            filters,
            tableColumnExtensions,
            hiddenColumnNames,
            defaultColumnWidths,
            booleanColumns,
            columnOrder,
            booleanFilterOperations,
            currencyFilterOperations
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
        //add navid
        const tableHeaderMessages = {
            sortingHint: this.context.t("SortingHint"),
        };
        const pagingPanelMessages = {
            rowsPerPage: this.context.t("RowsPerPage"),
            info: this.context.t("Count") + " {from} " + this.context.t("Of") + " {to} " + "({count} " + this.context.t("Items") + ")",
        };
        const columnChooserMessages = {
            showColumnChooser: this.context.t("ShowColumnChooser"),
        };


        return (
            <div>
                <Grid
                    rows={rows}
                    columns={columns}
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
                    <GroupingState defaultGrouping={[]}
                        columnGroupingEnabled={true}
                    />
                    <IntegratedGrouping />

                    <PagingState
                        currentPage={currentPage}
                        onCurrentPageChange={this.changeCurrentPage}
                        defaultCurrentPage={0}
                        pageSize={pageSize === 0 ? 10 : pageSize}
                        onPageSizeChange={this.changePageSize}
                    />
                    {pageSize === 0 && <IntegratedPaging />}
                    <FilteringState
                        filters={filters}
                        onFiltersChange={this.changeFilters}
                    />
                    <Table rowComponent={this.TableRow}
                        columnExtensions={tableColumnExtensions}
                        messages={tableMessages}
                    />
                    <TableColumnReordering
                        order={columnOrder}
                        onOrderChange={this.changeColumnOrder}
                    /> <TableColumnResizing
                        defaultColumnWidths={defaultColumnWidths}
                    />
                    <TableHeaderRow showSortingControls messages={tableHeaderMessages} />

                    <CustomPaging
                        totalCount={totalCount}
                    /> <PagingPanel
                        pageSizes={pageSizes}
                        messages={pagingPanelMessages}
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
                    <ColumnChooser  messages={columnChooserMessages}/>
                    <GroupingPanel showGroupingControls={true} showSortingControls LocalizationMessages
                        messages={groupingPanelMessages} />
                </Grid>
                {this.props.gridloading && <Loading />}
            </div>
        );
    }
}

ApiModalGridComponent.contextTypes = {
    t: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { lang } = state.i18nState
    const { gridloading } = state.loading;

    return {

        gridloading,
        lang,
    }
}



const mapDispatchToProps = dispatch => ({
    /* GetRowsData: (data) => {
         dispatch(BasicInfo_action.GetRowData(data))
     },
     GetRowData: (data) => {
         dispatch(BasicInfo_action.GetRowData(data))
     },*/
});
const connectedApiModalGridComponent = connect(mapStateToProps, mapDispatchToProps)(ApiModalGridComponent);
export { connectedApiModalGridComponent as ApiModalGridComponent };
