import React, { useState, useEffect, useContext } from 'react'
import PropTypes, { func } from "prop-types"
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import {
    PagingState,
    SortingState,
    CustomPaging,
    GroupingState,
    IntegratedGrouping,
    IntegratedPaging,
    FilteringState,
    DataTypeProvider,
    IntegratedFiltering,
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
    TableSelection,
    TableColumnResizing,
    TableFilterRow,
} from '@devexpress/dx-react-grid-material-ui';

import { Loading } from '../../../../theme-sources/bootstrap4/components/loading';
import { CurrencyTypeProvider } from '../../../../theme-sources/bootstrap4/components/currency-type-provider';
import connect from "react-redux/es/connect/connect";
import { HighlightedCell } from '../../../../theme-sources/material-ui/components/highlighted-cell';

const theme = createMuiTheme({
    overrides: {
        RootBase: {
            root: {
                direction: "rtl !important",
                fontFamily: 'IRANSans_Fa!important',
                fontSize: "12px!important",
            }
        },
        MuiTableCell: {
            root: {
                textAlign: "right!important",
                direction: "rtl!important",
                fontFamily: 'IRANSans_Fa!important',
                fontSize: "12px!important",
                borderBottom: '1px solid #dee2e6',
            },
            body: {
                fontFamily: 'IRANSans_Fa!important',
                fontSize: "12px!important",
            },
            head: {
                borderBottom: '2px solid #dee2e6',
            }
        },
        MuiTableRow: {
            root: {
                height: "30px!important",
                cursor: "pointer !important"
            },
            selected: {
                backgroundColor: "rgba(202, 192, 192, 0.88) !important",
            },
        },
        TableInvisibleRow: {
            row: {
                height: "0px!important",
            }
        },
        TableHeaderCell: {
            cellDimmed: {
                fontFamily: 'IRANSans_Fa!important',
            }
        },
        MuiInput: {
            input: {
                fontFamily: 'IRANSans_Fa!important',
                border: "1px solid rgba(224, 224, 224, 1)!important",
                borderRadius: "4px!important",
                fontSize: "12px!important",
            },
            root: {
                "&:hover:before": {
                    display: "none!important",
                    border: "0px!important",
                },
                "&:hover:after": {
                    display: "none!important",
                    border: "0px!important",
                },
                "&:before": {
                    display: "none!important",
                    border: "0px!important",
                },
                "&:after": {
                    display: "none!important",
                    border: "0px!important",
                }
            }
        },
        SortLabel: {
            root: {
                fontFamily: 'IRANSans_Fa!important',
            },
        },
        MuiTableSortLabel: {
            root: {
                fontFamily: 'IRANSans_Fa!important',
            },
        },
        TableFilterCell: {
            cell: {
                fontFamily: 'IRANSans_Fa!important',
                fontSize: "12px!important",
            }
        },
        MuiListItem: {
            button: {
                fontFamily: 'IRANSans_Fa!important',
                textAlign: "right!important",
                direction: "rtl!important",
            },
            dense: {
                padding: "0px!important",
            },
        },
        MuiTypography: {
            subheading: {
                fontFamily: 'IRANSans_Fa!important',
            },
        },


        MuiSelect: {
            select: {
                paddingLeft: "1rem!important",
            },
        },
        Pagination: {
            button: {
                minHeight: "30px!important",
                padding: "6px 12px!important",
                "&& span": {
                }
            },
            rowsLabel: {
                fontFamily: 'IRANSans_Fa!important',
                paddingLeft: "10px!important",
                paddingRight: "10px!important",
            },
            activeButton: {
                backgroundColor: "rgba(0, 0, 0, .08)!important",
            },
            next: {
                "&& path": {
                    transform: "rotateY(180deg) translateX(-25px) !important",
                },
                fontSize: '30px!important',
            },
            prev: {
                "&& path": {
                    transform: "rotateY(180deg) translateX(-25px) !important",
                },
                fontSize: '30px!important',
            },
        },
        MuiIconButton: {
            root: {
                height: "30px!important",
                width: "30px!important",
            },
        },
        GroupPanelEmptyMessage: {
            groupInfo: {
                fontFamily: 'IRANSans_Fa!important',
                fontSize: '13px!important',
            },
        },
        Toolbar: {
            toolbar: {
                paddingLeft: "10px!important",
                paddingRight: "10px!important",
            },
        },

        IconBase: {
            groupButton: {
                "&& path": {
                    transform: "rotateY(180deg) translateX(-25px) !important",
                },
                marginRight: "0!important",
                marginLeft: "8px!important",
            },
        },


        MuiButton: {
            label: {
                fontFamily: 'IRANSans_Fa!important',
            },
        },
        Pager: {
            pager: {
                justifyContent: "space-between!important",
            },
        },
        MuiMenuItem: {
            root: {
                fontSize: "13px!important",
            },
        },
        MuiCheckbox: {
            colorSecondary: {
                color: "#3383ef!important",
            },
        },
        MuiTooltip: {
            popper: {
                fontFamily: 'IRANSans_Fa!important',
            },
        },
        MuiChip: {
            deleteIcon: {
                margin: "0 -8px 0 4px!important",
            },
        },
        ResizingControl: {
            resizeHandle: {
                left: "0!important",
                right: "auto!important",
            },
        },
        PageSizeSelector: {
            selectIcon: {
                fontFamily: 'IRANSans_Fa!important',
                top: "6px!important",
                left: "0!important",
                right: "auto!important",
            },
            label: {
                fontFamily: 'IRANSans_Fa!important',
                paddingLeft: "10px!important",
                paddingRight: "0px!important",
            },
            pageSizeSelector: {
                fontFamily: 'IRANSans_Fa!important',
                paddingRight: "0px!important",
            },
        },
    }
});

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

