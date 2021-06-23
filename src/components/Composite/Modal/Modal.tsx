import * as React from 'react';
import ModalUI, { ModalProps } from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';

import './modal.scss';
// import Button from 'src/core/components/Form/Button';

interface PropsModal extends Omit<ModalProps, 'children'> {
	open: boolean;
	onClose: () => void;
	title?: string;
	headerComponent?: React.ReactNode | React.ReactNode[];
	bodyComponent: React.ReactNode | React.ReactNode[];
	footerComponent?: React.ReactNode | React.ReactNode[];
}

interface StateModal { }

class Modal extends React.Component<PropsModal, StateModal>{
	render() {
		return (
			<div>
				<ModalUI
					disableBackdropClick
					aria-labelledby="transition-modal-title"
					aria-describedby="transition-modal-description"
					className="modal"
					open={this.props.open}
					onClose={() => this.props.onClose()}
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
						<div className="modal-header">
							<div className="header-left">
								{
									this.props.headerComponent === undefined && this.props.title ?
										<h4>{this.props.title}</h4>
										: this.props.headerComponent
								}
							</div>
							<div className="header-right">
								<i className="icon-close-modal fa fa-times pointer" onClick={this.props.onClose} />
							</div>
						</div>
						<div className="modal-body">
							{this.props.bodyComponent}
						</div>
						{
							!this.props.footerComponent ? null :
							<div className="modal-footer">
								{this.props.footerComponent}
							</div>
						}
					</div>
				</ModalUI>
			</div>
		);
	}
}
export default Modal;
