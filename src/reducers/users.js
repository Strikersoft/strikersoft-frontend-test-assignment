
import { arrToMap } from './../changeDataStructure';
import { LOAD_ALL_USERS, LOAD_USER, START, SUCCESS } from './../constants';
import { OrderedMap, Record } from 'immutable';

const usersRecord = Record({
	id: undefined
	, name: ''
	, age: ''	
	, phone: ''
	, image: ''
	, phrase: ''

});

const ReducerState = Record({
	loading: false
	, loaded: false
	, entities: new OrderedMap({})
});

const defaultState = new ReducerState();

export default (usersState = defaultState, action) => {
	const { type, payload, response } = action;

	switch (type) {

		case LOAD_ALL_USERS + START:
			return usersState.set('loading', true);

		case LOAD_ALL_USERS + SUCCESS:		
			return usersState
				.set('entities', arrToMap(response, usersRecord))
				.set('loading', false)
				.set('loaded', true);
	}
	return usersState;
};