const ApiGridComponentWithHook = (props, context) => {
    const getRowId = row => row[props.rowId];

    const [rows, setRows] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [params, setParams] = useState({});
    const [columns, setColumns] = useState([{ name: 'peygir_id', title: context.t("WorkID") }]);

    const currencyColumns = useState(props.currencyColumns);
    const booleanColumns = useState(props.booleanColumns);
    const booleanFilterOperations = useState(['boolean']);
    const currencyFilterOperations = useState(['equals']);
    const [sorting, setSorting] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [pageSizes] = useState([5, 10, 15]);
    const [selection, setSelection] = useState([]);
    const [filters, setFilters] = useState([]);
    const tableColumnExtensions = useState([]);
    const [hiddenColumnNames, setHiddenColumnNames] = useState(props.hiddenColumnNames);

    const tableMessages = { noData: context.t("NoData") };
    const filterMessages = { filterPlaceholder: context.t("GrigFilter") };
    const tableHeaderMessages = { sortingHint: context.t("SortingHint") };
    const pagingPanelMessages = { rowsPerPage: context.t("RowsPerPage"), info: context.t("Count") + " {from} " + context.t("Of") + " {to} " + "({count} " + context.t("Items") + ")" };
    const columnChooserMessages = { showColumnChooser: context.t("ShowColumnChooser") };
    const groupingPanelMessages = { groupByColumn: context.t("grouping") };

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (props.rows !== []) {
            setParams(props.UrlParams);
            setRows(props.rows);
            setTotalCount(props.totalCount);
            setColumns(props.columns);
        }
        return () => {
        }
    }, [props]);

    const defaultColumnWidths = [];
    Object.keys(props.columns).map((item, index) => {
        return defaultColumnWidths[index++] = { columnName: props.columns[item].name, width: props.columnwidth };
    })
    const columnOrder = [];
    Object.keys(props.columns).map((item, index) => {
        return columnOrder[index++] = props.columns[item].name;
    })

    const [order, setOrders] = useState(columnOrder);


    function changePageSize(pageSize) {
        setTotalCount(totalCount !== undefined ? totalCount : 0);
        const totalPages = Math.ceil(totalCount / pageSize);
        const newCurrentPage = Math.min(currentPage, totalPages - 1);
        setPageSize(pageSize);
        setCurrentPage(newCurrentPage);
        params.pageSize = (pageSize);
        props.FetchData(params);
    }

    function changeSorting(sorting) {
        setSorting(sorting);
        setTotalCount(totalCount !== undefined ? totalCount : 0);
        const columnSorting = sorting[0];
        if (columnSorting) {
            const sortingDirectionString = columnSorting.direction === 'desc' ? ' desc' : 'asc';
            params.orderby = (columnSorting.columnName);
            params.direction = (sortingDirectionString);
        }
        props.FetchData(params);
    }

    function changeCurrentPage(currentPage) {
        setCurrentPage(currentPage);
        setTotalCount(totalCount !== undefined ? totalCount : 0);
        params.pageIndex = (currentPage + 1);
        props.FetchData(params);
    }

    function changeSelection(selection) {
        let selectedRowsData = props.rows.filter(
            row =>
                [selection[selection.length - 1]].findIndex(selectId => selectId === getRowId(row)) !== -1
        );
        setSelection([selection[selection.length - 1]]);
        props.SelectRow(selectedRowsData[selectedRowsData.length - 1]);
    }

    function changeFilters(filters) {
        var newFilters = Object.keys(filters).map((item, index) => {
            return {
                columnName: filters[item].columnName,
                value: filters[item].value.replace("ی", "ي"),
                operation: filters[item].operation
            };
        });
        setCurrentPage(0);
        setFilters(newFilters);
        params.pageIndex = 1;
        params.filter = newFilters;
        setTotalCount(totalCount !== undefined ? totalCount : 0);
        props.FetchData(params);
    }

    function changeOrder(orders) {
        setOrders(orders);
        setTotalCount(totalCount !== undefined ? totalCount : 0);
    }

    return (
        <MuiThemeProvider theme={theme} >
            <Grid
                rows={rows}
                columns={columns}
                getRowId={getRowId}
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
                    // onSortingChange={setSorting}
                    onSortingChange={changeSorting}
                />
                <GroupingState defaultGrouping={[]}
                    columnGroupingEnabled={true}
                />
                <IntegratedGrouping />

                <PagingState
                    currentPage={currentPage}
                    // onCurrentPageChange={setCurrentPage}
                    onCurrentPageChange={changeCurrentPage}
                    defaultCurrentPage={0}
                    pageSize={pageSize === 0 ? 10 : pageSize}
                    // onPageSizeChange={setPageSize}
                    onPageSizeChange={changePageSize}
                />
                <SelectionState
                    selection={selection}
                    // onSelectionChange={setSelection}
                    onSelectionChange={changeSelection}
                />
                <CustomPaging
                    totalCount={totalCount}

                />
                {pageSize === 0 && <IntegratedPaging />}
                <FilteringState
                    filters={filters}
                    // onFiltersChange={setFilters}
                    onFiltersChange={changeFilters}

                />
                <IntegratedSelection />
                <IntegratedFiltering />
                <Table
                    columnExtensions={tableColumnExtensions}
                    messages={tableMessages}
                // noDataCellComponent={CustomNoDataCellComponent}
                // cellComponent={TableCell}
                />
                <TableColumnResizing
                    defaultColumnWidths={defaultColumnWidths}
                />
                <TableColumnReordering
                    order={order}
                    onOrderChange={changeOrder}
                />
                <TableHeaderRow showSortingControls messages={tableHeaderMessages}
                // cellComponent={CustomTableHeaderCell}
                // rowComponent={CustomTableHeaderRow}
                />
                <TableSelection
                    selectByRowClick={true}
                    highlightRow={true}
                    showSelectionColumn={false} />
                <TableGroupRow />
                <TableColumnVisibility
                    hiddenColumnNames={hiddenColumnNames}
                    onHiddenColumnNamesChange={setHiddenColumnNames}

                />
                <TableFilterRow
                    messages={filterMessages}
                // cellComponent={CustomTableFilterCell}
                // editorComponent={CustomeditorComponent}
                />
                <Toolbar />
                <ColumnChooser messages={columnChooserMessages}
                // itemComponent ={CustomItemColumnChooserComponent} 
                />
                <GroupingPanel showGroupingControls={true} showSortingControls LocalizationMessages
                    messages={groupingPanelMessages}
                // emptyMessageComponent={CustomemptyMessageGroupingPanelComponent}
                />
                <PagingPanel
                    // containerComponent={CustomContainerComponent}
                    pageSizes={pageSizes}
                    messages={pagingPanelMessages}
                />
            </Grid>
            {props.gridloading && <Loading />}
        </MuiThemeProvider>
    );
}

ApiGridComponentWithHook.contextTypes = {
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

const connectedApiGridComponentWithHook = connect(mapStateToProps, mapDispatchToProps)(ApiGridComponentWithHook);
export { connectedApiGridComponentWithHook as ApiGridComponentWithHook };
