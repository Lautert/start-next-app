import React from "react";
import TemplateInput, { PropsTemplateInput } from '../TemplateInput/TemplateInput';

export interface PropsTextarea extends PropsTemplateInput, React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	name?: string,
	value?: string
}

interface StateTextarea extends PropsTextarea{}

class Textarea extends React.Component<PropsTextarea, StateTextarea> {
	constructor(props: PropsTextarea){
		super(props);

		this.state = {
			...this.props,
			error: undefined,
			classDiv: undefined
		}
	}

	render() {
		let propsTextarea = {...this.state};
		delete propsTextarea.classDiv;

		return (
			<TemplateInput
				{...this.props}
			>
				<textarea
					{...propsTextarea}
					autoComplete={this.props.autoComplete ? 'on' : 'off'}
					value={this.props.value || ''}
					disabled={this.props.disabled}
				/>
			</TemplateInput>
		)
	}
}
export default Textarea;
