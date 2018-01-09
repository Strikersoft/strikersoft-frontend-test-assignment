import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Record, Map, fromJS} from 'immutable';
import reducers from './reducers';

// Create store with reducers and initial state
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const ReducerState = Record({
   
	users: undefined
	
})

const initialState = new ReducerState();
const store = createStore(reducers, initialState, composeEnhancers(applyMiddleware(thunkMiddleware)));

window.store = store;

export default store;
