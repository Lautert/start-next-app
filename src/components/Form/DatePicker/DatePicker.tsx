import React from "react";
import DatePickerNode, { registerLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
import InputMask from "react-input-mask";
import { toDateBR } from "@/utils/gereric.utils";
import TemplateInput, { PropsTemplateInput } from "../TemplateInput/TemplateInput";

registerLocale("pt-BR", ptBR);

interface PropsDatePick extends PropsTemplateInput, Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
	value?: Date,
	onChange?: (date: Date) => void,
	minDate?: Date,
	maxDate?: Date,
	dateFormat: string
}

interface StateDatePick {
	focus: boolean
}

// const formatDate = (date?: Date) => {
// 	let dateFormatted = "";
// 	if (date instanceof Date) {
// 		dateFormatted = [
// 			date.getDate().toString().padStart(2, "0"),
// 			(date.getMonth() + 1).toString().padStart(2, "0"),
// 			date.getFullYear()
// 		].join("/");
// 	}
// 	return dateFormatted;
// }

class DatePicker extends React.Component<PropsDatePick, StateDatePick> {
	static defaultProps = {
		dateFormat: 'dd/MM/yyyy'
	};

	constructor(props: PropsDatePick) {
		super(props);

		this.state = {
			focus: false,
		}
	}

	render() {
		let value = toDateBR(this.props.value || "00000000", (this.props.dateFormat?.length > 10)).toString();
		let mask = this.props.dateFormat?.replace(/[dmyhis]/ig, '9') || '99/99/9999';

		return (
			<TemplateInput
				{...this.props}>
				<DatePickerNode
					selected={this.props.value}
					disabled={this.props.disabled}
					onChange={(date: Date) => { this.props.onChange && this.props.onChange(date); }}
					customInput={
						<InputMask value={value} mask={mask} />
					}
					onFocus={() => this.setState({ focus: true })}
					onBlur={() => this.setState({ focus: false })}
					minDate={this.props.minDate}
					maxDate={this.props.maxDate}
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
export default DatePicker;
