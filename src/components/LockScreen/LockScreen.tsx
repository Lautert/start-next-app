import React from "react";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { connect } from 'react-redux';
import BounceLoader from "react-spinners/BounceLoader";
import cn from 'classnames';

import styles from './lockScreen.module.scss';
import { ApplicationState } from '@/redux/reducers';

type Props = {
	hidden?: boolean
}

class LockScreen extends React.Component<Props> {
	render() {
		return (
			<div className={cn({
                [styles.lockScreen]: true,
                [styles.hidden]: this.props.hidden,
              })}>
				<BounceLoader
					size={60}
					color={"#fff"}
				/>
			</div>
		);
	}
}

const mapStateToProps = ({ lockScreen }: ApplicationState) => ({
	hidden: lockScreen.hidden,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
	return {
	};

};

export default connect(mapStateToProps, mapDispatchToProps)(LockScreen);
