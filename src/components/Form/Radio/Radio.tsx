import React from "react";
import TemplateInput, { PropsTemplateInput } from '../TemplateInput/TemplateInput';
import { Radio as RadioInput, RadioGroup, FormControlLabel, FormControl } from '@material-ui/core';

import './input-radio.scss';

export interface InputRadioOptions {
	value: string;
	label: string;
	labelPlacement?: "top" | "start" | "bottom";
	id?: string;
}

export interface PropsRadio extends Omit<PropsTemplateInput, 'icon'>, Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
	options: InputRadioOptions[];
	name?: string;
	defaultValue: string;
	value?: string;
	row?: boolean;
	onChange?: (value: string) => void;
}

interface StateRadio {
	options: InputRadioOptions[];
	value: string;
}

class Radio extends React.Component<PropsRadio, StateRadio> {
	static defaultProps = {
		row: true
	};

	constructor(props: PropsRadio) {
		super(props);

		this.state = {
			options: this.props.options,
			value: this.props.defaultValue
		}
	}

	static getDerivedStateFromProps(props: PropsRadio, state: StateRadio) {
		return props;
	}

	render() {
		return (
			<TemplateInput
				{...this.props}
			>
				<div className="container-radio">
					<FormControl component="fieldset">
						<RadioGroup
							row={this.props.row}
							aria-label={this.props.name}
							name={this.props.name}
							value={this.state.value}
							onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
								let value = ev.target.value;
								this.setState({ value: value });
								this.props.onChange && this.props.onChange(value);
							}}
						>
							{
								this.state.options.map((current, i) => (
									<FormControlLabel
										key={i}
										id={current.id}
										value={current.value}
										control={<RadioInput color="primary" />}
										label={current.label}
										labelPlacement={current.labelPlacement}
									/>
								))
							}
						</RadioGroup>
					</FormControl>
				</div>
			</TemplateInput>
		)
	}
}
export default Radio;
