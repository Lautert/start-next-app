import React from "react";
import { connect } from 'react-redux';
import TemplateInput, { PropsTemplateInput } from '../TemplateInput/TemplateInput';

export enum ButtonTypes {
	BUTTON = 'button',
	SUBMIT = 'submit'
}

export interface PropsButton extends PropsTemplateInput, React.ButtonHTMLAttributes<HTMLButtonElement> {
	text: string;
	type?: ButtonTypes;
	onClick?: any;
	classButton?: string;
}

interface StateButton extends PropsButton{
}

class Button extends React.Component<PropsButton, StateButton> {
	static defaultProps = {
		type: ButtonTypes.BUTTON
	};

	constructor(props: PropsButton) {
		super(props);

		this.state = {
			...this.props,
			divProps: {
				...this.props.divProps,
				onClick: this.props.disabled ? undefined : this.props.onClick,
			},
			classContainer:
				(this.props.classContainer ? this.props.classContainer : "") + " pointer"
		}
	}

	static getDerivedStateFromProps(props: PropsButton, state: StateButton) {
		return {
			...props,
			divProps: {
				...props.divProps,
				onClick: props.disabled ? undefined : props.onClick,
			},
			classContainer:
				(props.classContainer ? props.classContainer : "") + " pointer"
		};
	}

	render() {
		return (
			<TemplateInput
				{...this.state}
			>
				<button
					type={this.props.type}
					disabled={this.props.disabled}
					className={this.props.classButton}
				>
					{this.props.text}
				</button>
			</TemplateInput>
		)
	}
}
export default connect(() => ({}), () => ({}))(Button);
