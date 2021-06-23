import React from "react";
import TemplateInput, { PropsTemplateInput } from '../TemplateInput/TemplateInput';
import Money, { PropsMoney } from '../Money/Money';

import './money-between.scss';

export interface PropsMoneyBetween extends PropsTemplateInput {
	valueMin: number;
	valueMax: number;
	propsMin?: PropsMoney;
	propsMax?: PropsMoney;
	onMin: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onMax: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface StateInput extends PropsMoneyBetween { }

class MoneyBetween extends React.Component<PropsMoneyBetween, StateInput> {

	constructor(props: PropsMoneyBetween){
		super(props);

		this.state = {
			...props,
			classDiv: (props.classDiv ? props.classDiv : "") + " money-between"
		}
	}

	static getDerivedStateFromProps(props: PropsMoneyBetween, state: StateInput) {
		return {
			...props,
			classDiv: (props.classDiv ? props.classDiv : "") + " money-between"
		};
	}

	render() {
		let propsInput = { ...this.props };
		delete propsInput.classDiv;
		delete propsInput.error;

		return (
			<TemplateInput
				{...this.state}
				label={false}
			>
				<Money
					{...this.props.propsMin}
					value={this.props.valueMin}
					label={(this.props.label?.toString() + ' Mínimo')}
					onChange={(event) => this.props.onMin(event)}
					classDiv=""
				/>
				<div className="sepator">á</div>
				<Money
					{...this.props.propsMax}
					value={this.props.valueMax}
					label={(this.props.label?.toString() + ' Máximo')}
					onChange={(event) => this.props.onMax(event)}
					classDiv=""
				/>
			</TemplateInput>
		)
	}
}
export default MoneyBetween;
