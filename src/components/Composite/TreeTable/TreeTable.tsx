import React from "react";
// https://devexpress.github.io/devextreme-reactive/react/grid/docs/guides/tree-data/
import Paper from '@material-ui/core/Paper';
import {
	SelectionState,
	IntegratedSelection,
	TreeDataState,
	CustomTreeData,
	Table as TableBase,
	Column,
	TableTreeColumn as TableTreeColumnBase,
} from '@devexpress/dx-react-grid';

import {
	Grid,
	Table,
	TableHeaderRow,
	TableTreeColumn,
} from '@devexpress/dx-react-grid-material-ui';

import { Checkbox } from "@material-ui/core";

interface PropsCheckboxComponent extends TableTreeColumnBase.CheckboxProps {
}

class CheckboxComponent extends React.Component<PropsCheckboxComponent> {

	constructor(props: PropsCheckboxComponent) {
		super(props);

		this.state = {}
	}

	render() {
		return (
			<Checkbox
				checked={this.props.checked}
				disabled={this.props.disabled}
				indeterminate={this.props.indeterminate}
				onChange={(e) => {
					this.props.onChange()
				}}
			/>
		)
	}
}

const getChildRows = (row: any, rootRows: any) => {
	const childRows = rootRows.filter((r: any) => r.parentId === (row ? row.id : null));
	return childRows.length ? childRows : null;
};

const selectedRows = (data: TreeDataRow[]): number[] => {
	return data.map((curr, i: number) => curr.selected ? i : null).filter((curr) => curr !== null) as number[];
}

const expandedRows = (data: TreeDataRow[]): number[] => {
	return data.map((curr, i: number) => curr.expanded ? i : null).filter((curr) => curr !== null) as number[];
}

export interface TreeDataRow {
	id: number;
	parentId: number | null;
	selected?: boolean;
	expanded?: boolean;
}

interface PropsTreeTable<P extends TreeDataRow> {
	columns: ReadonlyArray<Column>;
	data: P[];
	referenceColumn: string;
	tableColumnSize?: Array<TableBase.ColumnExtension>
	showSelect?: boolean;
	showSelectAll?: boolean;

	onSelectedRowsChange: (selectedRows: number[]) => void;
}

interface StateTreeTable {
	selectedRows: number[];
	expandedRows: number[];
}

class TreeTable<T extends TreeDataRow> extends React.Component<PropsTreeTable<T>, StateTreeTable>{

	constructor(props: PropsTreeTable<T>) {
		super(props);

		const selected: number[] = selectedRows(props.data);
		const expanded: number[] = expandedRows(props.data);

		this.state = {
			selectedRows: selected,
			expandedRows: expanded,
		}
	}

	static getDerivedStateFromProps(props: PropsTreeTable<any>, state: StateTreeTable) {
		return {
			selectedRows: selectedRows(props.data),
			expandedRows: expandedRows(props.data),
		}
	}

	setExpandenRowIds() {
	}

	render() {
		return (
			<>
				<Paper style={{
					display: 'flex',
					float: 'left'
				}}>
					<Grid
						rows={this.props.data}
						columns={this.props.columns}
					>
						<SelectionState
							selection={this.state.selectedRows}
							onSelectionChange={(selection: Array<number | string>) => {

								let selRows = this.state.selectedRows;
								const rm = selRows.filter(x => !selection.includes(x));
								rm.map((x) => (
									selRows.splice(selRows.indexOf(x), 1)
								))
								const add: number[] = selection.filter(x => !selRows.includes(Number.parseInt(x.toString()))) as number[];
								add.map((x) => (
									selRows.push(Number.parseInt(x.toString()))
								))

								const removeChildRows = (selRows: number[], rm: number[]) => {
									const recRemov = (key: number) => {
										this.props.data.filter(x => x.parentId === key).map((row) => {
											const i = this.props.data.indexOf(row);
											selRows.splice(i, 1);
											recRemov(i);
                                            return null;
										});
										selRows.splice(key, 1);
									}
									rm.map((row, i) => {
										recRemov(row);
                                        return null;
									});

									return selRows;
								}

								const addParentsRows = (selRows: number[]) => {
									let parents = [], x = 0;
									do {
										parents = [];
										// eslint-disable-next-line no-loop-func
										selRows.map((x) => {
											const data = this.props.data[x];
											if (data.parentId !== undefined || data.parentId !== null) {
												this.props.data.filter((c, i) => {
													if (c.id === data.parentId && !selRows.includes(i)) {
														parents.push(i);
														selRows.push(i);
													}
													return null;
												})
											}
											return null;
										})
									} while (parents.length > 0 && x++ < 100);

									return selRows;
								}

								selRows = removeChildRows(selRows, rm);
								selRows = addParentsRows(selRows);

								this.props.onSelectedRowsChange(selRows);
							}}
						/>
						<IntegratedSelection />
						<TreeDataState
							// expandedRowIds={expandedRowIds}
							// ESPANDA AS LINHAS PELO INDEX DOS DADOS
							defaultExpandedRowIds={this.state.expandedRows}
						// onExpandedRowIdsChange={this.setExpandenRowIds}
						/>
						<CustomTreeData
							getChildRows={getChildRows}
						/>
						<Table
							// DEFINE O TAMANHO PARA AS COLUNAS
							columnExtensions={this.props.tableColumnSize}
						/>
						<TableHeaderRow />
						<TableTreeColumn
							for={this.props.referenceColumn}
							showSelectAll={this.props.showSelectAll}
							showSelectionControls={this.props.showSelect}
							checkboxComponent={CheckboxComponent}
						/>
					</Grid>
				</Paper>
			</>
		);
	}
}
export default TreeTable;
