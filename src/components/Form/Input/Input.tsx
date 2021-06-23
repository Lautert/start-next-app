import React from "react";
import InputMask from "react-input-mask";
import TemplateInput, { PropsTemplateInput } from '../TemplateInput/TemplateInput';

export enum InputTypes {
	TEXT = 'text',
	PASS = 'password',
	FILE = 'file',
	NUM = 'number'
}

export interface PropsInput extends PropsTemplateInput, Omit<React.InputHTMLAttributes<HTMLInputElement>, 'label'> {
	name?: string;
	value: any;
	type?: InputTypes;
	mask?: any;
}

interface StateInput extends PropsInput { }

class Input extends React.Component<PropsInput, StateInput> {
	static defaultProps = {
		type: InputTypes.TEXT
	};

	constructor(props: PropsInput) {
		super(props);

		this.state = {
			...this.props,
			error: undefined,
			classDiv: undefined
		}
	}

	static getDerivedStateFromProps(props: PropsInput, state: StateInput) {
		return props;
	}

	render() {
		let propsInput = { ...this.state };
		delete propsInput.classDiv;
		delete propsInput.error;
		delete propsInput.label;
		delete propsInput.onIconClick;

		return (
			<TemplateInput
				{...this.props}
			>
				<InputMask
					{...propsInput}
					value={this.props.value || ""}
					autoComplete={this.props.autoComplete ? 'on' : 'off'}
					mask={this.props.mask || ''}
				/>
			</TemplateInput>
		)
	}
}
export default Input;
