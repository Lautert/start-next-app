import './steptab.scss';

import React from 'react';

export interface StepStoreData<T>{
	getStore?: () => T,
	updateStore?: (data: any) => void,
}

interface StepComponent extends Object {
	isValid?: () => boolean,
	getStore?: () => void,
	updateStore?: () => void
}

export interface StepTab {
	name: string | object,
	component: StepComponent,
	valid?: boolean,
}

export interface StepParams {
	jumpToStep?: (step:number) => void,
	isValid?: (valid: boolean) => void,
	prev?: () => void
	next?: () => void
}

interface Props {
	steps: Array<StepTab>,
	startAtStep?: number,

	showSteps?: boolean,
	showNavigation?: boolean,

	dontValidate?: boolean,
	preventEnterSubmission?: boolean,

	stepsNavigation?: boolean,
	prevButtonText?: string,
	nextButtonText?: string,
	nextTextOnFinalActionStep?: string,

	onStepChange?: (StepTab: number) => void
};

interface States {
	currStep: number
}

class StepTabsConfig extends React.Component<Props, States>{

	static defaultProps = {
		startAtStep: 0,

		showSteps: true,
		showNavigation: true,

		dontValidate: false,
		preventEnterSubmission: false,

		stepsNavigation: true,
		prevButtonText: 'Prev',
		nextButtonText: 'Next',
		nextTextOnFinalActionStep: 'Save'
	}

	constructor(props: Props) {
		super(props);

		this.state = {
			currStep: this.props.startAtStep || 0
		}
	}

	stepValid = (step: StepTab) => {
		return step.valid !== undefined ? step.valid : true;
	}

	stepMoveAllowed = (idx: number = this.state.currStep, skipValidation: boolean = false) => {
		let proceed = false;

		if (this.props.dontValidate || skipValidation) {
			proceed = true;
		} else {
			let currStep: StepTab = this.props.steps[idx];
			if (this.stepValid(currStep)) {
				proceed = true;
			}
		}
		return proceed;
	}

	updateStepState = (next: number) => {
		if (next >= 0 && next < this.props.steps.length) {
			this.setState({ currStep: next });
		}
	}

	prev = () => {
		if (this.state.currStep > 0) {
			this.updateStepState(this.state.currStep - 1);
		}
	}

	next = () => {
		if (this.state.currStep < (this.props.steps.length - 1)) {
			if (this.stepMoveAllowed()) {
				this.updateStepState(this.state.currStep + 1);
			}
		}
	}

	jumpToStep = (stepNumber: number, skipValidation: boolean = false) => {
		if (!this.props.stepsNavigation || stepNumber === this.state.currStep) {
			return;
		}
		if (stepNumber >= 0 && (stepNumber <= this.props.steps.length - 1)) {
			let invalid = this.props.steps.slice(0, stepNumber).filter(
				(StepTab) => !this.stepValid(StepTab)
			).length > 0;
			if (!invalid && this.stepMoveAllowed(stepNumber)) {
				this.updateStepState(stepNumber);
			}
		}
	}

	render() {
		return (
			<>
				<StepTabsLayout
					currStep={this.state.currStep}

					preventEnterSubmission={this.props.preventEnterSubmission || false}
					prevButtonText={this.props.prevButtonText || 'Prev'}
					nextButtonText={this.props.nextButtonText || 'Next'}
					nextTextOnFinalActionStep={this.props.nextTextOnFinalActionStep || 'Save'}

					showNavigation={this.props.showNavigation !== undefined ? this.props.showNavigation : true}
					showSteps={this.props.showSteps !== undefined ? this.props.showSteps : true}
					steps={this.props.steps}

					stepValid={(StepTab: StepTab) => this.stepValid(StepTab)}
					jumpToStep={(n: number) => this.jumpToStep(n)}
					prev={() => this.prev()}
					next={() => this.next()}
				/>
			</>
		)
	}
}

interface PropsStepTabsLayout {

