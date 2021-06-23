import React from "react";

import './PageView.scss';

// COMPONENTS
// import Input from 'src/core/components/Form/Input';
// import InputSearch from 'src/core/components/Form/InputSearch';
import Button, { PropsButton, ButtonTypes } from '@/components/Form/Button/Button';
// import DatePicker from 'src/core/components/Form/DatePicker';
// import Check from 'src/core/components/Form/Check';
// import { InputCheckOptions } from 'src/core/components/Form/Check/Check';
// import Radio from 'src/core/components/Form/Radio';
// import Textarea from 'src/core/components/Form/Textarea';
// import Switch from 'src/core/components/Form/Switch';
// import Select from 'src/core/components/Form/Select';
import BounceLoader from "react-spinners/BounceLoader";

interface PropsPageView {
	title: string;
	classDiv?: string | false;
	loading: boolean;
	propsButtonLeft?: Omit<PropsButton, 'text'>;
	propsButtonRight?: Omit<PropsButton, 'text'>;
	propsContentChild?: React.HTMLAttributes<HTMLDivElement>;
	onPrevClick: () => void;
	onNextClick: () => void;
}

interface StatePageView {
}

class PageView extends React.Component<PropsPageView, StatePageView>{

	static defaultProps = {
		loading: false
	};

	constructor(props: PropsPageView) {
		super(props);

		this.state = {
		}
	}

	static getDerivedStateFromProps(props: PropsPageView, state: StatePageView) {
		return {
		}
	}

	render() {
		return (
			<div className={`page-view ${this.props.classDiv}`}>
				<div className="page-header">
					<Button
						{...this.props.propsButtonLeft}
						text=""
						icon="chevron-left"
						classDiv=""
						onlyIcon={true}
						type={ButtonTypes.BUTTON}
						onClick={() => this.props.onPrevClick()}
					/>
					<h5>{this.props.title}</h5>
					<Button
						{...this.props.propsButtonRight}
						text=""
						icon="chevron-right"
						classDiv=""
						onlyIcon={true}
						type={ButtonTypes.BUTTON}
						onClick={() => this.props.onNextClick()}
					/>
				</div>
				<div className="page-body" {...this.props.propsContentChild}>
					{!this.props.loading ? null :
						<div className="lock-body">
							<BounceLoader
								size={60}
								color={"#fff"}
							/>
						</div>
					}
					{this.props.children}
				</div>
			</div>
		);
	}
}
export default PageView;
