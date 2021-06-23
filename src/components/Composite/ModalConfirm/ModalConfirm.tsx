import * as React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Button, { ButtonTypes } from '@/components/Form/Button';

import './modal-confirm.scss';
import { ModalProps } from 'reactstrap';

interface PropsModalConfirm extends ModalProps{
	text: React.ReactNode | React.ReactNode[];
	onConfirm: () => void;
	onClose: () => void;
	open: boolean;
}

interface StateModalConfirm {}

class ModalConfirm extends React.Component<PropsModalConfirm, StateModalConfirm>{
	render() {
		return (
			<div>
				<Modal
					disableBackdropClick
					aria-labelledby="transition-modal-title"
					aria-describedby="transition-modal-description"
					className="modal"
					open={this.props.open}
					// onClose={() => this.handleClose()}
					closeAfterTransition
					BackdropComponent={Backdrop}
					BackdropProps={{
						timeout: 500,
					}}
				>
					<div
						className="modal-content"
						style={this.props.style}
						>
						<div className="modal-confirm">
							<div className="text">
								<span>{this.props.text}</span>
							</div>
							<div className="actions">
								<Button
									type={ButtonTypes.BUTTON}
									text="Cancelar"
									classDiv="bg-gray"
									onClick={() => this.props.onClose()}
								/>

								<Button
									type={ButtonTypes.BUTTON}
									text="Confirmar"
									onClick={() => {this.props.onConfirm(); this.props.onClose()}}
								/>
							</div>
						</div>
					</div>
				</Modal>
			</div>
		);
	}
}
export default ModalConfirm;
