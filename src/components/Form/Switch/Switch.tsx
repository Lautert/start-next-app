import React from "react";
import { connect } from 'react-redux';
import TemplateInput, { PropsTemplateInput } from '../TemplateInput/TemplateInput';
import { Switch as SwitchButton } from '@material-ui/core';

import './switch.scss';

export interface PropsSwitch extends PropsTemplateInput, React.InputHTMLAttributes<HTMLInputElement> {
	checked: boolean;
	label?: string | false;
	labelLeft?: string | false;
	labelRight?: string | false;
	text?: React.ReactNode | React.ReactNode[];
}

class Switch extends React.Component<PropsSwitch> {

	// constructor(props: PropsSwitch){
	// 	super(props);

	// 	this.state = {
	// 		...this.props,
	// 		name: this.props.label?
	// 	}
	// }

	render() {
		return (
			<TemplateInput
				{...this.props}
			>
				<div className="container-switch">
					{this.props.labelLeft ? <span>{this.props.labelLeft}</span> : ''}
					<SwitchButton
						checked={this.props.checked}
						name={this.props.label ? this.props.label : undefined}
						inputProps={{ 'aria-label': 'primary checkbox' }}
						disabled={this.props.disabled}
						onChange={this.props.onChange}

					/>
					{this.props.labelRight ? <span>{this.props.labelRight}</span> : ''}
					{
						!this.props.text ? null :
							this.props.text
					}
				</div>
			</TemplateInput>
		)
	}
}
export default connect(() => ({}), () => ({}))(Switch);
