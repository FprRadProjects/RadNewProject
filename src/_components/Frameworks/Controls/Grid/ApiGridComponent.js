import * as React from 'react';
import PropTypes from "prop-types"
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

class ApiGridComponent extends React.PureComponent {
    TableRow = ({ row, ...restProps }) => (
        <Table.Row
            {...restProps}
            onClick={(e) => {
                //  this.props.GetRowInfo(row);
                this.props.SelectRow(row);
            }
            }

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
        let columnOrder = [];
        Object.keys(columns).map((item, index) => {
            return columnOrder[index++] = columns[item].name;
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
            selection: [],
            booleanColumns: booleanColumns,
            currentPage: 0,
            hiddenColumnNames: hiddenColumnNames,
            columnWidths: [],
            booleanFilterOperations: ['boolean'],
            currencyFilterOperations: ['equals'],
            columnOrder: columnOrder,
            defaultColumnWidths: defaultColumnWidths,
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
        this.changeSelection = this.changeSelection.bind(this);
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
    getRowId(row) {
        return row[this.props.rowId];
    }

    changeSelection(selection) {
        let selectedRowsData = this.props.rows.filter(
            row =>
                [selection[selection.length-1]].findIndex(selectId => selectId === this.getRowId(row)) !== -1
        );
        this.setState({
            selection:[selection[selection.length-1]]
        });
        this.props.SelectRow(selectedRowsData[selectedRowsData.length-1]);
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
            selection,
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
            <MuiThemeProvider theme={theme} >
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
                    <SelectionState
                        selection={selection}
                        onSelectionChange={this.changeSelection}
                    />
                    <CustomPaging
                        totalCount={totalCount}

                    />
                    {pageSize === 0 && <IntegratedPaging />}
                    <FilteringState
                        filters={filters}
                        onFiltersChange={this.changeFilters}

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
                    /><TableColumnReordering
                        order={columnOrder}
                        onOrderChange={this.changeColumnOrder}
                    />
                    <TableHeaderRow showSortingControls messages={tableHeaderMessages}
                    // cellComponent={CustomTableHeaderCell}
                    // rowComponent={CustomTableHeaderRow}
                    />
                    <TableSelection 
                    selectByRowClick={true} 
                    highlightRow={true} 
                    showSelectionColumn={false}  />
                    <TableGroupRow />
                    <TableColumnVisibility
                        hiddenColumnNames={hiddenColumnNames}
                        onHiddenColumnNamesChange={this.hiddenColumnNamesChange}

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
                {this.props.gridloading && <Loading />}
            </MuiThemeProvider>
        );
    }
}

ApiGridComponent.contextTypes = {
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
const connectedApiGridComponent = connect(mapStateToProps, mapDispatchToProps)(ApiGridComponent);
export { connectedApiGridComponent as ApiGridComponent };
