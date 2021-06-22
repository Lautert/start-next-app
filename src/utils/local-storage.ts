import { APP_VERSION, APP_NAME } from '../_env';

const version = APP_VERSION || 0;
const appName = APP_NAME || 'MY_APP';
const PREFIX = `${appName}_v${version}::`;

export function set<T = object>(key: string, value: T): void {
    if (!localStorage) {
        return;
    }

    try {
        const serializedValue = JSON.stringify(value);
        localStorage.setItem(PREFIX + key, serializedValue);
    } catch (error) {
        throw new Error('store serialization failed');
    }
}

export function get<T = object>(key: string): T | undefined {
    if (!localStorage) {
        return;
    }

    try {
        const serializedValue = localStorage.getItem(PREFIX + key);
        if (serializedValue == null) {
            return;
        }
        return JSON.parse(serializedValue);
    } catch (error) {
        throw new Error('store deserialization failed');
    }
}

export function remove(key: string): boolean {
    if (!localStorage) {
        return false;
    }

    try {
        const serializedValue = localStorage.removeItem(PREFIX + key);
        if (serializedValue == null) {
            return false;
        }
        return true;
    } catch (error) {
        throw new Error('store deserialization failed');
    }
}

export const localstore = {
    set: set,
    get: get,
    remove: remove,
};
