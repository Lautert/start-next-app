import { createStore, applyMiddleware, compose } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

const middleware = [thunk];

declare global {
    interface Window { __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any; }
}

let makeStore = null;
if (typeof window != 'undefined') {
    const composeEnhancers =
        typeof window === 'object' &&
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

    const enhancer = composeEnhancers(applyMiddleware(...middleware));

    makeStore = () => createStore(rootReducer, enhancer);
} else {
    makeStore = () => createStore(rootReducer, compose(applyMiddleware(...middleware)));
}

export const storeWrapper = createWrapper(makeStore);
