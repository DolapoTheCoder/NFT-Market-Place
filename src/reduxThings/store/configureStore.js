import { createstore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
    return createstore(
        rootReducer,
        initialState,
        applyMiddleware(thunk)
    );
}