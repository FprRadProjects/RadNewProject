import * as React from 'react';
import PropTypes from "prop-types"

import 'bootstrap-v4-rtl/dist/css/bootstrap-rtl.min.css';
import {
    CustomPaging,
    CustomTreeData,
    DataTypeProvider,
    FilteringState,
    GroupingState,
    IntegratedGrouping,
    IntegratedPaging,
    PagingState,
    SortingState,
    TreeDataState
} from '@devexpress/dx-react-grid';
import {
    ColumnChooser,
    DragDropProvider,
    Grid,
    GroupingPanel,
    PagingPanel,
    TableColumnReordering,
    TableColumnResizing,
    TableColumnVisibility,
    TableFilterRow,
    TableGroupRow,
    TableHeaderRow,
    TableTreeColumn,
    Toolbar,
    VirtualTable
} from '@devexpress/dx-react-grid-bootstrap4';


import {Loading} from '../../theme-sources/bootstrap4/components/loading';
import {CurrencyTypeProvider} from '../../theme-sources/bootstrap4/components/currency-type-provider';
import connect from "react-redux/es/connect/connect";

const groupingPanelMessages = {
    groupByColumn: 'عنوان ستون را برای گروه بندی بر اساس آن ستون بکشید',
};
const tableMessages = {
    noData: 'اطلاعات موجود نیست',
};
var Params = {};
const TableRow = ({row, ...restProps}) => (
    <VirtualTable.Row
        {...restProps}
        onClick={(e) => {
            alert(JSON.stringify(row))
        }
        }
        style={{
            cursor: 'pointer',

        }}
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

const BooleanTypeProvider = props => (
    <DataTypeProvider
        formatterComponent={BooleanFormatter}
        editorComponent={BooleanEditor}
        {...props}
    />
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
    constructor(props) {
        super(props);
        const {columns, booleanColumns, UrlParams, currencyColumns, hiddenColumnNames} = this.props;
        Params = UrlParams;

        this.state = {
            repeatRows: [],
            params: [],
            data: [],
            totalCount: 0,
            columns: [
                {name: 'name', title: 'Name'},
                {
                    name: 'size',
                    title: 'Size',
                    getCellValue: row => (row.size ? `${Math.ceil(row.size / 1024)} KB` : '')
                },
                {
                    name: 'createdDate',
                    title: 'Created Date',
                    getCellValue: row => new Date(Date.parse(row.createdDate)).toLocaleString()
                },
                {
                    name: 'modifiedDate',
                    title: 'Modified Date',
                    getCellValue: row => new Date(Date.parse(row.modifiedDate)).toLocaleString()
                },
            ],
            tableColumnExtensions: [],
            filters: [],
            sorting: [],
            grouping: [],
            pageSize: 10,
            pageSizes: [5, 10, 15],
            currencyColumns: currencyColumns,
            booleanColumns: booleanColumns,
            currentPage: 0,
            loading: false,
            hiddenColumnNames: hiddenColumnNames,
            columnWidths: [],
            booleanFilterOperations: ['boolean'],
            currencyFilterOperations: ['equals'],
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

        this.changeColumnWidths = (columnWidths) => {
            this.setState({columnWidths});
        };

        this.changeExpandedRowIds = this.changeExpandedRowIds.bind(this);
    }

    componentDidMount() {
        this.loadData();


    }

    componentDidUpdate() {

        const queryString = this.queryString();
        if (queryString === this.lastQuery) {
            this.setState({loading: false});
            return;
        }
        const {fetchData} = this.props;
        Params.filter = this.state.filters;
        this.ShowGridTree("",1)
        // this.lastQuery = queryString;

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


    ShowGridTree(value, reload,tree) {

        const {fetchData} = this.props
        const {data, expandedRowIds} = this.state


        const rowIdsWithNotLoadedChilds = [ROOT_ID, ...expandedRowIds]
            .filter(rowId => data.findIndex(row => row.parentId === rowId) === -1);

        if (rowIdsWithNotLoadedChilds.length) {
            fetchData(value, reload,tree)
        }
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
                fetchData("" ,1,)
            else
                fetchData(parent ,false,true)
        }

    }

    loadData() {
        this.ShowGridTree("")
    }


    render() {
        const {
            data,
            expandedRowIds,
            columns,
            totalCount,
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


        if (this.props.rows !== undefined) {
            this.state.data = this.props.rows;
        }
        return (
            <div className="card" style={{position: 'relative'}}>
                <Grid
                    rows={data}
                    columns={columns}
                    getRowId={getRowId}
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

                    <TreeDataState
                        expandedRowIds={expandedRowIds}
                        onExpandedRowIdsChange={this.changeExpandedRowIds}
                    />
                    <CustomTreeData
                        getChildRows={getChildRows}
                    />

                    <VirtualTable
                        columnExtensions={tableColumnExtensions}
                        rowComponent={TableRow}
                        messages={tableMessages}
                    />


                    <CustomPaging
                        totalCount={totalCount}
                    />
                    <TableColumnResizing
                        columnWidths={columnWidths}
                        onColumnWidthsChange={this.changeColumnWidths}
                    />
                    <TableHeaderRow showSortingControls/>
                    <TableTreeColumn
                        for="name"
                    />


                    <TableColumnReordering
                        defaultOrder={["peygir_id", "done", 'worker', 'wt_id', 'tarikhaction', 'id_tel']}
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
const connectedGridComponent = connect(mapStateToProps, mapDispatchToProps)(TreeGridComponent);
export {connectedGridComponent as TreeGridComponent};