	currStep: number,
	preventEnterSubmission: boolean,
	prevButtonText: string,
	nextButtonText: string,
	nextTextOnFinalActionStep: string,

	showNavigation: boolean,
	showSteps: boolean,
	steps: Array<StepTab>,
	stepValid: (StepTab: StepTab) => boolean
	jumpToStep: (stepNumber: number, skipValidation?: boolean) => void
	prev: () => void,
	next: () => void,
}
class StepTabsLayout extends React.Component<PropsStepTabsLayout, {}> {

	styleHidden: object;

	constructor(props: PropsStepTabsLayout) {
		super(props);

		this.styleHidden = {
			display: 'none'
		};
	}

	jumpToStep(n: number) {
		this.props.jumpToStep(n);
	}

	renderSteps() {
		return this.props.steps.map((StepTab, i) => (
			<li
				className={
					(this.props.stepValid(StepTab) && i < this.props.currStep) ? 'done' :
						((i === this.props.currStep) ? 'doing' : '')
				}
				onClick={(evt) => { this.jumpToStep(i) }}
				key={i}
				value={i}
			>
				{/* <em>{i + 1}</em> */}
				<span>{this.props.steps[i].name}</span>
			</li>
		));
	}

	handleKeyDown(evt: React.KeyboardEvent) {
		if (evt.which === 13) {
			if (!(evt instanceof HTMLTextAreaElement)) {
				if (this.props.preventEnterSubmission) {
					evt.preventDefault();
				} else {
					evt.persist();
					this.props.next();
				}
			}
		}
	}

	getPrevNextBtnLayout(currentStep: number) {
		// first set default values
		let showPreviousBtn = true;
		let showNextBtn = true;
		let nextStepText = this.props.nextButtonText;

		// first StepTab hide previous btn
		if (currentStep === 0) {
			showPreviousBtn = false;
		}

		// second to last StepTab change next btn text if supplied as props
		if (currentStep === this.props.steps.length - 1) {
			nextStepText = this.props.nextTextOnFinalActionStep || nextStepText;
		}

		// last StepTab hide next btn, hide previous btn if supplied as props
		if (currentStep > this.props.steps.length - 1) {
			showNextBtn = false;
			// showPreviousBtn = this.props.prevBtnOnLastStep === false ? false : true;
		}

		return {
			showPreviousBtn,
			showNextBtn,
			nextStepText
		};
	}

	render() {
		const { props } = this;
		const {
			nextStepText,
			showNextBtn,
			showPreviousBtn
		} = this.getPrevNextBtnLayout(this.props.currStep);

		let step = this.props.steps[this.props.currStep];
		step.valid = false;

		const cloneExtensions: StepParams = {
			jumpToStep: (stepNumber: number) => {
				this.props.jumpToStep(stepNumber);
			},
			prev: () => {
				this.props.prev()
			},
			next: () => {
				this.props.next()
			},
			isValid: (valid: boolean) => {
				step.valid = valid
			}
		};
		const componentPointer = step.component;

		// @ts-ignore
		const compToRender = React.cloneElement(componentPointer, cloneExtensions);

		return (
			<div className="StepTab-tabs" onKeyDown={(evt) => { this.handleKeyDown(evt); }}>
				<div className="steps">
					{props.showSteps ?
						<ol className="progress-steps">
							{this.renderSteps()}
						</ol>
						: ''
					}
				</div>
				<div className="content-render">
					{compToRender}
				</div>
				{props.showNavigation ?
					<div
						className="footer-buttons"
					>
						<button
							type="button"
							style={showPreviousBtn ? {} : this.styleHidden}
							className={'prev-button'}
							onClick={() => { this.props.prev(); }}
							id="prev-button"
						>
							{props.prevButtonText}
						</button>
						<button
							type="button"
							style={showNextBtn ? {} : this.styleHidden}
							className={'next-button'}
							onClick={() => { this.props.next(); }}
							id="next-button"
						>
							{nextStepText}
						</button>
					</div>
					: ''
				}
			</div>
		);
	}
}
export default StepTabsConfig;
