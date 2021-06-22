export enum ActionTypes {
    SHOW = "LOCK_SCREEN_SHOW",
    HIDDEN = "LOCK_SCREEN_HIDDEN"
}

export interface LockScreen {
    hidden: boolean;
    message: string | null;
}
