import './steptab.scss';

import React from 'react';

interface StepComponent extends Object{
	isValid?: () => boolean
}

interface Step {
	name: string | object,
	component: StepComponent
}

interface Props {
	steps: Array<Step>,
	startAtStep?: number,

	showSteps?: boolean,
	showNavigation?: boolean,

	dontValidate?: boolean,
	preventEnterSubmission?: boolean,

	stepsNavigation?: boolean,
	prevButtonText?: string,
	nextButtonText?: string,
	nextTextOnFinalActionStep?: string,

	onStepChange?: (step: number) => void
};

interface States {
	currStep: number
}

const StepTabsConfig = (props: Props) => {
	let {
		steps,
		startAtStep,

		showSteps,
		showNavigation,

		dontValidate,
		preventEnterSubmission,

		stepsNavigation,
		prevButtonText,
		nextButtonText,
		nextTextOnFinalActionStep,
	} = props;

	showSteps = showSteps !== undefined ? showSteps : true;
	showNavigation = showNavigation !== undefined ? showSteps : true;
	stepsNavigation = stepsNavigation !== undefined ? stepsNavigation : true;

	startAtStep = startAtStep || 0;
	prevButtonText = prevButtonText || 'Prev';
	nextButtonText = nextButtonText || 'Next';
	nextTextOnFinalActionStep = nextTextOnFinalActionStep || 'Save';
	
	const [currStep, setCurrStep] = React.useState(startAtStep);

	const stepValid = (step: Step) => {
		return step.component.isValid === undefined || 
			(step.component.isValid instanceof Function && step.component.isValid());
	}

	const stepMoveAllowed = (idx: number = currStep, skipValidation: boolean = false) => {
		let proceed = false;

		if (dontValidate || skipValidation) {
			proceed = true;
		} else {
			let currStep: Step = steps[idx];
			if (stepValid(currStep)) {
				proceed = true;
			}
		}
		return proceed;
	}

	const updateStepState = (next: number) => {
		if (next >= 0 && next < steps.length) {
			setCurrStep(next);
		}
	}

	const prev = () => {
		if (currStep > 0){
			updateStepState(currStep - 1);
		}
	}

	const next = () => {
		if(currStep < (steps.length - 1)){
			if(stepMoveAllowed()){
				updateStepState(currStep + 1);
			}
		}
	}

	const jumpToStep = (stepNumber: number, skipValidation: boolean = false) => {
		if (!stepsNavigation || stepNumber === currStep) {
			return;
		}
		if(stepNumber >= 0 && (stepNumber <= steps.length - 1)){
			let invalid = steps.slice(0,stepNumber).filter(
				(step) => !stepValid(step)
			).length > 0;
			if(!invalid && stepMoveAllowed(stepNumber)){
				updateStepState(stepNumber);
			}
		}
	}

	return (
		<>
			<StepTabsLayout
				currStep={currStep}

				preventEnterSubmission={preventEnterSubmission || false}
				prevButtonText={prevButtonText}
				nextButtonText={nextButtonText}
				nextTextOnFinalActionStep={nextTextOnFinalActionStep}

				showNavigation={showNavigation !== undefined ? showNavigation : true}
				showSteps={showSteps !== undefined ? showSteps : true}
				steps={steps}
				stepValid={stepValid}
				jumpToStep={jumpToStep}
				prev={prev}
				next={next}
			/>
		</>
	)
}

interface PropsStepTabsLayout {

	currStep: number,
	preventEnterSubmission: boolean,
	prevButtonText: string,
	nextButtonText: string,
	nextTextOnFinalActionStep: string,

	showNavigation: boolean,
	showSteps: boolean,
	steps: Array<Step>,
	stepValid: (step: Step) => boolean
	jumpToStep: (stepNumber: number, skipValidation?: boolean) => void
	prev: () => void,
	next: () => void,
}
class StepTabsLayout extends React.Component<PropsStepTabsLayout, {}> {
	
	styleHidden: object;

	constructor(props: PropsStepTabsLayout){
		super(props);

		this.styleHidden = {
			display: 'none'
		};
	}

	jumpToStep(n: number){
		this.props.jumpToStep(n);
	}

	renderSteps() {
		return this.props.steps.map((step, i) => (
			<li
				className={
					(this.props.stepValid(step) && i < this.props.currStep) ? 'done' :
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

		// first step hide previous btn
		if (currentStep === 0) {
			showPreviousBtn = false;
		}

		// second to last step change next btn text if supplied as props
		if (currentStep === this.props.steps.length - 1) {
			nextStepText = this.props.nextTextOnFinalActionStep || nextStepText;
		}

		// last step hide next btn, hide previous btn if supplied as props
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

		const compToRender = this.props.steps[this.props.currStep].component;

		return (
			<div className="step-tabs" onKeyDown={(evt) => { this.handleKeyDown(evt); }}>
				<div className="steps">
				{ props.showSteps ?
					<ol className="progress-steps">
						{this.renderSteps()}
					</ol>
					: ''
				}
				</div>
				<div className="content-render">
					{compToRender}
				</div>
				{ props.showNavigation ?
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