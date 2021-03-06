import * as React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from "prop-types"

import {
    PagingState,
    SortingState,
    CustomPaging,
    GroupingState,
    IntegratedGrouping,
    IntegratedPaging,
    FilteringState,
    DataTypeProvider, TreeDataState, CustomTreeData
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
    TableFilterRow, VirtualTable, TableTreeColumn
} from '@devexpress/dx-react-grid-bootstrap4';

import 'open-iconic/font/css/open-iconic-bootstrap.min.css'
import {Loading} from '../../../../theme-sources/bootstrap4/components/loading';
import {CurrencyTypeProvider} from '../../../../theme-sources/bootstrap4/components/currency-type-provider';
import connect from "react-redux/es/connect/connect";

var Params = {};
const   BooleanTypeProvider = props => (
    <DataTypeProvider
        formatterComponent={BooleanFormatter}
        editorComponent={BooleanEditor}
        {...props}
    />
);

const BooleanFormatter = ({value}) => (
    <input type="checkbox" checked={value ? true : false} disabled={"disabled"}/>

);

const BooleanEditor = ({value, onValueChange}) => (
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
const URL = 'https://js.devexpress.com/Demos/Mvc/api/treeListData';
const ROOT_ID = '';
const getRowId = row => row.id;
const getChildRows = (row, rootRows) => {
    const childRows = rootRows.filter(r => r.parentId === (row ? row.id : ROOT_ID));
    if (childRows.length) {
        return childRows;
    }
    return row && row.hasItems ? [] : null;
};

class TreeGridComponent extends React.PureComponent {

    ChangeStyle=(restProps)=>{

    }

    TableRow = ({row, ...restProps}) => (
        <Table.Row
            {...restProps}
            onClick={(e) => {
                this.props.GetRowInfo(row);

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
        const { booleanColumns, UrlParams, currencyColumns, hiddenColumnNames,columns,columnwidth} = this.props;
        Params = UrlParams;
        let defaultColumnWidths = [];
        Object.keys(columns).map((item, index) => {
            return defaultColumnWidths[index++] = { columnName: columns[item].name, width: columnwidth };
        })
        this.state = {
            repeatRows: [],
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
            defaultColumnWidths: defaultColumnWidths,
            expandedRowIds: []

        };
        this.changeSorting = this.changeSorting.bind(this);
        this.changeCurrentPage = this.changeCurrentPage.bind(this);
        this.changePageSize = this.changePageSize.bind(this);
        this.changeGroup = this.changeGroup.bind(this);
        this.hiddenColumnNamesChange = (hiddenColumnNames) => {
            this.setState({hiddenColumnNames});
        };
        this.changeFilters = this.changeFilters.bind(this);
        this.changeColumnOrder = this.changeColumnOrder.bind(this);
        this.changeExpandedRowIds = this.changeExpandedRowIds.bind(this);
        this.changeColumnWidths = (columnWidths) => {
            this.setState({columnWidths});
        };
    }
    changeColumnOrder(newOrder) {
        this.setState({ columnOrder: newOrder });
    }

    componentDidMount() {
        this.loadData();
        const classList = ReactDOM.findDOMNode(this).querySelector('.flex-column').classList;

    }

    componentDidUpdate() {
        this.loadData();
    }

    changeSorting(sorting) {
        this.setState({
            sorting,
        });
    }

    changeFilters(filters) {
        this.setState({
            filters,
            currentPage:0,
        });
    }

    changeGroup(grouping) {
        this.setState({
            grouping
        });
    }

    changeCurrentPage(currentPage) {
        this.setState({
            currentPage,
        });
    }


    changePageSize(pageSize) {
        const {totalCount, currentPage: stateCurrentPage} = this.state;
        const totalPages = Math.ceil(totalCount / pageSize);
        const currentPage = Math.min(stateCurrentPage, totalPages - 1);

        this.setState({
            pageSize,
            currentPage,
        });
    }

    queryString() {
        const {sorting, pageSize, currentPage, filters} = this.state;
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

        let filter = filters.reduce((acc, {columnName, value}) => {
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
        const {fetchData} = this.props;
        Params.filter = this.state.filters;
        fetchData(Params);
        this.lastQuery = queryString;
    }
    changeExpandedRowIds(expandedRowIds) {
        const {data,repeatRows} = this.state
        const parent = (typeof expandedRowIds[expandedRowIds.length - 1] === "undefined" ? "reload" : expandedRowIds[expandedRowIds.length - 1])

        const arr= repeatRows.concat(expandedRowIds)

        this.setState({
            expandedRowIds,
            repeatRows : arr
        });
        const {fetchData} = this.props


        const checkduplicate = repeatRows.map(value => value === parent ?   true :   false)
        const duplicate=  checkduplicate.filter((item,pos)=> checkduplicate.indexOf(item) == pos && item === true)

        if(!duplicate.toString()){

            if(parent==="reload")
                fetchData("" ,true)
            else
                fetchData(parent ,false,true)
        }

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
            tableColumnExtensions,
            hiddenColumnNames,
            defaultColumnWidths,
            booleanColumns,
            columnOrder,
            booleanFilterOperations,
            currencyFilterOperations,
            expandedRowIds,
            TableRow,
            columnWidths,
            loading

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
                    <Table rowComponent={this.TableRow}
                           columnExtensions={tableColumnExtensions}
                           messages={tableMessages}
                    />
                    <TreeDataState
                        expandedRowIds={expandedRowIds}
                        onExpandedRowIdsChange={this.changeExpandedRowIds}
                    />
                    <CustomTreeData
                        getChildRows={getChildRows}
                    />

                    <TableColumnReordering
                        order={columnOrder}
                        onOrderChange={this.changeColumnOrder}
                    /> <TableColumnResizing
                    defaultColumnWidths={defaultColumnWidths}
                />
                    <TableHeaderRow showSortingControls/>
                    <TableTreeColumn
                        for="peygir_id"
                    />

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
                    <TableFilterRow
                        messages={filterMessages}
                    />
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

TreeGridComponent.contextTypes = {
    t: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const {lang} = state.i18nState
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
const connectedTreeGridComponent = connect(mapStateToProps, mapDispatchToProps)(TreeGridComponent);
export {connectedTreeGridComponent as TreeGridComponent};
