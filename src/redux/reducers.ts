import { combineReducers } from "redux";

import lockScreenReducer from "@/components/LockScreen/reducer";
import { LockScreen } from "@/components/LockScreen/reducer/types";

export interface ApplicationState{
    lockScreen: LockScreen
}

export default combineReducers({
    lockScreen: lockScreenReducer,
});
