import React from "react";
import DataTable, { IDataTableProps } from 'react-data-table-component';

import Button from '@/components/Form/Button'
import { IDataTableColumn } from '.';

interface PropsDatatableActions {
    title?: React.ReactNode,
    onAdd: () => void
}

class DatatableActions extends React.Component<PropsDatatableActions>{
    render() {
        return (
            <>
                <div className="datatable-header">
                    <div className="datatable-title">
                        <h3>{this.props.title}</h3>
                    </div>
                    <div className="datatable-actions">
                        <Button
                            icon={"plus"}
                            text={"Adicionar"}
                            onClick={() => this.props.onAdd()}
                            classDiv={false}
                            divProps={{
                                style: {
                                    width: '120px'
                                }
                            }}
                        />
                    </div>
                </div>
            </>
        );
    }
}

interface PropsDatatableRowActions {
    onEdit: (row: any) => void,
    onDelete: (row: any) => void
}

class DatatableRowActions extends React.Component<PropsDatatableRowActions>{
    render() {
        return (
            <>
                <div className="datatable-row-actions" id="idActions">
                    <i className="fa fa-pencil" onClick={(row: any) => this.props.onEdit(row)}></i>
                    <i className="fa fa-times" onClick={(row: any) => this.props.onDelete(row)}></i>
                </div>
            </>
        );
    }
}

// ------------------------------------------------------------------------------------

export interface PropsDatatable<T extends DatatableRow> extends Omit<IDataTableProps<T>, 'onSelectedRowsChange'> {
    onAdd?: () => void;
    onEdit?: (row: any) => void;
    onDelete?: (row: any) => void;
    hasActions?: boolean;
    columnActions?: IDataTableColumn<T>[];
    selectRows?: "single" | "multiple";
    onSelectedRowsChange?: (rows: T[]) => void;
    clearSelectedRows?: boolean;
}
interface StateDatatable<T extends DatatableRow> extends IDataTableProps<T> {
    selectedRows: number[];
}

export interface DatatableRow {
    id?: number;
    rowSelected: boolean;
}

class DatatableController<T extends DatatableRow> extends React.Component<
    PropsDatatable<T>,
    StateDatatable<T>
> {

    static defaultProps = {
        hasActions: true,
        error: false,
        paginationRowsPerPageOptions: [5, 10, 15, 20, 50, 100],
        fixedHeaderScrollHeight: '500px',
        direction: 'auto',
        progressPending: false,
        selectRows: 'single',
        keepSelectedRows: false
    };

    constructor(props: PropsDatatable<T>) {
        super(props);

        let columnActions = null;
        if (!this.props.columnActions && this.props.hasActions) {
            columnActions = [{
                name: "Ações",
                cell: (row: any) =>
                    <DatatableRowActions
                        onEdit={() => this.props.onEdit && this.props.onEdit(row)}
                        onDelete={() => this.props.onDelete && this.props.onDelete(row)}
                    />,
                button: true,
            }];
        } else {
            columnActions = this.props.columnActions || [];
        }

        this.state = {
            columns: [...this.props.columns, ...columnActions],
            data: this.props.data,
            selectedRows: []
        }
    }

    static getDerivedStateFromProps(nextProps: PropsDatatable<any>, state: StateDatatable<any>) {
        let selectedRows = [...state.selectedRows];
        // if (nextProps.page !== state.page) {
        // 	selectedRows = [];
        // }

        let _data: DatatableRow[] = [...nextProps.data];
        let data: DatatableRow[] = _data.map(function (el, i) {
            var o = Object.assign({}, el);
            o.rowSelected = selectedRows.indexOf(i) > -1;
            return o;
        })
        let newState = {
            data: data,
            selectedRows: selectedRows
        }
        return newState
    }

    shouldComponentUpdate(nextProps: PropsDatatable<any>, nextState: StateDatatable<any>) {
        if (this.props.clearSelectedRows !== nextProps.clearSelectedRows) {
            this.clearRowSelected()
        }
        return true;
    }

    onSelectedRowsChange = (selectedRows: number[]) => {
        let list: T[] = [];
        this.props.data.map((row: T, i) => {
            if (selectedRows.indexOf(i) > -1) {
                list.push(row);
            }
            return null;
        })
        this.props.onSelectedRowsChange && this.props.onSelectedRowsChange(list);
    }

    setRowSelected = (index: number) => {
        let selected = this.props.selectRows === 'single' ? [] : [...this.state.selectedRows];
        selected.push(index);
        this.setState({
            selectedRows: selected
        });
        this.onSelectedRowsChange(selected);
    }

    removeRowSelected = (index: number) => {
        let selected = [...this.state.selectedRows];
        let i = selected.indexOf(index);
        if (i > -1) {
            selected.splice(i, 1);
        }
        this.setState({
            selectedRows: selected
        });
        this.onSelectedRowsChange(selected);
    }

    clearRowSelected = () => {
        this.setState({
            selectedRows: []
        });
        this.onSelectedRowsChange([]);
    }

    render() {
        return (
            <DatatableLayout
                onSelectedRowsChange={null}
                {...this.props}
                data={this.state.data}
                columns={this.state.columns}
                selectedRows={this.state.selectedRows}
                setRowSelected={this.setRowSelected}
                removeRowSelected={this.removeRowSelected}
            />
        )
    }

}

