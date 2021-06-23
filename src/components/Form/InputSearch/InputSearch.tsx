import React from 'react';
import Modal from '@/components/Composite/Modal';
import Input from '../Input';
import { PropsInput } from '../Input/Input';

export interface PropsInputSearch extends Omit<PropsInput, 'icon'> {
	onClose: () => void;
	bodyComponent: React.ReactNode | React.ReactNode[];
	footerComponent?: React.ReactNode | React.ReactNode[];
	showModal: boolean;
}

interface StateInputSearch extends PropsInputSearch {
}

class InputSearch extends React.Component<PropsInputSearch, StateInputSearch> {

	handleModal() {

	}

	render() {
		let propsInput = { ...this.props };
		delete propsInput.bodyComponent;
		// delete propsInput.onClose;
		// delete propsInput.showModal;

		return (
			<>
				<Input
					{...propsInput}
					icon="search"
					onIconClick={this.props.onIconClick}
					readOnly={true}
				/>
				<Modal
					title={this.props.title}
					open={this.props.showModal}
					bodyComponent={this.props.bodyComponent}
					footerComponent={this.props.footerComponent}
					onClose={() => this.props.onClose()}
					style={{
						width: '100%'
					}}
				/>
			</>
		)
	}
}
export default InputSearch
