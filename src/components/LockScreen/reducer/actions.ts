import { ActionTypes, LockScreen } from './types';

import { ActionCreator, Action, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

import { ApplicationState } from "@/redux/reducers";

export type AppThunk = ActionCreator<
	ThunkAction<void, ApplicationState, null, Action<string>>
>;

export const lockScreenShow: AppThunk = (lockScreen: LockScreen) => {
	return (dispatch: Dispatch): Action => {
		return dispatch({
			type: ActionTypes.SHOW,
            payload: lockScreen
		});
	};
};

export const lockScreenHidden: AppThunk = (lockScreen: LockScreen) => {
	return (dispatch: Dispatch): Action => {
		return dispatch({
			type: ActionTypes.HIDDEN,
            payload: lockScreen
		});
	};
};

// export const lockScreenHidden = (lockScreen: LockScreen) => ({
//     type: ActionTypes.HIDDEN,
//     payload: lockScreen
// });

// export const lockScreenShow = (lockScreen: LockScreen) => ({
//     type: ActionTypes.SHOW,
//     payload: lockScreen
// });
