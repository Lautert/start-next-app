import React from "react";
import DatePickerNode, { registerLocale } from "react-datepicker";
import InputMask from "react-input-mask";
import { toDateBR } from "@/utils/gereric.utils";
import TemplateInput, { PropsTemplateInput } from "../TemplateInput/TemplateInput";
import './date-between.scss';

export interface PropsDateBetween extends PropsTemplateInput, Omit<React.InputHTMLAttributes<HTMLDataElement>, "value" | "onChange"> {
	value?: Date,
	valueInicio: Date | null;
	valueFinal: Date | null;
	propsIni?: Date;
	propsFim?: Date;
	onIni: (event: React.ChangeEvent<HTMLDataElement>) => void;
	onFim: (event: React.ChangeEvent<HTMLDataElement>) => void;
	dateFormat: string;
	onChange?: (date: Date) => void;
}

interface StateInput extends PropsDateBetween {
	focus: boolean
 }

class DatePickerBetween extends React.Component<PropsDateBetween, StateInput> {

	static defaultProps = {
		dateFormat: 'dd/MM/yyyy'
	};

	constructor(props: PropsDateBetween){
		super(props);

		this.state = {
			focus: false,
			...props,
			classDiv: (props.classDiv ? props.classDiv : "") + " date-between"
		}
	}

	static getDerivedStateFromProps(props: PropsDateBetween, state: StateInput) {
		return {
			...props,
			classDiv: (props.classDiv ? props.classDiv : "") + " date-between"
		};
	}

	render() {
		let propsInput = { ...this.props };
		let value = toDateBR(this.props.value || "00000000", (this.props.dateFormat?.length > 10)).toString();
		let mask = this.props.dateFormat?.replace(/[dmyhis]/ig, '9') || '99/99/9999';

		delete propsInput.classDiv;
		delete propsInput.error;


		return (
			<TemplateInput
				{...this.state}
				label={false}
			>
				<DatePickerNode
					selected={this.props.value}
					disabled={this.props.disabled}
					onChange={(date: Date) => { this.props.onChange && this.props.onChange(date); }}
					customInput={
						<InputMask value={value} mask={mask} />
					}
					onFocus={() => this.setState({ focus: true })}
					onBlur={() => this.setState({ focus: false })}
					minDate={this.props.valueInicio}
					//maxDate={this.props.valueFinal}
					placeholderText={this.props.placeholder}
					locale="pt-BR"
					dateFormat={this.props.dateFormat || 'dd/MM/yyyy'}
					showDisabledMonthNavigation
					popperPlacement="bottom"
					popperModifiers={{
						flip: {
							behavior: ["bottom"] // don't allow it to flip to be above
						},
						preventOverflow: {
							enabled: false // tell it not to try to stay within the view (this prevents the popper from covering the element you clicked)
						},
						hide: {
							enabled: false // turn off since needs preventOverflow to be enabled
						}
					}}
				/>
				<div className="sepator">á</div>
					<DatePickerNode
						selected={this.props.value}
						disabled={this.props.disabled}
						onChange={(date: Date) => { this.props.onChange && this.props.onChange(date); }}
						customInput={
							<InputMask value={value} mask={mask} />
						}
						onFocus={() => this.setState({ focus: true })}
						onBlur={() => this.setState({ focus: false })}
						//minDate={this.props.valueInicio}
						maxDate={this.props.valueFinal}
						placeholderText={this.props.placeholder}
						locale="pt-BR"
						dateFormat={this.props.dateFormat || 'dd/MM/yyyy'}
						showDisabledMonthNavigation
						popperPlacement="bottom"
						popperModifiers={{
							flip: {
								behavior: ["bottom"] // don't allow it to flip to be above
							},
							preventOverflow: {
								enabled: false // tell it not to try to stay within the view (this prevents the popper from covering the element you clicked)
							},
							hide: {
								enabled: false // turn off since needs preventOverflow to be enabled
							}
						}}
					/>
			</TemplateInput>
		)
	}
}
export default DatePickerBetween;
