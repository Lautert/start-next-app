import React from "react";
import TemplateInput, { PropsTemplateInput } from '../TemplateInput/TemplateInput';
import { FormControl, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';

import './input-check.scss';

export interface InputCheckOptions {
	label: string;
	labelPlacement?: "top" | "start" | "bottom";
	name?: string;
	checked: boolean;
	id?: string;
}

export interface PropsCheck extends Omit<PropsTemplateInput, 'icon'>, Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'required'> {
	options: InputCheckOptions[];
	required?: boolean;
	minChecked?: number;
	row?: boolean;
	onChange?: (option: InputCheckOptions) => void;
}

interface StateCheck {
	options: InputCheckOptions[]
}

class Check extends React.Component<PropsCheck, StateCheck> {
	static defaultProps = {
		row: true
	};

	constructor(props: PropsCheck) {
		super(props);

		this.state = {
			options: this.props.options
		}
	}

	static getDerivedStateFromProps(props: PropsCheck, state: StateCheck) {
		return props;
	}

	// handleChange(event: React.ChangeEvent<HTMLInputElement>) {
	// 	this.setState({ ...state, [event.target.name]: event.target.checked });
	// };

	render() {
		const min = this.props.minChecked || 0;
		const error = (this.props.required &&
			this.state.options.filter(current => current.checked === true).length === min) ||
			this.props.error;

		return (
			<TemplateInput
				{...this.props}
				error={error}
			>
				<div className="container-check">
					<FormControl
						required={this.props.required}
						error={error} component="fieldset"
					>
						<FormGroup
							row={this.props.row}
							aria-label={this.props.name}
						>
							{
								this.state.options.map((current, i) => (
									// <InputCheck
									// 	key={i}
									// 	checked={current.checked}
									// 	label={current.label}
									// 	name={current.name || this.props.name}
									// 	id={current.id || this.props.id}
									// />
									<FormControlLabel
										key={i}
										id={current.id}
										control={
											<Checkbox
												color="primary"
												disabled={this.props.disabled}
												checked={current.checked}
												onChange={() => {
													let options = [...this.state.options];
													let option = { ...options[i] };
													option.checked = !option.checked
													options[i] = option;
													this.setState({ options });
													this.props.onChange && this.props.onChange(option);
												}}
											/>
										}
										label={current.label}
										labelPlacement={current.labelPlacement}
									/>
								))
							}
						</FormGroup>
					</FormControl>
				</div>
			</TemplateInput>
		)
	}
}
export default Check;
