import React, { CSSProperties } from "react";
import TemplateInput, { PropsTemplateInput } from '../TemplateInput/TemplateInput';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { AutocompleteChangeReason } from '@material-ui/lab/Autocomplete';

import './select.scss';

export interface SelectOption {
	label: string;
	value: string;
}

export interface PropsSelect extends Omit<PropsTemplateInput, 'icon'>, Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange' | 'value' | 'defaultValue'> {
	value?: string;
	defaultValue?: string;
	options: SelectOption[];
	selectStyle?: CSSProperties;
	groupByFirstLetter?: boolean;
	onChange?: (event: React.ChangeEvent<{}>, value: any, reason: AutocompleteChangeReason) => void
}

interface StateSelect {
	options: SelectOption[];
	value: SelectOption | undefined;
}

class Select extends React.Component<PropsSelect, StateSelect> {

	constructor(props: PropsSelect) {
		super(props);

		let selectValue = undefined;
		if (this.props.value) {
			selectValue = this.props.options.filter(curr => curr.value === this.props.value)[0];
		}

		this.state = {
			options: this.props.options,
			value: selectValue,
		}
	}

	static getDerivedStateFromProps(props: PropsSelect, state: StateSelect) {
		let selectValue = undefined;

		if (props.value) {
			selectValue = props.options.filter(curr => curr.value === props.value)[0];
		}
		return {
			options: props.options,
			value: selectValue,
		};
	}

	render() {
		let options: any = [];
		if (this.props.groupByFirstLetter) {
			options = this.state.options.map((option) => {
				const firstLetter = option.label[0].toUpperCase();
				return {
					firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
					...option,
				};
			});
		} else {
			options = this.state.options;
		}

		return (
			<TemplateInput
				{...this.props}
			>
				<Autocomplete
					onChange={(event: React.ChangeEvent<{}>, value: SelectOption | null, reason: AutocompleteChangeReason) => {
						this.props.onChange && this.props.onChange(event, value, reason)
					}}
					value={this.state.value || null}
					options={
						this.props.groupByFirstLetter ?
							options.sort((a: any, b: any) => -b.firstLetter.localeCompare(a.firstLetter)) :
							options
					}
					getOptionSelected={(option: SelectOption, value: SelectOption) => {
						return option?.value === value?.value
					}}
					groupBy={this.props.groupByFirstLetter ? ((option: any) => option.firstLetter) : undefined}
					getOptionLabel={(option: SelectOption) => option.label}
					style={this.props.selectStyle}
					disabled={this.props.disabled}
					renderInput={
						(params) =>
							<TextField
								{...params}
								label={this.props.placeholder}
								variant="outlined"
							/>
					}
				/>
			</TemplateInput>
		)
	}
}
export default Select;
