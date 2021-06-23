import React from "react";
import { connect } from 'react-redux';

import './notification.scss';

interface PropsNotification {
	show: boolean,
	message: string[],
	onClose: () => void
}

class Notification extends React.Component<PropsNotification, {}>{

	updateTimer: any;

	componentWillUnmount() {
		if (this.updateTimer) {
			clearTimeout(this.updateTimer);
		}
	}

	componentDidUpdate(prevProps: PropsNotification) {
		if (prevProps.show !== this.props.show) {
			this.updateAndNotify();
		}
	}

	updateAndNotify = () => {
		if (this.updateTimer) return;
		this.updateTimer = setTimeout(() => {
			this.props.onClose()
			this.updateTimer = null;
		}, 6000);
	}

	render() {
		return (
			<div className={"notification "+(!this.props.show?"hidden":"")}>
				<div
					className={"notification-content"}
					onClick={this.props.onClose}
				>
					<ul>
						{this.props.message.map((message, i) => (
							<li key={i}>{message}</li>
						))}
					</ul>
				</div>
			</div>
		)
	}
}

// const mapStateToProps = () => {
// };

// const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
// 	return {
// 		lockScreenHidden: () => { dispatch(lockScreenHidden()); },
// 		lockScreenShow: () => { dispatch(lockScreenShow()); }
// 	}
// };

export default connect(null, {})(Notification);
