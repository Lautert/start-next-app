import { Reducer } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import { ActionTypes, LockScreen } from "./types";

export const initialState: LockScreen = {
    hidden: true,
    message: null,
};

const reducer: Reducer<LockScreen> = (state = initialState, action) => {
    switch (action.type) {
        case HYDRATE: {
            return { ...state, ...action.payload.lockScreen };
        }
        case ActionTypes.SHOW: {
            return { ...state, hidden: false };
        }
        case ActionTypes.HIDDEN: {
            return { ...state, hidden: true };
        }
        default: {
            return state;
        }
    }
};

export default reducer;
