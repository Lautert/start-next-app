import React from "react";
import { toNumberBR } from '@/utils/gereric.utils';
import TemplateInput, { PropsTemplateInput } from '../TemplateInput/TemplateInput';

export interface PropsMoney extends PropsTemplateInput, React.InputHTMLAttributes<HTMLInputElement> {
	decimalLimit?: number;
	integerLimit?: number;
	decimalSymbol?: '.' | ',';
}

interface StateInput extends PropsMoney { }

class Money extends React.Component<PropsMoney, StateInput> {

	static defaultProps = {
		decimalLimit: 2,
		integerLimit: 12
	};

	// static defaultProps = {
	// 	prefix: 'R$',
	// 	suffix: '',
	// 	includeThousandsSeparator: true,
	// 	thousandsSeparatorSymbol: '',
	// 	allowDecimal: true,
	// 	decimalSymbol: ',',
	// 	decimalLimit: 2, // how many digits allowed after the decimal
	// 	integerLimit: 7, // limit length of integer numbers
	// 	allowNegative: false,
	// 	allowLeadingZeroes: true,
	// }

	static getDerivedStateFromProps(props: PropsMoney, state: StateInput) {
		return props;
	}

	onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		let value: any = event.target.value.toString().replace(/\D/g, '').padStart(3, "0");
		let regex: RegExp = new RegExp('(\\d{1,' + this.props.integerLimit + '})(\\d{' + this.props.decimalLimit + '})$');
		value = value.replace(regex, '$1.$2');
		// if(value !== '0.00'){
		value = Number.parseFloat(value).toString();
		// }
		// value = [
		// 	value.split('.')[0],
		// 	(value.split('.')[1] || "").padEnd(2,"0"),
		// ].join(",");
		// if(value === '0.00') value = 0;
		event.target.value = value;

		// let value:string = event.target.value.toString();
		// event.target.value = toNumberEUA(value);

		this.props.onChange && this.props.onChange(event);
	}

	render() {
		let propsInput = { ...this.props };
		delete propsInput.classDiv;
		delete propsInput.error;
		delete propsInput.value;
		delete propsInput.decimalLimit;
		delete propsInput.integerLimit;

		let value = this.props.value;
		value = toNumberBR(value, '');

		let maxLength = 1;
		if (this.props.decimalLimit) {
			maxLength += this.props.decimalLimit;
		}
		if (this.props.integerLimit) {
			maxLength += this.props.integerLimit
		}

		return (
			<TemplateInput
				{...this.props}
			>
				<input
					{...propsInput}
					value={value}
					onChange={this.onChange}
					maxLength={maxLength}
				/>
			</TemplateInput>
		)
	}
}
export default Money;