interface PropsDatatableLayout<T> extends Omit<IDataTableProps<T>, 'onSelectedRowsChange'> {
    onAdd?: () => void;
    onEdit?: (row: any) => void;
    onDelete?: (row: any) => void;
    selectedRows: number[];
    setRowSelected: (index: number) => void;
    removeRowSelected: (index: number) => void;
}

class DatatableLayout<T extends DatatableRow> extends React.Component<
    PropsDatatableLayout<T>,
    any
> {

    render() {
        return (
            <div className="datatable-content">
                <DataTable
                    className="datatable"
                    title={this.props.title}
                    defaultSortField={this.props.defaultSortField}
                    noDataComponent={
                        <div className="datatable-empty">
                            "Nenhum registro foi encontrado"
                        </div>
                    }
                    expandableRows={this.props.expandableRows}
                    expandOnRowClicked={true}
                    expandableRowsComponent={this.props.expandableRowsComponent}
                    highlightOnHover={true}
                    striped={true}
                    dense={false}
                    noTableHead={false}
                    persistTableHead={true}
                    progressPending={this.props.progressPending}
                    noHeader={true}
                    subHeader={true}
                    subHeaderComponent={this.props.subHeaderComponent ?
                        this.props.subHeaderComponent :
                        <DatatableActions
                            title={this.props.title || ""}
                            onAdd={() => this.props.onAdd && this.props.onAdd()}
                        />
                    }
                    subHeaderAlign={'right'}
                    fixedHeader={false}
                    fixedHeaderScrollHeight={this.props.fixedHeaderScrollHeight}
                    direction={this.props.direction}
                    pagination={true}
                    paginationRowsPerPageOptions={this.props.paginationRowsPerPageOptions}
                    paginationComponentOptions={{
                        rowsPerPageText: 'Registros por pagina',
                        rangeSeparatorText: 'de',
                        noRowsPerPage: false,
                        selectAllRowsItem: false,
                        selectAllRowsItemText: "Todos"
                    }}
                    selectableRows={false}
                    clearSelectedRows={false}
                    selectableRowsNoSelectAll={true}
                    selectableRowSelected={(row: T): boolean => {
                        return row.rowSelected;
                    }}
                    conditionalRowStyles={[
                        {
                            when: (row: any) => row.rowSelected,
                            style: {
                                backgroundColor: 'rgba(32,168,216,0.9) !important',
                                color: 'white !important',
                                '&:hover': {
                                    backgroundColor: 'rgba(32,168,216,0.7) !important',
                                    color: 'white !important',
                                },
                            },
                        },
                    ]}

                    {...this.props}

                    onRowClicked={(row: T, e: MouseEvent): void => {
                        const index = this.props.data.indexOf(row);
                        if (this.props.selectedRows.indexOf(index) > -1) {
                            this.props.removeRowSelected(index);
                        } else {
                            this.props.setRowSelected(index);
                        }
                        this.props.onRowClicked && this.props.onRowClicked(row, e);
                    }}
                    onSelectedRowsChange={(selectedRowState) => {
                        if (selectedRowState.allSelected && this.props.selectableRowsNoSelectAll) return;
                        let list: number[] = [];
                        selectedRowState.selectedRows.map((row: T, i) => {
                            const index = this.props.data.indexOf(row);
                            if (this.props.selectedRows.indexOf(index) === -1) {
                                this.props.setRowSelected(index);
                            }
                            list.push(index);
                            return null;
                        });
                        this.props.data.map((row: T, i) => {
                            if (this.props.selectedRows.indexOf(i) > -1 && list.indexOf(i) === -1) {
                                this.props.removeRowSelected(i);
                            }
                            return null;
                        })
                        return null;
                    }}
                />
            </div>
        )
    }
}

export default DatatableController;
