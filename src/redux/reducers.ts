import { combineReducers } from "redux";

import lockScreenReducer from "@/components/Composite/LockScreen/reducer";
import { LockScreen } from "@/components/Composite/LockScreen/reducer/types";

export interface ApplicationState{
    lockScreen: LockScreen
}

export default combineReducers({
    lockScreen: lockScreenReducer,
});
